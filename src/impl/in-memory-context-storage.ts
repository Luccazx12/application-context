import { Option, None } from "oxide.ts";
import { ContextStorage } from "../context-storage";

export class InMemoryContextStorage implements ContextStorage {
  public storage = new Map<string, unknown>();

  public get<T>(key: string): Option<T> {
    return Option(this.storage.get(key) as T);
  }

  public set(key: string, value: unknown): void {
    this.storage.set(key, value);
  }

  public run(fn: () => void): void {
    fn();
  }
}
