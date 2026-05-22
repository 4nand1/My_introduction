export interface TimelineEvent {
  year: string;
  era: string;
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
}

export const events: TimelineEvent[] = [];
