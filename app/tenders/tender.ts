export interface Tender {
  id: number,
  code: string,
  cue: string,
  establishment: string,
  type: string,
  lastReport: string,
  title: string,
  state: {
    id: number,
    value: string
  },
  progress: {
    last: number,
    delta: number
  }
}
