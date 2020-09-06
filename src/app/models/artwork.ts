import {Upload} from "../interfaces/upload";

export class ArtWork implements Upload {
  id: string;
  exhibitionId: any;
  narativeUrl: string;
  type: string;
  title: string;
  description: string;
  url: string;
  status: string;
  userId: string;
  updatedAt: string;
  createdAt: string;
  

  constructor() {

  }

  bytes: any;
  lastModified: string;
  name: string;
  percentage: any;
}
