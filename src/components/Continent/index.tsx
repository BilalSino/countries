import { CountryType } from '~/types';
import Country from '../Country';
import { Dispatch, useEffect, useState } from 'react';
import { GiWorld } from 'react-icons/gi';

function Continent({
  continent,
  data,
  selected,
  setSelected,
}: {
  continent: string;
  data: CountryType[];
  selected: string | undefined;
  setSelected: Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [countries, setCountries] = useState<CountryType[]>([]);
  useEffect(() => {
    setCountries(data.filter((item) => item.continent.name === continent));
  }, [data, selected, setSelected, continent]);
  if (!countries.length) return null;
  return (
    <div>
      <div className="p-5 rounded bg-zinc-100">
        <div className="flex items-center gap-2">
          {continent && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-red-700 text-xl">
                <GiWorld />
              </span>
              {continent}
            </div>
          )}
        </div>
      </div>
      <div className="grid gap-2 px-5 py-2">
        {countries.map((country: CountryType) => (
          <Country
            key={country.name}
            country={country}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </div>
  );
}

export default Continent;
