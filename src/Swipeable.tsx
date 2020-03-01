import React, { useState } from 'react';
import { getSwipeDirection } from './helpers';

export enum SwipeDirection {
    Left = 'Left',
    Right = 'Right',
}

type Props = {
    xMovementTrigger: number;
    swipeable?: boolean;
    onSwipe?: (direction: SwipeDirection) => void;
};

const initialState = {
    swiping: false,
    movementX: 0,
};

const Swipeable: React.FC<Props> = ({ swipeable, xMovementTrigger, onSwipe, children }) => {
    const [swipingState, setSwipingState] = useState(initialState);

    const onSwipeStart = (event: React.MouseEvent<HTMLDivElement>) => {
        if (swipeable) {
            setSwipingState({
                swiping: true,
                movementX: event.movementX,
            });
        }
    };

    const onSwipeMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (swipingState.swiping) {
            setSwipingState({
                ...swipingState,
                movementX: swipingState.movementX + event.movementX,
            });
        }
    };

    const onSwipeEnd = () => {
        if (swipingState.swiping) {
            if (xMovementTrigger < Math.abs(swipingState.movementX)) {
                if (onSwipe) onSwipe(getSwipeDirection(swipingState.movementX));
            }

            setSwipingState({
                ...swipingState,
                movementX: 0,
                swiping: false,
            });
        }
    };

    return (
        <div
            onMouseDown={onSwipeStart}
            onMouseMove={onSwipeMove}
            onMouseUp={onSwipeEnd}
            style={{
                transform: `translate3d(${swipingState.movementX}px, 0px, 0px)`,
            }}
        >
            {children}
        </div>
    );
};

export default Swipeable;
