import React from 'react';
import { render } from '@testing-library/react';
import Track from '../Track';

describe('Track', () => {
    it('should match the snapshot', () => {
        const { container } = render(
            <Track
                width={300}
                center={false}
                centerPadding={15}
                previousActive={1}
                active={0}
                infiniteActive={0}
                slideWidth={70}
                slideOffset={30}
            />,
        );

        expect(container).toMatchSnapshot();
    });

    it('should match the snapshot for center track', () => {
        const { container } = render(
            <Track
                width={300}
                center
                centerPadding={15}
                previousActive={1}
                active={0}
                infiniteActive={0}
                slideWidth={70}
                slideOffset={30}
            />,
        );

        expect(container).toMatchSnapshot();
    });
});
