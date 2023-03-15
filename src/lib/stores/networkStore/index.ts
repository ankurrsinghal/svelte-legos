import { defaultWindow, tryOnDestroy, writableToReadable } from "$lib/shared";
import type { ConfigurableWindow } from "$lib/shared/utils/types";
import { writable, type Readable } from "svelte/store";
import { eventListenerStore } from "../eventListenerStore";

/* this implementation is original ported from https://vueuse.org/useNetwork */
export type NetworkType = 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown';

export type NetworkEffectiveType = 'slow-2g' | '2g' | '3g' | '4g' | undefined;

export interface NetworkState {
  isSupported: boolean
  /**
   * If the user is currently connected.
   */
  isOnline: boolean
  /**
   * The time since the user was last connected.
   */
  offlineAt: number | undefined
  /**
   * At this time, if the user is offline and reconnects
   */
  onlineAt: number | undefined
  /**
   * The download speed in Mbps.
   */
  downlink: number | undefined
  /**
   * The max reachable download speed in Mbps.
   */
  downlinkMax: number | undefined
  /**
   * The detected effective speed type.
   */
  effectiveType: NetworkEffectiveType | undefined
  /**
   * The estimated effective round-trip time of the current connection.
   */
  rtt: number | undefined
  /**
   * If the user activated data saver mode.
   */
  saveData: boolean | undefined
  /**
   * The detected connection/network type.
   */
  type: NetworkType
}

export function networkStore(options: ConfigurableWindow = {}): Readable<NetworkState> {
  const { window = defaultWindow } = options
  const navigator = window?.navigator
  const isSupported = !!(navigator && 'connection' in navigator);

  const store = writable<NetworkState>({
    isSupported,
    isOnline: true,
    saveData: false,
    offlineAt: undefined,
    onlineAt: undefined,
    downlink: undefined,
    downlinkMax: undefined,
    rtt: undefined,
    effectiveType: undefined,
    type: 'unknown'
  });

  const connection = isSupported && (navigator as any).connection;

  function updateNetworkInformation() {
    if (!navigator) return;

    const state = {} as NetworkState;

    state['isOnline'] = navigator.onLine;
    state['offlineAt'] = state.isOnline ? undefined : Date.now();
    state['onlineAt'] = state.isOnline ? Date.now() : undefined;

    if (connection) {
      state['downlink'] = connection.downlink;
      state['downlinkMax'] = connection.downlinkMax;
      state['effectiveType'] = connection.effectiveType;
      state['rtt'] = connection.rtt;
      state['saveData'] = connection.saveData;
      state['type'] = connection.type;
    }

    store.update(oldState => ({ ...oldState, ...state }));
  }

  if (window) {
    eventListenerStore('offline', () => {
      console.log("eventListenerStore offline");
      store.update(state => ({
        ...state,
        isOnline: false,
        offlineAt: Date.now()
      }));
    });

    eventListenerStore('online', () => {
      store.update(state => ({
        ...state,
        isOnline: true,
        onlineAt: Date.now()
      }));
    });
  }

  if (connection) {
    connection.addEventListener('change', updateNetworkInformation, false);

    tryOnDestroy(() => {
      connection.removeEventListener('change', updateNetworkInformation);
    });
  }

  updateNetworkInformation();

  return writableToReadable(store);
}