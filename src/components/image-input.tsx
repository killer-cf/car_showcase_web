import { Plus, X } from 'lucide-react'
import Image from 'next/image'
import { useState, ChangeEvent, useMemo, useEffect } from 'react'
import { Button } from './ui/button'

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

    const fileArray = Array.from(files)
    setImgFiles((prevFiles) => [...(prevFiles || []), ...fileArray])
  }

  function handleRemoveImage(index: number) {
    setImgFiles((prevFiles) =>
      prevFiles ? prevFiles.filter((_, i) => i !== index) : null,
    )
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

  useEffect(() => {
    onFileSelected(imgFiles || [])
  }, [imgFiles, onFileSelected])

  return (
    <div>
      <div className="grid grid-cols-5 items-center">
        {Array(previewURLs?.length || 0)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="relative w-24 h-20 border border-input">
              {previewURLs && (
                <>
                  <Image
                    src={previewURLs[index]}
                    className="w-full h-full rounded-md"
                    alt=""
                    width={80}
                    height={80}
                  />
                  <div className="absolute -top-2 -right-4">
                    <Button
                      variant="blank"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <X size={18} color="#990000" strokeWidth={3} />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        <label
          htmlFor="image"
          className="h-20 border border-input flex rounded-md cursor-pointer text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-white/5"
        >
          <Plus className="w-6 h-6" />
        </label>
      </div>
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
