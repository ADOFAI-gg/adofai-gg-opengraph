export interface Level {
  id: number
  title: string
  difficulty: number
  tiles: number
  comments: number
  likes: number
  epilepsyWarning: boolean
  censored: boolean
  description: string
  video: string
  download?: string
  workshop?: string
  name: string
  music: Music
  creators: User[]
  tags: Tag[]
}

export interface User {
  id: number
  name: string
}

export interface Music {
  id: number
  name: string
  minBpm: number
  maxBpm: number
  artists: User[]
}

export interface Tag {
  id: number
  name: string
}
