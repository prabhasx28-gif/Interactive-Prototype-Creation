export type ElementType = 'button' | 'heading' | 'text' | 'input' | 'image' | 'card' | 'hotspot';

export type TransitionType = 'fade' | 'slide-left' | 'slide-right' | 'zoom' | 'none';

export interface WireframeElement {
  id: string;
  type: ElementType;
  text: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  w: number; // percentage (1-100)
  h: number; // percentage (1-100)
  bgColor: string; // tailwind class or hex
  textColor: string; // tailwind class or hex
  targetScreenId: string; // linked screen ID (interaction)
  transition: TransitionType;
  placeholder?: string; // for inputs
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface Screen {
  id: string;
  name: string;
  bgColor: string; // Tailwind bg class or clear code
  elements: WireframeElement[];
}

export interface TestTask {
  id: string;
  instruction: string;
  targetScreenId: string; // success target screen
  timeLimitSec: number;
}

export interface PrototypeVersion {
  id: string;
  name: string;
  description?: string;
  screens: Screen[];
  startScreenId: string;
  tasks: TestTask[];
  timestamp: string;
}

export interface Prototype {
  id: string;
  title: string;
  description: string;
  screens: Screen[];
  startScreenId: string;
  tasks: TestTask[];
  createdAt: string;
  updatedAt: string;
  versions?: PrototypeVersion[];
}

export interface TestSessionLog {
  id: string;
  prototypeId: string;
  participantName: string;
  taskId: string;
  taskInstruction: string;
  timeTakenSec: number;
  clicks: number;
  errors: number;
  success: boolean;
  timestamp: string;
}

export interface FeedbackResponse {
  id: string;
  prototypeId: string;
  rating: number; // overall (1-5)
  ratings: {
    navigation: number; // 1-5
    clarity: number;    // 1-5
    appeal: number;     // 1-5
  };
  reviewerName: string;
  reviewerRole: 'tester' | 'reviewer' | 'designer';
  comments: string;
  suggestions: string;
  timestamp: string;
}

export interface AIAuditResult {
  accessibilityScore: number; // 0-100
  usabilityScore: number;     // 0-100
  warnings: string[];
  contrastIssues: { elementId: string; elementName: string; issue: string; severity: 'low' | 'medium' | 'high' }[];
  layoutRecommendations: { issue: string; fix: string; tailwindSuggestedClasses: string }[];
  overallSummary: string;
}
