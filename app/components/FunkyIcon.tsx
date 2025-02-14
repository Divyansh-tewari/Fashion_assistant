import Image from "next/image"
import type React from "react"

export const FunkyIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bot%20logo-ouFOWWefZoajCkYGBFjeUxfHvX113K.png"
        alt="Fashion Assistant Logo"
        fill
        className="object-contain"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(27%) sepia(91%) saturate(1936%) hue-rotate(201deg) brightness(96%) contrast(101%)",
        }}
      />
    </div>
  )
}

