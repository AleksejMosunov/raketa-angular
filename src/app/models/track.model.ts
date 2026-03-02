export interface Track {
  _id: string;
  id: string;
  name: string;
  httpPort: number;
  wsUrl: string;
  officialTiming: string;
  createdAt: Date;
}
