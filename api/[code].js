// Simple storage - replace with database later
const links = {
  'demo': 'https://example.com',
  'test': 'https://google.com',
  'github': 'https://github.com'
};

export default async function handler(req, res) {
  const { code } = req.query;

  // Set CORS headers for API consistency
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests for redirects
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const targetUrl = links[code];

  if (targetUrl) {
    // Redirect to target URL
    res.redirect(302, targetUrl);
  } else {
    // Link not found - redirect to main site
    res.redirect(302, 'https://gold-url.com');
  }
}
