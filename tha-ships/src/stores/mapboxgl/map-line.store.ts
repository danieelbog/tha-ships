import { ShipData } from '@/src/types/IShipInfo';
import { generateColorBasedOnTimeUtc } from '@/src/utils/ui/color-generator';
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

                //https://docs.mapbox.com/mapbox-gl-js/example/animate-ant-path/
                addAnimatedDashLine(map, vesselId, record[0].received_time_utc);
            }
        });
    };

    const addAnimatedDashLine = (map: Map, vesselId: string, receivedTimeUtc: string) => {
        map.addLayer({
            id: `line-background-${vesselId}`,
            source: `route-${vesselId}`,
            type: 'line',
            paint: {
                'line-color': 'yellow',
                'line-width': 2,
                'line-opacity': 1
            }
        });

        map.addLayer({
            id: `line-dashed-${vesselId}`,
            source: `route-${vesselId}`,
            type: 'line',
            paint: {
                'line-color': generateColorBasedOnTimeUtc(receivedTimeUtc),
                'line-width': 2,
                'line-dasharray': [0, 4, 3]
            }
        });

        const dashArraySequence = [
            [0, 4, 3],
            [0.5, 4, 2.5],
            [1, 4, 2],
            [1.5, 4, 1.5],
            [2, 4, 1],
            [2.5, 4, 0.5],
            [3, 4, 0],
            [0, 0.5, 3, 3.5],
            [0, 1, 3, 3],
            [0, 1.5, 3, 2.5],
            [0, 2, 3, 2],
            [0, 2.5, 3, 1.5],
            [0, 3, 3, 1],
            [0, 3.5, 3, 0.5]
        ];

        animateDashArray(map, vesselId, dashArraySequence);
    };

    const animateDashArray = (map: Map, vesselId: string, dashArraySequence: number[][]) => {
        animate(map, vesselId, dashArraySequence, -1);
    };

    const animate = (map: Map, vesselId: string, dashArraySequence: number[][], step: number) => {
        const newStep = parseInt(((performance.now() / 550) % dashArraySequence.length) + '', 10);

        if (newStep !== step) {
            map.setPaintProperty(
                `line-dashed-${vesselId}`,
                'line-dasharray',
                dashArraySequence[newStep]
            );
        }

        requestAnimationFrame(() => animate(map, vesselId, dashArraySequence, newStep));
    };

    return { drawLines };
});
