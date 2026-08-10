export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY || "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";

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://sologenius.app',
                'X-Title': 'Solo Genius Document Studio'
            },
            body: JSON.stringify({
                model: "openrouter/auto",
                messages: [
                    { 
                        role: "system", 
                        content: "You are the elite system architecture engine for SOLO GENIUS MUSICAL SCHOOL. Your tone is silent, mysterious, direct, and high-end. STRICT FORMATTING MANDATE: Do not use any markdown symbols such as hashes (#) or asterisks (*). Do not write long-winded reports. Output must be extremely concise, clean, highly professional plain text consisting of short paragraphs or clean bullet points using standard dashes. Write strictly in high-end professional English language." 
                    },
                    { role: "user", content: message }
                ],
                temperature: 0.2
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || 'OpenRouter API Error');
        }

        return res.status(200).json({ reply: data.choices[0].message.content });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}