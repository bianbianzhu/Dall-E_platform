import fileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants';
import ResponseError from '../constants/ResponseError';

// type check
export const isPlainObj = (value: unknown) =>
  typeof value === 'object' && value !== null && value?.constructor === Object;

export const getRandomPrompt = (lastPrompt: string): string => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === lastPrompt) {
    return getRandomPrompt(lastPrompt);
  }

  return randomPrompt;
};

export const captialize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// local file related utils
export const downloadImage = async (_id: string, imageUrl: string) => {
  return fileSaver.saveAs(imageUrl, `download-${_id}.jpg`);
};

// network related utils
export const fetchWrapper = async <T>(
  url: RequestInfo | URL,
  init?: RequestInit
): Promise<T> => {
  let initOptions = init;

  if (initOptions?.body) {
    if (isPlainObj(initOptions?.body) || Array.isArray(initOptions?.body)) {
      initOptions = {
        ...initOptions,
        headers: {
          'Content-Type': 'application/json',
          ...initOptions?.headers,
        },
        body: JSON.stringify(initOptions?.body),
      };
    }
  }

  const response = await fetch(url, initOptions);

  if (!response.ok) {
    throw new ResponseError('bad response', response);
  }

  const data: T = await response.json();

  return data;
};

export const fetchErrorHandler = (error: unknown) => {
  if (!(error instanceof ResponseError)) {
    return 'unknown non-fetch error';
  }

  switch (error?.response?.status) {
    case 400:
      return 'Bad request';
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Not found';
    case 500:
      return 'Internal server error';
    default:
      return 'Something went wrong';
  }
};
