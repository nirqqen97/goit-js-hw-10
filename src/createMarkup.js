export function createMarkUp({capital, population,languages,flags,name}) {
  const lang = Object.values(languages).join(', ');
    return `<li>
    <div class="flex">
    <img
        class="country-list__flag"
        src="${flags.svg}"
        width="30px"
        height="20px"
      />
    <h1>${name.official}</h1>
    </div>
    <p class="bold">Capital:${capital}</p>
    <p class="bold">Population:${population}</p>
    <p class="bold">Languages:${lang}</p>
  </li>`;
}
export function createMarkUpPreInfo({flags,name}) {
  return`<li class="flex">
    <img
      class="country-list__flag"
      src="${flags.svg}"
      width="30px"
      height="20px"
    />
    <p>${name.official}</p>
  </li>`;
}