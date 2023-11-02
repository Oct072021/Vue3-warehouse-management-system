interface Error {
  message: string
  stack: string
}

export interface Log {
  err: Error
  info: string
  url: string
}

export interface ErrorLogState {
  logs: Log[]
}
