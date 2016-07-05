import { Report as IReport } from './report';

export class Report {
  id: number;
  date: {
    day: number,
    month: number,
    year: number
  };
  state: {
    state: number,
    reason: number,
    comment: string
  };
  progress: {
    last: number,
    delta: number,
    reason: number
  };
  evaluation: {
    concept: number,
    quality: number
  };
  forecast: {
    lastVisit: string,
    inspector: {
      monday: boolean,
      tuesday: boolean,
      wednesday: boolean,
      thursday: boolean,
      friday: boolean,
      saturday: boolean,
      sunday: boolean,
    },
    rain: {
      monday: boolean,
      tuesday: boolean,
      wednesday: boolean,
      thursday: boolean,
      friday: boolean,
      saturday: boolean,
      sunday: boolean,
    }
  };
  audits: any[];
  doc: {
    quantity: number,
    book: number
  };
  photos: any[];

  constructor(id: number, lastVisit: string, photoLength: number = 6, auditsLength: number = 3) {
    let date = new Date();
    this.id = id;
    this.date = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    };
    this.progress = {
      last: 0,
      delta: 0,
      reason: 0
    };
    this.state = {
      state: 90001,
      reason: 0,
      comment: ''
    };
    this.evaluation = {
      concept: 0,
      quality: 0
    };
    this.forecast = {
      lastVisit,
      inspector: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      rain: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      }
    };
    this.doc = {
      quantity: 0,
      book: 0
    };

    this.createAuditArray(auditsLength);
    this.createPhotoArray(photoLength);
  }
  setData(report: IReport) {
    this.audits = report.audits;
    this.date = report.date;
    this.doc = report.doc;
    this.evaluation = report.evaluation;
    this.forecast = report.forecast;
    this.photos = report.photos;
    this.progress = report.progress;
    this.state = report.state;
  }
  setRainDay(day: string) {
    this.forecast.rain[day] = !this.forecast.rain[day];
  }
  setInspectorDay(day: string) {
    this.forecast.inspector[day] = !this.forecast.inspector[day];
  }
  setState(value: number) {
    this.state.state = value;
  }
  private createPhotoArray(length) {
    this.photos = [];
    for (let i = 0; i < length; i++) {
      this.photos.push({
        id: i,
        title: '',
        comment: '',
        path: ''
      });
    }
  }
  private createAuditArray(length) {
    let date = new Date();
    this.audits = [];

    for (var i = 0; i < length; i++) {
      this.audits.push({
        id: i,
        value: 0,
        date: {
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear()
        }
      });
    }
  }
}
