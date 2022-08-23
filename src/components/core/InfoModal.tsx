import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  text?: string,
  time?: number
}

export default function InfoModal({
  text = 'Undefined',
  time = 1500
}: Props) {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    var timer = setTimeout(() => {
      setHide(true)
    }, time)
    return () => clearTimeout(timer)
  }, []);
  return (
    !hide ?
      <Wrap time={time}>
        <Text>
          {text}
        </Text>
      </Wrap> : null
  );
}

const Wrap = styled.div<{ time: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 3;
  bottom: ${props => props.theme.main.size * 2}px;
  width: inherit;
  animation: hide ${props => props.time / 1000}s ease-in;
  @keyframes hide {
    to {
      opacity: 0;
    }
  }
`;

const Text = styled.div`
  padding: ${props => props.theme.main.size}px ${props => props.theme.main.size * 3}px;
  border-radius: ${props => props.theme.main.size * 2}px;
  background: ${props => props.theme.main.colors.info};
`;