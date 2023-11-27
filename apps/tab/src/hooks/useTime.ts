import { useContext } from 'react';

import { TimeContext } from '../context/TimeProvider';

export function useTime(type: 'absolute' | 'zoned' = 'zoned') {
  return useContext(TimeContext)[type];
}
