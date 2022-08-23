import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchWeatherByCity } from '../../redux/reducers/weatherReducer';
import { BUTTON_PROPS, BUTTON_TYPE } from '../../types';

import Falling from '../core/Falling';
import Modal from '../core/Modal';


export default function GeoRequestModal() {
  const dispatch = useAppDispatch();
  const city = useAppSelector(state => state.weather.current);
  const [close, setClose] = useState<boolean>(false);
  const handlerConfirm = () => {
    if (city) {
      dispatch(fetchWeatherByCity(city.id));
      setClose(true);
    }
  }
  const handlerCancel = () => {
    setClose(true);
  }
  const buttons: BUTTON_PROPS[] = [
    { children: 'Confirm', type: BUTTON_TYPE.SUCCESS, handlerClick: handlerConfirm },
    { children: 'Cancel', type: BUTTON_TYPE.CANCEL, handlerClick: handlerCancel },
  ];
  return (city ?
    <Falling fall={close}>
      <Modal buttons={buttons}>
        {`Is ${city.id} your city?`}
      </Modal>
    </Falling> : null
  );
}