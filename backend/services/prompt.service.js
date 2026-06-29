export const buildPrompt = (feature, data) => {
    const lang = data.language || 'the programming language'
    const code = data.code || 'No code provided'

    switch (feature) {
        case "hint":
            return `Problem: ${data.title}

Give ONE short hint (1-2 sentences max). No solution.`

        case "debug":
            return `Language: ${lang}
Code:
${code}

Find bugs. Be very brief. Max 3-4 sentences.`

        case "complexity":
            return `Language: ${lang}
Code:
${code}

State time and space complexity in this format only:
Time: O(?)
Space: O(?)
Why: (1 sentence)

Keep it under 50 words total.`

        case "explain":
            return `Language: ${lang}
Code:
${code}

Explain this code in 3-4 short sentences. Be concise.`

        case "pattern":
            return `Problem: ${data.title}
Description: ${data.description || ''}

Identify the DSA pattern needed to solve this problem.

Format:
Pattern: [Pattern Name]
Why: (1 short line explaining why this pattern fits)
Similar: [3 similar LeetCode problem names]

Keep under 50 words total.`

        default:
            return `Problem: ${data.title}\nCode: ${code}`
    }
}
