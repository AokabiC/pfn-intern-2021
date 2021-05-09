/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useRef } from 'react'

interface Props {
  width: number
  height: number
  img?: CanvasImageSource
}

export const ImgCanvas: React.FC<Props> = ({ width, height, img }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getContext = () => {
    const canvas = canvasRef.current
    return canvas?.getContext('2d')
  }

  // load image
  useEffect(() => {
    const ctx = getContext()
    if (img) {
      ctx?.clearRect(0, 0, width, height)
      ctx?.drawImage(img, 0, 0)
    }
  })

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      css={css`
        position: absolute;
        top: 0;
      `}
    />
  )
}
