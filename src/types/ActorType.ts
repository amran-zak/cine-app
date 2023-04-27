export type ActorType = {
  id: number
  name: string
  birthday: string | null
  deathday: string | null
  place_of_birth: string | null
  profile_path: string | null
  biography: string
  popularity: number
  known_for: {
    cast: Array<{
      id: number
      original_name: string
      poster_path: string | null
      overview: string
      release_date: string
      vote_average: number
    }>
  }
}
