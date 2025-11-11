// Shared storage for links
let links = {
  'demo': 'https://example.com',
  'test': 'https://google.com',
  'github': 'https://github.com'
};

export function getLink(shortCode) {
  return links[shortCode];
}

export function setLink(shortCode, longUrl) {
  links[shortCode] = longUrl;
  return shortCode;
}

export function getAllLinks() {
  return links;
}
