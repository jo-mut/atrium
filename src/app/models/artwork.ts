import {Upload} from "../interfaces/upload";

export class ArtWork implements Upload {
  id: string;
  artworkId: any;
  type: string;
  title: string;
  description: string;
  url: string;
  status: string;
  userId: string;
  place: string;
  shotDate: string;
  updatedAt: string;
  createdAt: string;
  reviewedBy: string;
  approvedBy: string;
  

  constructor() {

  }

  bytes: any;
  lastModified: string;
  name: string;
  percentage: any;
}
