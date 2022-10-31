import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
// import { fetchByName } from "./fetchCountries";
const url = 'https://restcountries.com/v3.1/name/'

const DEBOUNCE_DELAY = 300;
const refs ={
    inputRef:document.querySelector('#search-box'),
    ulRef: document.querySelector('.country-list'),
}
refs.inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const searchedText = e.target.value.trim().toLowerCase()
    fetchByName(searchedText)
    if (searchedText === '') {
    clearHTML()
    }
}
function fetchByName(name) {
    fetch(`${url}${name}?fields=name.official,capital,population,flags,languages,name`)
    .then(r => {
        
        if (!r.ok) {
          throw new Error(r.status);
        }
        return r.json();
      })
      .then(data => {

      if (data.length === 1) {
        createMarkUp(data)
        return
      }
      if (data.length >= 2 && data.length <= 10) {
     clearHTML()
        createMarkUpPreInfo(data)
        return
      }
      if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.')
        return
      }
      console.log('length of data',data.length)
      
      
        
      })
      .catch(error => {
       Notify.failure('Oops, there is no country with that name')
       clearHTML()
      });
}
function createMarkUp(data) {
  data.map(({capital, population,languages,flags,name})=>{
    
    const markUp =  `<li>
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
    <p class="bold">Population${population}</p>
    <p class="bold">Languages${languages.official}</p>
  </li>`;
    refs.ulRef.innerHTML = name.official;
    refs.ulRef.innerHTML = markUp;
       

  })
}
function createMarkUpPreInfo(data) {
    data.map(({flags,name})=>{
      const markUp =  `<li class="flex">
      <img
        class="country-list__flag"
        src="${flags.svg}"
        width="30px"
        height="20px"
      />
      <p>${name.official}</p>
    </li>`;
      refs.ulRef.insertAdjacentHTML('beforeend',markUp)
         
  
    })
  }
  function clearHTML(e) {
    refs.ulRef.innerHTML = ''
  }