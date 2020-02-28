import styled from 'styled-components';

type Props = {
    width: number;
    key: string;
};

const Slide = styled.div.attrs<Props>(props => ({
    width: props.width || 0,
    key: props.key,
}))<Props>`
    display: block;
    width: ${props => props.width}px;
    outline: currentcolor none medium;
`;

export default Slide;
