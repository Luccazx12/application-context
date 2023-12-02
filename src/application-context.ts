import { Option } from "oxide.ts";
import { ContextStorage } from "./context-storage";
import { DatabaseTransactionConnection } from "./database-transaction.types";
import { NullContextStorage } from "./impl/null-context-storage";

/**
 * The `ApplicationContext` class provides a mechanism for setting and retrieving isolated context
 * for each request, such as an authentication token, correlation ID, source IP, and transaction connection.
 */
export class ApplicationContext {
  /**
   * The storage used to hold the context information.
   * It is initialized with the `NullContextStorage` class by default.
   */
  private static storage: ContextStorage = new NullContextStorage();

  /**
   * Configures the storage mechanism to be used by the context.
   * @param storage - The storage implementation to be used.
   * @remarks This method is typically used to set the storage mechanism for the context,
   * allowing it to persist and retrieve data as needed.
   */
  public static useStorage(storage: ContextStorage): void {
    this.storage = storage;
  }

  /**
   * Runs the provided function within the context of the application.
   * @param fn - The function to be executed in the application context.
   * This ensures that context-specific data is available during the execution of the provided function.
   */
  public static runInContext(fn: (...args: unknown[]) => void): void {
    ApplicationContext.storage.run(fn);
  }

  /**
   * Sets the authentication token in the application context.
   * @param authenticationToken - The authentication token to be set.
   * This token is used for authenticating and authorizing requests within the application.
   */
  public static setAuthenticationToken(authenticationToken: string): void {
    ApplicationContext.storage.set("authenticationToken", authenticationToken);
  }

  /**
   * Sets the correlation ID in the application context.
   * @param correlationId - The correlation ID to be set.
   * The correlation ID is useful for tracking requests across different services.
   */
  public static setCorrelationId(correlationId: string): void {
    ApplicationContext.storage.set("correlationId", correlationId);
  }

  /**
   * Sets the source IP in the application context.
   * @param sourceIP - The source IP to be set.
   * This information can be valuable for logging and auditing purposes.
   */
  public static setSourceIP(sourceIP: string): void {
    ApplicationContext.storage.set("sourceIP", sourceIP);
  }

  /**
   * Retrieves the correlation ID from the application context.
   * @returns The correlation ID, if set.
   * This is useful for associating logs and metrics with specific requests.
   */
  public static getCorrelationId(): string {
    return ApplicationContext.storage.get<string>("correlationId").unwrapOr("");
  }

  /**
   * Retrieves source IP from the application context.
   * @returns The source IP, if set.
   * This is useful for logging and auditing purposes.
   */
  public static getSourceIp(): string {
    return ApplicationContext.storage.get<string>("sourceIP").unwrapOr("");
  }

  /**
   * Retrieves the transaction connection from the application context.
   * @returns The transaction connection or undefined if not set.
   * This is relevant for managing database transactions within the application.
   */
  public static getTransactionConnection(): Option<DatabaseTransactionConnection> {
    return ApplicationContext.storage.get("transactionConnection");
  }

  /**
   * Sets the transaction connection in the application context.
   * @param transactionConnection - The transaction connection to be set.
   * This allows the application to use the provided connection for database transactions.
   */
  public static setTransactionConnection(
    transactionConnection?: DatabaseTransactionConnection
  ): void {
    ApplicationContext.storage.set(
      "transactionConnection",
      transactionConnection
    );
  }

  /**
   * Clears the transaction connection in the application context.
   * This is typically done after completing a database transaction.
   */
  public static cleanTransactionConnection(): void {
    ApplicationContext.storage.set("transactionConnection", undefined);
  }
}
