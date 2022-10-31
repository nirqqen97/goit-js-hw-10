import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { createMarkUp, createMarkUpPreInfo } from "./createMarkup";
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
        renderFullData(data)
        return
      }
      if (data.length >= 2 && data.length <= 10) {
     clearHTML()
     renderPreData(data)
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


function renderFullData(data) {
        const markUp = data.map(createMarkUp).join('')
        refs.ulRef.innerHTML = markUp;
    }

 function renderPreData(data) {
     const markup = data.map(createMarkUpPreInfo).join('')
     refs.ulRef.insertAdjacentHTML('beforeend',markup)
     
 }   
  function clearHTML(e) {
    refs.ulRef.innerHTML = ''
  }