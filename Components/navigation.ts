export interface Film {
  _id: string;
  title: string;
  poster?: string | null;
  year?: string;
  released?: string;
  runtime?: number;
  language?: string;
  genre?: string;
  director?: string;
}

export type RootStackParamList = {
  Main: undefined;
  FilmDetail: { film: Film };
};
