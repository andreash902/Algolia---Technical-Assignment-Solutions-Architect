import { NuxtApp } from '#app'

declare module '#app' {
  interface NuxtApp {
    $sendEvent: (eventType: string, item: any, eventName: string) => void;
  }
}