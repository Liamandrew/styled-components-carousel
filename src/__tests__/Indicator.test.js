import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import Indicator from '../Indicator';

describe('Indicator', () => {
    const onClick = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should match the snapshot', () => {
        const { container } = render(<Indicator items={3} slidesToShow={2} infinite active={2} onClick={onClick} />);

        expect(container).toMatchSnapshot();
    });

    it('should match the snapshot when slides to show is greater than items', () => {
        const { container } = render(<Indicator items={3} slidesToShow={4} infinite active={2} onClick={onClick} />);

        expect(container).toMatchSnapshot();
    });

    it('should call onClick with the correct index', () => {
        const { container } = render(<Indicator items={3} slidesToShow={2} infinite active={2} onClick={onClick} />);

        fireEvent.click(getByTestId(container, 'carousel-indicator-1'));

        expect(onClick).toHaveBeenCalledWith(1);
    });
});
