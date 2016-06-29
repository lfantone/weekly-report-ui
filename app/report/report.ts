export interface Report {
  id: number,
  date: {
    day: number,
    month: number,
    year: number
  },
  state: {
    state: string,
    reason: string,
    comment: string
  },
  progress: {
    last: number,
    delta: number,
    reason: string
  },
  evaluation: {
    concept: string,
    quality: string
  },
  forecast: {
    lastVisit: string,
    inspector: string[],
    rain: string[],
    audit: any[]
  },
  doc: {
    quantity: number,
    book: string
  },
  photos: any[];
}
