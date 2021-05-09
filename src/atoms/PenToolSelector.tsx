import React from 'react'

export type PenTools = 'pen' | 'eraser'

interface Props {
  value: PenTools
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const PenToolSelector: React.FC<Props> = ({ value, onChange }) => {
  const penToolList = ['pen', 'eraser']
  return (
    <>
      {penToolList.map((d) => (
        <label>
          <input
            type="radio"
            value={d}
            onChange={onChange}
            checked={value === d}
          />
          {d}
        </label>
      ))}
    </>
  )
}
