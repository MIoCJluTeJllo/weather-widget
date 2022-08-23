import styled from 'styled-components';

interface Props {
  placehoder: string,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}


export default function Input({
  placehoder,
  handleChange }: Props) {
  return (
    <Wrap
      onChange={handleChange}
      placeholder={placehoder} />
  );
}

const Wrap = styled.input`
  outline: none;
  border: none;
  width: 100%;
`;