import {IDayStatistics} from "../Interfaces";
import {TrackerType} from "../Enums";

export interface IAppState {
    readonly currentTracker: TrackerType;
    readonly statistics: Map<TrackerType, IDayStatistics>;
}

const initialState: IAppState = {
    currentTracker: TrackerType.dayTemperature,
    statistics: new Map<TrackerType, IDayStatistics>(),
};

const reducers = (state=initialState, action: any): IAppState => {
    switch (action.type) {
        case "CHANGE_TRACKER":
            return {...state, currentTracker: action.payload};
        case "ADD_STATISTICS":
            return {...state, statistics: action.payload};
        default:
            return state;
    }
};

export default reducers;