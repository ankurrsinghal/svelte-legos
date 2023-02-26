import type { Readable } from "svelte/store";

export type Fn = () => void;

export interface ConfigurableWindow {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window
}

export interface Position {
	x: number;
	y: number;
}

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