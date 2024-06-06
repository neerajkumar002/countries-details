const countryDetails = document.querySelector(".country-details");
const countryName = document.querySelector(".country-name");
const countryFlag = document.querySelector(".country-flag");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");
const body = document.querySelector("body");
const shimmerCountryDetails = document.querySelector(
  ".shimmer-country-details"
);

const nameParam = new URLSearchParams(location.search)
  .get("name")
  .toLowerCase();
console.log(nameParam);
const backBtn = document.querySelector(".back-button");
backBtn.addEventListener("click", () => {
  history.back();
});

fetch(`https://restcountries.com/v3.1/name/${nameParam}?fullText=true`)
  .then((response) => response.json())
  .then(([country]) => {
    if (country) {
      console.log(country);
      countryFlag.src = country.flags.svg;
      countryName.innerHTML = country.name.common;
      population.innerHTML = country.population.toLocaleString("en-IN");
      region.innerHTML = country.region;
      topLevelDomain.innerHTML = country.tld;

      if (country.subregion) {
        subRegion.innerHTML = country.subregion;
      }

      if (country.capital) {
        capital.innerHTML = country.capital?.[0];
      } else {
        capital.innerHTML = country.capital;
      }
      if (country.currencies) {
        currencies.innerHTML = Object.values(country.currencies).map(
          (currency) => currency.name
        );
      }
      if (country.name.nativeName) {
        nativeName.innerHTML = Object.values(country.name.nativeName)[0].common;
      } else {
        nativeName.innerHTML = country.name.common;
      }
      if (country.languages) {
        languages.innerHTML = Object.values(country.languages).join(", ");
      }
      if (country.borders) {
        country.borders.forEach((border) =>
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([bordersCountry]) => {
              const borderCountryTag = document.createElement("a");
              if (bordersCountry.name.common) {
                borderCountryTag.innerText = bordersCountry.name.common;
                borderCountryTag.href = `/countryDetails.html?name=${bordersCountry.name.common}`;
                borderCountries.append(borderCountryTag);
              }
            })
        );
      }
    }
  })
  .catch((error) => console.log(error));

const themeChangerBtn = document.querySelector(".theme-changer");

const themeValue = localStorage.getItem("theme");
if (themeValue === "dark") {
  body.classList.add("dark");
  themeChangerBtn.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
}

themeChangerBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeChangerBtn.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
  } else {
    localStorage.setItem("theme", "light");
    themeChangerBtn.innerHTML = `<i class="fa-regular fa-moon"></i>Dark Mode`;
  }
});
