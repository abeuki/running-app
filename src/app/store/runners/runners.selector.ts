import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Runner } from "../../models/Runner";

export const selectRunnersFeature = createSelector(
    (state: AppState) => state.runners,
    (runners) => runners
)

export const selectSelectedRunnerId1 = createSelector(
    selectRunnersFeature,
    (runners) => runners.selectedRunnerId1
)

export const selectSelectedRunnerId2 = createSelector(
    selectRunnersFeature,
    (runners) => runners.selectedRunnerId2
)

export const selectRunnersList = createSelector(
    selectRunnersFeature,
    (runners) => runners.ids.map(id => runners.entities[id])
    .filter(runner => runner != null)
    .map(runner => <Runner> runner)
)
