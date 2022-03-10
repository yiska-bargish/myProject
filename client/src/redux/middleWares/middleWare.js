import axios from 'axios'

export const crud = store => next => action => {

  if (action.type === 'GET_ALL_CATEGORIES') {

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      // headers: {
      //   Accept: "application/json",
      //   'content-type': 'application/json',
      //   "Access-Control-Allow-Origin":"*"
      // },
    };

    fetch("http://localhost:4000/getAllcategories", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        action.payload = result.categories
        return next(action)
      })
      .catch(error => console.log('error', error));
  }
  else
    if (action.type === "GET_ALL_PRODUCTS") {

      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      debugger
      fetch("http://localhost:4000/getAllProducts", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          action.payload = result.products
          return next(action)
        })
        .catch(error => console.log('error', error));
    }
    else
      if (action.type === "ADD_PRODUCT") {
        debugger
        axios.post('http://localhost:4000/createProduct', action.payload.p)
          .then(response => {
            console.log(JSON.stringify(response.data));
            axios.post('http://localhost:4000/uploadImg/' + response.data.product._id, action.payload.file, {
              "Content-Type": "form-data"
            })
              .then(res => res.data)
              .then(result => {
                console.log(JSON.stringify(result))
                action.payload = result
                return next(action)
              })
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else
        if (action.type === 'DELETE_PRODUCT') {

          var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
          };

          fetch("http://localhost:4000/deleteProduct/" + action.payload, requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log(result)
              action.payload = result
              return next(action)
            })
            .catch(error => console.log('error', error));
        }
        else
          if (action.type === "LOGIN") {
            debugger
            var data = JSON.stringify(action.payload);

            axios.post('http://localhost:4000/getUserByNameAndPassword', action.payload)
              .then(r => r.data)
              .then(response => {
                console.log(response);
                action.payload = response.user
                return next(action)
              })
              .catch(function (error) {
                alert('אחד מפרטי ההזדהות שגויים')
                console.log(error);
              });
          }
          else
            if (action.type === "ADD_USER") {

              axios.post('http://localhost:4000/createUser', action.payload)
                .then(response => {
                  console.log(JSON.stringify(response.data));
                  action.payload = response.data.newUser
                  return next(action)
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
            else
              if (action.type === 'GET_ALL_BRANCH') {


                fetch("http://localhost:4000/getAllBranch", requestOptions)
                  .then(response => response.json())
                  .then(result => {
                    console.log(result)
                    action.payload = result
                    return next(action)
                  })
                  .catch(error => console.log('error', error));
              }
              else
                if (action.type == "UPDATE_USER") {
                  var data = JSON.stringify(action.payload);

                  var config = {
                    method: 'put',
                    url: 'http://localhost:4000/updateUser',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    data: data
                  };

                  axios(config)
                    .then(function (response) {
                      console.log(JSON.stringify(response.data));
                      action.payload = response.data
                      return next(action)
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

                }
                else
                  if (action.type == 'ADD_BASKET') {
                    action.payload.userCode = store.getState().user.currentUser?._id

                    var data = JSON.stringify(action.payload);

                    var config = {
                      method: 'post',
                      url: 'http://localhost:4000/createBasket',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      data: data
                    };

                    axios(config)
                      .then(function (response) {
                        console.log(JSON.stringify(response.data));
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                  }
                  else
                    if (action.type == "GET_BASKET_BY_USER_ID") {
                      var config = {
                        method: 'get',
                        url: 'http://localhost:4000/getBasketsByUserId/' + action.payload,
                        headers: {}
                      };

                      axios(config)
                        .then(function (response) {
                          console.log(JSON.stringify(response.data));
                          action.payload = response.data
                          return next(action)
                        })
                        .catch(function (error) {
                          console.log(error);
                        });

                    }
                    else
                      if (action.type == 'UPDATE_PRODUCT') {
                        debugger
                        var data = JSON.stringify(action.payload.p);

                        var config = {
                          method: 'put',
                          url: 'http://localhost:4000/updateProduct',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          data: data
                        };

                        axios(config)
                          .then(function (response) {
                            debugger
                            console.log(JSON.stringify(response.data));

                            if (action.payload.file) {
                              axios.post('http://localhost:4000/uploadImg/' + response.data.product._id, action.payload.file, {
                                "Content-Type": "form-data"
                              })
                                .then(res => res.data)
                                .then(result => {
                                  console.log(JSON.stringify(result))
                                  action.payload = result
                                  return next(action)
                                }).catch(err => console.log(err))
                            }
                            else {
                              action.payload = response.data
                              return next(action)
                            }
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                      }
                      else
                        return next(action)
}
