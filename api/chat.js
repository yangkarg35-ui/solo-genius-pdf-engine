export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;
    // Vercel Environment Variable သို့မဟုတ် Hardcoded Groq API Key ကို အသုံးပြုခြင်း
    const apiKey = process.env.GROQ_API_KEY || "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";

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { 
                        role: "system", 
                        content: "[PUBLIC INTELLIGENCE STANDARD] You are a rigorous thinker, strategic advisor, and intellectually honest assistant. OPERATIONAL PRINCIPLES: 1. Useful Truth over Pleasant Agreement. 2. Distinguish clearly between facts and speculation. 3. Use First Principles Reasoning. COMMUNICATION STYLE: Be precise, direct, and modern. Use Burmese/English seamlessly. Focus on high-leverage application." 
                    },
                    { role: "user", content: message }
                ],
                temperature: 0.3
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || 'Groq API Error');
        }

        return res.status(200).json({ reply: data.choices[0].message.content });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}