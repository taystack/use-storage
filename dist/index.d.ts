export declare type StorageShape = {
    setItem: (arg: string, val: string) => void;
    getItem: (arg: string) => string | null;
};
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
export default function useStorageType<T>(key: string, defaultValue: T, down: (arg: string) => T, up: (arg: T) => string, storage?: Storage | StorageShape): [T, (arg: T) => void];
/**
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @argument down: function used to transform string into provided type T
 * @argument up: function used to transform provided type T into string for localStorage
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageType<CustomType>('key', {}, stringToType, typeToString)
 */
export declare function useLocalStorageType<T>(key: string, defaultValue: T, down: (arg: string) => T, up: (arg: T) => string): [T, (arg: T) => void];
/**
 * @argument key: string key of the sessionStorage item
 * @argument defaultValue: default value if sessionStorage item is missing
 * @argument down: function used to transform string into provided type T
 * @argument up: function used to transform provided type T into string for sessionStorage
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageType<CustomType>('key', {}, stringToType, typeToString)
 */
export declare function useSessionStorageType<T>(key: string, defaultValue: T, down: (arg: string) => T, up: (arg: T) => string): [T, (arg: T) => void];
/**
 * Shortcut to useLocalStorageType<string>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageString('key', 'foobar')
 */
export declare function useLocalStorage(key: string, defaultValue: string): [string, (arg: string) => void];
/**
 * Shortcut to useLocalStorageType<boolean>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageBoolean('key', false)
 */
export declare function useLocalStorageBoolean(key: string, defaultValue: boolean): [boolean, (arg: boolean) => void];
/**
 * Shortcut to useLocalStorageType<number>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageNumber('key', 0)
 */
export declare function useLocalStorageNumber(key: string, defaultValue: number): [number, (arg: number) => void];
/**
 * Simple record storage.
 * @warning this can be easily abused. Only store the minimum amount of information here.
 */
export declare type StorageRecord = Record<string, string | string[] | number | number[] | boolean | boolean[] | null | undefined>;
/**
 * Shortcut to useLocalStorageType<StorageRecord>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageRecord('key', { a: 'bar', b: 1, c: false, d: null, e: undefined })
  * @note For typescript users StorageRecord type is exposed.
 * Basic primitives and their array formats are supported here.
 */
export declare function useLocalStorageRecord(key: string, defaultValue: StorageRecord): [StorageRecord, (arg: StorageRecord) => void];
/**
 * Shortcut to useSessionStorageType<string>(...)
 * @argument key: string key of the sessionStorage item
 * @argument defaultValue: default value if sessionStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageString('key', 'foobar')
 */
export declare function useSessionStorage(key: string, defaultValue: string): [string, (arg: string) => void];
/**
 * Shortcut to useSessionStorageType<boolean>(...)
 * @argument key: string key of the sessionStorage item
 * @argument defaultValue: default value if sessionStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageBoolean('key', false)
 */
export declare function useSessionStorageBoolean(key: string, defaultValue: boolean): [boolean, (arg: boolean) => void];
/**
 * Shortcut to useSessionStorageType<number>(...)
 * @argument key: string key of the sessionStorage item
 * @argument defaultValue: default value if sessionStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageNumber('key', 0)
 */
export declare function useSessionStorageNumber(key: string, defaultValue: number): [number, (arg: number) => void];
/**
 * Shortcut to useSessionStorageType<StorageRecord>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageRecord('key', { a: 'bar', b: 1, c: false, d: null, e: undefined })
 * @note For typescript users StorageRecord type is exposed.
 * Basic primitives and their array formats are supported here.
 */
export declare function useSessionStorageRecord(key: string, defaultValue: StorageRecord): [StorageRecord, (arg: StorageRecord) => void];
/**
 * Return whatever was passsed as a first argument.
 */
export declare function identity<T>(arg: T): T;
