export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const API_KEY = "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";

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        
        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}