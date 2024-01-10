import { ICountryInfo } from '@/types/ICountryInfo';
import { api } from '@/api/index';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCountriesStore = defineStore('countries', () => {
    const initCountries = ref([] as ICountryInfo[]);

    const getInitCountries = async (): Promise<ICountryInfo[]> => {
        try {
            if (initCountries.value && initCountries.value.length > 0) return initCountries.value;

            const response = await api.get('https://restcountries.com/v3.1/all');
            initCountries.value = response.data;

            return initCountries.value;
        } catch (error: any) {
            console.error('Error making API call:', error.message);
            throw error;
        }
    };

    return { getInitCountries };
});
