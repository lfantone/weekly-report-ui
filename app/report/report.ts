export interface Report {
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
  },
  audits: any[];
  doc: {
    quantity: number,
    book: number
  };
  photos: any[];
}
