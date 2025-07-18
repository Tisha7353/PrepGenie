export const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => `
You are an AI trained to generate technical interview questions and answers.

Task:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Write ${numberOfQuestions} interview questions.
- For each question, generate a detailed but beginner-friendly answer.
- If the answer needs a code example, add a small code block inside.
- Keep formatting very clean.
- Return a pure JSON array like:
[
  {
    "question": "Question here?",
    "answer": "Answer here."
  },
  ...
]
Important: Do NOT add any extra text. Only return valid JSON.
`;
export const conceptExplainPrompt = (question) => `
You are an AI tutor helping beginner developers understand interview concepts.

Task:
- Thoroughly explain the following interview question and its underlying concept:
  "${question}"
- The explanation should be easy to understand for a junior developer.
- Format the response in **Markdown** using:
  - Headings (##) for sections
  - Bullet points or numbered lists where needed
  - Bold, italics, and inline code snippets
  - Properly formatted code blocks if required
- Provide real-world analogies if applicable.
- Conclude with a short, clear **title** for the explanation.

Output format (in JSON):
{
  "title": "Short title here",
  "explanation": "Markdown-formatted explanation here"
}

Important: Only return valid JSON. Do NOT include any extra commentary or text.
`;
