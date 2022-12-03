import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class SleepService {
  public static AllSleepData: SleepData[] = [];
  public static AllOvernightData: OvernightSleepData[] = [];
  public static AllSleepinessData: StanfordSleepinessData[] = [];

  constructor(private storage: Storage) {
    this.addStoredData();
  }

  private addDefaultData() {
    this.logOvernightData(
      new OvernightSleepData(
        null,
        new Date('February 18, 2021 01:03:00'),
        new Date('February 18, 2021 09:25:00')
      )
    );
    this.logSleepinessData(
      new StanfordSleepinessData(
        null,
        4,
        new Date('February 19, 2021 14:38:00')
      )
    );
    this.logOvernightData(
      new OvernightSleepData(
        null,
        new Date('February 20, 2021 23:11:00'),
        new Date('February 21, 2021 08:03:00')
      )
    );
  }

  addStoredData() {
    this.storage.forEach((log) => {
      if (log.category === 'sleep') {
        let sleepData = new OvernightSleepData(
          log.id,
          new Date(log['sleepStart']),
          new Date(log['sleepEnd'])
        );

        SleepService.AllSleepData.push(sleepData);
        SleepService.AllOvernightData.push(sleepData);
      } else if (log.category === 'sleepiness') {
        let sleepinessData: StanfordSleepinessData = new StanfordSleepinessData(
          log.id,
          log.loggedValue,
          new Date(log.loggedAt)
        );
        SleepService.AllSleepData.push(sleepinessData);
        SleepService.AllSleepinessData.push(sleepinessData);
      }
    });

    SleepService.AllSleepData.sort((first, last) => {
      return first.loggedAt.getTime() - last.loggedAt.getTime();
    });
  }

  public logOvernightData(sleepData: OvernightSleepData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllOvernightData.push(sleepData);
    this.storage.set(sleepData.id, sleepData);
  }

  public logSleepinessData(sleepData: StanfordSleepinessData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllSleepinessData.push(sleepData);
    this.storage.set(sleepData.id, sleepData);
  }

  public clearStorage() {
    SleepService.AllSleepData = [];
    SleepService.AllOvernightData = [];
    SleepService.AllSleepinessData = [];
    this.storage.clear();
  }

  public removeData(searchId, index, category) {
    let place = SleepService.AllSleepData.findIndex((s) => s.id == searchId);
    SleepService.AllSleepData.splice(place, 1);
    if (category === 'sleep') {
      SleepService.AllOvernightData.splice(index, 1);
    } else {
      SleepService.AllSleepinessData.splice(index, 1);
    }

    this.storage.remove(searchId);
  }
}
