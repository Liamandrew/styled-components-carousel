import React from 'react';
import styled from 'styled-components';

export enum ArrowType {
    previous = 'previous',
    next = 'next',
}

type Props = {
    type: ArrowType;
    disabled?: boolean;
    onClick: () => void;
};

const Arrow = styled.button<Partial<Props>>`
    width: 32px;
    height: 32px;
    padding: 8px;
    border: 1px solid #dddddd;
    border-radius: 50%;
    outline: 0;
    background-color: ${props => (props.disabled ? '#F3F3F3' : '#FFFFFF')};
`;

const Component: React.FC<Props> = ({ type, onClick, disabled }) =>
    type === ArrowType.previous ? (
        <Arrow disabled={disabled} onClick={onClick} data-testid="arrow-previous">
            &#8249;
        </Arrow>
    ) : (
        <Arrow disabled={disabled} onClick={onClick} data-testid="arrow-next">
            &#8250;
        </Arrow>
    );

export default Component;
