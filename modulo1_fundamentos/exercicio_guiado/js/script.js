let tabCountries = null;
let tabFavorites = null;
let allCountries = [];
let favoriteCountries = [];
let countCountries = 0;
let countFavorites = 0;
let totalPopulationList = 0;
let totalPopulationFavorites = 0;
let numberFormat = null;

window.addEventListener("load", () => {
  tabCountries = document.querySelector("#tabCountries");
  tabFavorites = document.querySelector("#tabFavorites");
  countCountries = document.querySelector("#countCountries");
  countFavorites = document.querySelector("#countFavorites");
  totalPopulationList = document.querySelector("#totalPopulationList");
  totalPopulationFavorites = document.querySelector("#totalPopulationFavorites"); // prettier-ignore
  numberFormat = Intl.NumberFormat("pt-BR");

  fetchCountries();
});

const fetchCountries = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const json = await res.json();
  allCountries = json.map((c) => {
    const { numericCode, translations, population, flag } = c;
    return {
      id: numericCode,
      name: translations.pt,
      population,
      populationFormmat: formatNumber(population),
      flag // prettier-ignore
    };
  });

  render();
};

const render = () => {
  renderCountryList();
  renderFavorites();
  renderSummary();
  handleCountryButtons();
};

const renderCountryList = () => {
  let countriesHTML = "<div>";

  allCountries.forEach((c) => {
    const { name, flag, id, populationFormmat } = c;
    const countryHTML = `
        <div class="country">
            <div>
                <a id="${id}" class="waves-effect waves-light btn">+</a>
            </div>
            <div>
                <img src="${flag}" alt="${name}">
            </div>
            <div>
                <ul>
                    <li>${name}</li>
                    <li>${populationFormmat}</li>
                </ul>
            </div>
        </div>    
    `;

    countriesHTML += countryHTML;
  });

  countriesHTML += "</div>";

  tabCountries.innerHTML = countriesHTML;
};

const renderFavorites = () => {
  let countriesHTML = "<div>";

  favoriteCountries.forEach((c) => {
    const { name, flag, id, populationFormmat } = c;
    const countryHTML = `
        <div class="country">
            <div>
                <a id="${id}" class="waves-effect waves-light btn red darken-4">+</a>
            </div>
            <div>
                <img src="${flag}" alt="${name}">
            </div>
            <div>
                <ul>
                    <li>${name}</li>
                    <li>${populationFormmat}</li>
                </ul>
            </div>
        </div>    
    `;

    countriesHTML += countryHTML;
  });

  countriesHTML += "</div>";

  tabFavorites.innerHTML = countriesHTML;
};

const renderSummary = () => {
  countCountries.textContent = formatNumber(allCountries.length);
  countFavorites.textContent = formatNumber(favoriteCountries.length);

  totalPopulationList.textContent = formatNumber(allCountries.reduce((acc, curr) => acc + curr.population, 0)); // prettier-ignore
  totalPopulationFavorites.textContent = formatNumber(favoriteCountries.reduce((acc, curr) => acc + curr.population, 0)); // prettier-ignore
};

const handleCountryButtons = () => {
  const countryButtons = Array.from(tabCountries.querySelectorAll(".btn"));
  const favoriteButtons = Array.from(tabFavorites.querySelectorAll(".btn"));

  countryButtons.forEach((btn) => {
    btn.addEventListener("click", () => addToFavorites(btn.id));
  });

  favoriteButtons.forEach((btn) => {
    btn.addEventListener("click", () => removeFromFavorites(btn.id));
  });
};

const addToFavorites = (id) => {
  const countryToAdd = allCountries.find((btn) => btn.id === id);
  favoriteCountries = [...favoriteCountries, countryToAdd];

  favoriteCountries.sort((a, b) => a.name.localeCompare(b.name));

  allCountries = allCountries.filter((c) => c.id !== id);

  render();
};

const removeFromFavorites = (id) => {
  const countryToRemove = favoriteCountries.find((btn) => btn.id === id);

  allCountries = [...allCountries, countryToRemove].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  favoriteCountries = favoriteCountries.filter((c) => c.id !== id);

  render();
};

const formatNumber = (number) => numberFormat.format(number);
