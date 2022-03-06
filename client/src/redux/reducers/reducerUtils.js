export default function execHandler(state, action ,handlers){
    let afterConvert= convertActionNameToLowerCase(action.type)
    let handler = handlers[afterConvert]
    if (handler)
    handler(state, action)
}


function convertActionNameToLowerCase(actionName) {
    return actionName.toLowerCase().replace(/_(\w)/g, v => v[1].toUpperCase())
}