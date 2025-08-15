export interface DialogueLine {
  speaker: string;
  line: string;
}

export interface CounselingPlanItem {
    description: string;
    icon: string;
}

export interface CounselingPlan {
  technicalFixes: CounselingPlanItem[];
  workflowAdjustments: CounselingPlanItem[];
  etiquetteTips: CounselingPlanItem[];
}

export interface TherapyResponse {
  sessionTitle: string;
  sentiment: string;
  involvedTools: string[];
  therapyDialogue: DialogueLine[];
  counselingPlan: CounselingPlan;
}
