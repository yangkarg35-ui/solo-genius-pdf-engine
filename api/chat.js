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
                model: "openrouter/auto", // ရနိုင်သမျှ AI Model ထဲမှ အကောင်းဆုံးတစ်ခုက အလိုအလျောက် ဝင်ဖြေပေးမည်
                messages: [
                    { 
                        role: "system", 
                        content: "You are an elite, high-end technical system for Solo Genius Document Studio. Be extremely direct, concise, and professional. No fluff, no storytelling. CRITICAL RULE: Regardless of the language used in the input notes, you must write the entire output strictly in professional English language. Format and elevate student evidence into high-end academic/musical English reports." 
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