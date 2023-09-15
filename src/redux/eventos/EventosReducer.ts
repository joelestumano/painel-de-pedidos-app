import { EventosActionTypeEnum } from "./EventosActionTypeEnum";

const initialState: { isOnline: boolean } = {
    isOnline: false
}

const EventosReducer = (state = initialState, action: { type: string, payload: boolean }) => {
    switch (action.type) {
        case EventosActionTypeEnum.IS_ONLINE:
            return { ...state, isOnline: action.payload };

        default:
            return state;
    }

}

export default EventosReducer;