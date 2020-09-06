import { Scoring } from '../interfaces/score';

export class Score  {
    technique: Technique;
    creativity: Creativity;
    wowFactor: WowFactor;

    constructor() {
        
    }
}

export class Technique {
    composition: number
    lighting: number;
    clarity: number;
 

    constructor() {
        
    }
}

export class Creativity {
    theme: number;
    uniquness: number;
    clarity: number;
    impression: number;
  

    constructor() {
        
    }
}

export class WowFactor  {
    inspirational: number;
    impact: number;
    details: number;
   

    constructor() {
        
    }
}
