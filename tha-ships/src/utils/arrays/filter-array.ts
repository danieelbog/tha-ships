import { IFilter } from '../../types/IFilter';
import { getProperty } from '../objects/property-traversal';

export const getFilteredTextArray = <I>(filter: IFilter, items: I[]): I[] => {
    const searchValues = getSearchValuesFromSearchString(filter.searchValue.toString());
    return items.filter((item: I) => {
        const propertyValue = getProperty(item, filter.selectedProperty);
        switch (filter.selectedFilter) {
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

export const getFilteredNumericArray = <I>(filter: IFilter, items: I[]): I[] => {
    return items.filter((item: I) => {
        const propertyValue = getProperty(item, filter.selectedProperty);
        switch (filter.selectedFilter) {
            case 'eq':
                return propertyValue === filter.searchValue;
            case 'ne':
                return propertyValue !== filter.searchValue;
            case 'gt':
                return propertyValue > filter.searchValue;
            case 'lt':
                return propertyValue < filter.searchValue;
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
