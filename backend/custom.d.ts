export interface SQLDatabaseInterface {
  query: (config: {
    sql: string,
    params?: Record<string, any>
  }) => Promise<{results: Array<any>}>
}

declare global {
  namespace NodeJS {
    interface Global {
      db: SQLDatabaseInterface;
    }
  }
}