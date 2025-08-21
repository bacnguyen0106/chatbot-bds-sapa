
export interface RealEstateProperty {
  name: string;
  price: string;
  area: string;
  location: string;
  highlights: string[];
  mapsLink: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  properties?: RealEstateProperty[];
  quickReplies?: string[];
  isConfirmation?: boolean;
}