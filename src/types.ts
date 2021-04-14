export interface State {
  user: string;
  events: Event[];
  event: Event;
}

export interface Event {
  id: string;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
}
