import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { createMarkUp, createMarkUpPreInfo } from "./createMarkup";
import { fetchByName } from "./fetchCountries.js";
const DEBOUNCE_DELAY = 300;
const refs ={
    inputRef:document.querySelector('#search-box'),
    ulRef: document.querySelector('.country-list'),
}
refs.inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput(e) {
    const searchedText = e.target.value.trim().toLowerCase()
    fetchByName(searchedText)  .then(data => {
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
        })
        .catch(error => {
         Notify.failure('Oops, there is no country with that name')
         clearHTML()
        });
    if (searchedText === '') {
    clearHTML()
    }
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