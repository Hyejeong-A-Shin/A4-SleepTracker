import { generate } from 'shortid';

export class SleepData {
  id: string;
  loggedAt: Date;
  category: string;

  constructor() {
    this.id = generate();
    this.loggedAt = new Date();
  }

  summaryString(): string {
    return 'Unknown sleep data';
  }

  dateString(): string {
    return this.loggedAt.toLocaleDateString('en-US', {weekday: 'long',month: 'long',day: 'numeric',});
  }
}
