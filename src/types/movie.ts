export interface Movie {
  poster_path: string;
  title: string;
  release_date: string;
  id: number;
  vote_average: number;
  overview: string;
  genres: Genre[];
  runtime: number;
  backdrop_path: string;
}

export type Genre = {
  id: number;
  name: string;
};
