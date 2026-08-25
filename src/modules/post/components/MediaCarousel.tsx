"use client"

import { useState, useRef, useCallback } from "react"
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, ImageIcon, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PostMedia } from "@/types/Post/post"

interface MediaCarouselProps {
  media: PostMedia[]
}

export function MediaCarousel({ media }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const currentMedia = media[currentIndex]
  const isVideo = currentMedia?.mimeType?.startsWith("video/")
  const totalMedia = media.length

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= totalMedia) return
    setIsPlaying(false)
    setCurrentIndex(index)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [totalMedia])

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
    setIsMuted(!isMuted)
  }, [isMuted])

  if (!media.length) {
    return (
      <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-400">No media attached</p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden shadow-sm border border-slate-100">
      {/* Main Viewer */}
      <div className="relative aspect-video bg-slate-900 group">
        {isVideo ? (
          <video
            ref={videoRef}
            src={currentMedia.url}
            className="w-full h-full object-contain"
            muted={isMuted}
            playsInline
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
          />
        ) : (
          <img
            src={currentMedia.url}
            alt={`Media ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
        )}

        {/* Overlay Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm"
            onClick={() => goTo(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm"
            onClick={() => goTo(currentIndex + 1)}
            disabled={currentIndex === totalMedia - 1}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Video Controls */}
        {isVideo && (
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-full bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-full bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <span className="text-xs text-white/80 font-medium ml-auto bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
              {currentMedia.mimeType.split("/")[1]?.toUpperCase()}
            </span>
          </div>
        )}

        {/* Counter Badge */}
        <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
          {currentIndex + 1} / {totalMedia}
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5">
          {isVideo ? <Film className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
          {isVideo ? "Video" : "Image"}
        </div>
      </div>

      {/* Thumbnails */}
      {totalMedia > 1 && (
        <div className="flex gap-2 p-3 glass-card overflow-x-auto">
          {media.map((item, idx) => {
            const itemIsVideo = item.mimeType?.startsWith("video/")
            const isActive = idx === currentIndex
            return (
              <button
                key={item.id}
                onClick={() => goTo(idx)}
                className={`relative flex-shrink-0 w-30 h-14 rounded-lg overflow-hidden border mx-3 p-1 transition-all duration-200 ${isActive
                  ? "ring-2 ring-primary ring-offset-2 scale-105"
                  : "opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
              >
                {itemIsVideo ? (
                  <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <Film className="h-5 w-5 text-slate-400" />
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
                {itemIsVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-1">
                      <Play className="h-3 w-3 text-white fill-white" />
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
