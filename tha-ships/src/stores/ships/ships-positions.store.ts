import { ShipData } from '@/src/types/IShipInfo';
import { readLocalCsvGrouped } from '@/src/utils/files/csv-reader';
import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';

export const useShipPositionsStore = defineStore('shippositions', () => {
    const shipData: Ref<ShipData> = ref({});

    const getShipData = async (): Promise<ShipData> => {
        const hasValues = Object.values(shipData.value).some((array) => array.length > 0);
        if (hasValues) return shipData.value;

        const filePath = '../../../ship-data/data-fs-exercise.csv';
        shipData.value = await readLocalCsvGrouped(filePath, 'vessel_id');
        return shipData.value;
    };

    return { getShipData };
});
