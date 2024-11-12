export interface Photo {
  id: number;
  image: string;
  name: string;
  scores: Score[];
  characters: Character[];
  slug: string;
}

export interface Score {
  id: number;
  photoId: number;
  time: number;
  username: string;
}

export interface Character {
  id: number;
  image: string;
  name: string;
  photoId: number;
  positionX: number;
  positionY: number;
}
