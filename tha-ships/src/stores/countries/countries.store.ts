import { ICountryInfo } from './../../types/ICountryInfo';
import { api } from '@/api/index';
import { defineStore } from 'pinia';

export const useCountriesStore = defineStore('countries', () => {
    const getCountries = async (): Promise<Array<ICountryInfo>> => {
        try {
            const response = await api.get('https://restcountries.com/v3.1/all');
            return response.data;
        } catch (error: any) {
            console.error('Error making API call:', error.message);
            throw error;
        }
    };

    return { getCountries };
});
