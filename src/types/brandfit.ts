export type UsageMode = 'marca' | 'creador';

export type ScreenId =
  | 'home'
  | 'progress'
  | 'benford'
  | 'score'
  | 'bigfive'
  | 'recs';

export type ArchetypeId =
  | 'tech'
  | 'bienestar'
  | 'entretenimiento'
  | 'finanzas'
  | 'causas';

export type ContentTone = 'positivo' | 'neutro' | 'negativo';

export type ChipTone = 'success' | 'warning' | 'danger' | 'neutral';

export interface ArchetypeOption {
  id: ArchetypeId;
  label: string;
  short: string;
  description: string;
}

export interface VideoItem {
  title: string;
  engagement: number;
  views: string;
  tone: ContentTone;
  hue: number;
}

export interface ToneDistribution {
  pos: number;
  neu: number;
  neg: number;
}

export interface CreatorProfile {
  username: string;
  name: string;
  authentic: boolean;
  confidence: number;
  benfordObserved: number[];
  followers: string;
  engagement: number;
  posts: number;
  avgViews: string;
  tone: ToneDistribution;
  bigFive: number[];
  scores: Record<ArchetypeId, number>;
  topVideos: VideoItem[];
  format: string;
  forBrand: string;
  forCreator: string;
  analyzedAt: string;
  lastArchetype: ArchetypeId;
  hue: number;
}

export interface BrandFitContextValue {
  screen: ScreenId;
  go: (target: ScreenId) => void;
  mode: UsageMode;
  setMode: (mode: UsageMode) => void;
  creator: CreatorProfile | null;
  setCreator: (creator: CreatorProfile | null) => void;
  recentCreators: CreatorProfile[];
  archetype: ArchetypeId;
  setArchetype: (archetype: ArchetypeId) => void;
  pendingUsername: string;
  startAnalysis: (username: string) => void;
  finishAnalysis: () => void;
  openCreator: (creator: CreatorProfile) => void;
  simulateFraudAccount: () => void;
  simulateEmptyState: () => void;
}
