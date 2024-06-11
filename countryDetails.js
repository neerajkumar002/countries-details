const countryDetails = document.querySelector(".country-details");
const body = document.querySelector("body");
const shimmerCountryDetails = document.querySelector(
  ".shimmer-country-details"
);

shimmerCountryDetails.classList.remove("hide");

const nameParam = new URLSearchParams(location.search)
  .get("name")
  .toLowerCase();
const backBtn = document.querySelector(".back-button");
backBtn.addEventListener("click", () => {
  history.back();
});

fetch(`https://restcountries.com/v3.1/name/${nameParam}?fullText=true`)
  .then((response) => response.json())
  .then(([country]) => {
    shimmerCountryDetails.classList.add("hide");
    const countryData = {};
    if (country) {
      countryData.countryFlag = country.flags.svg;
      countryData.countryName = country.name.common;
      countryData.population = country.population.toLocaleString("en-IN");
      countryData.region = country.region;
      countryData.topLevelDomain = country.tld;

      if (country.subregion) {
        countryData.subRegion = country.subregion;
      }

      if (country.capital) {
        countryData.capital = country.capital?.[0];
      } else {
        countryData.capital = country.capital;
      }
      if (country.currencies) {
        countryData.currencies = Object.values(country.currencies).map(
          (currency) => currency.name
        );
      }
      if (country.name.nativeName) {
        countryData.nativeName = Object.values(
          country.name.nativeName
        )[0].common;
      } else {
        countryData.nativeName = country.name.common;
      }
      if (country.languages) {
        countryData.languages = Object.values(country.languages).join(", ");
      }

      // if (country.borders) {
      //   country.borders.forEach((border) =>
      //     fetch(`https://restcountries.com/v3.1/alpha/${border}`)
      //       .then((res) => res.json())
      //       .then(([bordersCountry]) => {
      //         let countryBordersList = [];
      //         if (bordersCountry.name.common) {
      //           countryBordersList.push(bordersCountry);
      //           // countryBordersList.push(`<a href="/countryDetails.html?name=${bordersCountry.name.common}">${bordersCountry.name.common}</a>`);
      //           countryData.rrrrr = countryBordersList;
      //           console.log(countryBordersList);
      //         }
      //       })
      //   );
      // }

      displayCountryDetails(countryData);
    }
  })
  .catch((error) => console.log(error));

function displayCountryDetails(countryData) {
  countryDetails.innerHTML = `
   <img src=${countryData.countryFlag} alt="" class="country-flag">
             <div class="details-text-container">
                <h1 class="country-name">${countryData.countryName}</h1>
                <div class="details-text">
                  <p>
                    <b>Native Name:</b>
                    <span class="native-name">${countryData.nativeName}</span>
                  </p>
                  <p>
                    <b>Population:</b>
                    <span class="population">${countryData.population}</span>
                  </p>
                  <p>
                    <b>Region: </b>
                    <span class="region">${countryData.region}</span>
                  </p>
                  <p>
                    <b>Sub Region:</b>
                    <span class="sub-region">${countryData.subRegion}</span>
                  </p>
                  <p>
                     <b>Capital: </b>
                    <span class="capital">${countryData.capital}</span>
                  </p>
                  <p>
                    <b>Top Level Domain:</b>
                    <span class="top-level-domain">${countryData.topLevelDomain}</span>
                  </p>
                  <p>
                    <b>Currencies:</b>
                    <span class="currencies">${countryData.currencies}</span>
                  </p>
                  <p>
                    <b>Languages:</b>
                    <span class="languages">${countryData.languages}</span>
                  </p>
                </div>
                <div class="border-countries">             
 
                  &nbsp;
                </div>
              </div>`;
}

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

/*
  <p class="borders">Border Countries:
   </p>

*/
