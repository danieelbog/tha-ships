import { api } from '@/api/index';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { ICountryInfo } from '@/types/ICountryInfo';
import { IFilterApply } from '@/src/types/IFilter';
import { getProperty } from '@/src/utils/property-traversal';

export const useCountriesStore = defineStore('countries', () => {
    const initCountries = ref<ICountryInfo[]>([]);

    const getCountries = async (filterApplyDto?: IFilterApply): Promise<ICountryInfo[]> => {
        try {
            if (!initCountries.value || initCountries.value.length == 0) {
                const response = await api.get('https://restcountries.com/v3.1/all');
                initCountries.value = response.data;
            }

            if (
                !filterApplyDto?.selectedProperty ||
                !filterApplyDto?.selectedFilter ||
                !filterApplyDto?.searchValue
            ) {
                return initCountries.value;
            }

            const searchValues: string[] = filterApplyDto.searchValue
                .toString()
                .split(',')
                .map((value) => value.trim());

            return initCountries.value.filter((countryInfo: ICountryInfo) => {
                const propertyValue = getProperty(countryInfo, filterApplyDto.selectedProperty);
                switch (filterApplyDto.selectedFilter) {
                    case 'eq':
                        return searchValues.some((searchVal) => {
                            console.log('propertyValue', typeof propertyValue);
                            // console.log('searchVal', searchVal);
                            console.log('eq', propertyValue === searchVal);

                            if (typeof searchVal === 'number')
                                return propertyValue === Number(searchVal);

                            return propertyValue === searchVal;
                        });
                    case 'ne':
                        return searchValues.every((searchVal) => propertyValue !== searchVal);
                    case 'gt':
                        return searchValues.every((searchVal) => propertyValue > searchVal);
                    case 'lt':
                        return searchValues.every((searchVal) => propertyValue < searchVal);
                    case 'substringOf':
                        return searchValues.some((searchVal) =>
                            String(propertyValue).includes(String(searchVal))
                        );
                    case 'notSubstringOf':
                        return searchValues.every(
                            (searchVal) => !String(propertyValue).includes(String(searchVal))
                        );
                    case 'startswith':
                        return searchValues.some((searchVal) =>
                            String(propertyValue).startsWith(String(searchVal))
                        );
                    case 'endswith':
                        return searchValues.some((searchVal) =>
                            String(propertyValue).endsWith(String(searchVal))
                        );
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
