interface MonetizationEventListener<T extends Event = Event> {
  (evt: T): void
}

interface MonetizationEventListenerObject<T extends Event = Event> {
  handleEvent(evt: T): void
}

type MonetizationEventListenerOrListenerObject<T extends Event = Event> =
  | MonetizationEventListener<T>
  | MonetizationEventListenerObject<T>

export interface MonetizationEventDetail {
  paymentPointer: string
  requestId: string
}

export interface MonetizationProgressEventDetail
  extends MonetizationEventDetail {
  amount: string
  assetCode: string
  assetScale: number
}

export type MonetizationEvent = CustomEvent<MonetizationEventDetail>
export type MonetizationPendingEvent = MonetizationEvent
export type MonetizationStartEvent = MonetizationEvent
export type MonetizationStopEvent = MonetizationEvent
export type MonetizationProgressEvent = CustomEvent<
  MonetizationProgressEventDetail
>

interface MonetizationEventMap {
  monetizationpending: MonetizationPendingEvent
  monetizationstart: MonetizationStartEvent
  monetizationstop: MonetizationStopEvent
  monetizationprogress: MonetizationProgressEvent
}

export type MonetizationState = 'stopped' | 'pending' | 'started'

interface Monetization extends EventTarget {
  state: MonetizationState

  addEventListener<T extends keyof MonetizationEventMap>(
    type: T,
    listener: MonetizationEventListenerOrListenerObject<
      MonetizationEventMap[T]
    > | null,
    options?: boolean | AddEventListenerOptions
  ): void

  removeEventListener<T extends keyof MonetizationEventMap>(
    type: T,
    listener: MonetizationEventListenerOrListenerObject<
      MonetizationEventMap[T]
    > | null,
    options?: EventListenerOptions | boolean
  ): void
}

declare global {
  interface Document {
    monetization?: Monetization
  }
}
