import { useQuery } from '@apollo/client';
import { ContinentType, CountryType } from './types';
import { GET_CONTINENTS, GET_COUNTRIES } from './graphql/queries';
import { ChangeEvent, useEffect, useState } from 'react';
import Country from './components/Country';
import { clean, isIncludedCaseInsensitive } from './functions';
import { FaTimes } from 'react-icons/fa';
import CurrencyContainer from './components/Currency';
import Continent from './components/Continent';

function App() {
  const [howToUse, setHowToUse] = useState(false);
  const [search, setSearch] = useState('search:');
  const [cleanSearch, setCleanSearch] = useState<string[]>([]);
  const [cleanCodes, setCleanCodes] = useState<string[]>([]);
  const [cleanContinent, setCleanContinent] = useState<string[]>([]);
  const [cleanGroup, setCleanGroup] = useState<string[]>([]);
  const { loading, error, data } = useQuery<{ countries: CountryType[] }>(
    GET_COUNTRIES
  );
  const {
    loading: continentsLoading,
    error: continentsError,
    data: continentsData,
  } = useQuery<{ continents: ContinentType[] }>(GET_CONTINENTS);
  const [filteredData, setFilteredData] = useState(data);
  const [selected, setSelected] = useState<string>();
  const [allCurrencies, setAllCurrencies] = useState<string[]>([]);

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setSearch(inputValue);
    clean(/code:[^ ]+/, 5, inputValue, setCleanCodes);
    clean(/continent:[^ ]+/, 10, inputValue, setCleanContinent);
    clean(/search:[^:]+(?= [^ ]+|$)/, 7, inputValue, setCleanSearch);
    clean(/group:[^:]+(?= [^ ]+|$)/, 6, inputValue, setCleanGroup);
  };
  useEffect(() => {
    if (!data || !data.countries) return;

    if (
      !data?.countries ||
      (!cleanSearch.length && !cleanCodes.length && !cleanContinent.length)
    ) {
      setFilteredData(data);
      return;
    }
    const newData = {
      countries: data.countries.filter(
        (d: CountryType) =>
          isIncludedCaseInsensitive(cleanCodes, d.code) ||
          isIncludedCaseInsensitive(cleanContinent, d.continent.name) ||
          isIncludedCaseInsensitive(cleanSearch, d.name) ||
          isIncludedCaseInsensitive(cleanSearch, d.native) ||
          isIncludedCaseInsensitive(cleanSearch, d.code) ||
          isIncludedCaseInsensitive(cleanSearch, d.continent.name)
      ),
    };

    setFilteredData(newData);
  }, [data, search, cleanSearch, cleanCodes, cleanContinent]);

  useEffect(() => {
    if (!filteredData || !filteredData.countries.length) return;
    const { countries } = filteredData;
    setSelected(
      countries.length >= 10
        ? countries[9].code
        : countries[countries.length - 1].code
    );
    const set = new Set<string>();
    countries.map((country) => {
      if (country?.currency?.includes(',')) {
        country.currency.split(',').map((item) => set.add(item));
      } else {
        set.add(country.currency);
      }
    });
    const currencies: string[] = [...set];

    setAllCurrencies(currencies);
  }, [filteredData]);
  if (error) return <p>Error: {error.message}</p>;
  if (continentsError) return <p>Error: {continentsError.message}</p>;
  return (
    <div className="grid gap-5">
      <div className="flex">
        <input
          onChange={changeHandle}
          value={search}
          className="border rounded-l h-16 text-2xl px-5 flex-1 outline-none focus:border-zinc-400 hover:border-zinc-400"
          placeholder="Search..."
          type="text"
        />
        <button
          onClick={() => setHowToUse(true)}
          className="h-16 flex items-center px-5 justify-center bg-green-700 text-white hover:bg-green-500 rounded-r"
        >
          How to use search bar?
        </button>
        {howToUse && (
          <div className="fixed top-0 left-0 inset-0 w-full h-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-5 border rounded flex flex-col">
              <button
                className="self-end text-2xl mb-3"
                onClick={() => setHowToUse(false)}
              >
                <FaTimes />
              </button>
              <div className=" grid gap-3">
                <section className="grid gap-1 bg-zinc-100 p-2 rounded">
                  <span>search:Country Name</span>
                  <span>search:Continent Name</span>
                  <span>search:Country Code</span>
                </section>
                <section className="grid gap-1 bg-zinc-100 p-2 rounded">
                  <span>continent:Asia</span>
                  <span>continent:Asia,Europe</span>
                  <span>code:US</span>
                  <span>code:US,TR</span>
                </section>
                <section className="grid gap-1 bg-zinc-100 p-2 rounded">
                  <span>group:continent</span>
                  <span>group:currency</span>
                  <span>group:currency,continent</span>
                </section>
                <section className="grid gap-1 bg-zinc-100 p-2 rounded">
                  <span>search:Turkey code:TR continent:Asia</span>
                  <span>
                    search:United States code:TR,US continent:Asia,Europe
                  </span>
                  <span>
                    search:United States,Azerbaijan code:TR,US
                    continent:Asia,Europe
                  </span>
                  <span>
                    search:United States,Azerbaijan code:TR,US
                    continent:Asia,Europe group:currency
                  </span>
                  <span>
                    search:United States,Azerbaijan code:TR,US
                    continent:Asia,Europe group:currency,continent
                  </span>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
      {!loading &&
        !cleanGroup.length &&
        filteredData?.countries.map((country: CountryType) => (
          <Country
            key={country.name}
            country={country}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      {cleanGroup.includes('continent') &&
        filteredData?.countries &&
        !continentsLoading &&
        continentsData?.continents.map((item) => (
          <Continent
            key={item.name}
            continent={item.name}
            data={filteredData.countries}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      {cleanGroup.includes('currency') &&
        filteredData?.countries &&
        allCurrencies.map((item) => (
          <CurrencyContainer
            key={item}
            currency={item}
            data={filteredData.countries}
            selected={selected}
            setSelected={setSelected}
          />
        ))}

      {loading && continentsLoading && <p>Loading...</p>}
    </div>
  );
}

export default App;
