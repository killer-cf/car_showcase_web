import Image from 'next/image'
import { useState, ChangeEvent, useMemo, useEffect } from 'react'

interface ImageInputProps {
  onFileSelected: (files: File[]) => void
  isSubmitted?: boolean
}

export function ImageInput({ onFileSelected, isSubmitted }: ImageInputProps) {
  const [imgFiles, setImgFiles] = useState<File[] | null>(null)

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    setImgFiles(Array.from(files))
    onFileSelected(Array.from(files))
  }
  const previewURLs = useMemo(() => {
    if (!imgFiles) {
      return null
    }

    return Array.from(imgFiles).map((file) => URL.createObjectURL(file))
  }, [imgFiles])

  useEffect(() => {
    if (!isSubmitted) {
      return
    }

    setImgFiles(null)
  }, [isSubmitted])

  return (
    <div>
      <label
        htmlFor="image"
        className="relative border border-zinc-800 flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-white/5"
      >
        {previewURLs ? (
          previewURLs.map((url, index) => (
            <Image
              key={index}
              src={url}
              className="absolute inset-0 w-full h-full rounded-md"
              alt=""
              width={150}
              height={150}
            />
          ))
        ) : (
          <>Selecione ate 5 imagens</>
        )}
      </label>
      <input
        type="file"
        id="image"
        accept="image/jpeg,image/png"
        className="sr-only"
        onChange={handleFileSelected}
        multiple
      />
    </div>
  )
}
