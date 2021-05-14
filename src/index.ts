import { useState, useCallback } from 'react';

export type StorageShape = {
  setItem: (arg: string, val: string) => void,
  getItem: (arg: string) => string | null
}

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
export default function useStorageType<T>(
  key: string,
  defaultValue: T,
  down: (arg: string) => T,
  up: (arg: T) => string,
  storage: Storage | StorageShape = localStorage
): [T, (arg: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const val = storage.getItem(key)
    if (val) return down(val)
    return defaultValue
  })

  const handleChange = useCallback((nextValue: T): void => {
    setValue(nextValue)
    storage.setItem(key, up(nextValue))
  }, [key, setValue, up])

  return [value, handleChange]
}

/**
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @argument down: function used to transform string into provided type T
 * @argument up: function used to transform provided type T into string for localStorage
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageType<CustomType>('key', {}, stringToType, typeToString)
 */
export function useLocalStorageType<T>(
  key: string,
  defaultValue: T,
  down: (arg: string) => T,
  up: (arg: T) => string,
): [T, (arg: T) => void] {
  return useStorageType<T>(key, defaultValue, down, up, localStorage)
}

/**
 * @argument key: string key of the sessionStorage item
 * @argument defaultValue: default value if sessionStorage item is missing
 * @argument down: function used to transform string into provided type T
 * @argument up: function used to transform provided type T into string for sessionStorage
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageType<CustomType>('key', {}, stringToType, typeToString)
 */
export function useSessionStorageType<T>(
  key: string,
  defaultValue: T,
  down: (arg: string) => T,
  up: (arg: T) => string,
): [T, (arg: T) => void] {
  return useStorageType<T>(key, defaultValue, down, up, sessionStorage)
}

/**
 * Shortcut to useLocalStorageType<string>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageString('key', 'foobar')
 */
export function useLocalStorage(key: string, defaultValue: string): [string, (arg: string) => void] {
  return useLocalStorageType<string>(key, defaultValue, identity, identity)
}

/**
 * Shortcut to useLocalStorageType<boolean>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageBoolean('key', false)
 */
export function useLocalStorageBoolean(key: string, defaultValue: boolean): [boolean, (arg: boolean) => void] {
  return useLocalStorageType<boolean>(key, defaultValue, downBoolean, upToString)
}

/**
 * Shortcut to useLocalStorageType<number>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageNumber('key', 0)
 */
export function useLocalStorageNumber(key: string, defaultValue: number): [number, (arg: number) => void] {
  return useLocalStorageType<number>(key, defaultValue, downNumber, upToString)
}

/**
 * Simple record storage.
 * @warning this can be easily abused. Only store the minimum amount of information here.
 */
export type StorageRecord = Record<string, string | string[] | number | number[] | boolean | boolean[] | null | undefined>
/**
 * Shortcut to useLocalStorageType<StorageRecord>(...)
 * @argument key: string key of the localStorage item
 * @argument defaultValue: default value if localStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useLocalStorageRecord('key', { a: 'bar', b: 1, c: false, d: null, e: undefined })
  * @note For typescript users StorageRecord type is exposed.
 * Basic primitives and their array formats are supported here.
 */
export function useLocalStorageRecord(
  key: string,
  defaultValue: StorageRecord
): [
  StorageRecord,
  (arg: StorageRecord) => void
] {
  return useLocalStorageType<StorageRecord>(key, defaultValue, JSON.parse, JSON.stringify)
}

/**
 * Shortcut to useSessionStorageType<string>(...)
 * @argument key: string key of the sessionStorage item
 * @argument defaultValue: default value if sessionStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageString('key', 'foobar')
 */
export function useSessionStorage(key: string, defaultValue: string): [string, (arg: string) => void] {
  return useSessionStorageType<string>(key, defaultValue, identity, identity)
}

/**
 * Shortcut to useSessionStorageType<boolean>(...)
 * @argument key: string key of the sessionStorage item
 * @argument defaultValue: default value if sessionStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageBoolean('key', false)
 */
export function useSessionStorageBoolean(key: string, defaultValue: boolean): [boolean, (arg: boolean) => void] {
  return useSessionStorageType<boolean>(key, defaultValue, downBoolean, upToString)
}

/**
 * Shortcut to useSessionStorageType<number>(...)
 * @argument key: string key of the sessionStorage item
 * @argument defaultValue: default value if sessionStorage item is missing
 * @returns tuple similar to useState
 * @use [value, setValue] = useSessionStorageNumber('key', 0)
 */
export function useSessionStorageNumber(key: string, defaultValue: number): [number, (arg: number) => void] {
  return useSessionStorageType<number>(key, defaultValue, downNumber, upToString)
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
export function useSessionStorageRecord(
  key: string,
  defaultValue: StorageRecord
): [
    StorageRecord,
    (arg: StorageRecord) => void
  ] {
  return useSessionStorageType<StorageRecord>(key, defaultValue, JSON.parse, JSON.stringify)
}

/**
 * Return whatever was passsed as a first argument.
 */
export function identity<T>(arg: T): T { return arg }

/**
 * Defines how string booleans are evaluated.
 */
function downBoolean(arg: string): boolean { return arg === 'true' }

/**
 * Defines how string numbers are evaluated.
 */
function downNumber(arg: string): number { return parseInt(arg, 10) }

/**
 * Defines basic toString implementation for referential equality in hooks.
 */
function upToString(arg: boolean | number): string { return arg.toString() }
