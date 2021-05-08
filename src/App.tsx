import { DrawableCanvas } from 'DrawableCanvas'
import { FileInput } from 'FileInput'
import React from 'react'

const App: React.FC = () => {
  return (
    <div>
      <FileInput />
      <DrawableCanvas />
    </div>
  )
}

export default App
