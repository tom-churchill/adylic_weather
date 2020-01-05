import Tracker from "./Tracker";

export interface IStatistics {
    unit: string,
    min: number | undefined,
    max: number | undefined,
    mean: number | undefined,
    mode: number | undefined,
}

export interface IDayTracker {
    dayTemperatureTracker: Tracker,
    nightTemperatureTracker: Tracker,
    humidityTracker: Tracker,
}

export interface IDayStatistics {
    dayTemperatureStatistics: IStatistics,
    nightTemperatureStatistics: IStatistics,
    humidityStatistics: IStatistics,
}