import React, { useRef, useState } from 'react'

interface ImgData {
  file: File | null
  name: string
  imagePreviewUrl: string
}

export const FileInput: React.FC = () => {
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
      <form onSubmit={handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={fileInput} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <img src={uploadedImg.imagePreviewUrl} alt={uploadedImg.name} />
    </>
  )
}
