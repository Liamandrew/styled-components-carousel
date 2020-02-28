import React from 'react';
import styled from 'styled-components';
import { boolean, number } from '@storybook/addon-knobs';
import Carousel from '../src';

export default {
    title: 'Carousel',
    component: Carousel,
};

const Title = styled.h1`
    text-align: center;
`;

const Background = styled.div`
    background-color: #eaaa;
    margin: 10px;
`;

const Slide = (text: string) => (
    <Background>
        <Title>{text}</Title>
    </Background>
);

export const carouselWithKnobs = () => (
    <Carousel
        center={boolean('Center', true)}
        centerPadding={number('Center Padding', 30)}
        infinite={boolean('Infinite', true)}
        showArrows={boolean('Show Arrows', true)}
        slidesToShow={number('Slides to Show', 4)}
        swipeable={boolean('Swipeable', true)}
        debug={boolean('Debug', false)}
    >
        {[...Array(number('Number of Cards', 3))].map((e, i) => Slide(`${i + 1}`))}
    </Carousel>
);

export const carouselWithBreakpoints = () => (
    <Carousel
        slidesToShow={3}
        center
        centerPadding={30}
        breakpoints={[
            {
                size: 200,
                settings: {
                    slidesToShow: 1,
                    showArrows: false,
                    showIndicator: false,
                },
            },
            {
                size: 600,
                settings: {
                    slidesToShow: 3,
                    showArrows: false,
                    showIndicator: true,
                },
            },
            {
                size: 1000,
                settings: {
                    slidesToShow: 4,
                    showArrows: true,
                    showIndicator: true,
                    center: true,
                },
            },
        ]}
    >
        {Slide('1')}
        {Slide('2')}
        {Slide('3')}
        {Slide('4')}
        {Slide('5')}
        {Slide('6')}
    </Carousel>
);
