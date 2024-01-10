export const mapFilterPropertyToCountryProperty = (filterProperty: string): string => {
    const propertyMappings: Record<string, string> = {
        common: 'name.common',
        capital: 'capital[0]',
        population: 'population',
        borders: 'borders[0]',
        region: 'region',
        subregion: 'subregion',
        flag: 'flag'
    };

    return propertyMappings[filterProperty] || filterProperty;
};
