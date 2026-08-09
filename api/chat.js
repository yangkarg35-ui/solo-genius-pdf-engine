export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Boss ရဲ့ API Key ကို Backend မှာ သိမ်းထားတာမို့ ပိုလုံခြုံသွားပါပြီ
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

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}