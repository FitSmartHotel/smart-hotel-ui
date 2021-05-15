import axios from 'axios';
import { defaultValue, HotelNumber } from 'app/shared/model/number.model';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { ICrudDeleteAction, ICrudPutAction, ICrudSearchAction } from 'react-jhipster';

export const ACTION_TYPES = {
  FETCH_NUMBERS_AS_ADMIN: 'number/NUMBERS',
  FETCH_NUMBER: 'number/NUMBER',
  FETCH_USERS_NUMBERS: 'number/NUMBERS',
  CREATE_NUMBER: 'number/CREATE_NUMBER',
  ASSIGN_NUMBER: 'number/ASSIGN_NUMBER',
  DELETE_NUMBER: 'number/DELETE_NUMBER',
  LOCK_NUMBER: 'number/DELETE_NUMBER',
  SET_ALARM_STATE: 'number/SET_ALARM_STATE',
  UNLOCK_NUMBER: 'number/UNLOCK_NUMBER',
};

const initialState = {
  loading: false,
  errorMessage: null,
  numbers: [] as ReadonlyArray<HotelNumber>,
  number: defaultValue,
};

export type NumberState = Readonly<typeof initialState>;

// Reducer
export default (state: NumberState = initialState, action): NumberState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.CREATE_NUMBER):
    case REQUEST(ACTION_TYPES.FETCH_NUMBERS_AS_ADMIN):
    case REQUEST(ACTION_TYPES.DELETE_NUMBER):
    case REQUEST(ACTION_TYPES.FETCH_NUMBER):
    case REQUEST(ACTION_TYPES.FETCH_USERS_NUMBERS):
    case REQUEST(ACTION_TYPES.ASSIGN_NUMBER):
    case REQUEST(ACTION_TYPES.LOCK_NUMBER):
    case REQUEST(ACTION_TYPES.UNLOCK_NUMBER):
    case REQUEST(ACTION_TYPES.SET_ALARM_STATE):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERS_NUMBERS):
    case SUCCESS(ACTION_TYPES.FETCH_NUMBERS_AS_ADMIN):
      return {
        ...state,
        loading: false,
        numbers: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.LOCK_NUMBER):
    case SUCCESS(ACTION_TYPES.UNLOCK_NUMBER):
    case SUCCESS(ACTION_TYPES.FETCH_NUMBER):
    case SUCCESS(ACTION_TYPES.CREATE_NUMBER):
    case SUCCESS(ACTION_TYPES.SET_ALARM_STATE):
      return {
        ...state,
        loading: false,
        number: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.ASSIGN_NUMBER):
    case SUCCESS(ACTION_TYPES.DELETE_NUMBER):
      return {
        ...state,
        loading: false,
        number: defaultValue,
      };
    case FAILURE(ACTION_TYPES.CREATE_NUMBER):
    case FAILURE(ACTION_TYPES.FETCH_NUMBERS_AS_ADMIN):
    case FAILURE(ACTION_TYPES.DELETE_NUMBER):
    case FAILURE(ACTION_TYPES.FETCH_NUMBER):
    case FAILURE(ACTION_TYPES.FETCH_USERS_NUMBERS):
    case FAILURE(ACTION_TYPES.ASSIGN_NUMBER):
    case FAILURE(ACTION_TYPES.LOCK_NUMBER):
    case FAILURE(ACTION_TYPES.UNLOCK_NUMBER):
    case FAILURE(ACTION_TYPES.SET_ALARM_STATE):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export const getNumbersAsAdmin = () => {
  return {
    type: ACTION_TYPES.FETCH_NUMBERS_AS_ADMIN,
    payload: axios.get<HotelNumber>('api/numbers/admin'),
  };
};

export const setAlarmState: ICrudPutAction<any> = payload => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.LOCK_NUMBER,
    payload: axios.put(`api/numbers/${payload.number}/management/alarm?enable=${payload.enabled}`),
  });
  dispatch(getUserNumbers());
  return result;
};

export const lockNumber: ICrudPutAction<HotelNumber> = number => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.LOCK_NUMBER,
    payload: axios.put(`api/numbers/${number}/management/lock`),
  });
  dispatch(getUserNumbers());
  return result;
};

export const unlockNumber: ICrudPutAction<HotelNumber> = number => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UNLOCK_NUMBER,
    payload: axios.put(`api/numbers/${number}/management/unlock`),
  });
  dispatch(getUserNumbers());
  return result;
};

export const getUserNumbers = () => {
  return {
    type: ACTION_TYPES.FETCH_USERS_NUMBERS,
    payload: axios.get<HotelNumber>('api/numbers/assigned'),
  };
};

export const getNumber = number => {
  return {
    type: ACTION_TYPES.FETCH_NUMBER,
    payload: axios.get<HotelNumber>(`api/numbers/${number}`),
  };
};

export const deleteNumber: ICrudDeleteAction<HotelNumber> = number => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NUMBER,
    payload: axios.delete(`api/numbers/${number}`),
  });
  dispatch(getNumbersAsAdmin());
  return result;
};

export const assignNumber: ICrudPutAction<any> = payload => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.ASSIGN_NUMBER,
    payload: axios.post<HotelNumber>(`api/numbers/${payload.number}/assign`, { userId: payload.userId }),
  });
  dispatch(getNumbersAsAdmin());
  return result;
};

export const createNumber = (number: string, level: string, price: number) => {
  return {
    type: ACTION_TYPES.CREATE_NUMBER,
    payload: axios.post<HotelNumber>('api/numbers', { number, level, price }),
  };
};
