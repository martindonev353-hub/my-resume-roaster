// api/roast.js
import { OpenAI } from 'openai'; // Works perfectly with any standard OpenAI-compatible API endpoint

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { resumeText } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Cost-effective, lightning-fast processing
            messages: [
                {
                    role: "system",
                    content: "You are a cynical, tired tech recruiter. Split your response strictly into two distinct parts labeled '---ROAST---' and '---FIX---'. Be hilariously mean in the roast, but deeply tactical and metric-driven in the fix."
                },
                {
                    role: "user",
                    content: `Analyze this resume content:\n\n${resumeText}`
                }
            ],
            temperature: 0.8
        });

        const output = response.choices[0].message.content;
        return res.status(200).json({ rawOutput: output });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
