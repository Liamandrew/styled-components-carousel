import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { Props } from './Carousel';
import { Slider } from './sliderStyles';
import { getPreSlideCount } from './helpers';

export type SliderProps = Props & {
    previousActive: number;
    active: number;
    infiniteActive: number;
    debug?: boolean;
};

const renderSlides = (
    children: React.ReactNode,
    slideCount: number,
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
            <div key={`slide${index}`} className="slide">
                {child}
                {debug && <p>{`slide ${index}`}</p>}
            </div>,
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
                    <div key={`slide-pre${-preCloneNo}`} className="slide">
                        {child}
                        {debug && <p>{`pre clone ${preCloneNo}`}</p>}
                    </div>,
                );
            }

            const postCloneNo = index + slideCount;

            postClones.push(
                <div key={`slide-post${postCloneNo}`} className="slide">
                    {child}
                    {debug && <p>{`post clone ${postCloneNo}`}</p>}
                </div>,
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
    const [sliderWidth, setSliderWidth] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const slideCount = React.Children.count(children);

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
    console.log('sliderWidth: ', sliderWidth);
    return (
        <Slider
            className="carousel"
            ref={sliderRef}
            previousActive={previousActive}
            active={active}
            infiniteActive={infiniteActive}
            slideCount={slideCount}
            slidesToShow={slidesToShow}
            center={center}
            centerPadding={centerPadding}
            infinite={infinite}
            sliderWidth={sliderWidth}
        >
            <div className="track">{renderSlides(children, slideCount, slidesToShow, infinite, center, debug)}</div>
        </Slider>
    );
};

export default Component;
