import React from 'react';
import {useSelector} from "react-redux";
import Day from "./Day";
import {IAppState} from "../store/Reducers";
import styled from 'styled-components';

export default () => {
    const dayOffsets = useSelector((state: IAppState) => {
        return Array.from(state.statistics.keys());
    });

    return (
        <Container>
            {
                dayOffsets.map((dayOffset, i) =>
                    <Day dayOffset={dayOffset} key={i} />
                )
            }
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin: auto;
    line-height: 1.5em;
`;
