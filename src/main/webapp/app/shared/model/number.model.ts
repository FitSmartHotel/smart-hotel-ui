export interface HotelNumber {
  number?: string;
  level?: string;
  price?: number;
  activated?: boolean;
  usersAmount?: number;
  doorLocked?: boolean;
  alarmEnabled?: boolean;
  registered?: boolean;
}

export const defaultValue: Readonly<HotelNumber> = {
  number: '',
  level: '',
  price: 0,
  activated: false,
  usersAmount: 0,
  doorLocked: false,
  alarmEnabled: false,
  registered: false,
};
