import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Run } from "../../models/Run";
import { selectSelectedRunnerId1, selectSelectedRunnerId2 } from "../runners/runners.selector";
import { ɵgenerateStandaloneInDeclarationsError } from "@angular/core";

export const selectRunsFeature = createSelector(
    (state: AppState) => state.runs,
    (runs) => runs
)

export const selectRuns = createSelector(
    selectRunsFeature,
    (runs) => runs.ids.map(id => runs.entities[id])
    .filter(run => run != null)
    .map(run => <Run>run)
)

export const selectRunsForRunner1 = createSelector(
    selectSelectedRunnerId1,
    selectRuns,
    (id, runs) => 
        id == null ? [] : runs.filter(run => run.runnerId == id) ?? []
)

export const selectRunsForRunner2 = createSelector(
    selectSelectedRunnerId2,
    selectRuns,
    (id, runs) => 
        id == null ? [] : runs.filter(run => run.runnerId == id) ?? []
)