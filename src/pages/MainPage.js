import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MainPage() {
  //states for the form feilds
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargerCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(true);

  //handleSubmit method
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/convert`, {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });
      setLoading(false);
      //TODO: set the rest....
      setAmountInTargetCurrency(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  //get al currency name
  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/getAllCurrencies'
        );
        setCurrencyNames(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCurrencyNames();
  }, []);

  return (
    <div>
      <h1 className="lg:mx-32 text-5xl font-bold text-green-500">
        Convert Your Currency Today
      </h1>
      <p className="lg:mx-32 opacity-40 py-6">
        Thank you for signing up for your Open Exchange Rates account. Here is
        your App ID, which you can use to access our API:
      </p>
      <div className=" mt-5 flex items-center justify-center flex-col">
        <section className=" w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor={date}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="Date"
                id={date}
                name={date}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor={sourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Source Currency
              </label>
              <select
                onChange={(e) => setSourceCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                name={sourceCurrency}
                id={sourceCurrency}
                value={sourceCurrency}
              >
                <option value="">Select the source currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className=" p=1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor={targetCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Target Currency
              </label>
              <select
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                name={targetCurrency}
                id={targetCurrency}
                value={targetCurrency}
              >
                <option value="">Select the target currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className=" p=1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor={amountInSourceCurrency}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount In Source Currency
              </label>
              <input
                onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                type="number"
                id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Amount in source currency"
                required
              />
            </div>
            <button className=" bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md">
              Get the target Currency
            </button>
          </form>
        </section>
      </div>
      {!loading ? (
        <section className=" lg:mx-60 mt-5">
          {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equals to{' '}
          <span className=" text-green-500 font-bold">
            {amountInTargerCurrency}
          </span>{' '}
          in {currencyNames[targetCurrency]}
        </section>
      ) : null}
    </div>
  );
}
