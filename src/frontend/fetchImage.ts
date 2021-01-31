import { TextOptions } from '../shared/types';

export const fetchImage = async (
  textOptions: TextOptions,
): Promise<Response> => {
  return fetch('/image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(textOptions),
  });
};
