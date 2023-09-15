import { EVENTO_ACTION_TYPE } from "./action-type.enum";

const initialState: { isOnline: boolean } = {
    isOnline: false
}

const EventosReducer = (state = initialState, action: { type: string, payload: boolean }) => {
    switch (action.type) {
        case EVENTO_ACTION_TYPE.IS_ONLINE:
            return { ...state, isOnline: action.payload };

        default:
            return state;
    }

}

export default EventosReducer;