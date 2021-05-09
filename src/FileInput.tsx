import React from 'react'

type Props = React.HTMLProps<HTMLFormElement>

export const _FileInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  Props
> = (props, ref) => {
  return (
    <form {...props}>
      <label>
        Upload file:
        <input type="file" ref={ref} />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

export const FileInput = React.forwardRef(_FileInput)
