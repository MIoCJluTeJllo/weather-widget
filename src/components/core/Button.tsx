import styled, { css } from 'styled-components';
import { BUTTON_PROPS, BUTTON_TYPE } from '../../types';

export default function Button({
  children,
  type = BUTTON_TYPE.DEFAULT,
  handlerClick
}: BUTTON_PROPS) {
  return (
    <Wrap
      variant={type}
      onClick={handlerClick}>
      {children}
    </Wrap>
  );
}

const Wrap = styled.button<{ variant: BUTTON_TYPE }> `
  border-radius: ${props => props.theme.main.size * 2}px;
  padding: ${props => props.theme.main.size * 2}px ${props => props.theme.main.size * 4}px;
  border: solid 1px black;
  background-color: #fff;
  &:hover {
    color: #fff;
    transition-duration: 0.4s;
  }
  &:active {
    transition-duration: 0s;
  }
  ${(props) => {
    switch (props.variant) {
      case BUTTON_TYPE.SUCCESS:
        return css`
          border-color: ${props => props.theme.main.colors.success_hov};
          &:hover {
            background-color: ${props => props.theme.main.colors.success_hov};
          }
          &:active {
            box-shadow: 2px 2px 5px ${props => props.theme.main.colors.success_hov};
          }
        `;
      case BUTTON_TYPE.CANCEL:
        return css`
          border-color: ${props => props.theme.main.colors.default_hov};
          &:hover {
            background-color: ${props => props.theme.main.colors.default_hov};
          }
          &:active {
            box-shadow: 2px 2px 5px ${props => props.theme.main.colors.default_hov};
          }
        `;
      case BUTTON_TYPE.DEFAULT:
      default:
        return css`
          border-color: ${props => props.theme.main.colors.primary_hov};
          &:hover {
            background-color: ${props => props.theme.main.colors.primary_hov};
          }
          &:active {
            box-shadow: 2px 2px 5px ${props => props.theme.main.colors.primary_hov};
          }
        `;
    }
  }}
`;