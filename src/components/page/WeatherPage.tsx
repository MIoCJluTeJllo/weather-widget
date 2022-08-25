import styled from 'styled-components';
import { theme } from '../../theme';

import { BsEye, BsGearFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import WeatherList from './weather/WeatherList';
import WeatherSearch from './weather/WeatherSearch';
import IconButton from '../core/IconButton';
import { switchMode } from '../../redux/reducers/weatherReducer';


export default function WeatherPage() {
  const dispatch = useAppDispatch();
  const list = useAppSelector(state => state.weather.list);
  const mode = useAppSelector(state => state.weather.mode);
  return (
    <Wrap>
      <Header>
        {mode === 'settings' ?
          <>
            <IconButton
              handleClick={() => dispatch(switchMode('view'))}
              color={theme.main.colors.default}
              hoverColor={theme.main.colors.default_hov}>
              <BsEye size={24} />
            </IconButton>
            <WeatherSearch />
          </> :
          <IconButton
            handleClick={() => dispatch(switchMode('settings'))}
            color={theme.main.colors.default}
            hoverColor={theme.main.colors.default_hov}>
            <BsGearFill />
          </IconButton>}
      </Header>
      <WeatherList
        items={list} />
    </Wrap>
  );
}

const Wrap = styled.div`
  height: 100%;
  width: 100%;
  z-index: 1;
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: ${props => props.theme.main.size * 2}px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${props => props.theme.main.colors.default}; 
    border-radius: ${props => props.theme.main.size * 4}px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.main.colors.default}; 
    border-radius: ${props => props.theme.main.size * 4}px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.main.colors.default_hov};
  }
`;

const Header = styled.div`
  padding: ${props => props.theme.main.size * 2}px ${props => props.theme.main.size * 4}px;
  display: flex;
  align-items: center;
  height: 24px;
  gap: ${props => props.theme.main.size * 2}px;
`;