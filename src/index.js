import './sass/styles.scss';
import { refs } from './js/refs';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import {
  manyCountriesListMarkup,
  oneCountryMarkup,
  clearMarkup,
} from './js/markupFuncs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const { searchBoxEl, countryListEl, countryInfoEl } = refs;

const parseResponse = res => {
  return res.reduce((acc, country) => {
    delete country.altSpellings;
    acc.push({
      ...country,
      name: country.name.common,
      flags: country.flags.svg,
      languages: Object.values(country.languages).join(', '),
    });
    return acc;
  }, []);
};

const onKeyDown = () => {
  clearMarkup();
  const inputFieldvalue = searchBoxEl.value.trim();
  if (!inputFieldvalue) return;
  fetchCountries(inputFieldvalue)
    .then(parseResponse)
    .then(countries => {
      if (countries.length > 10) {
        throw new Error(
          JSON.stringify({
            type: 'info',
            message:
              'Too many matches found. Please enter a more specific name.',
          })
        );
      }
      return countries;
    })
    .then(countries => {
      if (countries.length === 1) {
        countryInfoEl.innerHTML = oneCountryMarkup(countries[0]);
      } else {
        countryListEl.innerHTML = manyCountriesListMarkup(countries);
      }
    })
    .catch(err => {
      const { type, message } = JSON.parse(err.message);
      Notify[type](message, {
        fontSize: '16px',
      });
    });
};

searchBoxEl.addEventListener('input', debounce(onKeyDown, DEBOUNCE_DELAY));