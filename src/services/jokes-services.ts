import axios from 'axios';
import constants from '../constants';
import { dateNameString } from '../utils';

export interface SuccessResponse {
  joke: string;
  id: string;
  image: string;
  date: string;
  categories: string[];
}

const getRandomJoke = async () => {
  return new Promise<SuccessResponse>((resolve, reject) => {
    axios
      .get(constants.RANDOM_JOKE)
      .then((res) => {
        const _updatedAt = new Date(res.data.updated_at);
        const _date = `${_updatedAt.getDay() + 1}${dateNameString(
          String(_updatedAt.getDay() + 1)
        )} ${_updatedAt.toLocaleString('default', {
          month: 'long',
        })} ${_updatedAt.getFullYear()}`;

        resolve({
          joke: res.data.value,
          id: res.data.id,
          image: res.data.icon_url,
          date: _date,
          categories: res.data.categories,
        });
      })
      .catch((err) => {
        reject({
          error: err,
        });
      });
  });
};

export default { getRandomJoke };
