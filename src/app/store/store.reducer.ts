import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Runner } from "../models/Runner";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./store.actions"

export interface RunnersState extends EntityState<Runner>{
    selectedRunnersIds: number[]
}

const adapter = createEntityAdapter<Runner>();

export const initialState: RunnersState = adapter.getInitialState({
    selectedRunnersIds: []
})

export const runnersReducer = createReducer(
    initialState,
    on(Actions.loadRunnersSuccess, (state, {runners}) =>
        adapter.setAll(runners, state)
    )
)