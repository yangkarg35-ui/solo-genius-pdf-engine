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