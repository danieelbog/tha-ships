import { api } from '@/api/index';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ICountryInfo } from '@/types/ICountryInfo';
import { IFilterApply } from '@/src/types/IFilter';
import { getProperty } from '@/src/utils/property-traversal';

export const useCountriesStore = defineStore('countries', () => {
    const initCountries = ref([] as ICountryInfo[]);

    const getCountries = async (filterApplyDto?: IFilterApply): Promise<ICountryInfo[]> => {
        try {
            if (initCountries.value.length > 0) return initCountries.value;

            const response = await api.get('https://restcountries.com/v3.1/all');
            initCountries.value = response.data;

            if (
                !filterApplyDto?.selectedProperty ||
                !filterApplyDto?.selectedFilter ||
                filterApplyDto?.searchValue === undefined
            ) {
                return initCountries.value;
            }

            return initCountries.value.filter((countryInfo: ICountryInfo) => {
                const propertyValue = getProperty(countryInfo, filterApplyDto.selectedProperty);
                switch (filterApplyDto.selectedFilter) {
                    case 'eq':
                        return propertyValue === filterApplyDto.searchValue;
                    case 'ne':
                        return propertyValue !== filterApplyDto.searchValue;
                    case 'gt':
                        return propertyValue > filterApplyDto.searchValue;
                    case 'lt':
                        return propertyValue < filterApplyDto.searchValue;
                    case 'substringOf':
                        return String(propertyValue).includes(String(filterApplyDto.searchValue));
                    case 'notSubstringOf':
                        return !String(propertyValue).includes(String(filterApplyDto.searchValue));
                    case 'startswith':
                        return String(propertyValue).startsWith(String(filterApplyDto.searchValue));
                    case 'endswith':
                        return String(propertyValue).endsWith(String(filterApplyDto.searchValue));
                    default:
                        return false;
                }
            });
        } catch (error: any) {
            console.error('Error making API call:', error.message);
            throw error;
        }
    };

    return { getCountries };
});
