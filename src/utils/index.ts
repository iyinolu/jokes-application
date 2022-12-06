export const dateNameString = (date: string) => {
  if (date.slice(-1) === '1') return 'st';
  if (date.slice(-1) === '2') return 'nd';
  if (date.slice(-1) === '3') return 'rd';
  return 'rd';
};

export const toAbsoluteUrl = (pathname: string) =>
  process.env.PUBLIC_URL + pathname;
