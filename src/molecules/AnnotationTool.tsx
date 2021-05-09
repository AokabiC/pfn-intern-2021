/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DrawableCanvas } from 'DrawableCanvas'
import { FileInput } from 'FileInput'
import React, { useRef, useState } from 'react'

interface ImgData {
  file: File | null
  name: string
  imagePreviewUrl: string
}

export const AnnotationTool: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [uploadedImg, setUploadedImg] = useState<ImgData>({
    file: null,
    name: '',
    imagePreviewUrl: '',
  })
  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    let reader = new FileReader()
    const uploadedImgFile = fileInput.current?.files?.item(0)
    reader.onloadend = () => {
      setUploadedImg({
        file: uploadedImgFile ?? null,
        name: uploadedImgFile?.name ?? '',
        imagePreviewUrl: reader.result?.toString() ?? '',
      })
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
        <img
          src={uploadedImg.imagePreviewUrl}
          alt={uploadedImg.name}
          css={css`
            position: absolute;
            top: 0;
            user-select: none;
          `}
        />
        <DrawableCanvas />
      </div>
    </>
  )
}
