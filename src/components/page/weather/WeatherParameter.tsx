import styled from 'styled-components';

interface Props {
  Icon: any,
  text: string,
  size?: number
}

export default function WeatherParameter({
  Icon,
  text,
  size = 24
}: Props) {
  return (
    <Wrap>
      <Icon size={size} />
      <Value>{text}</Value>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.main.size}px;
`;

const Value = styled.div``;