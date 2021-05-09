/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DrawableCanvas } from 'atoms/DrawableCanvas'
import { FileInput } from 'atoms/FileInput'
import { ImgCanvas } from 'atoms/ImgCanvas'
import { PenSizeSelector } from 'atoms/PenSizeSelector'
import { PenTools, PenToolSelector } from 'atoms/PenToolSelector'
import React, { useRef, useState } from 'react'

interface ImgData {
  file: File | undefined
  name: string
  element: HTMLImageElement | undefined
  imagePreviewUrl: string
}

interface PenProperty {
  tool: PenTools
  size: number
}

export const AnnotationTool: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [uploadedImg, setUploadedImg] = useState<ImgData>({
    file: undefined,
    name: '',
    element: undefined,
    imagePreviewUrl: '',
  })
  const [imageData, setImageData] = useState<ImageData>()
  const [canvasDataUrl, setCanvasDataUrl] = useState<string>()
  const [penProperty, setPenProperty] = useState<PenProperty>({
    tool: 'pen',
    size: 40,
  })

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    let reader = new FileReader()
    const uploadedImgFile = fileInput.current?.files?.item(0)
    reader.onloadend = () => {
      const uploadedImgDataUrl = reader.result?.toString() ?? ''
      console.log(uploadedImgFile?.name)
      setUploadedImg((prev) => ({
        ...prev,
        file: uploadedImgFile ?? undefined,
        name: uploadedImgFile?.name ?? '',
        imagePreviewUrl: uploadedImgDataUrl,
      }))
      let img = new Image()
      img.src = uploadedImgDataUrl
      img.onload = () => {
        setUploadedImg((prev) => ({
          ...prev,
          element: img,
        }))
      }
    }
    if (uploadedImgFile != null) {
      reader.readAsDataURL(uploadedImgFile)
    }
  }

  const handleDownload: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (canvasDataUrl === undefined) return
    const a = document.createElement('a')
    a.download = uploadedImg.name + '.annotation.png'
    a.href = canvasDataUrl
    a.click()
  }

  const handlePenSizeChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e,
  ) => {
    setPenProperty((prev) => ({ ...prev, size: Number(e.target.value) }))
  }

  const handlePenToolChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setPenProperty((prev) => {
      return { ...prev, tool: e.target.value as PenTools }
    })
  }

  return (
    <>
      <FileInput ref={fileInput} onSubmit={handleSubmit} />
      <button onClick={handleDownload}>ダウンロード</button>
      <PenSizeSelector
        onChange={handlePenSizeChange}
        value={penProperty.size}
      />
      <PenToolSelector
        onChange={handlePenToolChange}
        value={penProperty.tool}
      />
      <div
        css={css`
          position: relative;
        `}
      >
        <ImgCanvas
          img={uploadedImg.element}
          setImageData={setImageData}
          width={uploadedImg.element?.width ?? 0}
          height={uploadedImg.element?.height ?? 0}
        />
        <DrawableCanvas
          width={uploadedImg.element?.width ?? 0}
          height={uploadedImg.element?.height ?? 0}
          imageData={imageData}
          setCanvasDataUrl={setCanvasDataUrl}
          penSize={penProperty.size}
          tool={penProperty.tool}
        />
      </div>
    </>
  )
}
