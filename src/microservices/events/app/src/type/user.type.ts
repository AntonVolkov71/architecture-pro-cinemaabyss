export type UserType = {
  id: number
  username: string
  email: string
}

export type UserCreateDto = Omit<UserType, 'id'>
