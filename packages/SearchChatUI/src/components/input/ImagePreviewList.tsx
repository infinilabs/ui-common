import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { useI18n } from "@/i18n/useI18n"

type PreviewItem = { file: File; url: string }

type ImagePreviewListProps = {
  images: PreviewItem[]
  onRemove: (url: string) => void
}

export default function ImagePreviewList({ images, onRemove }: ImagePreviewListProps) {
  const { t } = useI18n()

  if (images.length === 0) return null
  return (
    <div className="mb-3 flex flex-nowrap gap-2 justify-start overflow-x-auto">
      {images.map((img) => (
        <Dialog key={img.url}>
          <div className="group relative h-16 w-16 overflow-hidden rounded-md border">
            <DialogTrigger asChild>
              <button type="button" className="h-full w-full">
                <img src={img.url} alt={t("preview.alt")} className="h-full w-full object-cover" />
              </button>
            </DialogTrigger>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onRemove(img.url) }}
              className="absolute right-1 top-1 rounded-full bg-background/90 border shadow p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={t("image.remove")}
            >
              <X className="size-3" />
            </button>
          </div>
          <DialogContent showCloseButton>
            <img src={img.url} alt={t("preview.altLarge")} className="max-h-[80vh] w-auto object-contain" />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
