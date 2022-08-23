import { ReactNode } from 'react';
import styled from 'styled-components';
import { BUTTON_PROPS } from '../../types';
import Button from './Button';

interface Props {
  children: ReactNode,
  buttons: BUTTON_PROPS[];
}

export default function Modal({
  children,
  buttons
}: Props) {
  return (
    <Wrap>
      <Text>{children}</Text>
      <Buttons>
        {buttons.map(({ children, handlerClick, type }, index) =>
          <Button key={index} type={type} handlerClick={handlerClick}>{children}</Button>)}
      </Buttons>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.main.size * 3}px;
`;

const Text = styled.div`
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  gap: ${props => props.theme.main.size}px;
`;