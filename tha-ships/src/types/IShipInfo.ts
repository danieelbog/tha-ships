export type ShipData = Record<string, { [K: string]: string }[]>;

export interface IShipData {
    vessel_id: string;
    received_time_utc: string;
    latitude: string;
    longitude: string;
}
