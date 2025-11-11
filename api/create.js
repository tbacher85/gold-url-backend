import { setLink } from './storage.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'Long URL is required' });
  }

  try {
    new URL(longUrl);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  // Generate short code
  const shortCode = generateShortCode();
  
  // ✅ FIX: Save to shared storage
  setLink(shortCode, longUrl);
  
  const link = {
    id: shortCode,
    longUrl,
    shortCode,
    clicks: 0,
    createdAt: new Date().toISOString()
  };

  res.status(200).json({
    success: true,
    shortUrl: `https://gold-url.com/${shortCode}`,
    ...link
  });
}

function generateShortCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
