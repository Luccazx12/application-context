export type QueryFunction = (sql: any, values?: any) => Promise<any>;

export type TransactionFunction<T> = (
  connection: DatabaseTransactionConnection
) => Promise<T>;

export type DatabaseTransactionConnection = {
  query: QueryFunction;
  readonly transaction: <T>(
    handler: TransactionFunction<T>,
    transactionRetryLimit?: number
  ) => Promise<T>;
};
