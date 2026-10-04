import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { RunPoint } from "../../models/RunPoint";
import { createReducer, on } from "@ngrx/store";
import * as Actions from './runpoints.actions'

export interface RunPointsState extends EntityState<RunPoint>{
    loadedRunsIds: number[]
}

const adapter = createEntityAdapter<RunPoint>()

export const initialState : RunPointsState = adapter.getInitialState({
    loadedRunsIds: []
});

export const runPointsReducer = createReducer(
    initialState,
    on(Actions.loadRunPointsByRunIdSuccess, (state, {runId, runPoints}) => 
    adapter.addMany(runPoints, {
        ...state,
        loadedRunsIds:[...state.loadedRunsIds, runId]
    }))
)