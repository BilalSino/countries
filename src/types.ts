export interface CountryType {
  name: string;
  native: string;
  capital: string;
  code: string;
  emoji: string;
  currency: string;
  continent: {
    name: string;
    code: string;
  };
  languages: [
    {
      code: string;
      name: string;
    }
  ];
}

export interface ContinentType {
  name: string;
  code: string;
}
