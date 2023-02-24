import type { Readable, Subscriber } from "svelte/store";

export type Fn = () => void;

export type Stoppable = {
  isPending: Readable<boolean>,
  stop: Fn,
  start: Fn
}