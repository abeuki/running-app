import { RunnersState } from "./store/runners/runners.reducer";

export interface AppState{
    runners: RunnersState;
    runs: RunnersState;
}