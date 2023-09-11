import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { CountryType } from '~/types';
import Country from '../Country';
import { Dispatch } from 'react';

function CurrencyContainer({
  currency,
  data,
  selected,
  setSelected,
}: {
  currency: string;
  data: CountryType[];
  selected: string | undefined;
  setSelected: Dispatch<React.SetStateAction<string | undefined>>;
}) {
  return (
    <div>
      <div className="p-5 rounded bg-zinc-100">
        <div className="flex items-center gap-2">
          {currency && (
            <>
              <span className="text-green-600 text-xl">
                <FaMoneyBill1Wave />
              </span>
              <span className="font-mono font-medium">{currency}</span>
            </>
          )}
        </div>
      </div>
      <div className="grid gap-2 px-5 py-2">
        {data
          .filter((item) => item.currency?.includes(currency))
          .map((country: CountryType) => (
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

export default CurrencyContainer;
