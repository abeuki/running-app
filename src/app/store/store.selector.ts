import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Runner } from "../models/Runner";

export const selectRunnersFeature = createSelector(
    (state: AppState) => state.runners,
    (runners) => runners
)

export const selectSelectedRunners = createSelector(
    selectRunnersFeature,
    (runners) => runners.selectedRunnersIds
)

export const selectRunnersList = createSelector(
    selectRunnersFeature,
    (runners) => runners.ids.map(id => runners.entities[id])
    .filter(runner => runner != null)
    .map(runner => <Runner> runner)
)
