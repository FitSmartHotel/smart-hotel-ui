export interface HotelNumber {
  number?: string;
  level?: string;
  price?: number;
  activated?: boolean;
  usersAmount?: number;
  doorLocked?: boolean;
  locked: boolean;
  alarmEnabled?: boolean;
  registered?: boolean;
  isAssigned?: boolean;
  assignedUserLogin?: string;
}

export const defaultValue: Readonly<HotelNumber> = {
  number: '',
  level: '',
  price: 0,
  activated: false,
  usersAmount: 0,
  doorLocked: false,
  locked: false,
  alarmEnabled: false,
  registered: false,
  isAssigned: false,
  assignedUserLogin: '',
};
