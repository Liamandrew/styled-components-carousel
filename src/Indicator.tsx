import React from 'react';
import styled from 'styled-components';

type Props = {
    items: number;
    slidesToShow: number;
    infinite?: boolean;
    active: number;
    onPress: (index: number) => void;
};

export const IndicatorWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding: 24px 12px;
`;

export const Indicator = styled.button<{ highlighted: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    padding: 0;
    border: 0;
    margin-left: 14px;
    margin-right: 14px;
    background-color: ${props => (props.highlighted ? '#444444' : '#DDDDDD')};
    transition: transform 0.1s;
    transform: scale(${props => (props.highlighted ? '1.1' : '1')});

    &:hover {
        transition: transform 0.1s;
        transform: scale(1.1);
    }
`;

const getNumberOfIndicators = (items: number, slidesToShow: number, infinite?: boolean) => {
    if (infinite) {
        return items;
    }

    if (slidesToShow >= items) {
        return 1;
    }

    return items - slidesToShow + 1;
};

const Component: React.FC<Props> = ({ items, slidesToShow, infinite, active, onPress }) => {
    return (
        <IndicatorWrapper>
            {[...Array(getNumberOfIndicators(items, slidesToShow, infinite))].map((e, i) => (
                <Indicator
                    key={`carousel-indicator-${i}`}
                    highlighted={i === active % items}
                    onClick={() => onPress(i)}
                />
            ))}
        </IndicatorWrapper>
    );
};

export default Component;
