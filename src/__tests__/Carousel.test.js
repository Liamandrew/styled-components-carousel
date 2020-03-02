import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import Carousel from '../Carousel';

describe('Carousel', () => {
    it('should render a carousel with default settings', () => {
        const text = 'hello world';
        const { container, getByText, getByTestId } = render(
            <Carousel>
                <div>{text}</div>
            </Carousel>,
        );

        expect(getByText(text)).toBeInTheDocument();
        expect(getByTestId('carousel-indicator-0')).toBeInTheDocument();
        expect(getByTestId('arrow-next')).toBeInTheDocument();
        expect(getByTestId('arrow-previous')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('should not show arrows or indicators if disabled', () => {
        const text = 'hello world';
        const { queryByTestId } = render(
            <Carousel showArrows={false} showIndicator={false}>
                <div>{text}</div>
            </Carousel>,
        );

        expect(queryByTestId('carousel-indicator-0')).not.toBeInTheDocument();
        expect(queryByTestId('arrow-next')).not.toBeInTheDocument();
        expect(queryByTestId('arrow-previous')).not.toBeInTheDocument();
    });
});
