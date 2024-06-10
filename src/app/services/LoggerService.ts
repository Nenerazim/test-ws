import {WampClient} from "../utils/WampClient.ts";
import {ref} from "vue";
import {IEventItems, IWampClient, IUserInfo, LoggerData, IEvent} from "../Interfaces/LoggerService";


export class LoggerService {
  private chanel = 'testWs';
  private readonly wamp = new WampClient('ws://test.enter-systems.ru/', 'http://enter.local', 30, this.chanel);
  public eventData= ref<IEventItems[] | string>([]);
  public callResult = ref<LoggerData<IUserInfo>>();
  public auf = ref<string>();
  public sub = ref<string>()

  constructor() {
    this.wamp.massageCallback.sub(this.chanel, this.massage.bind(this));
  }

  private massage (data: LoggerData<unknown>) {
    switch (data[0]) {
      case this.wamp.messages.Welcome:
        console.log(data as LoggerData<IWampClient>)
        break
      case this.wamp.messages.CallResult:
        console.log(data)
        this.callResult.value = data as LoggerData<IUserInfo>
        break
      case this.wamp.messages.CallError:
        console.log(data as LoggerData<string>)
        break
      case this.wamp.messages.Event:
        this.eventTransform(data as LoggerData<IEvent>)
        console.log(data);
        break;
    }
  }

  private eventTransform (data: LoggerData<IEvent>) {
    const transformedData = data[2]

    if (transformedData.Items) {
      if (typeof this.eventData.value === 'string'){
        this.eventData.value = []
      }
     return this.eventData.value?.push(...transformedData.Items)
    }
    this.eventData.value = transformedData.SubscribeError as string
  }

  public login(userName: string, password: string) {
    this.wamp.call('/login', [userName, password]);
    this.auf.value = 'auf'
  }

  public loginByToken(userName: string, password: string) {
    this.wamp.call('/loginByToken', [userName, password]);
  }

  public logout(userName: string, password: string) {
    this.wamp.call('/logout', [userName, password]);
    this.auf.value = undefined
    this.unSubscribe()
  }

  public subscribe() {
    this.wamp.subscribe('/subscription/logs/list');
    this.sub.value = 'sub'
  }

  public unSubscribe() {
    this.wamp.unSubscribe('/subscription/logs/list');
    this.eventData.value = [];
    this.sub.value = undefined
  }
}