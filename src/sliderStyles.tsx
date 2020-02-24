import styled, { css, keyframes } from 'styled-components';
import { SliderProps } from './Slider';
import { getPreSlideCount, getTotalSlideCount } from './helpers';

type SliderStyleProps = SliderProps & {
    sliderWidth: number;
    slideCount: number;
};

const getTransform = (percentage: string, xValue: number) => `
    ${percentage}% {
        transform: translate3d(${xValue}px, 0px, 0px);
    }`;

const getSlideAnimation = (
    previousActive: number,
    active: number,
    infiniteActive: number,
    slideWidth?: number,
    slideOffset?: number,
) => {
    const start = slideWidth && (slideOffset || slideOffset === 0) ? previousActive * slideWidth * -1 + slideOffset : 0;
    const end = slideWidth && (slideOffset || slideOffset === 0) ? active * slideWidth * -1 + slideOffset : 0;
    let infiniteEnd;
    if (infiniteActive !== active && slideWidth && (slideOffset || slideOffset === 0)) {
        infiniteEnd = infiniteActive * slideWidth * -1 + slideOffset;
    }

    const zero = getTransform('0', start);
    const ninetyNine = infiniteEnd ? getTransform('99.99', end) : '';
    const oneHundred = getTransform('100', infiniteEnd || end);

    const animation = `
        ${zero}
        ${ninetyNine}
        ${oneHundred}
    `;
    return keyframes`${animation}`;
};

const getSliderStyles = ({
    slideCount,
    slidesToShow = 1,
    center,
    centerPadding = 0,
    previousActive,
    active,
    infiniteActive,
    infinite,
    sliderWidth,
}: SliderStyleProps) => {
    let slideWidth;
    let slideOffset;
    let slidesToOffset = 0;
    let trackWidth;
    let centerPaddingAdj;

    const totalSlideCount = getTotalSlideCount({
        slideCount,
        slidesToShow,
        infinite,
        center,
    });

    if (sliderWidth) {
        centerPaddingAdj = center ? centerPadding * 2 : 0;

        slideWidth = Math.ceil((sliderWidth - centerPaddingAdj) / slidesToShow);

        if (infinite) {
            slidesToOffset = -getPreSlideCount({
                slideCount,
                slidesToShow,
                infinite,
                center,
            });

            if (slidesToShow >= slideCount) {
                slidesToOffset += 1 + slidesToShow - slideCount;
            }

            if (center) {
                slidesToOffset += Math.floor(slidesToShow / 2);
            }
        } else if (center) {
            slidesToOffset = Math.floor(slidesToShow / 2);

            if (slidesToShow !== 1) {
                const currentSlideFit = sliderWidth / slideWidth;
                const newSlidesToShow = currentSlideFit + slidesToOffset;
                slideWidth = Math.ceil((sliderWidth - centerPaddingAdj) / newSlidesToShow);
            }
        }

        slideOffset = slidesToOffset * slideWidth;
        trackWidth = totalSlideCount * slideWidth;
    }

    const animation = getSlideAnimation(previousActive, active, infiniteActive, slideWidth, slideOffset);

    return css`
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        width: 100%;

        .track {
            display: flex;
            flex-direction: row;
            position: relative;
            animation: ${animation} 0.5s forwards;
            ${trackWidth &&
                css`
                    width: ${trackWidth}px;
                `}
            ${center &&
                centerPadding &&
                css`
                    padding: 0px ${centerPadding}px;
                `}
        }

        .slide {
            display: block;
            width: ${slideWidth || 0}px;
            outline: currentcolor none medium;
        }
    `;
};

export const Slider = styled.div<SliderStyleProps>`
    ${props =>
        getSliderStyles({
            slideCount: props.slideCount,
            slidesToShow: props.slidesToShow,
            previousActive: props.previousActive,
            active: props.active,
            infiniteActive: props.infiniteActive,
            center: props.center,
            centerPadding: props.centerPadding,
            infinite: props.infinite,
            sliderWidth: props.sliderWidth,
        })}
`;
