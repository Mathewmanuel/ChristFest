export interface EventItem {
  id: string;
  title: string;
  category: 'music' | 'drama' | 'biblical' | 'youth' | 'arts';
  categoryLabel: string;
  time: string;
  venue: string;
  description: string;
  rules: string[];
  awards: string;
  iconName: string;
}

export interface ScheduleItem {
  id: string;
  day: 1 | 2;
  time: string;
  title: string;
  category: string;
  location: string;
  speakerOrLeader: string;
  description: string;
}

export interface ScripturePassage {
  reference: string;
  greekText: string;
  englishText: string;
  meaning: string;
}

export interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  churchName: string;
  category: string;
  registrationId: string;
  dateRegistered: string;
}
