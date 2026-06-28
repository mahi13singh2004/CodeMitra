export function extractProblem() {
    const title = document.querySelector("[data-cy='question-title']")?.innerText || ""

    const description = document.querySelector("[data-track-load='description_content']")?.innerText || ""

    const examplesElement = document.querySelector(".elfjS")
    const examples = examplesElement?.innerText || ""

    const constraintsElement = document.querySelector(".elfjS:last-of-type")
    const constraints = constraintsElement?.innerText || ""

    const codeEditor = document.querySelector(".monaco-editor")
    const code = codeEditor ? window.monaco?.editor?.getModels()[0]?.getValue() || "" : ""

    const languageButton = document.querySelector("button[id^='headlessui-listbox-button']")
    const language = languageButton?.innerText || "JavaScript"

    return {
        title,
        description,
        examples,
        constraints,
        code,
        language
    }
}
