// api/reservation.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Use the server-side environment variable
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.error('N8N_WEBHOOK_URL manquante');
    return res.status(500).json({ error: 'Configuration serveur invalide' });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    let data = null;
    try { data = await response.json(); } catch {}

    if (!response.ok) {
      console.error('Erreur n8n', response.status, data);
      return res.status(500).json({ error: 'Erreur lors du traitement' });
    }

    return res.status(200).json(data || { ok: true });
  } catch (err) {
    console.error('Erreur connexion n8n', err);
    return res.status(500).json({ error: 'Erreur interne' });
  }
}