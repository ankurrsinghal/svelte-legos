import type { Readable } from "svelte/store";

export type Fn = () => void;

export interface Stoppable {
  isPending: Readable<boolean>;
  stop: Fn;
  start: Fn;
}

export interface Pausable {
  isActive: Readable<boolean>;
  pause: Fn;
  resume: Fn;
  changeIntervalTime: (time: number) => void;
} 