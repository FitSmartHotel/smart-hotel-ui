import axios from 'axios';
import { defaultValue, HotelNumber } from 'app/shared/model/number.model';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { ICrudDeleteAction, ICrudPutAction, ICrudSearchAction } from 'react-jhipster';

export const ACTION_TYPES = {
  FETCH_NUMBERS: 'number/NUMBERS',
  FETCH_NUMBER: 'number/NUMBER',
  CREATE_NUMBER: 'number/CREATE_NUMBER',
  ASSIGN_NUMBER: 'number/ASSIGN_NUMBER',
  DELETE_NUMBER: 'number/DELETE_NUMBER',
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
    case REQUEST(ACTION_TYPES.FETCH_NUMBERS):
    case REQUEST(ACTION_TYPES.DELETE_NUMBER):
    case REQUEST(ACTION_TYPES.FETCH_NUMBER):
    case REQUEST(ACTION_TYPES.ASSIGN_NUMBER):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(ACTION_TYPES.FETCH_NUMBERS):
      return {
        ...state,
        loading: false,
        numbers: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_NUMBER):
    case SUCCESS(ACTION_TYPES.CREATE_NUMBER):
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
    case FAILURE(ACTION_TYPES.FETCH_NUMBERS):
    case FAILURE(ACTION_TYPES.DELETE_NUMBER):
    case FAILURE(ACTION_TYPES.FETCH_NUMBER):
    case FAILURE(ACTION_TYPES.ASSIGN_NUMBER):
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

export const getNumbers = () => {
  return {
    type: ACTION_TYPES.FETCH_NUMBERS,
    payload: axios.get<HotelNumber>('api/numbers'),
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
  dispatch(getNumbers());
  return result;
};

export const assignNumber: ICrudPutAction<any> = payload => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.ASSIGN_NUMBER,
    payload: axios.post<HotelNumber>(`api/numbers/${payload.number}/assign`, { userId: payload.userId }),
  });
  dispatch(getNumbers());
  return result;
};

export const createNumber = (number: string, level: string, price: number) => {
  return {
    type: ACTION_TYPES.CREATE_NUMBER,
    payload: axios.post<HotelNumber>('api/numbers', { number, level, price }),
  };
};
