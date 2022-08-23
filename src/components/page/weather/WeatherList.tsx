import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { updateList } from '../../../redux/reducers/weatherReducer';

import { WeatherInfo } from '../../../types';
import { ReactSortable } from "react-sortablejs"

import WeatherCard from './WeatherCard';
import { useEffect, useState } from 'react';

interface Props {
  items: WeatherInfo[],
  miniMode?: boolean
}

export default function WeatherList({
  items
}: Props) {
  const mode = useAppSelector(state => state.weather.mode);
  const dispatch = useAppDispatch();
  const [list, setList] = useState(items);
  useEffect(() => {
    setList(items)
  }, [items]);
  const replace = (replacedList: WeatherInfo[]) => {
    if (replacedList.length) {
      dispatch(updateList(replacedList));
    }
  }
  return (
    <>
      <Wrap
        hide={list.length === 0}
        list={list.map(x => ({ ...x, chosen: true }))}
        setList={(replacedList: any) => replace(replacedList)}>
        {items.map(item =>
          <WeatherCard key={item.id} mini={mode === 'settings'} data={item} />
        )}
      </Wrap>
      <Info hide={list.length !== 0} miniMode={mode === 'settings'}>
        {mode === 'view' ? 'Click settings to add an item' : 'Find and add a city'}
      </Info>
    </>
  );
}

const Wrap = styled(ReactSortable) <{ hide: boolean }>`
  height: 100%;
  display: ${props => props.hide && 'none'};
`;

const Info = styled.div<{ miniMode: boolean, hide: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: ${props => !props.miniMode ?
    props.theme.main.colors.default :
    props.theme.main.colors.default_hov};
  display: ${props => props.hide && 'none'};
`;