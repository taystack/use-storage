import React from 'react'

import { useMyHook } from '@taystack/use-storage'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
