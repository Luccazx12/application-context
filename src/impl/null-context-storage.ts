import { Option, None } from "oxide.ts";
import { ContextStorage } from "../context-storage";

export class NullContextStorage implements ContextStorage {
  public get<T>(key: string): Option<T> {
    return None;
  }

  public set(_key: string, _value: unknown): void {
    /* nothing to do */
  }

  public run(_fn: () => void): void {
    /* nothing to do */
  }
}
