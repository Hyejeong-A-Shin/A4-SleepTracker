import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { OvernightSleepData } from 'src/app/data/overnight-sleep-data';
import { SleepService } from 'src/app/services/sleep.service';

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.page.html',
  styleUrls: ['./sleep.page.scss'],
})
export class SleepPage implements OnInit {
  sleepTime: string;
  wakeTime: string;
  // day = new Date().toLocaleString('en-US', { weekday: 'long' });
  // today = new Date().toISOString().substring(5, 10).replace('-', '/');
  // time = new Date().toISOString().substring(11, 16);
  // buttonName = 'Start Sleep';

  constructor(
    public sleepService: SleepService,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  // startTime() {
  //   var intervalVar = setInterval(
  //     function () {
  //       this.time = new Date().toISOString().substring(11, 16);
  //     }.bind(this),
  //     10000
  //   );
  // }

  onSubmit(form) {
    let sleep = new Date(this.sleepTime);
    let wake = new Date(this.wakeTime);

    if (this.sleepTime === undefined || this.wakeTime === undefined) {
      this.showError('null');
    } else if (wake.getTime() < sleep.getTime()) {
      this.showError('invalid');
    } else {
      this.showSuccess();
      let newData = new OvernightSleepData(null, sleep, wake);
      this.sleepService.logOvernightData(newData);
      form.reset();
    }
  }

  async showError(errorType) {
    let alert;
    if (errorType === 'null') {
      alert = await this.alertController.create({
        header: 'Empty Time(s)',
        message: 'Please input times for both fields before submitting.',
        buttons: ['OK'],
      });
    } else {
      alert = await this.alertController.create({
        header: 'Invalid Time(s)',
        message: 'Double check your times, you woke up earlier than you slept!',
        buttons: ['Oops'],
      });
    }
    await alert.present();
  }

  async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Success!',
      message: 'Your times have been recorded',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
