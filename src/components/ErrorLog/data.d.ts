export interface ErrorLog {
  err: Error
  info: string
  url: string
}

interface Error {
  message: string
  stack: string
}
