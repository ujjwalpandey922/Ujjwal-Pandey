import aiImage from "data-base64:/assets/magic.png"
import React from "react"

export const AIButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div onClick={onClick} className="cursor-pointer rounded-full ">
      <img src={aiImage} alt="AI Icon" className="w-4 h-4" />
    </div>
  )
}
