<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card border-0 shadow rounded-3 my-5">
                    <div class="card-body p-4 p-sm-5">
                        <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                        <form @submit.prevent="submitForm">
                            <div v-if="showTokenSignIn" class="form-floating mb-3">
                                <input
                                    v-model="email"
                                    type="email"
                                    class="form-control"
                                    id="floatingInput"
                                    placeholder="name@example.com" />
                                <label for="floatingInput">Mapbox Token</label>
                            </div>
                            <div v-if="showNormalSignIn" class="form-floating mb-3">
                                <input
                                    v-model="email"
                                    type="email"
                                    class="form-control"
                                    id="floatingInput"
                                    placeholder="name@example.com" />
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div v-if="showNormalSignIn" class="form-floating mb-3">
                                <input
                                    v-model="password"
                                    type="password"
                                    class="form-control"
                                    id="floatingPassword"
                                    placeholder="Password" />
                                <label for="floatingPassword">Password</label>
                            </div>
                            <div v-if="showRememberPassword" class="form-check mb-3">
                                <input
                                    v-model="rememberPassword"
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
                            <hr v-if="showGoogleSignIn || showFacebookSignIn" class="my-4" />
                            <div v-if="showGoogleSignIn" class="d-grid mb-2">
                                <button
                                    class="btn btn-google btn-login text-uppercase fw-bold"
                                    type="button"
                                    @click="signInWithGoogle">
                                    Sign in with Google
                                </button>
                            </div>
                            <div v-if="showFacebookSignIn" class="d-grid">
                                <button
                                    class="btn btn-facebook btn-login text-uppercase fw-bold"
                                    type="button"
                                    @click="signInWithFacebook">
                                    Sign in with Facebook
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    props: {
        showTokenSignIn: {
            type: Boolean,
            default: true
        },
        showNormalSignIn: {
            type: Boolean,
            default: false
        },
        showGoogleSignIn: {
            type: Boolean,
            default: false
        },
        showFacebookSignIn: {
            type: Boolean,
            default: false
        },
        showRememberPassword: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const email = ref('');
        const password = ref('');
        const rememberPassword = ref(false);

        const submitForm = () => {
            // Handle form submission
            console.log('Form submitted:', {
                email: email.value,
                password: password.value,
                rememberPassword: rememberPassword.value
            });
        };

        const signInWithGoogle = () => {
            // Handle Google sign-in
            console.log('Sign in with Google');
        };

        const signInWithFacebook = () => {
            // Handle Facebook sign-in
            console.log('Sign in with Facebook');
        };

        return {
            email,
            password,
            rememberPassword,
            submitForm,
            signInWithGoogle,
            signInWithFacebook
        };
    }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
