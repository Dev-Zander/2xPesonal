//APP INITIALSTATE
let initialState = {
    tripID: 656,
    test: 'This is a test'
}


//CONST VARIABLES
const
CURRENT_TRIPID = 'CURRENT_TRIPID'


//REDUCER EXAMPLE
//export default function reducer(state = initialState, action){
//     switch(action.type){
//         case NEW_CASE_NAME:
//         let newVariable = object.assign({}, state, {intialStateItem : action.payload})
//         return newVariable
//
//
// default:
//     return state
//     }
// }
export default function reducer(state = initialState, action){
    switch (action.type){
        case CURRENT_TRIPID:
        let newTripID = Object.assign({}, state, {tripID: action.payload})
        return newTripID

        default:
            return state

    }
}


// ACTION CREATOR
// export function NewFunction(value){
//     return {
//         type: NEW_CASE_NAME,
//         payload: value
//     }
// } 

export function getTripDetails(value){
    return {
        type: CURRENT_TRIPID,
        payload: value
    }
}



