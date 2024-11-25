/**
 * Picks specified keys from an object
 * @param {object} object - The source object to pick properties from
 * @param {string[]} keys - Array of keys to pick from the source object
 * @returns {object} - A new object containing only the specified keys
 */
const pick = (object: any, keys: string[]) => {
  return keys.reduce((obj: any, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key]; // Add the key-value pair if it exists in the source object
    }
    return obj;
  }, {});
};

export default pick;
