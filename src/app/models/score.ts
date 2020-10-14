
export class Score {
    technique: Technique = new Technique();
    creativity: Creativity = new Creativity();
    wowFactor: WowFactor = new WowFactor();
    vStory: VStory = new VStory();
    vCreativity: VCreativity = new VCreativity();
    vEdit: VEdit = new VEdit();
    vTechnical: VTechnical = new VTechnical();
    scoredBy: string;
    scoredDate: string;
    scoredTime: string;
    scoreId: string
    type: string;

    constructor() {
        
    }

}

export class VScore {
    vStory: VStory = new VStory();
    vCreativity: VCreativity = new VCreativity();
    vEdit: VEdit = new VEdit();
    vTechnical: VTechnical = new VTechnical();
    meanScore: number;
    totalScore: number;
    scoredBy: string;
    scoreId: string;
    scoredDate: string;
    scoredTime: string;
    type: string;

    constructor() {
        
    }

}

export class Technique {
    composition: Points = new Points();
    lighting: Points = new Points();
    clarity: Points = new Points();
    
    constructor() {
        
    }
}

export class Creativity {
    theme: Points = new Points();
    uniquness: Points = new Points();
    message: Points = new Points();
    impression: Points = new Points();
  
    constructor() {
        
    }

}

export class WowFactor  {
    inspirational: Points = new Points();
    impact: Points = new Points();
    details: Points = new Points();
   
    constructor() {
        
    }

}

export class VCreativity  {
    useofequipments: Points = new Points();
    useoftechniques: Points = new Points();
   
    constructor() {
        
    }

}

export class VTechnical  {
    composition: Points = new Points();
    stability: Points = new Points();
    lighting: Points = new Points();
    audioClarity: Points = new Points();
    pcitureClarity: Points = new Points();
   
    constructor() {
        
    }

}

export class VStory  {
    message: Points = new Points();
   
    constructor() {
        
    }

}

export class VEdit  {
    scene: Points = new Points();
    execution: Points = new Points();
   
    constructor() {
        
    }

}

export class Points {
    poor: number;
    fair: number;
    satisfactory: number;
    good: number;
    excellent: number;
   
}








