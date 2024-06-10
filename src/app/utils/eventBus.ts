type Listener = (data: any[] | any) => void;
interface Channels {
  [key: string]: Listener[];
}
export class eventBus {
  private channels = {} as Channels
  public sub(channelName: string, listener: Listener): void {
    if (!this.channels[channelName]) {
      this.channels[channelName] = [];
    }
    this.channels[channelName].push(listener);
  }
  public pub(channelName: string, data: any[] | any): void {
    const channel = this.channels[channelName];
    if (!channel || !channel.length) {
      return;
    }
    channel.forEach(listener => listener(data));
  }
}
