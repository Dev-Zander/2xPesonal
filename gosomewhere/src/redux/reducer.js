//APP INITIALSTATE
let initialState = {
    tripID: 0,
    travelerID:0,
}


//CONST VARIABLES
const
CURRENT_TRIPID = 'CURRENT_TRIPID',
CURRENT_TRAVELERID = 'CURRENT_TRAVELERID'


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

    
        case CURRENT_TRAVELERID:
        let newTravelerID = Object.assign({}, state, {travelerID: action.payload})
        return newTravelerID
    

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

export function getTravelerDetails(value){
    return {
        type: CURRENT_TRAVELERID,
        payload: value
    }
}



