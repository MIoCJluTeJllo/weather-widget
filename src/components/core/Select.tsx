import styled from 'styled-components';

interface Props {
  items: string[]
}

export default function Select ({ items } : Props) {
  return (
    <Wrap>
      { items.map(text => (
        <Item>
          {text}
        </Item>
      )) }
    </Wrap>
  );
}

const Wrap = styled.div`
`;

const Item = styled.div`
`;