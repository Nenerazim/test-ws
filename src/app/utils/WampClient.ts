import {eventBus} from "./eventBus.ts";



export class WampClient {

  public massageCallback = new eventBus

  public messages = {
    Welcome: 0,
    Call: 2,
    CallResult: 3,
    CallError: 4,
    Subscribe: 5,
    Unsubscribe: 6,
    Event: 8,
    Heartbeat: 20
  };

  private readonly api
  private ws: WebSocket;
  private callId = 0;
  private readonly time;
  private counter = 0;
  private timerId = 0
  private readonly chanel
  constructor(url: string, api: string,time: number, chanel: string) {
    this.chanel = chanel
    this.time = time
    this.api = api
    this.ws = new WebSocket(url);
    this.ws.onopen = () => this.onOpen();
    this.ws.onmessage = (event) => this.onMessage(event);
    this.ws.onclose = () => this.onClose();
  }
  private pingPong() {
    const massage = [this.messages.Heartbeat, this.counter + 1]
    this.ws.send(JSON.stringify(massage));
    console.log(this.counter);
  }
  private getCallId() {
    return `call_${this.callId++}`;
  }
  private setApiUrl (url: string) {
    return `${this.api}${url}`;
  }
  private onOpen() {
    console.log('WebSocket connection opened');
    this.timerId = setInterval(this.pingPong.bind(this), this.time*1000)
  }
  private onClose() {
    console.log('WebSocket connection closed');
    clearInterval(this.timerId)
  }
  private onMessage(event: MessageEvent) {
    const massage = JSON.parse(event.data);
    if (massage[0] === this.messages.Heartbeat) {
      this.counter = massage[1]
    }
    this.massageCallback.pub(this.chanel, massage)
  }
  public call(url: string, args: string[] = []) {
    const message = [this.messages.Call, this.getCallId(), this.setApiUrl(url), ...args];
    this.ws.send(JSON.stringify(message));
  }
  public subscribe(url: string) {
    const message = [this.messages.Subscribe, this.setApiUrl(url)];
    this.ws.send(JSON.stringify(message));
  }

  public unSubscribe(url: string) {
    const message = [this.messages.Unsubscribe, this.setApiUrl(url)];
    this.ws.send(JSON.stringify(message));
  }
}