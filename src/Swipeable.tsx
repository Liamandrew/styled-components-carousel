import React, { useState } from 'react';

type Props = {
    swipeable?: boolean;
};

const initialState = {
    swiping: false,
    movementX: 0,
};

const Swipeable: React.FC<Props> = ({ swipeable, children }) => {
    const [swipingState, setSwipingState] = useState(initialState);

    const onSwipeStart = (event: React.MouseEvent<HTMLDivElement>) => {
        if (swipeable) {
            setSwipingState({
                swiping: true,
                movementX: 0,
            });
        }
    };

    const onSwipe = (event: React.MouseEvent<HTMLDivElement>) => {
        if (swipingState.swiping) {
            setSwipingState({
                ...swipingState,
                movementX: swipingState.movementX + event.movementX,
            });
        }
    };

    const onSwipeEnd = () => {
        if (swipingState.swiping) {
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
            onMouseMove={onSwipe}
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
