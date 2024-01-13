import { ShipData } from '@/src/types/IShipInfo';
import { Map } from 'mapbox-gl';
import { defineStore } from 'pinia';

export const useLineStore = defineStore('mapline', () => {
    const drawLines = (map: Map, shipData: ShipData) => {
        Object.entries(shipData).forEach(([vesselId, record]) => {
            if (record[0]?.longitude && record[0]?.latitude) {
                const coordinates: number[][] = [];

                record.forEach((data) => {
                    if (data.longitude && data.latitude) {
                        coordinates.push([parseFloat(data.longitude), parseFloat(data.latitude)]);
                    }
                });

                map.addSource(`route-${vesselId}`, {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coordinates
                        }
                    }
                });

                map.addLayer({
                    id: `route-${vesselId}`,
                    type: 'line',
                    source: `route-${vesselId}`,
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': `#588`,
                        'line-width': 1
                    }
                });
            }
        });
    };

    return { drawLines };
});
