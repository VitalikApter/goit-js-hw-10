import { refs } from "./refs";

const {countryListEl, countryInfoEl, } = refs;

export const manyCountriesListMarkup = countries =>
countries.map(({name, flags}) => {
    return `<li>
    <img width="20" height="20"
    src="&{flags}">
    </img>
    <p>${name}</p>
    </li>`;
}).loin('');


export const oneCountryMarkup = ({
    name,
    flags,
    capital,
    population,
    languages,
}) => `<h2><img width="20" height="20"
src="${flags}">
</img>${name}</h2>
<p><strong>Capital:</strong> ${capital}</p>
<p><strong>Population:</strong> ${population}</p>
<p><strong>Languages:</strong> ${languages}</p>`;

export const clearMarkup = () => {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
};