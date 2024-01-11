import { api } from '@/api/index';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ICountryInfo } from '@/types/ICountryInfo';
import { IFilterApply } from '@/src/types/IFilter';
import {
    getFilteredCountriesNumeric,
    getFilteredCountriesText
} from '@/src/utils/arrays/filter-array';

export const useCountriesStore = defineStore('countries', () => {
    const initCountries = ref<ICountryInfo[]>([]);

    const getCountries = async (filter?: IFilterApply): Promise<ICountryInfo[]> => {
        try {
            if (!initCountries.value || initCountries.value.length == 0) {
                const response = await api.get('https://restcountries.com/v3.1/all');
                initCountries.value = response.data;
            }

            if (!filter?.selectedProperty || !filter?.selectedFilter || !filter?.searchValue) {
                return initCountries.value;
            }

            if (typeof filter.searchValue == 'number')
                return getFilteredCountriesNumeric(filter, initCountries.value);
            return getFilteredCountriesText(filter, initCountries.value);
        } catch (error: any) {
            console.error('Error making API call:', error.message);
            throw error;
        }
    };

    return { getCountries };
});
