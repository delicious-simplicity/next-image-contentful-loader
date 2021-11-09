export const parseAspectRatio = (ar: string) => {
  if (!ar.includes(':')) {
    throw new Error('Syntax not recognized for aspect ratio argument (ex: 4:3, 16:9)');
  }

  const [w, h] = ar.split(':');
  return Number(h) / Number(w);
};
