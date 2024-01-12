<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card border-0 shadow rounded-3 my-5">
                    <div class="card-body p-4 p-sm-5">
                        <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                        <FormError v-if="showErrorMessage" :errorMessage="errorMessage"></FormError>
                        <form @submit.prevent="submitForm">
                            <div class="form-floating mb-3" required>
                                <input
                                    id="token-input"
                                    v-model="token"
                                    type="text"
                                    class="form-control" />
                                <label class="d-flex stroke" for="token-input">
                                    Mapboxgl Token
                                    <Info
                                        :infoText="'This token will be used for api calls to Mapboxgl'">
                                    </Info>
                                </label>
                            </div>
                            <div class="form-check mb-3">
                                <input
                                    v-model="rememberToken"
                                    class="form-check-input"
                                    type="checkbox"
                                    id="rememberPasswordCheck" />
                                <label class="form-check-label" for="rememberPasswordCheck">
                                    Remember password
                                </label>
                            </div>
                            <div class="d-grid">
                                <button
                                    class="btn btn-primary btn-login text-uppercase fw-bold"
                                    type="submit">
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/src/stores/auth/auth.store';
import FormError from '@/components/layouts/form-errors/form-error.vue';
import Info from '@/components/layouts/info/info.vue';
import router from '@/src/router';
import { IAuthToken } from '@/src/types/IAuthToken';

export default {
    components: {
        Info,
        FormError
    },
    setup() {
        const token = ref('');
        const showErrorMessage = ref(false);
        const errorMessage = ref('');
        const rememberToken = ref(false);
        const { setAuthToken } = useAuthStore();

        const loginRedirect = () => {
            router.push({ path: (router.currentRoute.value.query.redirect as string) ?? '/' });
        };

        const submitForm = () => {
            if (!token.value || token.value.length < 1) {
                showErrorMessage.value = true;
                errorMessage.value = 'Token is required in order to login.';
                return;
            }

            showErrorMessage.value = false;
            const authToken: IAuthToken = {
                token: token.value,
                remember: rememberToken.value
            };

            setAuthToken(authToken);
            loginRedirect();
        };

        return {
            token,
            showErrorMessage,
            errorMessage,
            rememberToken,
            submitForm
        };
    }
};
</script>
