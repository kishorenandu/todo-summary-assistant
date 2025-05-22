const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function summarizeTodos(todos) {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error("OpenAI API Key is not configured.");
    }

    const todoTitles = todos.map(todo => `- ${todo.title}`).join('\n');
    const prompt = `Please summarize the following list of pending to-do items concisely and meaningfully. Focus on action items and overall themes:\n\n${todoTitles}\n\nSummary:`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Or another suitable model
            messages: [{ role: "user", content: prompt }],
            max_tokens: 150,
        });
        return completion.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error summarizing with LLM:', error.response ? error.response.data : error.message);
        throw new Error('Failed to summarize todos using LLM.');
    }
}

module.exports = { summarizeTodos };
