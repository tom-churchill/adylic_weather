import Tracker from "../Tracker";
import {IDayStatistics, IDayTracker} from "../Interfaces";
import {TrackerType} from "../Enums";
import {IAppState} from "./Reducers";
import {ThunkAction} from "redux-thunk";

export const changeCurrentTracker = (currentTracker: TrackerType) => {
    return {
        type: "CHANGE_TRACKER",
        payload: currentTracker
    }
};

export const getWeather = (): ThunkAction<void, IAppState, undefined, any> => {
    return (dispatch) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?id=2643743&appid=7bfb3d99763cbe247f47d46bd86bbe92&units=metric`;

        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            // create the trackers
            const dayTrackers = new Map<number, IDayTracker>();

            const currentDatetime = new Date();

            // enter the data
            for (const timeFrame of data.list) {
                const datetime = (new Date(timeFrame.dt * 1000));
                const dayOffset = getDayOffset(datetime, currentDatetime);
                if (dayOffset >= 5) {
                    // only process the days that are within 5 days of the current date
                    continue
                }
                const hour = (new Date(timeFrame.dt * 1000)).getHours();
                const isDay = (hour >= 6 && hour < 21); // depending on your definition of day or night
                // alternatively you could use (timeFrame.sys.pod === "d") however it seems to be an undocumented api

                let dayTracker = dayTrackers.get(dayOffset);
                if (dayTracker === undefined) {
                    dayTracker = {
                        dayTemperatureTracker: new Tracker(),
                        nightTemperatureTracker: new Tracker(),
                        humidityTracker: new Tracker(),
                    };

                    dayTrackers.set(dayOffset, dayTracker);
                }

                if (isDay) {
                    dayTracker.dayTemperatureTracker.setValue(timeFrame.main.temp);
                } else {
                    dayTracker.nightTemperatureTracker.setValue(timeFrame.main.temp);
                }
                dayTracker.humidityTracker.setValue(timeFrame.main.humidity);
            }

            const statistics = new Map<TrackerType, IDayStatistics>();

            for (const dayOffset of dayTrackers.keys()) {
                const dayTracker = dayTrackers.get(dayOffset)!;
                const dayStatistics = {
                    dayTemperatureStatistics: createStatistic(dayTracker.dayTemperatureTracker, "°C"),
                    nightTemperatureStatistics: createStatistic(dayTracker.nightTemperatureTracker, "°C"),
                    humidityStatistics:createStatistic(dayTracker.humidityTracker, "%"),
                };
                statistics.set(dayOffset, dayStatistics)
            }

            // update application state
            dispatch({type: "ADD_STATISTICS", payload: statistics});
        });
    }
};

const getDayOffset = (date1: Date, date2: Date) => {
    const dayLength = 1000 * 60 * 60 * 24;
    const delta = +date1 - +date2; // coerce to numbers to prevent typescript complaining
    return Math.floor(delta / dayLength);
};

const createStatistic = (tracker: Tracker, unit: string) => {
    return {
        unit: unit,
        min: tracker.getMin(),
        max: tracker.getMax(),
        mean: tracker.getMean(),
        mode: tracker.getMode(),
    };
};