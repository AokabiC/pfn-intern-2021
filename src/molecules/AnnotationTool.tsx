/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DrawableCanvas } from 'atoms/DrawableCanvas'
import { FileInput } from 'atoms/FileInput'
import React, { useEffect, useRef, useState } from 'react'

interface ImgData {
  file: File | null
  name: string
  width: number
  height: number
  imagePreviewUrl: string
}

export const AnnotationTool: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [uploadedImg, setUploadedImg] = useState<ImgData>({
    file: null,
    name: '',
    width: 0,
    height: 0,
    imagePreviewUrl: '',
  })

  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    let reader = new FileReader()
    const uploadedImgFile = fileInput.current?.files?.item(0)
    reader.onloadend = () => {
      setUploadedImg({
        ...uploadedImg,
        file: uploadedImgFile ?? null,
        name: uploadedImgFile?.name ?? '',
        imagePreviewUrl: reader.result?.toString() ?? '',
      })
    }
    if (uploadedImgFile != null) {
      reader.readAsDataURL(uploadedImgFile)
    }
  }

  useEffect(() => {
    // get image size
    let img = new Image()
    img.src = uploadedImg.imagePreviewUrl
    img.onload = () => {
      setUploadedImg({ ...uploadedImg, width: img.width, height: img.height })
    }
  })

  return (
    <>
      <FileInput ref={fileInput} onSubmit={handleSubmit} />
      <div
        css={css`
          position: relative;
        `}
      >
        <img
          src={uploadedImg.imagePreviewUrl}
          alt={uploadedImg.name}
          width={uploadedImg.width}
          height={uploadedImg.height}
          css={css`
            position: absolute;
            top: 0;
            user-select: none;
          `}
        />
        <DrawableCanvas width={uploadedImg.width} height={uploadedImg.height} />
      </div>
    </>
  )
}
