import { Plus, X } from 'lucide-react'
import Image from 'next/image'
import { useState, ChangeEvent, useMemo, useEffect } from 'react'
import { Button } from './ui/button'
import { toast } from 'react-toastify'

interface ImageInputProps {
  onFileSelected: (files: File[]) => void
  isSubmitted?: boolean
  limit?: number
}

export function ImageInput({
  onFileSelected,
  isSubmitted,
  limit = 1,
}: ImageInputProps) {
  const [imgFiles, setImgFiles] = useState<File[]>([])

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) {
      return
    }

    const fileArray = Array.from(files)

    const totalImages = (imgFiles?.length || 0) + fileArray.length

    if (totalImages > limit) {
      const plural = limit > 1 ? 'imagens' : 'imagem'
      toast.error(`Você só pode selecionar até ${limit} ${plural}.`)
      return
    }

    setImgFiles((prevFiles) => [...(prevFiles || []), ...fileArray])
  }

  function handleRemoveImage(index: number) {
    setImgFiles((prevFiles) =>
      prevFiles ? prevFiles.filter((_, i) => i !== index) : [],
    )
  }

  const previewURLs = useMemo(() => {
    if (!imgFiles) {
      return []
    }

    return Array.from(imgFiles).map((file) => URL.createObjectURL(file))
  }, [imgFiles])

  useEffect(() => {
    if (!isSubmitted) {
      return
    }

    setImgFiles([])
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
                    className="w-full h-full"
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
        {previewURLs.length < limit && (
          <label
            htmlFor="image"
            className="h-20 border border-input flex rounded-md cursor-pointer text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-white/5"
          >
            <Plus className="w-6 h-6" />
          </label>
        )}
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
