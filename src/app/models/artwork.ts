import {Upload} from "../interfaces/upload";

export class ArtWork implements Upload {
  id: string = Date.now() + '';
  artworkId: any = null;
  type: string = null;
  title: string = null;
  description: string = null;
  url: string = null;
  subjectConsentForm: string = null;
  artistConsentForm: string = null;
  status: string = null;
  scored: string = null;
  userId: string = null;
  place: string = null;
  shotDate: string = null;
  updatedAt: string = null;
  createdAt: string = null;
  reviewedBy: string = null;
  approvedBy: string = null;

  constructor() {

  }

  bytes: any;
  lastModified: string;
  name: string;
  percentage: any;
}
