import { makeStore, rootReducer } from "@/redux/store"
import { Action, ThunkAction } from "@reduxjs/toolkit"

export enum SliceStatus {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}

export type RootSliceState<T> = {
  state: T
  error?: string | null
  status: SliceStatus
}

export type RootState = ReturnType<typeof rootReducer>

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
