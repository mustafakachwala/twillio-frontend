import { Component } from '@angular/core';
import { CallService } from './call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public confDetails = '';
  constructor(private callService: CallService) {
    console.log('r');

    this.callService.getToken().subscribe((r: any) => {
      console.log('ds', r);
      this.callService.createClient(r.token);
    });
  }
  title = 'twilio-frontend';

  makeCall() {
    this.callService.call();
  }

  makeCall2() {
    this.callService.callM();
  }

  makeCall3() {
    this.callService.createConference().subscribe(r => {
      this.makeCall4()
    });

  }

  makeCall4() {
    this.callService.getConf().subscribe((res: any) => {
      console.log('res', res);
      this.confDetails = res[0].sid;
    });
  }

  addToConf() {
    this.callService
      .addToConf('+919970194865', this.confDetails)
      .subscribe((r) => {
        console.log(r);
      });
  }
}
