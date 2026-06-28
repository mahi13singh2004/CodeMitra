export const buildPrompt=(feature,data)=>{
    const prompt=`You are an expert data structure and algo mentor.
    Problem title:${data.title},
    Problem description:${data.description},
    Examples:${data.examples},
    constraints:${data.constraints},
    Programming language:${data.language},
    student code:${data.code}
    `
    switch(feature){
        case "hint":return `${prompt} Give only one HTMLInputElement, do not reveal the solution`

        case "debug": return `${prompt} Find logical mistakes in code and explain them, do not reveal the whole code`

        case "complexity": return `${prompt} Explain the time and space complexity of the code and suggest optimised solution if available`

        case "explain": return `${prompt} explain code in simple language`

        case "pattern": return `${prompt} identify the dsa pattern, explain why and retur similar 3 problems`

        default: return prompt
    }
}