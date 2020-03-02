import React from 'react';
import { render } from '@testing-library/react';
import Slide from '../Slide';

describe('Slide', () => {
    it('should match the snapshot when width is defined', () => {
        const { container } = render(<Slide width={300} />);

        expect(container).toMatchSnapshot();
    });

    it('should match the snapshot when width is undefined', () => {
        const { container } = render(<Slide />);

        expect(container).toMatchSnapshot();
    });
});
