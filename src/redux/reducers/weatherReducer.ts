import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_KEY } from '../../const';
import { api } from '../../services/api';
import { getCitiest, saveCities } from '../../services/storage';
import { WeatherInfo } from '../../types';

interface WeatherState {
  current?: WeatherInfo,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  list: WeatherInfo[],
  error?: string,
  mode: 'settings' | 'view'
}

const initialState: WeatherState = {
  mode: 'view',
  status: 'idle',
  list: []
}

export const fetchWeatherByCity = createAsyncThunk('weater/fetchWeatherByCity', async (city: string) => {
  const response = await api.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  return response.data;
})

export const fetchWeatherByLocation = createAsyncThunk('weater/fetchWeatherByLocation', async ({ lat, lon }: { lat: number, lon: number }) => {
  const response = await api.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  return response.data;
})

const getWeatherPayload = (actionPayload: any) => {
  const weatherList = actionPayload.weather;
  const { icon, main: weather, description } = weatherList[0];
  const {
    name: id,
    sys: { country },
    main: {
      temp,
      feels_like: feelsLike,
      humidity,
      pressure
    },
    wind: { speed: wind }
  } = actionPayload;
  return { id, icon, country, temp, humidity, wind, pressure, weather, feelsLike, description, };
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.list = [...state.list, action.payload];
      saveCities(state.list.map(({ id }) => id));
    },
    removeItem: (state, action) => {
      state.list = state.list.filter(({ id }) => action.payload !== id);
      saveCities(state.list.map(({ id }) => id));
    },
    updateList: (state, action) => {
      state.list = action.payload;
      saveCities(state.list.map(({ id }) => id));
    },
    switchMode: (state, action) => {
      state.mode = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeatherByCity.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const newWeather = getWeatherPayload(action.payload);
        if (!state.list.find(({ id }) => id === newWeather.id)) {
          state.list = [...state.list, newWeather];
          saveCities(state.list.map(({ id }) => id));
        } else {
          state.status = 'failed';
          state.error = 'already added'
        }
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchWeatherByLocation.fulfilled, (state, action) => {
        const newWeather = getWeatherPayload(action.payload);
        state.current = newWeather;
      })
  },
})

export const { removeItem, addItem, updateList, switchMode } = weatherSlice.actions

export default weatherSlice.reducer