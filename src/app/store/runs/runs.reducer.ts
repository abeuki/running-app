import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Run } from "../../models/Run";
import { createReducer, on } from "@ngrx/store";
import * as Actions from './runs.actions'
export interface RunsState extends EntityState<Run>{}

const adapter = createEntityAdapter<Run>();

export const initialState = adapter.getInitialState();

export const runsReducer = createReducer(
    initialState,
    on(Actions.loadRunsSuccess, (state, {runs}) => 
        adapter.setAll(runs, state)
    )
)