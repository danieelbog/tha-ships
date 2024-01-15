import { IFilter } from '@/src/types/IFilter';
import { getProperty } from '@/src/utils/objects/property-traversal';

export const sortArray = <I>(filter: IFilter, items: I[]): I[] => {
    if (!filter.selectedProperty || !filter.sortOrder) return items;

    items.sort((a, b) => {
        const aValue = getProperty(a, filter.selectedProperty as string);
        const bValue = getProperty(b, filter.selectedProperty as string);

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            if (filter.sortOrder === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        }

        if (filter.sortOrder === 'asc') {
            return aValue - bValue;
        } else {
            return bValue - aValue;
        }
    });

    return items;
};
