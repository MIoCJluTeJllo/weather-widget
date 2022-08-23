import styled from 'styled-components';

import { BsWind, BsDroplet, BsThermometerHalf, BsTrash, BsArrowsMove } from 'react-icons/bs';

import { WeatherInfo } from '../../../types';
import WeatherParameter from './WeatherParameter';
import { useAppDispatch } from '../../../redux/hooks';
import { removeItem } from '../../../redux/reducers/weatherReducer';
import IconButton from '../../core/IconButton';
import { theme } from '../../../theme';

interface Props {
  data: WeatherInfo,
  mini?: boolean,
}

export default function WeatherCard({
  data: {
    id, country, icon, temp, description, feelsLike, wind, humidity, pressure,
  },
  mini = false
}: Props) {
  const dispatch = useAppDispatch();
  const handlerRemove = () => {
    dispatch(removeItem(id));
  };
  const tempFormat = (temp: number) => `${Math.round(temp)}°C`
  return (
    <Wrap>
      <Title>
        {mini &&
          <MoveIcon color={theme.main.colors.default} hoverColor={theme.main.colors.default_hov}>
            <BsArrowsMove size={24} />
          </MoveIcon>}
        {id}, {country}
        {mini &&
          <RemoveIcon
            handleClick={handlerRemove}
            color={theme.main.colors.error}
            hoverColor={theme.main.colors.error_hov}>
            <BsTrash size={24} />
          </RemoveIcon>}
      </Title>
      {!mini && <>
        <Header>
          <Main>
            <Value>{tempFormat(temp)}</Value>
            <Icon src={`https://openweathermap.org/img/w/${icon}.png`} />
          </Main>
          <Desc>
            {`${description}`}
            <Info>{`Feels like: ${tempFormat(feelsLike)}`}</Info>
          </Desc>
        </Header >
        <Body>
          <WeatherParameter
            text={`${wind}m/s`}
            Icon={BsWind} />
          <WeatherParameter
            text={`${humidity}%`}
            Icon={BsDroplet} />
          <WeatherParameter
            text={`${pressure}hPa`}
            Icon={BsThermometerHalf} />
        </Body>
      </>}
    </Wrap >
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.main.size * 3}px;
  padding: ${props => props.theme.main.size * 4}px;
  border-radius: 5px;
  border-bottom: solid ${props => props.theme.main.colors.default} 1px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: ${props => props.theme.main.size * 5}px;
  gap: ${props => props.theme.main.size}px;
  justify-content: space-between;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.main.size * 2}px;
  align-items: flex-start;
`;

const Body = styled.div`
  display: flex;
  gap: ${props => props.theme.main.size * 2}px;
  align-items: center;
`;

const Main = styled.div`
  display: flex;
`;

const Value = styled.div`
  font-size: ${props => props.theme.main.size * 9}px;
`;

const Icon = styled.img``;

const Desc = styled.div`
  font-size: ${props => props.theme.main.size * 5}px;
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
`;

const Info = styled.div`
  font-size: ${props => props.theme.main.size * 4}px;
`;

const MoveIcon = styled(IconButton)`
`;

const RemoveIcon = styled(IconButton)`
  margin-left: auto;
`;