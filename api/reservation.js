// api/reservation.js
export default async function handler(req, res) {
  // 1. Headers CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 2. Preflight request handling
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 3. Parsing défensif du body (Vercel le passe parfois en string)
  let payload = req.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch (e) {
      console.error("Erreur parsing JSON body:", e);
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'TaxiResaApp/1.0' // Bonne pratique pour éviter certains blocages
      },
      body: JSON.stringify(payload),
    });

    // Tentative de parsing de la réponse N8N
    const textRes = await response.text();
    let jsonRes;
    try { 
      jsonRes = JSON.parse(textRes); 
    } catch { 
      jsonRes = { message: textRes }; 
    }

    // Si N8N renvoie une erreur (404, 500...), on renvoie ce code précis au front
    if (!response.ok) {
      console.error(`Erreur N8N (${response.status}):`, textRes);
      return res.status(response.status).json({ 
        error: 'Erreur N8N', 
        details: jsonRes 
      });
    }

    return res.status(200).json({ success: true, data: jsonRes });

  } catch (err) {
    console.error('Erreur interne fetch:', err);
    return res.status(500).json({ 
      error: 'Erreur interne serveur', 
      message: err.message 
    });
  }
}
