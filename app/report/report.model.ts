import { Report as IReport } from './report';

export class Report {
  id: number;
  date: {
    day: number,
    month: number,
    year: number,
    model: Date
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
      year: date.getFullYear(),
      model: date
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
  setAudit(index: number, value: number) {
    this.audits[index].value = value;
  }
  setAuditsDate(audits: any[]){
    for (let i = 0; i < audits.length; i++) {
      let audit = audits[i];
      let date = audit.date.model;

      if (typeof date === 'string') {
        date = new Date(date);
      }

      this.audits[i] = {
        id: audit.id,
        value: audit.value,
        date: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          model: date
        }
      }
    }
  }
  setConcept(index: number) {
    this.evaluation.concept = index;
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
  setDate(date: any) {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    this.date = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      model: date
    };
  }
  setDocBook(index: number) {
    this.doc.book = index;
  }
  setRainDay(day: string) {
    this.forecast.rain[day] = !this.forecast.rain[day];
  }
  setInspectorDay(day: string) {
    this.forecast.inspector[day] = !this.forecast.inspector[day];
  }
  setProgressReason(index: number) {
    this.progress.reason = index;
  }
  setState(value: number) {
    this.state.state = value;
  }
  setStateReason(index: number) {
    this.state.reason = index;
  }
  setQuality(index: number) {
    this.evaluation.quality = index;
  }
  private createPhotoArray(length) {
    this.photos = [];
    for (let i = 0; i < length; i++) {
      this.photos.push({
        id: `photo${i}`,
        title: '',
        comment: '',
        path: 'res://noimage'
      });
    }
  }
  private createAuditArray(length) {
    let date = new Date();
    this.audits = [];

    for (let i = 0; i < length; i++) {
      this.audits.push({
        id: `autid${i}`,
        value: 0,
        date: {
          day: date.getDate(),
          month: date.getMonth(),
          year: date.getFullYear(),
          model: date
        }
      });
    }
  }
}
