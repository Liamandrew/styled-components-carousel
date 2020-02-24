import React from 'react';
import { render } from '@testing-library/react';
import Carousel from '../Carousel';

it('should render a carousel', () => {
    const text = 'hello world';
    const { getByText } = render(
        <Carousel>
            <div>{text}</div>
        </Carousel>,
    );
    expect(getByText(text)).toBeInTheDocument();
});
