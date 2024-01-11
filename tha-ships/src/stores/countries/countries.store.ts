import { api } from '@/api/index';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ICountryInfo } from '@/types/ICountryInfo';
import { IFilter } from '@/src/types/IFilter';
import { getFilteredNumericArray, getFilteredTextArray } from '@/src/utils/arrays/filter-array';

export const useCountriesStore = defineStore('countries', () => {
    const initCountries = ref<ICountryInfo[]>([]);

    const getCountries = async (filter?: IFilter): Promise<ICountryInfo[]> => {
        try {
            if (!initCountries.value || initCountries.value.length == 0) {
                const response = await api.get('https://restcountries.com/v3.1/all');
                initCountries.value = response.data;
            }

            if (!filter?.selectedProperty || !filter?.selectedFilter || !filter?.searchValue) {
                return initCountries.value;
            }

            if (typeof filter.searchValue == 'number')
                return getFilteredNumericArray(filter, initCountries.value);
            return getFilteredTextArray(filter, initCountries.value);
        } catch (error: any) {
            console.error('Error making API call:', error.message);
            throw error;
        }
    };

    return { getCountries };
});
