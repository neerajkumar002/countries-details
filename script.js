const countriesContainer = document.querySelector(".countries-container");
const shimmerCardContainer = document.querySelector(".shimmer-card-container");
const headerContainer = document.querySelector(".header-container");
const filterByRegion = document.querySelector(".filter-by-region");
const notification = document.querySelector(".notification");
const searchInput = document.querySelector(".search-container input");
const body = document.querySelector("body");

shimmerCardContainer.classList.remove("hidden");

window.addEventListener("offline", () => {
  const notificationTag = document.createElement("div");
  headerContainer.append(notificationTag);
  notificationTag.classList.add("notification");
  notificationTag.style.backgroundColor = "red";
  notificationTag.innerHTML = "You're offline. Check your connection.";
  setTimeout(() => {
    notificationTag.style.display = "none";
  }, 5000);
});

window.addEventListener("online", () => {
  const notificationTag = document.createElement("div");
  headerContainer.append(notificationTag);
  notificationTag.classList.add("notification");
  notificationTag.style.backgroundColor = "green";
  notificationTag.innerHTML = "You're online.";
  setTimeout(() => {
    notificationTag.style.display = "none";
  }, 5000);
});

let allCountriesData = [];

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    shimmerCardContainer.classList.add("hidden");
    renderCountriesCard(data);
    allCountriesData = data;
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

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderCountriesCard(data);
    })
    .catch((error) => console.log(error));
});

function renderCountriesCard(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/countryDetails.html?name=${country.name.common}`;
    const cardHtml = `<img src="${country.flags.svg}" alt="${
      country.name.common
    }" />
    <div class="card-text">
      <h3 class="card-title">${country.name.common}</h3>
      <p><b>Population:</b>${country.population.toLocaleString("en-IN")}</p>
      <p><b>Region:</b>${country.region}</p>
      <p><b>Capital:</b>${country.capital}</p>
    </div>`;

    countryCard.innerHTML = cardHtml;
    countriesContainer.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountriesCard(filteredCountries);
});
