import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SleepService } from 'src/app/services/sleep.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {
  allData = this.allSleepData;

  constructor(
    public sleepService: SleepService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    console.log(this.allData);
  }

  get allSleepData() {
    return SleepService.AllSleepData.sort((first, last) => {
      return first.loggedAt.getTime() - last.loggedAt.getTime();
    });
  }


  deleteData(id) {
    let otherID = SleepService.AllSleepinessData.findIndex((s) => s.id == id);
    let type;
    if (otherID === -1) {
      otherID = SleepService.AllOvernightData.findIndex((s) => s.id == id);
      type = 'sleep';
    } else {
      type = 'sleepiness';
    }
    console.log(id);
    this.sleepService.removeData(id, otherID, type);

  }

}
