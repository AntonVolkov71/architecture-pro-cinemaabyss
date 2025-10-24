export type MoviesType = {
  id: number
  title: string
  description: string
  genres: string[]
  rating: number
}

export type MovieCreateDto = Omit<MoviesType, 'id'>
