export default function getHeroIdFromUrl(url: string) {
  const idString = url.replace(/.+\/(\d+)\/$/, '$1');

  if (!idString) {
    return url;
  }

  return Number.parseInt(idString, 10);
}