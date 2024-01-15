import { mapFilterPropertyToCountryProperty } from './property-mapper';

//******************************************
// This is a dynamic property path traversal example
//-----------------------------------------
// Basic idea:
// We have an object with nested properties.
// We want to traverse the object based on a provided property path.
// Example object:
// const obj = {
//     capital: {
//         name: 'Athens',
//         otherName: 'Athina'
//     },
//     population: 1245
// };
//
// Example property path:
// const propertyPath = 'capital.name';
//
// Split the property path into individual keys:
// const keys = propertyPath.split('.');
//
// Initialize value to the root of the object:
// let value = obj;
//
// Traverse the object based on the keys:
// for (const key of keys) {
//     value = value[key];
// }
//
// After the traversal, value contains the desired property:
// console.log(value); // Outputs 'Athens'
//
//******************************************

export const getProperty = <O>(obj: O, path: string): any => {
    const propertyPath = mapFilterPropertyToCountryProperty(path);

    const keys = propertyPath.split('.');
    let value: any = obj;

    for (const key of keys) {
        //Check if Key Contains Array Index Syntax:
        const isArrayWithIndex = /\[\d+\]/.test(key);

        // If the key contains an array index, this block of code splits the key into
        // two parts: arrayKey (the name of the array) and index (the index
        // within the array). The split(/\[|\]/) part breaks the key at square
        // brackets, and filter(Boolean) removes any empty strings from the
        // resulting array.
        if (isArrayWithIndex) {
            //******************************************
            // Example key: 'capital[0]'
            //
            // Step 1: Splitting by '[' or ']'
            // const splitArray = key.split(/\[|\]/); // Results in ['', '0', '']
            // Explanation: Splits the string into an array where '[' or ']' occurs, resulting in ['', '0', ''].
            //
            // Step 2: Filtering out empty strings
            // const filteredArray = splitArray.filter(Boolean); // Results in ['0']
            // Explanation: Removes any empty strings from the array.
            //
            // Step 3: Destructuring the array into variables
            // const [arrayKey, index] = filteredArray; // Results in arrayKey = '0' and index = '0'
            // Explanation: Destructures the filtered array into two variables: arrayKey and index.
            //
            // Final result:
            // console.log(arrayKey); // Outputs '0'
            // console.log(index); // Outputs '0'
            //
            //******************************************
            const [arrayKey, index] = key.split(/\[|\]/).filter(Boolean);
            const array = (value as any)[arrayKey];

            if (Array.isArray(array) && array.length > parseInt(index)) {
                value = array[parseInt(index)];
            } else {
                value = undefined;
                break;
            }
        } else {
            value = (value as any)[key];
        }

        if (value === undefined) break;
    }

    return value;
};
