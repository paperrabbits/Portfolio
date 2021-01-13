const initialState = {
    visited: false
}

//  ACTIONS
const DID_VISIT = 'DID_VISIT'
export function didVisit(bool) {
    return {
        type: DID_VISIT,
        payload: bool
    }
}

export default function stylesReducer(state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case DID_VISIT:
            return {...state, visited: payload};

        default: 
            return state;
    }
}