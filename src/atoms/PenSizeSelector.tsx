import React from 'react'

interface Props {
  value: number
  onChange: React.ChangeEventHandler<HTMLSelectElement>
}

export const PenSizeSelector: React.FC<Props> = ({ value, onChange }) => {
  const penSizeList = [10, 20, 40, 60, 80]
  return (
    <select value={value} onChange={onChange}>
      {penSizeList.map((d) => (
        <option value={d}>{d}</option>
      ))}
    </select>
  )
}
