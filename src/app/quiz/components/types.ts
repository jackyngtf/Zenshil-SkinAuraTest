export type QuizInteractionType = 'fullPageScene' | 'weatherMap' | 'weatherStage' | 'elementStage' | 'imageStage' | 'emotionStage' | 'ritualStage' | 'auraField' | 'resourceMeter' | 'mirrorFocus';

export interface QuizInteraction {
  type: QuizInteractionType;
  confirmMode?: 'doubleTap' | 'tap';
  showAllOptions?: boolean;
}

export interface QuizOption {
  id: string;
  text: string;
  textEn?: string;
  auraMapping: string;
  imageUrl?: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  questionTextEn?: string;
  interaction?: QuizInteraction;
  options: QuizOption[];
}

export interface QuizInteractionProps {
  question: QuizQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  onSelect: (optionId: string) => void;
}
