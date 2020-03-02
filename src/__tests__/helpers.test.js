import {
    getPreSlideCount,
    getPostSlideCount,
    getTotalSlideCount,
    getIndexForAction,
    canGoPrevious,
    canGoNext,
    matchBreakpoint,
    getSwipeDirection,
} from '../helpers';

describe('helpers', () => {
    describe('getPreSlideCount', () => {
        it('should return 0 if infinite is false', () => {
            const result = getPreSlideCount({ infinite: false });

            expect(result).toEqual(0);
        });

        describe('infinite', () => {
            it('should return slidesToShow if it is greater than slideCount', () => {
                const result = getPreSlideCount({ infinite: true, slidesToShow: 4, slideCount: 2 });

                expect(result).toEqual(4);
            });

            it('should return slideCount if it is greater than slidesToShow', () => {
                const result = getPreSlideCount({ infinite: true, slidesToShow: 2, slideCount: 4 });

                expect(result).toEqual(4);
            });

            describe('center', () => {
                it('should return slidesToShow + 1 if it is greater than slideCount with center as true', () => {
                    const result = getPreSlideCount({ infinite: true, slidesToShow: 4, slideCount: 2, center: true });

                    expect(result).toEqual(5);
                });

                it('should return slideCount + 1 if it is greater than slidesToShow with center as true', () => {
                    const result = getPreSlideCount({ infinite: true, slidesToShow: 2, slideCount: 4, center: true });

                    expect(result).toEqual(5);
                });
            });
        });
    });

    describe('getPostSlideCount', () => {
        it('should return 0 if infinite is false', () => {
            const result = getPostSlideCount({ infinite: false });

            expect(result).toEqual(0);
        });

        describe('infinite', () => {
            it('should correctly calculate infinite post slide count', () => {
                const result = getPostSlideCount({ infinite: true, slideCount: 2, slidesToShow: 3 });

                expect(result).toEqual(6);
            });
        });
    });

    describe('getTotalSlideCount', () => {
        it('should return 1 when slideCount is 1', () => {
            const result = getTotalSlideCount({ slideCount: 1 });

            expect(result).toEqual(1);
        });

        it('should correctly add pre slide and post slide count', () => {
            const result = getTotalSlideCount({ slideCount: 3, infinite: true, center: true, slidesToShow: 5 });

            expect(result).toEqual(18);
        });
    });

    describe('getIndexForAction', () => {
        it('should return correct values when target is less than 0', () => {
            const current = 0;
            const target = -1;
            const childrenCount = 3;
            const result = getIndexForAction(current, target, childrenCount);

            expect(result).toEqual({
                previousActive: 0,
                active: -1,
                infiniteActive: 2,
            });
        });

        it('should return correct values when current and target is less than 0', () => {
            const current = -1;
            const target = -2;
            const childrenCount = 3;
            const result = getIndexForAction(current, target, childrenCount);

            expect(result).toEqual({
                previousActive: 2,
                active: 1,
                infiniteActive: 1,
            });
        });

        it('should return correct values when the target is greater than the children count - 1', () => {
            const current = 2;
            const target = 3;
            const childrenCount = 3;
            const result = getIndexForAction(current, target, childrenCount);

            expect(result).toEqual({
                previousActive: 2,
                active: 3,
                infiniteActive: 0,
            });
        });

        it('should return correct values when current and target is greater than the children count - 1', () => {
            const current = 3;
            const target = 4;
            const childrenCount = 3;
            const result = getIndexForAction(current, target, childrenCount);

            expect(result).toEqual({
                previousActive: 0,
                active: 1,
                infiniteActive: 1,
            });
        });
    });

    describe('canGoPrevious', () => {
        it('should return true if infinite', () => {
            const active = 3;
            const infinite = true;
            const result = canGoPrevious(active, infinite);

            expect(result).toBeTruthy();
        });

        it('should return true if active is greater than 0', () => {
            const active = 1;
            const result = canGoPrevious(active);

            expect(result).toBeTruthy();
        });

        it('should return false if active is 0', () => {
            const active = 0;
            const result = canGoPrevious(active);

            expect(result).toBeFalsy();
        });

        it('should return false if active is less than 0', () => {
            const active = -1;
            const result = canGoPrevious(active);

            expect(result).toBeFalsy();
        });
    });

    describe('canGoNext', () => {
        it('should return true if infinite', () => {
            const active = 3;
            const items = 3;
            const slidesToShow = 3;
            const infinite = true;
            const result = canGoNext(active, items, slidesToShow, infinite);

            expect(result).toBeTruthy();
        });

        it('should return true if active is less than items - slidesToShow', () => {
            const active = 0;
            const items = 5;
            const slidesToShow = 3;
            const infinite = false;
            const result = canGoNext(active, items, slidesToShow, infinite);

            expect(result).toBeTruthy();
        });

        it('should return false if active is equal to items - slidesToShow', () => {
            const active = 2;
            const items = 5;
            const slidesToShow = 3;
            const infinite = false;
            const result = canGoNext(active, items, slidesToShow, infinite);

            expect(result).toBeFalsy();
        });
    });

    describe('matchBreakpoint', () => {
        it('should return the basic settings if breakpoints is undefined', () => {
            const size = 100;
            const settings = {
                swipeable: false,
                slidesToShow: 5,
                infinite: false,
            };
            const breakpoints = undefined;
            const result = matchBreakpoint(size, settings, breakpoints);

            expect(result).toEqual(settings);
        });

        it('should return the basic settings if breakpoints is an empty array', () => {
            const size = 100;
            const settings = {
                swipeable: false,
                slidesToShow: 5,
                infinite: false,
            };
            const breakpoints = [];
            const result = matchBreakpoint(size, settings, breakpoints);

            expect(result).toEqual(settings);
        });

        it('should return the correct settings if breakpoints exists', () => {
            const size = 45;
            const settings = {
                swipeable: false,
                slidesToShow: 5,
                infinite: false,
            };
            const settingsSmall = {
                size: 50,
                settings: {
                    swipeable: false,
                    slidesToShow: 2,
                    infinite: false,
                },
            };
            const settingsLarge = {
                size: 75,
                settings: {
                    swipeable: true,
                    slidesToShow: 5,
                    infinite: true,
                },
            };
            const breakpoints = [settingsSmall, settingsLarge];
            const result = matchBreakpoint(size, settings, breakpoints);

            expect(result).toEqual(settingsSmall.settings);
        });

        it('should return the largest setting if it\'s a match', () => {
            const size = 100;
            const settings = {
                swipeable: false,
                slidesToShow: 5,
                infinite: false,
            };
            const settingsSmall = {
                size: 50,
                settings: {
                    swipeable: false,
                    slidesToShow: 2,
                    infinite: false,
                },
            };
            const settingsLarge = {
                size: 75,
                settings: {
                    swipeable: true,
                    slidesToShow: 5,
                    infinite: true,
                },
            };
            const breakpoints = [settingsSmall, settingsLarge];
            const result = matchBreakpoint(size, settings, breakpoints);

            expect(result).toEqual(settingsLarge.settings);
        });

        it('should return the largest setting if there is no match', () => {
            const size = 80;
            const settings = {
                swipeable: false,
                slidesToShow: 5,
                infinite: false,
            };
            const settingsSmall = {
                size: 50,
                settings: {
                    swipeable: false,
                    slidesToShow: 2,
                    infinite: false,
                },
            };
            const settingsLarge = {
                size: 75,
                settings: {
                    swipeable: true,
                    slidesToShow: 5,
                    infinite: true,
                },
            };
            const breakpoints = [settingsSmall, settingsLarge];
            const result = matchBreakpoint(size, settings, breakpoints);

            expect(result).toEqual(settingsLarge.settings);
        });
    });

    describe('getSwipeDirection', () => {
        it('should return Left when movement is less than 0', () => {
            const result = getSwipeDirection(-1);

            expect(result).toEqual('Left');
        });

        it('should return Right when movement is greater than 0', () => {
            const result = getSwipeDirection(1);

            expect(result).toEqual('Right');
        });
    });
});
