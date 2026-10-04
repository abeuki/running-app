import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { RunPoint } from "../../models/RunPoint";

export const selectRunPointsFeature = createSelector(
    (state: AppState) => state.runPoints,
    (runPoints) => runPoints
)

export const selectLoadedRunIds = createSelector(
    selectRunPointsFeature,
    (runPoints) => runPoints.loadedRunsIds
)

export const selectRunPointsByRunId = (runId: number) => 
    createSelector(
        selectRunPointsFeature,
        (runPoints) => runPoints.ids
        .map(id => runPoints.entities[id])
        .filter(runPoint => runPoint != null && runPoint.runId == runId)
        .map(runPoint => <RunPoint> runPoint)
    )