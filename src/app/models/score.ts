import { Scoring } from '../interfaces/score';

export class Score {
    technique: Technique;
    creativity: Creativity;
    wowFactor: WowFactor;
    meanScore: number;
    scoredBy: string
    artworkId: string;
    scoredDate: string;
    scoredTime: string;

    constructor() {
        
    }

}

export class Technique {
    composition: Composition;
    lighting: Lighting;
    clarity: Clarity;
 
    constructor() {
        
    }
}

export class Creativity {
    theme: Theme;
    uniquness: Uniquness;
    message: Message;
    impression: Impression;
  
    constructor() {
        
    }

}

export class WowFactor  {
    inspirational: Inspirational;
    impact: Impact;
    details: Details;
   
    constructor() {
        
    }

}

export class Composition {
    poor: number = 2;
    fair: number = 4;
    satisfactory: number = 6;
    good: number = 8;
    excellent: number = 10;
   
    constructor() {
        
    }
}


export class Lighting{
    poor: number = 2;
    fair: number = 4;
    satisfactory: number = 6;
    good: number = 8;
    excellent: number = 10;
   
    constructor() {
        
    }

    
}

export class Clarity {
    poor: number = 2;
    fair: number = 4;
    satisfactory: number = 6;
    good: number = 8;
    excellent: number = 10;
   
    constructor() {
        
    }

    
}

export class Theme{
    poor: number = 2;
    fair: number = 4;
    satisfactory: number = 6;
    good: number = 8;
    excellent: number = 10;
   
    constructor() {
        
    }

    
}


export class Uniquness{
    poor: number = 2;
    fair: number = 4;
    satisfactory: number = 6;
    good: number = 8;
    excellent: number = 10;
   
    constructor() {
        
    }

    
}

export class Message{
    poor: number = 2;
    fair: number = 4;
    satisfactory: number = 6;
    good: number = 8;
    excellent: number = 10;
   
    constructor() {
        
    }

    
}

export class Impression{
    poor: number = 2;
    fair: number = 4;
    satisfactory: number = 6;
    good: number = 8;
    excellent: number = 10;
   
    constructor() {
        
    }
    
}

export class Inspirational{
    poor: number = 2;
    fair: number = 4;
    satisfactory: number = 6;
    good: number = 8;
    excellent: number = 10;
   
    constructor() {
        
    }

    
}


export class Impact{
    poor: number = 2;
    fair: number = 4;
    satisfactory: number = 6;
    good: number = 8;
    excellent: number = 10;
   
    constructor() {
        
    }

    
}


export class Details{
    poor: number = 2;
    fair: number = 4;
    satisfactory: number = 6;
    good: number = 8;
    excellent: number = 10;
   
    constructor() {
        
    }

    
}






