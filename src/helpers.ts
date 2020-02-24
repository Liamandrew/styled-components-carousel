import { Breakpoint, CarouselSettings } from './Carousel';

type SlideCountParams = {
    slideCount: number;
    slidesToShow: number;
    infinite?: boolean;
    center?: boolean;
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
