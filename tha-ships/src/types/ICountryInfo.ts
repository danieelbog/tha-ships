interface ICurrency {
    name: string;
    symbol: string;
}

interface ILanguage {
    official: string;
    common: string;
}

interface ITranslations {
    [key: string]: ILanguage;
}

interface IDemonyms {
    f: string;
    m: string;
}

interface IFlags {
    png: string;
    svg: string;
    alt: string;
}

interface IMaps {
    googleMaps: string;
    openStreetMaps: string;
}

interface ICapitalInfo {
    latlng: number[];
}

export interface ICountryInfo {
    name: {
        common: string;
        official: string;
        nativeName: { [key: string]: ILanguage };
    };
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    cioc: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: { [key: string]: ICurrency };
    idd: { root: string; suffixes: string[] };
    capital: string[];
    altSpellings: string[];
    region: string;
    subregion: string;
    languages: { [key: string]: string };
    translations: ITranslations;
    latlng: number[];
    landlocked: boolean;
    borders: string[];
    area: number;
    demonyms: IDemonyms;
    flag: string;
    maps: IMaps;
    population: number;
    gini: { [key: string]: number };
    fifa: string;
    car: { signs: string[]; side: string };
    timezones: string[];
    continents: string[];
    flags: IFlags;
    coatOfArms: { [key: string]: string };
    startOfWeek: string;
    capitalInfo: ICapitalInfo;
    postalCode: { format: string; regex: string };
}
