import generate from "data-base64:/assets/generate.png"
import insert from "data-base64:/assets/insert.png"
import regenerate from "data-base64:/assets/regenerate.png"
import React, { useState } from "react"

// Define the type for the Modal component props
type ModalProps = {
  onClose?: () => void
  onGenerate?: () => void
  onInsert?: () => void
  onInsertText?: string
}

// Modal component definition
export const Modal: React.FC<ModalProps> = ({
  onClose,
  onGenerate,
  onInsert,
  onInsertText
}) => {
  // State for managing the input command
  const [command, setCommand] = useState("")
  // State for managing the displayed response text
  const [displayedResponse, setDisplayedResponse] = useState("")
  // State to control the visibility of the response section
  const [isResponseVisible, setResponseVisible] = useState(false)
  // State to control the visibility of the buttons (Generate, Insert, Regenerate)
  const [isButtonsVisible, setButtonsVisible] = useState(false)

  // Function to handle the Generate button click
  const handleGenerate = () => {
    setCommand("") // Clear the command input
    setDisplayedResponse("") // Clear the displayed response
    setResponseVisible(true) // Show the response section
    setButtonsVisible(true) // Show the buttons

    // Simulate a typewriter effect for displaying the response text
    let currentCharIndex = -1
    const typeWriter = () => {
      if (currentCharIndex < onInsertText.length - 1) {
        setDisplayedResponse((prev) => prev + onInsertText[currentCharIndex])
        currentCharIndex += 1
        setTimeout(typeWriter, 50) // Adjust the speed of the typewriter effect here
      }
    }
    typeWriter()

    // Call the onGenerate prop function if provided
    if (onGenerate) {
      onGenerate()
    }
  }

  // Function to handle clicks outside the modal, to close it
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target.id === "modal-overlay") {
      if (onClose) {
        onClose()
      }
    }
  }

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleOutsideClick}>
      {/* INNER DIV COMPONENT AT CENTER  */}
      <div className="bg-white p-6 w-full max-w-3xl space-y-4 rounded-xl shadow-xl">
        {/* RESPONSE SECTION AFTER CLICKING GENERATE  */}
        {isResponseVisible && (
          <div className="w-full flex flex-col gap-4">
            <div className="self-end bg-[#DFE1E7] text-2xl p-4 px-6 rounded-xl text-[#666D80] w-max max-w-[80%]">
              Reply thanking for the opportunity
            </div>
            <div className="self-start bg-[#DBEAFE] text-2xl p-4 px-6 rounded-xl text-[#666D80] w-[80%]">
              {displayedResponse}
            </div>
          </div>
        )}
        {/* INPUT SECTION WITH BUTTONS  */}
        <div className="w-full space-y-4">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="w-full p-4 px-6 border text-2xl border-gray-200 text-gray-900 rounded-xl"
            placeholder="Your Prompt"
          />

          {/* BUTTONS SECTION  */}
          {isButtonsVisible ? (
            <div className="w-full flex justify-end gap-4 items-center">
              <button
                onClick={onInsert}
                className="bg-[#F9FAFB] text-2xl font-semibold border border-[#666D80] text-[#666D80] flex justify-center items-center gap-2 px-4 py-2 rounded-xl mr-2">
                <img src={insert} alt="Insert" className="w-4 h-4" />
                Insert
              </button>
              <button className="bg-[#3B82F6] text-white text-2xl font-semibold flex justify-center items-center gap-2 px-4 py-2 rounded-xl">
                <img src={regenerate} alt="Regenerate" className="w-4 h-4" />
                Regenerate
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-end gap-4 items-center">
              <button
                onClick={handleGenerate}
                className="bg-[#3B82F6] text-white text-2xl font-semibold flex justify-center items-center gap-2 px-4 py-2 rounded-xl">
                <img src={generate} alt="Generate" className="w-4 h-4" />
                Generate
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
