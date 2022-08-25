import styled from 'styled-components';

interface Props {
  placehoder: string,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleConfirm?: () => void
}


export default function Input({
  placehoder,
  handleChange,
  handleConfirm = () => { } }: Props) {
  const pressEnter = (key: string) => {
    if (key === 'Enter') {
      handleConfirm()
    }
  }
  return (
    <Wrap
      onKeyPress={event => pressEnter(event.key)}
      onChange={handleChange}
      placeholder={placehoder} />
  );
}

const Wrap = styled.input`
  outline: none;
  border: none;
  width: 100%;
  border-radius: ${props => props.theme.main.size * 2}px;
  padding: ${props => props.theme.main.size}px ${props => props.theme.main.size * 2}px;
`;