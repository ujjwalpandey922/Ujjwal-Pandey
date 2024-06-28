import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import { AIButton } from "~features/AIButton"
import { Modal } from "~features/Modal"

// Plasmo content script configuration
export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

// Function to create and return a style element with the imported CSS
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  // State to manage the modal's open/closed status
  const [isModalOpen, setModalOpen] = useState(false)

  // Dummy response text to be inserted into the message input
  const dummyResponse =
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."

  useEffect(() => {
    // Inject CSS into the document head
    const style = getStyle()
    document.head.appendChild(style)

    // Create a mutation observer to monitor changes in the DOM
    const observer = new MutationObserver(() => {
      const messageBox = document.querySelector(
        "div.msg-form__contenteditable"
      ) as HTMLElement

      if (messageBox) {
        // Check if the AI button container is already present
        if (!document.querySelector("#ai-icon-container")) {
          // Create and configure the AI button container
          const container = document.createElement("div")
          container.id = "ai-icon-container"
          container.style.display = "none"
          messageBox.style.position = "relative"
          messageBox.appendChild(container)

          // Render the AIButton component into the container
          const root = createRoot(container)
          root.render(<AIButton onClick={() => setModalOpen(true)} />)

          // Show the AI button container when the message box is focused
          messageBox.addEventListener("focus", () => {
            container.style.display = "block"
          })
          // Hide the AI button container when the message box loses focus
          messageBox.addEventListener("blur", () => {
            container.style.display = "none"
          })
        }
      }
    })

    // Observe changes in the body element and its descendants
    observer.observe(document.body, { childList: true, subtree: true })

    // Cleanup the observer when the component is unmounted
    return () => {
      observer.disconnect()
    }
  }, [])

  // Function to handle inserting the dummy response into the message input
  const handleInsert = () => {
    const messageInput = document.querySelector(
      "div.msg-form__msg-content-container div.msg-form__contenteditable"
    ) as HTMLElement
    if (messageInput) {
      messageInput.innerText = dummyResponse
    }
    setModalOpen(false) // Close the modal after inserting the response
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          onInsert={handleInsert}
          onInsertText={dummyResponse}
        />
      )}
    </>
  )
}

export default PlasmoOverlay
