type SortPropertiesOptions = 'asc' | 'desc';
export const sortProperties: Record<SortPropertiesOptions, string> = {
    asc: 'Ascending',
    desc: 'Descending'
};

export interface IFilter {
    selectedProperty: FilterPropertiesOptions;
    selectedFilter: TextFilterOptions | NumberFilterOptions;
    searchValue: string | number;
    sortOrder?: SortPropertiesOptions;
}

type FilterPropertiesOptions =
    | 'common'
    | 'capital'
    | 'population'
    | 'borders'
    | 'region'
    | 'subregion'
    | 'flag';
export const filterProperties: Record<FilterPropertiesOptions, string> = {
    common: 'Name',
    capital: 'Capital',
    population: 'Population',
    borders: 'Borders',
    region: 'Region',
    subregion: 'Subregion',
    flag: 'Flag'
};

type NumberFilterOptions = 'eq' | 'ne' | 'gt' | 'lt';
export const numberFilterOptions: Record<NumberFilterOptions, string> = {
    eq: 'Is equal to',
    ne: 'Is not equal to',
    gt: 'Is greater than',
    lt: 'Is less than'
};

type TextFilterOptions = 'substringOf' | 'notSubstringOf' | 'eq' | 'ne' | 'startswith' | 'endswith';
export const textFilterOptions: Record<TextFilterOptions, string> = {
    substringOf: 'Contains',
    notSubstringOf: 'Does not Contain',
    eq: 'Is equal to',
    ne: 'Is not equal to',
    startswith: 'Starts with',
    endswith: 'Ends with'
};
