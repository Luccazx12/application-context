import { Option } from "oxide.ts";

export interface ContextStorage {
  get<T>(key: string): Option<T>;
  set(key: string, value: unknown): void;
  run(fn: () => void): void;
}
