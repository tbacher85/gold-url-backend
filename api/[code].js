// Simple storage - replace with database later
const links = {
  'demo': 'https://example.com',
  'test': 'https://google.com',
  'github': 'https://github.com'
};

export default async function handler(req, res) {
  const { code } = req.query;

  const targetUrl = links[code];

  if (targetUrl) {
    // Redirect to target URL
    res.redirect(302, targetUrl);
  } else {
    // Link not found - redirect to main site
    res.redirect(302, 'https://gold-url.com');
  }
}
