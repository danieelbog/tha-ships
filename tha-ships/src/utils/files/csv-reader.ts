export const readLocalCsv = async <T>(filePath: string): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', filePath, true);
            xhr.send();

            xhr.onload = function () {
                if (xhr.status === 200) {
                    const text = xhr.responseText;
                    const rows = text.split('\n').map((row) => row.split(','));

                    const headers = rows[0].map((header) => header.trim());
                    const data: T[] = rows.slice(1).map((row) => {
                        const rowData: T = {} as T;
                        row.forEach((value, index) => {
                            const key = headers[index] as keyof T;
                            rowData[key] = value.trim() as T[keyof T];
                        });
                        return rowData;
                    });

                    resolve(data);
                } else {
                    reject(new Error('Failed to read CSV file. Status: ' + xhr.status));
                }
            };

            xhr.onerror = function () {
                reject(new Error('Failed to read CSV file'));
            };
        } catch (error) {
            reject(new Error('Failed to read CSV file'));
        }
    });
};

export const readLocalCsvGrouped = async <T extends { [K: string]: string }>(
    filePath: string,
    groupIdName: string
): Promise<Record<string, T[]>> => {
    return new Promise((resolve, reject) => {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', filePath, true);
            xhr.send();

            xhr.onload = function () {
                if (xhr.status === 200) {
                    const text = xhr.responseText;
                    const rows = text.split('\n').map((row) => row.split(','));

                    const headers = rows[0].map((header) => header.trim());

                    const data: Record<string, T[]> = {};

                    rows.slice(1).forEach((row) => {
                        const rowData: T = {} as T;
                        row.forEach((value, index) => {
                            const key = headers[index] as keyof T;
                            rowData[key] = value.trim() as T[keyof T];
                        });

                        const keyValue = rowData[groupIdName];

                        if (!data[keyValue]) data[keyValue] = [];
                        data[keyValue].push(rowData);
                    });

                    resolve(data);
                } else {
                    reject(new Error('Failed to read CSV file. Status: ' + xhr.status));
                }
            };

            xhr.onerror = function () {
                reject(new Error('Failed to read CSV file'));
            };
        } catch (error) {
            reject(new Error('Failed to read CSV file'));
        }
    });
};
