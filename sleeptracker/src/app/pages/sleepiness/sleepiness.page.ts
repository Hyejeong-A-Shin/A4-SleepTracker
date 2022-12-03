import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SleepService } from 'src/app/services/sleep.service';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
  sleepScale = StanfordSleepinessData.ScaleValues;

  constructor(
    public sleepService: SleepService,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  addSleepiness(sleepinessNumber) {
    let sleepinessData = new StanfordSleepinessData(null, sleepinessNumber);
    this.sleepService.logSleepinessData(sleepinessData);
    this.accept();
  }

  async accept() {
    const alert = await this.alertController.create({
      message: 'You have recorded your sleepiness!',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
