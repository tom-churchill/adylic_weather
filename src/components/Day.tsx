import React from 'react';
import {useSelector} from "react-redux";
import {TrackerType} from "../Enums";
import {IAppState} from "../store/Reducers";
import styled from "styled-components";

export default (props: {dayOffset: number}) => {
    const statistics = useSelector((state: IAppState) => {
        const day = state.statistics.get(props.dayOffset)!;

        switch (state.currentTracker) {
            case TrackerType.dayTemperature:
                return day.dayTemperatureStatistics;
            case TrackerType.nightTemperature:
                return day.nightTemperatureStatistics;
            case TrackerType.humidity:
                return day.humidityStatistics;
        }
    });

    function generateRow(value: number | undefined, label: string) {
        if (value === undefined) {
            return null;
        } else {
            return <div>{label}: {value.toFixed(0)}{statistics.unit}</div>;
        }
    }

    return (
        <div>
            {statistics.min !== undefined && <Header>Day: {props.dayOffset + 1}</Header>}
            {generateRow(statistics.min, "Min")}
            {generateRow(statistics.max, "Max")}
            {generateRow(statistics.mean, "Mean")}
            {generateRow(statistics.mode, "Mode")}
            <br />
        </div>
    );
};

const Header = styled.div`
    font-weight: 800;
`;
