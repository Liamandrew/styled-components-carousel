import { keyframes } from 'styled-components';
import { Breakpoint, CarouselSettings } from './Carousel';
import { SwipeDirection } from './Swipeable';

type SlideCountParams = {
    slideCount: number;
    slidesToShow: number;
    infinite?: boolean;
    center?: boolean;
};

type SliderStyleProps =  {
    sliderWidth: number;
    slideCount: number;
    slidesToShow?: number;
    center?: boolean;
    centerPadding?: number;
    infinite?: boolean;
};

export const getPreSlideCount = ({ slideCount, slidesToShow, infinite, center }: SlideCountParams) => {
    if (!infinite) {
        return 0;
    }

    return (slideCount < slidesToShow ? slidesToShow : slideCount) + (center ? 1 : 0);
};

export const getPostSlideCount = ({ slideCount, slidesToShow, infinite }: SlideCountParams) => {
    if (!infinite) {
        return 0;
    }
    return slideCount + slidesToShow + 1;
};

export const getTotalSlideCount = ({ slideCount, slidesToShow, infinite, center }: SlideCountParams) => {
    if (slideCount === 1) {
        return 1;
    }

    return (
        getPreSlideCount({
            slideCount,
            slidesToShow,
            infinite,
            center,
        }) +
        getPostSlideCount({
            slideCount,
            slidesToShow,
            infinite,
        }) +
        slideCount
    );
};

export const getIndexForAction = (current: number, target: number, childrenCount: number) => {
    let previousActive = current;
    let active = target;
    let infiniteActive = target;

    if (infiniteActive < 0) {
        infiniteActive += childrenCount;

        if (previousActive < 0) {
            previousActive = current += childrenCount;
            active = infiniteActive;
        }
    } else if (infiniteActive > childrenCount - 1) {
        infiniteActive -= childrenCount;

        if (previousActive > childrenCount - 1) {
            previousActive = current -= childrenCount;
            active = infiniteActive;
        }
    }

    return {
        previousActive,
        active,
        infiniteActive,
    };
};

export const canGoPrevious = (active: number, infinite?: boolean) => {
    if (infinite || active > 0) {
        return true;
    }

    return false;
};

export const canGoNext = (active: number, items: number, slidesToShow: number, infinite?: boolean) => {
    if (infinite || active < items - slidesToShow) {
        return true;
    }

    return false;
};

export const matchBreakpoint = (size: number, settings: CarouselSettings, breakpoints?: Breakpoint[]) => {
    if (breakpoints && breakpoints.length > 0) {
        const breakpoint = breakpoints
            .sort((breakpointA, breakpointB) => breakpointB.size - breakpointA.size)
            .find(findBreakpoint => findBreakpoint.size < size);

        return breakpoint?.settings || breakpoints[breakpoints.length - 1].settings;
    }

    return settings;
};

export const getSwipeDirection = (movementX: number) => {
    if (movementX < 0) {
        return SwipeDirection.Left;
    }

    return SwipeDirection.Right;
};

export const getSliderStyles = ({
    slideCount,
    slidesToShow = 1,
    center,
    centerPadding = 0,
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

    return {
        slideOffset,
        trackWidth,
        centerPadding,
        slideWidth: slideWidth || 0,
    };
};

const getTransform = (percentage: string, xValue: number) => `
    ${percentage}% {
        transform: translate3d(${xValue}px, 0px, 0px);
    }`;

export const getSlideAnimation = (
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
