export type Reader = {
  id: string
  username: string
  password: string
  role: 'ROLE_ADMIN' | 'ROLE_READER'
};
