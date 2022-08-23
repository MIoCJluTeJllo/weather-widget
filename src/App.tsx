import { ReactNode, useEffect, useState } from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { checkGeoLocationSupport, getGeolocation } from './services/geolocation';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchWeatherByCity, fetchWeatherByLocation } from './redux/reducers/weatherReducer';

import { getCitiest } from './services/storage';

import WeatherPage from './components/page/WeatherPage';
import GeoRequestModal from './components/modal/GeoRequestModal';
import GeoDisabledModal from './components/modal/GeoDisabledModal';
import InfoModal from './components/core/InfoModal';


export default function App() {
  const mode = useAppSelector(state => state.weather.mode);
  const status = useAppSelector(state => state.weather.status);
  const error = useAppSelector(state => state.weather.error);
  const dispatch = useAppDispatch();
  const [GeoModal, setGeoModal] = useState<ReactNode>(null);
  useEffect(() => {
    getCitiest().map((city: string) => dispatch(fetchWeatherByCity(city)))
  }, []);
  useEffect(() => {
    if (getCitiest().length === 0 && checkGeoLocationSupport()) {
      getGeolocation(
        (lat, lon) => {
          dispatch(fetchWeatherByLocation({ lat, lon }))
          setGeoModal(<GeoRequestModal />);
        },
        () => {
          setGeoModal(<GeoDisabledModal />);
        })
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Wrap>
        <WeatherPage />
        {GeoModal}
        {status === 'failed' && mode == 'settings' && <InfoModal text={error} />}
      </Wrap>
    </ThemeProvider>
  );
}

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;