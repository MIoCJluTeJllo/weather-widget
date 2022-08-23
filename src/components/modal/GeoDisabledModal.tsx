import { useState } from 'react';
import { BUTTON_PROPS, BUTTON_TYPE } from '../../types';

import Falling from '../core/Falling';
import Modal from '../core/Modal';


export default function GeoDisabledModal() {
  const [close, setClose] = useState<boolean>(false);
  const handlerClose = () => {
    setClose(true);
  }
  const buttons: BUTTON_PROPS[] = [
    { children: 'Close', type: BUTTON_TYPE.DEFAULT, handlerClick: handlerClose }
  ];
  return (
    <Falling fall={close}>
      <Modal buttons={buttons}>
        {'Enable geolocation or click the "close" button'}
      </Modal>
    </Falling>
  );
}