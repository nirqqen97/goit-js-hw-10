const url = 'https://restcountries.com/v3.1/name/'
export function fetchByName(name) {
  return  fetch(`${url}${name}?fields=name.official,capital,population,flags,languages,name`)
    .then(r => {
        
        if (!r.ok) {
          throw new Error(r.status);
        }
        return r.json();
      })
    
}

// .then(data => {

//       if (data.length === 1) {
//         renderFullData(data)
//         return
//       }
//       if (data.length >= 2 && data.length <= 10) {
//      clearHTML()
//      renderPreData(data)
//         return
//       }
//       if (data.length > 10) {
//         Notify.info('Too many matches found. Please enter a more specific name.')
//         return
//       }
    
      
      
        
//       })
//       .catch(error => {
//        Notify.failure('Oops, there is no country with that name')
//        clearHTML()
//       });