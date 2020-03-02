import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Arrow from '../Arrow';

describe('Arrow', () => {
    const onClick = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should match the snapshot for Previous arrow', () => {
        const { container } = render(<Arrow type="previous" />);

        expect(container).toMatchSnapshot();
    });

    it('should match the snapshot for Next arrow', () => {
        const { container } = render(<Arrow type="next" />);

        expect(container).toMatchSnapshot();
    });

    it('should call onClick when enabled and clicked', () => {
        const { container } = render(<Arrow type="next" onClick={onClick} />);

        fireEvent.click(container.querySelector('button'));

        expect(onClick).toHaveBeenCalled();
    });

    it('should not call onClick when disabled and clicked', () => {
        const { container } = render(<Arrow type="next" onClick={onClick} disabled />);

        fireEvent.click(container.querySelector('button'));

        expect(onClick).not.toHaveBeenCalled();
    });
});
