export interface SQLDatabaseInterface {
  query: (config: {sql: string}) => Promise<{results: Array<any>}>
}

declare global {
  namespace NodeJS {
    interface Global {
      db: SQLDatabaseInterface;
    }
  }
}