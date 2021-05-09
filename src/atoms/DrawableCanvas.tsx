/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  width: number
  height: number
}

export const DrawableCanvas: React.FC<Props> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)

  const getContext = () => {
    const canvas = canvasRef.current
    return canvas?.getContext('2d')
  }

  const startDrawing = (x: number, y: number) => {
    setDrawing(true)
    const ctx = getContext()
    ctx?.moveTo(x, y)
    ctx?.lineTo(x, y)
    ctx?.stroke()
  }

  const draw = (x: number, y: number) => {
    if (!drawing) {
      return
    }
    const ctx = getContext()
    ctx?.lineTo(x, y)
    ctx?.stroke()
  }

  const endDrawing = () => {
    setDrawing(false)
  }

  // canvas default
  useEffect(() => {
    const ctx = getContext()
    if (ctx != null) {
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = 30
    }
  })

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={(e) =>
        startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      }
      onMouseUp={() => endDrawing()}
      onMouseLeave={() => endDrawing()}
      onMouseMove={(e) => draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
      css={css`
        position: absolute;
        top: 0;
        opacity: 0.5;
      `}
    />
  )
}