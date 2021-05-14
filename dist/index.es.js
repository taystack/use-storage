import { useState, useCallback } from 'react';

/**
 * Access parsed storage values with referential equality in React render bodies.
 * @argument key: string key of the storage item
 * @argument defaultValue: default value if storage item is missing
 * @argument down: function used to transform string into provided type T
 * @argument up: function used to transform provided type T into string for storage
 * @argument storage: Storage type one of
 * @returns tuple similar to useState
 * @use [value, setValue] = useStorageType<CustomType>('key', {}, stringToType, typeToString, localStorage)
 */
function useStorageType(key, defaultValue, down, up, storage) {
    if (storage === void 0) { storage = localStorage; }
    var _a = useState(function () {
        var val = storage.getItem(key);
        if (val)
            return down(val);
        return defaultValue;
    }), value = _a[0], setValue = _a[1];
    var handleChange = useCallback(function (nextValue) {
        setValue(nextValue);
        storage.setItem(key, up(nextValue));
    }, [key, setValue, up]);
    return [value, handleChange];
}
/**
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @argument down: function used to transform string into provided type T
 * @argument up: function used to transform provided type T into string for localStorage
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageType<CustomType>('key', {}, stringToType, typeToString)
 */
function useLocalStorageType(key, defaultValue, down, up) {
    return useStorageType(key, defaultValue, down, up, localStorage);
}
/**
 * @argument key: string key of the sessionStorage item
 * @argument defaultValue: default value if sessionStorage item is missing
 * @argument down: function used to transform string into provided type T
 * @argument up: function used to transform provided type T into string for sessionStorage
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageType<CustomType>('key', {}, stringToType, typeToString)
 */
function useSessionStorageType(key, defaultValue, down, up) {
    return useStorageType(key, defaultValue, down, up, sessionStorage);
}
/**
 * Shortcut to useLocalStorageType<string>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageString('key', 'foobar')
 */
function useLocalStorage(key, defaultValue) {
    return useLocalStorageType(key, defaultValue, identity, identity);
}
/**
 * Shortcut to useLocalStorageType<boolean>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageBoolean('key', false)
 */
function useLocalStorageBoolean(key, defaultValue) {
    return useLocalStorageType(key, defaultValue, downBoolean, upToString);
}
/**
 * Shortcut to useLocalStorageType<number>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageNumber('key', 0)
 */
function useLocalStorageNumber(key, defaultValue) {
    return useLocalStorageType(key, defaultValue, downNumber, upToString);
}
/**
 * Shortcut to useLocalStorageType<StorageRecord>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageRecord('key', { a: 'bar', b: 1, c: false, d: null, e: undefined })
  * @note For typescript users StorageRecord type is exposed.
 * Basic primitives and their array formats are supported here.
 */
function useLocalStorageRecord(key, defaultValue) {
    return useLocalStorageType(key, defaultValue, JSON.parse, JSON.stringify);
}
/**
 * Shortcut to useSessionStorageType<string>(...)
 * @argument key: string key of the sessionStorage item
 * @argument defaultValue: default value if sessionStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageString('key', 'foobar')
 */
function useSessionStorage(key, defaultValue) {
    return useSessionStorageType(key, defaultValue, identity, identity);
}
/**
 * Shortcut to useSessionStorageType<boolean>(...)
 * @argument key: string key of the sessionStorage item
 * @argument defaultValue: default value if sessionStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageBoolean('key', false)
 */
function useSessionStorageBoolean(key, defaultValue) {
    return useSessionStorageType(key, defaultValue, downBoolean, upToString);
}
/**
 * Shortcut to useSessionStorageType<number>(...)
 * @argument key: string key of the sessionStorage item
 * @argument defaultValue: default value if sessionStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageNumber('key', 0)
 */
function useSessionStorageNumber(key, defaultValue) {
    return useSessionStorageType(key, defaultValue, downNumber, upToString);
}
/**
 * Shortcut to useSessionStorageType<StorageRecord>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageRecord('key', { a: 'bar', b: 1, c: false, d: null, e: undefined })
 * @note For typescript users StorageRecord type is exposed.
 * Basic primitives and their array formats are supported here.
 */
function useSessionStorageRecord(key, defaultValue) {
    return useSessionStorageType(key, defaultValue, JSON.parse, JSON.stringify);
}
/**
 * Return whatever was passsed as a first argument.
 */
function identity(arg) { return arg; }
/**
 * Defines how string booleans are evaluated.
 */
function downBoolean(arg) { return arg === 'true'; }
/**
 * Defines how string numbers are evaluated.
 */
function downNumber(arg) { return parseInt(arg, 10); }
/**
 * Defines basic toString implementation for referential equality in hooks.
 */
function upToString(arg) { return arg.toString(); }

export default useStorageType;
export { identity, useLocalStorage, useLocalStorageBoolean, useLocalStorageNumber, useLocalStorageRecord, useLocalStorageType, useSessionStorage, useSessionStorageBoolean, useSessionStorageNumber, useSessionStorageRecord, useSessionStorageType };
//# sourceMappingURL=index.es.js.map
