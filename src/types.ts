export interface Card {
  title: string;
  type: string;
  thumbnail: string;
  position: number;
}

export interface CardOverlayInte {
  image: string;
  onClose: () => void;
}
