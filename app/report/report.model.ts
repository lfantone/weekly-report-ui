export class Report {
  id: number;
  date: {
    day: number,
    month: number,
    year: number
  };
  state: {
    state: string,
    reason: string,
    comment: string
  };
  progress: {
    last: number,
    delta: number,
    reason: string
  };
  evaluation: {
    concept: string,
    quality: string
  };
  forecast: {
    lastVisit: string,
    inspector: string[],
    rain: string[],
    audit: any[]
  };
  doc: {
    quantity: number,
    book: string
  };
  photos: any[];

  constructor(id: number, lastProgress: number, deltaProgress: number, lastVisit: string, photoLength: number = 1) {
    let date = new Date();
    this.id = id;
    this.date = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    };
    this.progress = {
      last: lastProgress,
      delta: deltaProgress,
      reason: ''
    };
    this.state = {
      state: '',
      reason: '',
      comment: ''
    };
    this.evaluation = {
      concept: '',
      quality: ''
    };
    this.forecast = {
      lastVisit,
      inspector: [],
      rain: [],
      audit: []
    };
    this.doc = {
      quantity: 0,
      book: ''
    };
    this.createPhotoArray(photoLength);
  }
  createPhotoArray(length) {
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
}
