import React, {ChangeEvent, useEffect} from 'react';
import {TrackerType} from "../Enums";
import Forecast from "./Forecast";
import {useDispatch} from "react-redux";
import * as actions from "../store/Actions";
import styled from "styled-components";

export default () => {
    const dispatch = useDispatch();

    // get the weather when the App component first loads
    useEffect(() => {
        dispatch(actions.getWeather());
    });

    // change which tracker is active
    function onTrackerChange(event: ChangeEvent<HTMLSelectElement>) {
        const trackerType = parseInt(event.target.value, 10) as TrackerType;
        dispatch(actions.changeCurrentTracker(trackerType));
    }

    return (
        <Container>
            <Select onChange={onTrackerChange}>
                <option value={TrackerType.dayTemperature}>Day Temperature</option>
                <option value={TrackerType.nightTemperature}>Night Temperature</option>
                <option value={TrackerType.humidity}>Humidity</option>
            </Select>
            <Forecast />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 620px;
    margin: auto;
    margin-top: 50px;
`;

const Select = styled.select`
    width: 150px;
    margin: auto;
    margin-bottom: 10px;
`;