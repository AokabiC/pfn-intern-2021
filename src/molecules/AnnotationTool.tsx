/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DrawableCanvas } from 'atoms/DrawableCanvas'
import { FileInput } from 'atoms/FileInput'
import { ImgCanvas } from 'atoms/ImgCanvas'
import React, { useRef, useState } from 'react'

interface ImgData {
  file: File | undefined
  name: string
  element: HTMLImageElement | undefined
  imagePreviewUrl: string
}

export const AnnotationTool: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [uploadedImg, setUploadedImg] = useState<ImgData>({
    file: undefined,
    name: '',
    element: undefined,
    imagePreviewUrl: '',
  })

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    let reader = new FileReader()
    const uploadedImgFile = fileInput.current?.files?.item(0)
    reader.onloadend = () => {
      const uploadedImgDataUrl = reader.result?.toString() ?? ''
      setUploadedImg({
        ...uploadedImg,
        file: uploadedImgFile ?? undefined,
        name: uploadedImgFile?.name ?? '',
        imagePreviewUrl: uploadedImgDataUrl,
      })
      let img = new Image()
      img.src = uploadedImgDataUrl
      img.onload = () => {
        setUploadedImg({
          ...uploadedImg,
          element: img,
        })
      }
    }
    if (uploadedImgFile != null) {
      reader.readAsDataURL(uploadedImgFile)
    }
  }

  return (
    <>
      <FileInput ref={fileInput} onSubmit={handleSubmit} />
      <div
        css={css`
          position: relative;
        `}
      >
        <ImgCanvas
          img={uploadedImg.element}
          width={uploadedImg.element?.width ?? 0}
          height={uploadedImg.element?.height ?? 0}
        />
        <DrawableCanvas
          width={uploadedImg.element?.width ?? 0}
          height={uploadedImg.element?.height ?? 0}
        />
      </div>
    </>
  )
}
