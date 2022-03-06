const actions = new Proxy(
    {},
    {
      get: function (target, prop) {
        debugger
        if (target[prop] === undefined)
          return function (args) {
            return { type: convertActionName(prop), payload: args };
          };
        else return target[prop];
      },
    }
  );
  
  function convertActionName(actionName){
    debugger
    return actionName.replace(/([A-Z])/g, "_$1").toUpperCase();
  }
  
  export default actions