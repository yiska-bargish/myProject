import {Axios} from 'axios'
export const productMiddle= store => next=> action=>{

    // var axios = require('axios');
// if(action.type == "GET_ALL_PRODUCTS"){
// var config = {
//   method: 'get',
//   url: 'http://localhost:4000/getAllProducts',
//   headers: { }
// };
// debugger
// Axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
//   action.payload = response.data.products
//   return next(action)
// })
// .catch(function (error) {
//   console.log(error);
// });



var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  debugger
  fetch("http://localhost:4000/getAllProducts", requestOptions)
    .then(response => response.json())
    .then(result =>{
         console.log(result)
         action.payload = result.products
        return next(action)
    })
    .catch(error => console.log('error', error));
// }
}