/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useRef } from 'react'

interface Props {
  width: number
  height: number
  setImageData: React.Dispatch<React.SetStateAction<ImageData | undefined>>
  img?: CanvasImageSource
}

export const ImgCanvas: React.FC<Props> = ({
  width,
  height,
  setImageData,
  img,
}) => {
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
      // pass ImageData to parent component
      setImageData(ctx?.getImageData(0, 0, width, height))
    }
  }, [height, img, setImageData, width])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      css={css`
        position: absolute;
        top: 0;
        cursor: none;
      `}
    />
  )
}
