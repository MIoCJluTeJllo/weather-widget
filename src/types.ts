export interface WeatherInfo {
  id: string,
  icon: string,
  country: string,
  temp: number,
  humidity: number,
  wind: number,
  pressure: number,
  feelsLike: number,
  description: string
}

export enum BUTTON_TYPE {
  SUCCESS,
  CANCEL,
  DEFAULT
}

export interface BUTTON_PROPS {
  children: string,
  handlerClick: () => void,
  type?: BUTTON_TYPE
}