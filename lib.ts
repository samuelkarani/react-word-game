import { API_KEY, FRENCH_WORDS } from './constants';

const randomNumber = (max: number): number => Math.floor(Math.random() * max);

const randomItem = <T>(array: T[]): T => array[randomNumber(array.length)];

function timeout(callback: () => void): void {
  setTimeout(callback, 0);
}

export async function fetchWord(): Promise<string> {
  return new Promise((resolve) => {
    timeout(() => {
      const word = randomItem(FRENCH_WORDS);
      resolve(word);
    });
  });
}

export async function translateWord(text: string): Promise<string> {
  let { error, data } = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({ q: text, target: 'en', source: 'fr' }),
    }
  ).then((res) => res.json());
  if (data) return data.translations[0].translatedText;
  return '';
}

export function showAlert(message: string): void {
  timeout(() => {
    alert(message);
  });
}
