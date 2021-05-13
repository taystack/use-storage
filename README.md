# @taystack/use-storage

> Strong types for local storage access using react hooks.

[![NPM](https://img.shields.io/npm/v/@taystack/use-storage.svg)](https://www.npmjs.com/package/@taystack/use-storage) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @taystack/use-storage
```

## Usage

Similar to `React.useState`. All `use*Storage` methods apply

```tsx
import { useLocalStorageString } from '@taystack/use-storage'

function MyComponent() {
  const [value, setValue] = useLocalStorageString('my_store_key', 'default value')
  return (
    <div>My stored value {value}</div>
  )
}
```

## License

MIT © [taystack](https://github.com/taystack)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
