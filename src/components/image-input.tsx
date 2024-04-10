import Image from 'next/image'
import { useState, ChangeEvent, useMemo, useEffect } from 'react'

interface ImageInputProps {
  onFileSelected: (file: File) => void
  isSubmitted?: boolean
}

export function ImageInput({ onFileSelected, isSubmitted }: ImageInputProps) {
  const [imgFile, setImgFile] = useState<File | null>(null)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const selectedFiles = files[0]

    setImgFile(selectedFiles)
    onFileSelected(selectedFiles)
  }
  const previewURL = useMemo(() => {
    if (!imgFile) {
      return null
    }

    return URL.createObjectURL(imgFile)
  }, [imgFile])

  useEffect(() => {
    if (!isSubmitted) {
      return
    }

    setImgFile(null)
  }, [isSubmitted])

  return (
    <div>
      <label
        htmlFor="image"
        className="relative border border-zinc-800 flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-white/5"
      >
        {previewURL ? (
          <Image
            src={previewURL}
            className="absolute inset-0 w-full h-full rounded-md"
            alt=""
            width={150}
            height={150}
          />
        ) : (
          <>Selecione uma imagem</>
        )}
      </label>
      <input
        type="file"
        id="image"
        accept="image/jpeg,image/png"
        className="sr-only"
        onChange={handleFileSelected}
      />
    </div>
  )
}
