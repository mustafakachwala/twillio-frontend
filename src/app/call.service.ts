import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '@twilio/voice-sdk';

@Injectable({ providedIn: 'root' })
export class CallService {
  public device: Device;
  constructor(private httpClient: HttpClient) {
    this.device = <Device>{};
    // or handle an incoming call
  }
  call() {
    this.httpClient.post('http://localhost:3000/call', {}).subscribe((re) => {
      console.log('re', re);
    });
  }

  createClient(token: string) {
    this.device = new Device(token);
    console.log('ds', this.device);

    this.device.on('incoming', (call: any) => {
      console.log('cal', call);
    });
  }

  callM() {
    this.device.connect({
      params: { To: '+918087439521' }
    });
  }

  createConference() {
    return this.httpClient.post('http://localhost:3000/users', {});
  }

  getToken() {
    return this.httpClient.get('https://1a07-182-68-62-118.in.ngrok.io/token');
  }

  getConf() {
    return this.httpClient.get('http://localhost:3000/conf');
  }

  addToConf(number: string, confId: string) {
    return this.httpClient.post('http://localhost:3000/conf/add', {
      number,
      confId,
    });
  }
}
