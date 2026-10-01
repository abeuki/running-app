import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";

export const selectRunsFeature = createSelector(
    (state: AppState) => state.runs,
    (runs) => runs
)

