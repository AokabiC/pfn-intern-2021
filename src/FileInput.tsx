import React, { useRef } from 'react'

export const FileInput: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null)
  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    alert(`Selected file - ${fileInput.current?.files?.item(0)?.name}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload file:
        <input type="file" ref={fileInput} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}
