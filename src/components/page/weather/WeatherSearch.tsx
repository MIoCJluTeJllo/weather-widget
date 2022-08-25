import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../theme';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchWeatherByCity } from '../../../redux/reducers/weatherReducer';

import { BsPlusSquare } from 'react-icons/bs';
import ClockLoader from "react-spinners/ClockLoader";

import IconButton from '../../core/IconButton';
import Input from '../../core/Input';


export default function WeatherSearch() {
  const status = useAppSelector(state => state.weather.status);
  const dispatch = useAppDispatch();
  const [searched, setSearched] = useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearched(event.target.value);
  };
  const handleSearch = () => {
    if (searched) {
      dispatch(fetchWeatherByCity(searched));
    }
  }
  return (
    <Wrap>
      <Input
        handleConfirm={handleSearch}
        handleChange={handleChange}
        placehoder={'City name...'} />
      <IconButton
        color={theme.main.colors.default}
        hoverColor={theme.main.colors.default_hov}
        handleClick={handleSearch}>
        {status == 'loading' ?
          <ClockLoader
            size={24}
            color={theme.main.colors.default_hov} /> :
          <BsPlusSquare size={24} />}
      </IconButton>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  height: 24px;
  width: 100%;
  gap: ${props => props.theme.main.size * 2}px;
`;