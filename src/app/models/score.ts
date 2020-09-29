import { Scoring } from '../interfaces/score';

export class Score {
    technique: Technique = new Technique();
    creativity: Creativity = new Creativity();
    wowFactor: WowFactor = new WowFactor();
    meanScore: number;
    scoredBy: string;
    artistId: string;
    artworkId: string;
    scoredDate: string;
    scoredTime: string;

    constructor() {
        
    }

}

export class Technique {
    composition: Composition = new Composition();
    lighting: Lighting = new Lighting();
    clarity: Clarity = new Clarity();
 
    constructor() {
        
    }
}

export class Creativity {
    theme: Theme = new Theme();
    uniquness: Uniquness = new Uniquness();
    message: Message = new Message();
    impression: Impression = new Impression();
  
    constructor() {
        
    }

}

export class WowFactor  {
    inspirational: Inspirational = new Inspirational();
    impact: Impact = new Impact();
    details: Details = new Details();
   
    constructor() {
        
    }

}

export class Composition {
    poor: number;
    fair: number;
    satisfactory: number;
    good: number;
    excellent: number;
   
    constructor() {
        
    }
}


export class Lighting{
    poor: number;
    fair: number;
    satisfactory: number;
    good: number;
    excellent: number;
   
    constructor() {
        
    }

    
}

export class Clarity {
    poor: number;
    fair: number;
    satisfactory: number;
    good: number;
    excellent: number;
   
    constructor() {
        
    }

    
}

export class Theme{
    poor: number;
    fair: number;
    satisfactory: number;
    good: number;
    excellent: number;
   
    constructor() {
        
    }

    
}


export class Uniquness{
    poor: number;
    fair: number;
    satisfactory: number;
    good: number;
    excellent: number;
    constructor() {
        
    }

    
}

export class Message{
    poor: number;
    fair: number;
    satisfactory: number;
    good: number;
    excellent: number;
   
    constructor() {
        
    }

    
}

export class Impression{
    poor: number;
    fair: number;
    satisfactory: number;
    good: number;
    excellent: number;
   
    constructor() {
        
    }
    
}

export class Inspirational{
    poor: number;
    fair: number;
    satisfactory: number;
    good: number;
    excellent: number;
   
    constructor() {
        
    }

    
}


export class Impact{
    poor: number;
    fair: number;
    satisfactory: number;
    good: number;
    excellent: number;
   
    constructor() {
        
    }

    
}


export class Details{
    poor: number;
    fair: number;
    satisfactory: number;
    good: number;
    excellent: number;
   
    constructor() {
        
    }

    
}






