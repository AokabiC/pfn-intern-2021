/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  width: number
  height: number
  imageData: ImageData | undefined
  penSize: number
  tool: 'pen' | 'eraser'
}

export const DrawableCanvas: React.FC<Props> = ({
  width,
  height,
  imageData,
  penSize,
  tool,
}) => {
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
  }

  const draw = (x: number, y: number) => {
    if (!drawing) {
      return
    }
    const ctx = getContext()
    let canvasData = ctx?.getImageData(
      x - penSize,
      y - penSize,
      penSize * 2 + 1,
      penSize * 2 + 1,
    )
    if (canvasData) {
      for (let nx = 0; nx <= 2 * penSize; nx++) {
        for (let ny = 0; ny <= 2 * penSize; ny++) {
          const pos = (ny * (penSize * 2 + 1) + nx) * 4
          const mx = x + nx - penSize
          const my = y + ny - penSize

          // ペン先(円)に含まれるか
          const distance = (x0: number, y0: number, x1: number, y1: number) =>
            Math.hypot(x1 - x0, y1 - y0)
          if (distance(x, y, mx, my) > penSize) continue

          // cursorが指すpixelとの色差が閾値以内か
          if (imageData) {
            const pointerImgPos = (y * width + x) * 4
            const pointerColor = imageData.data.slice(
              pointerImgPos,
              pointerImgPos + 4,
            )
            const imgPos = (my * width + mx) * 4
            const color = imageData.data.slice(imgPos, imgPos + 4)
            if (Math.abs(pointerColor[0] - color[0]) > 50) continue
            if (Math.abs(pointerColor[1] - color[1]) > 50) continue
            if (Math.abs(pointerColor[2] - color[2]) > 50) continue
          }

          switch (tool) {
            case 'pen':
              canvasData.data[pos] = 0
              canvasData.data[pos + 1] = 255
              canvasData.data[pos + 2] = 255
              canvasData.data[pos + 3] = 255
              break
            case 'eraser':
              canvasData.data[pos] = 0
              canvasData.data[pos + 1] = 0
              canvasData.data[pos + 2] = 0
              canvasData.data[pos + 3] = 0
              break
          }
        }
      }
      ctx?.putImageData(canvasData, x - penSize, y - penSize)
    }
  }

  const endDrawing = () => {
    setDrawing(false)
  }

  const handleDownload: React.MouseEventHandler<HTMLButtonElement> = () => {
    const canvas = canvasRef.current
    if (canvas == null) return
    let dataUrl = canvas.toDataURL()
    const a = document.createElement('a')
    a.download = 'annotation.png'
    a.href = dataUrl
    a.click()
  }

  // canvas default
  useEffect(() => {
    const ctx = getContext()
    if (ctx != null) {
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = 30
    }
  }, [height, width])

  return (
    <>
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
          cursor: crosshair;
          opacity: 0.5;
        `}
      />
      <button
        onClick={handleDownload}
        css={css`
          position: absolute;
        `}
      >
        ダウンロード
      </button>
    </>
  )
}
