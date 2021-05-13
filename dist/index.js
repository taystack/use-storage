'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function useStorageType(key, defaultValue, down, up, storage) {
    if (storage === void 0) { storage = localStorage; }
    var _a = react.useState(function () {
        var val = storage.getItem(key);
        if (val)
            return down(val);
        return defaultValue;
    }), value = _a[0], setValue = _a[1];
    var handleChange = react.useCallback(function (nextValue) {
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
    return useStorageType(key, defaultValue, down, up);
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
    return useLocalStorageType(key, defaultValue, function (arg) { return (arg === 'true'); }, function (arg) { return arg.toString(); });
}
/**
 * Shortcut to useLocalStorageType<number>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageNumber('key', 0)
 */
function useLocalStorageNumber(key, defaultValue) {
    return useLocalStorageType(key, defaultValue, function (arg) { return parseInt(arg, 10); }, function (arg) { return arg.toString(); });
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
    return useSessionStorageType(key, defaultValue, function (arg) { return (arg === 'true'); }, function (arg) { return arg.toString(); });
}
/**
 * Shortcut to useSessionStorageType<number>(...)
 * @argument key: string key of the sessionStorage item
 * @argument defaultValue: default value if sessionStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageNumber('key', 0)
 */
function useSessionStorageNumber(key, defaultValue) {
    return useSessionStorageType(key, defaultValue, function (arg) { return parseInt(arg, 10); }, function (arg) { return arg.toString(); });
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
function identity(arg) {
    return arg;
}

exports.default = useStorageType;
exports.useLocalStorage = useLocalStorage;
exports.useLocalStorageBoolean = useLocalStorageBoolean;
exports.useLocalStorageNumber = useLocalStorageNumber;
exports.useLocalStorageRecord = useLocalStorageRecord;
exports.useLocalStorageType = useLocalStorageType;
exports.useSessionStorage = useSessionStorage;
exports.useSessionStorageBoolean = useSessionStorageBoolean;
exports.useSessionStorageNumber = useSessionStorageNumber;
exports.useSessionStorageRecord = useSessionStorageRecord;
exports.useSessionStorageType = useSessionStorageType;
//# sourceMappingURL=index.js.map
