import useStorageType, {
  identity,
  useLocalStorage,
  useLocalStorageBoolean,
  useLocalStorageNumber,
  useLocalStorageRecord,
  useSessionStorage,
  useSessionStorageBoolean,
  useSessionStorageNumber,
  useSessionStorageRecord,
} from './'
import { renderHook, act } from "@testing-library/react-hooks";

// TEST HELPERS
type CustomUser = {
  id: number,
  email: string,
  hasFlagOne: boolean,
  associations: Association[],
}
type Association = {
  id: number,
  name: string,
  email: string,
}
const associationOne: Association = {
  id: 2,
  name: 'associationOne',
  email: 'associationOne@bar.com',
}
const associationTwo: Association = {
  id: 3,
  name: 'associationTwo',
  email: 'associationTwo@bar.com',
}
const customUser: CustomUser = {
  id: 1,
  email: 'foo@bar.com',
  hasFlagOne: true,
  associations: [associationOne, associationTwo]
}
const associationMap = {
  2: associationOne,
  3: associationTwo,
}

function customUserUp(arg: CustomUser): string {
  const associationIds = (arg.associations || []).map(association => association.id)
  const transformed = {
    ...arg,
    associations: associationIds,
  }
  return JSON.stringify(transformed)
}

function customUserDown(arg: string): CustomUser {
  const minUser = JSON.parse(arg)
  const associations = minUser.associations.map((associationId: number) => associationMap[associationId])
  return {
    ...minUser,
    associations,
  }
}
// END TEST HELPERS

describe('use-storage', () => {
  afterAll(() => {
    localStorage.clear()
    sessionStorage.clear()
  })
  
  describe('default export', () => {
    it('will perform local storage operations as a hook', () => {
      const { result } = renderHook(() => useStorageType('ls_operation', '', identity, identity))
      act(() => {
        result.current[1]('foobar')
      })
      expect(result.current[0]).toEqual('foobar')
      expect(result.current[0]).toEqual(localStorage.getItem('ls_operation'))
    })

    it('will perform session storage operations as a hook', () => {
      const { result } = renderHook(() => useStorageType('ss_operation', '', identity, identity, sessionStorage))
      act(() => {
        result.current[1]('foobar')
      })
      expect(result.current[0]).toEqual('foobar')
      expect(result.current[0]).toEqual(sessionStorage.getItem('ss_operation'))
    })
    
    it('properly handles setting and getting a localStorage on custom types', () => {
      const { result } = renderHook(() => useStorageType<CustomUser>('ls_custom_type', customUser, customUserDown, customUserUp))
      let [value, setValue] = result.current
      expect(value).toEqual(customUser)
      expect(value.associations.length).toEqual(2)
      act(() => {
        setValue({
          ...customUser,
          associations: [associationOne],
        })
      })
      let [newValue] = result.current
      expect(newValue.associations.length).toEqual(1)
      expect(newValue.associations[0].name).toEqual('associationOne')
    })

    it('properly handles setting and getting a sessionStorage on custom types', () => {
      const { result } = renderHook(() => useStorageType<CustomUser>('ss_custom_type', customUser, customUserDown, customUserUp, sessionStorage))
      let [value, setValue] = result.current
      expect(value).toEqual(customUser)
      expect(value.associations.length).toEqual(2)
      act(() => {
        setValue({
          ...customUser,
          associations: [associationOne],
        })
      })
      let [newValue] = result.current
      expect(newValue.associations.length).toEqual(1)
      expect(newValue.associations[0].name).toEqual('associationOne')
    })
  })
  
  describe('useLocalStorage', () => {
    it('properly handles setting and getting a localStorage string', () => {
      const { result } = renderHook(() => useLocalStorage('ls_string', 'default string'))
      let [value, setValue] = result.current
      expect(value).toEqual('default string')
      act(() => { setValue('new value') })
      let [newValue] = result.current
      expect(newValue).toEqual('new value')
    })

    it('properly handles setting and getting a localStorage boolean', () => {
      const { result } = renderHook(() => useLocalStorageBoolean('ls_boolean', true))
      let [value, setValue] = result.current
      expect(value).toEqual(true)
      act(() => { setValue(false) })
      let [newValue] = result.current
      expect(newValue).toEqual(false)
    })

    it('properly handles setting and getting a localStorage number', () => {
      const { result } = renderHook(() => useLocalStorageNumber('ls_number', 1))
      let [value, setValue] = result.current
      expect(value).toEqual(1)
      act(() => { setValue(42) })
      let [newValue] = result.current
      expect(newValue).toEqual(42)
    })

    it('properly handles setting and getting a localStorage record', () => {
      const { result } = renderHook(() => useLocalStorageRecord('ls_record', {}))
      let [value, setValue] = result.current
      expect(value).toEqual({})
      act(() => { setValue({ a: [1, 2, 3] }) })
      let [newValue] = result.current
      expect(newValue).toEqual({ a: [1, 2, 3] })
    })
  })

  describe('useSessionStorage', () => {
    it('properly handles setting and getting a localStorage string', () => {
      const { result } = renderHook(() => useSessionStorage('ss_string', 'default string'))
      let [value, setValue] = result.current
      expect(value).toEqual('default string')
      act(() => { setValue('new value') })
      let [newValue] = result.current
      expect(newValue).toEqual('new value')
    })

    it('properly handles setting and getting a localStorage boolean', () => {
      const { result } = renderHook(() => useSessionStorageBoolean('ss_boolean', true))
      let [value, setValue] = result.current
      expect(value).toEqual(true)
      act(() => { setValue(false) })
      let [newValue] = result.current
      expect(newValue).toEqual(false)
    })

    it('properly handles setting and getting a localStorage number', () => {
      const { result } = renderHook(() => useSessionStorageNumber('ss_number', 1))
      let [value, setValue] = result.current
      expect(value).toEqual(1)
      act(() => { setValue(42) })
      let [newValue] = result.current
      expect(newValue).toEqual(42)
    })

    it('properly handles setting and getting a localStorage record', () => {
      const { result } = renderHook(() => useSessionStorageRecord('ss_record', {}))
      let [value, setValue] = result.current
      expect(value).toEqual({})
      act(() => { setValue({ a: [1, 2, 3] }) })
      let [newValue] = result.current
      expect(newValue).toEqual({ a: [1, 2, 3] })
    })
  })
})
