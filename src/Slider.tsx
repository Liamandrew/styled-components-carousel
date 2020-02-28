import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import { Props } from './Carousel';
import Track from './Track';
import Slide from './Slide';
import { getPreSlideCount, getSliderStyles } from './helpers';

export type SliderProps = Props & {
    previousActive: number;
    active: number;
    infiniteActive: number;
    debug?: boolean;
};

const Slider = styled.div`
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    width: 100%;
`;

const renderSlides = (
    children: React.ReactNode,
    slideCount: number,
    slideWidth: number = 0,
    slidesToShow: number,
    infinite?: boolean,
    center?: boolean,
    debug?: boolean,
) => {
    const slides: React.ReactNode[] = [];
    const preClones: React.ReactNode[] = [];
    const postClones: React.ReactNode[] = [];

    React.Children.forEach(children, (child, index) => {
        slides.push(
            <Slide width={slideWidth} key={`slide${index}`}>
                {child}
                {debug && <p>{`slide ${index}`}</p>}
            </Slide>,
        );

        if (infinite) {
            const preCloneNo = slideCount - index;

            if (
                preCloneNo <=
                getPreSlideCount({
                    slideCount,
                    slidesToShow,
                    infinite,
                    center,
                })
            ) {
                preClones.push(
                    <Slide width={slideWidth} key={`slide-pre${-preCloneNo}`}>
                        {child}
                        {debug && <p>{`pre clone ${preCloneNo}`}</p>}
                    </Slide>,
                );
            }

            const postCloneNo = index + slideCount;

            postClones.push(
                <Slide width={slideWidth} key={`slide-post${postCloneNo}`}>
                    {child}
                    {debug && <p>{`post clone ${postCloneNo}`}</p>}
                </Slide>,
            );
        }
    });
    return [...preClones, ...slides, ...postClones];
};

const Component: React.FC<SliderProps & { onWindowResize: () => void }> = ({
    children,
    previousActive,
    active,
    infiniteActive,
    slidesToShow = 1,
    center,
    centerPadding,
    infinite,
    onWindowResize,
    debug,
}) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const slideCount = React.Children.count(children);
    const [sliderWidth, setSliderWidth] = useState(0);
    const [styles, setStyles] = useState(
        getSliderStyles({
            previousActive,
            active,
            infiniteActive,
            slideCount,
            slidesToShow,
            center,
            centerPadding,
            infinite,
            sliderWidth,
        }),
    );

    // Handle window resize
    useEffect(() => {
        const handleWindowResize = debounce(() => {
            onWindowResize();
            setSliderWidth(sliderRef.current ? Math.ceil(sliderRef.current.offsetWidth) : 0);
        }, 100);

        // Sets initial dimensions
        setSliderWidth(sliderRef.current ? Math.ceil(sliderRef.current.offsetWidth) : 0);

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [onWindowResize]);

    useEffect(() => {
        setStyles(
            getSliderStyles({
                previousActive,
                active,
                infiniteActive,
                slideCount,
                slidesToShow,
                center,
                centerPadding,
                infinite,
                sliderWidth,
            }),
        );
    }, [previousActive, active, infiniteActive, slidesToShow, center, centerPadding, infinite, sliderWidth]);

    return (
        <Slider ref={sliderRef}>
            <Track
                width={styles.trackWidth}
                center={center}
                centerPadding={centerPadding}
                previousActive={previousActive}
                active={active}
                infiniteActive={infiniteActive}
                slideWidth={styles.slideWidth}
                slideOffset={styles.slideOffset}
            >
                {renderSlides(children, slideCount, styles.slideWidth, slidesToShow, infinite, center, debug)}
            </Track>
        </Slider>
    );
};

export default Component;
