import { CountryType } from '~/types';
import ReactCountryFlag from 'react-country-flag';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { GiWorld } from 'react-icons/gi';
import { BiFlag } from 'react-icons/bi';
import classNames from 'classnames';
import { Dispatch } from 'react';

function Country({
  country,
  selected,
  setSelected,
}: {
  country: CountryType;
  selected: string | undefined;
  setSelected: Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const { capital, currency, continent, emoji, code, languages, name, native } =
    country;
  return (
    <div
      className={classNames(
        'grid grid-cols-7 items-center p-5 rounded gap-10 ',
        {
          'bg-indigo-100': selected === code,
          'bg-zinc-100': selected !== code,
        }
      )}
    >
      <div className="flex items-center justify-start gap-2">
        <ReactCountryFlag
          svg
          className="text-3xl"
          countryCode={code}
          aria-label={name}
          title={code}
        />
        {emoji}
      </div>
      <div className="flex flex-col items-start justify-center">
        <span className="text-sm px-1 text-zinc-600">{native}</span>
        <h2 className="font-semibold text-xl text-zinc-800">{name}</h2>
      </div>
      <div className="flex items-center justify-center gap-2">
        {currency && (
          <>
            <span className="text-green-600 text-xl">
              <FaMoneyBill1Wave />
            </span>
            <span className="font-mono font-medium">{currency}</span>
          </>
        )}
      </div>
      <div className="flex items-center justify-center gap-2">
        {capital && (
          <>
            <span className="text-sky-700 text-xl">
              <BiFlag />
            </span>
            {capital}
          </>
        )}
      </div>
      <div className="flex items-center justify-center gap-2">
        <span className="text-red-700 text-xl">
          <GiWorld />
        </span>
        {continent.name}
      </div>
      <div className="flex items-center justify-center flex-wrap gap-2">
        {languages.map(({ code: languageCode, name: languageName }) => (
          <div
            key={languageCode}
            className="flex items-center justify-center gap-1"
          >
            <span className="flex items-center justify-center bg-stone-500 text-white min-h-[40px] px-2 py-1 rounded gap-1">
              <span className="bg-green-500 h-5 w-5 flex items-center justify-center rounded-full text-xs">
                {languageCode}
              </span>
              <span>{languageName}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end">
        <button
          onClick={() => setSelected(selected === code ? '' : code)}
          className="flex items-center justify-center h-10 w-10 bg-zinc-50 border border-zinc-500 rounded-full"
        >
          <div
            className={classNames('h-5 w-5 rounded-full', {
              'bg-zinc-800': selected === code,
            })}
          ></div>
        </button>
      </div>
    </div>
  );
}

export default Country;
