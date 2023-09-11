import { Dispatch } from 'react';

export function clean(
  regex: RegExp,
  length: number,
  inputValue: string,
  setter: Dispatch<React.SetStateAction<string[]>>
) {
  const match = inputValue.match(regex);
  let check = false;
  if (match) {
    const text = match[0];
    const data = text.substring(length).split(',');
    setter(data);
    check = true;
  } else {
    setter([]);
  }
  return check;
}

export function isIncludedCaseInsensitive(arr: string[], str: string) {
  if (!arr.length) return false;
  return arr.some((element: string) =>
    str.toLocaleLowerCase().trim().includes(element.toLocaleLowerCase().trim())
  );
}
