export interface MovieType {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  runtime: number | null
  genres: {
    id: number
    name: string
  }[]
  credits: {
    cast: {
      id: number
      name: string
      character: string
      profile_path: string | null
    }[]
  }
  reviews: {
    id: string
    author: string
    content: string
    url: string
  }[]
  similar: {
    id: number
    title: string
    overview: string
    poster_path: string | null
    release_date: string
  }[]
}
