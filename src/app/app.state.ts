import { RunnersState } from "./store/runners/runners.reducer";
import { RunPointsState } from "./store/runPoints/runpoints.reducer";
import { RunsState } from "./store/runs/runs.reducer";

export interface AppState{
    runners: RunnersState,
    runs: RunsState,
    runPoints: RunPointsState
}