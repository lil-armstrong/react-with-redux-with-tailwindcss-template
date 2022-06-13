export type CategoryItem = {
  id: string
  version: number
  parentId: string
  name: string
  description: string
  ancestors: string[]
  numberOfChildren: number
}

export type Session = {
  id: string
  token: string
  username: string
  loggedIn: boolean
} | null
