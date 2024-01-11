import { ICountryInfo } from '../types/ICountryInfo';
import { IFilterApply } from './../types/IFilter';
import { getProperty } from './property-traversal';

export const getFilteredCountriesText = (
    filterApplyDto: IFilterApply,
    countries: ICountryInfo[]
): ICountryInfo[] => {
    const searchValues = getSearchValuesFromSearchString(filterApplyDto.searchValue.toString());
    return countries.filter((countryInfo: ICountryInfo) => {
        const propertyValue = getProperty(countryInfo, filterApplyDto.selectedProperty);
        switch (filterApplyDto.selectedFilter) {
            case 'eq':
                return searchValues.some((searchVal) => propertyValue === searchVal);
            case 'ne':
                return searchValues.every((searchVal) => propertyValue !== searchVal);
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
};

export const getFilteredCountriesNumeric = (
    filterApplyDto: IFilterApply,
    countries: ICountryInfo[]
): ICountryInfo[] => {
    return countries.filter((countryInfo: ICountryInfo) => {
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
            default:
                return false;
        }
    });
};

const getSearchValuesFromSearchString = (searchValue: string): string[] => {
    return searchValue
        .toString()
        .split(',')
        .map((value) => value.trim());
};
