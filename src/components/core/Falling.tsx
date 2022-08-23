import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  children: ReactNode,
  fall?: boolean
}

export default function Falling({
  children,
  fall = false
}: Props) {
  return (
    <Wrap fall={fall}>
      {children}
    </Wrap>
  );
}

const Wrap = styled.div<{ fall: boolean }>`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: #fff;
  animation: fallingAbove ${props => props.theme.main.duration * 2}s;
  @keyframes fallingAbove {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0%);
      opacity: 1;
    }
  }
  ${props => props.fall && css`
    transition: 2s;
    transform: translateY(45%);
    opacity: 0;
  `}
`;