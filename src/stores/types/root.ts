import { CombinedState, EnhancedStore } from "@reduxjs/toolkit";
import reducers from "../reducers";

export type RootState = ReturnType<typeof reducers>;
export type State = EnhancedStore<CombinedState<RootState>>;
export type ValidationErrors = {
  errorMessage: string;
  field_errors: Record<string, string>
}