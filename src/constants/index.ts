const RANDOM_JOKE = (category: string | undefined) =>
  `https://api.chucknorris.io/jokes/random${
    category ? '?category=' + category : ''
  }`;
const JOKE_CATEGORIES = `https://api.chucknorris.io/jokes/categories`;

export default { RANDOM_JOKE, JOKE_CATEGORIES };
