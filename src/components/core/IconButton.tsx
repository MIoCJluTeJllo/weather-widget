import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode,
  handleClick?: () => void,
  color: string,
  hoverColor: string
}

export default function IconButton({
  children,
  handleClick,
  color,
  hoverColor
}: Props) {
  return (
    <Wrap
      hoverColor={hoverColor}
      color={color}
      onClick={handleClick}>
      {children}
    </Wrap>
  );
}

const Wrap = styled.div<{ color: string, hoverColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.color};
  &:hover {
    color: ${props => props.hoverColor};
  }
`;