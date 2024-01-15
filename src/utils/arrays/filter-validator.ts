import { IFilter } from '@/src/types/IFilter';

export enum ValidationStatus {
    Ok = 'Ok',
    SelectedProperty = 'selectedProperty',
    SelectedFilter = 'selectedFilter',
    SearchValue = 'searchValue'
}

export const validateFilterInputs = (filter: IFilter): ValidationStatus => {
    let status: ValidationStatus = ValidationStatus.Ok;

    if (filter.sortOrder) {
        if (filter.selectedProperty) {
            if (
                (!filter.selectedFilter && !filter.searchValue) ||
                (filter.selectedFilter && filter.searchValue)
            ) {
                status = ValidationStatus.Ok;
            } else if (filter.selectedFilter && !filter.searchValue) {
                status = ValidationStatus.SearchValue;
            } else if (!filter.selectedFilter && filter.searchValue) {
                status = ValidationStatus.SelectedFilter;
            }
        } else {
            status = ValidationStatus.SelectedProperty;
        }
    } else if (!filter.selectedProperty && (filter.selectedFilter || filter.searchValue)) {
        status = ValidationStatus.SelectedProperty;
    } else if (!filter.selectedFilter && (filter.searchValue || filter.selectedProperty)) {
        status = ValidationStatus.SelectedFilter;
    } else if (!filter.searchValue && (filter.selectedProperty || filter.selectedFilter)) {
        status = ValidationStatus.SearchValue;
    }

    return status;
};
