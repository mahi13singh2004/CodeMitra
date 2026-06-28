console.log("CodeMitra content script loaded")

function extractProblem() {
    const title = document.querySelector("[data-cy='question-title']")?.innerText || "No title found"

    const description = document.querySelector("[data-track-load='description_content']")?.innerText || ""

    const examplesElement = document.querySelector(".elfjS")
    const examples = examplesElement?.innerText || ""

    const constraintsElement = document.querySelector(".elfjS:last-of-type")
    const constraints = constraintsElement?.innerText || ""

    let code = ""
    try {
        if (window.monaco && window.monaco.editor) {
            const models = window.monaco.editor.getModels()
            if (models && models.length > 0) {
                code = models[0].getValue() || ""
            }
        }

        if (!code) {
            const codeEditor = document.querySelector(".view-lines")
            if (codeEditor) {
                code = codeEditor.innerText || ""
            }
        }
    } catch (e) {
        console.log("Could not extract code:", e)
    }

    const languageButton = document.querySelector("button[id^='headlessui-listbox-button']")
    const language = languageButton?.innerText?.trim() || "JavaScript"

    return {
        title,
        description,
        examples,
        constraints,
        code,
        language
    }
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    console.log("Message received:", request)

    if (request.type === "GET_PROBLEM") {
        try {
            const problem = extractProblem()
            console.log("Extracted problem:", problem)
            sendResponse({
                success: true,
                data: problem
            })
        } catch (error) {
            console.error("Error extracting problem:", error)
            sendResponse({
                success: false,
                error: error.message
            })
        }
    }
    return true
})
