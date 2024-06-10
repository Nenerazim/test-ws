export interface IEventItems {
  Timestamp: string;
  Level: string;
  Message: string;
  Source: string;
}

export interface IWampClient {
  userID : string;
  WampVersion: string;
}

export interface IUserInfo {
  tokenUser: string;
  userName: string;
}

export interface IEvent {
  Action?: number;
  Items?: IEventItems[];
  SubscribeError?: string
}
export type LoggerData<T> = [
  number, string, T
]