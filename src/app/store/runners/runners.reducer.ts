import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Runner } from "../../models/Runner";
import { createReducer, on } from "@ngrx/store";
import * as Actions from "./runners.actions"

export interface RunnersState extends EntityState<Runner>{
    selectedRunnerId1: number | null;
    selectedRunnerId2: number | null;
}

const adapter = createEntityAdapter<Runner>();

export const initialState: RunnersState = adapter.getInitialState({
    selectedRunnerId1: null,
    selectedRunnerId2: null
})

export const runnersReducer = createReducer(
    initialState,
    on(Actions.loadRunnersSuccess, (state, {runners}) =>
        adapter.setAll(runners, state)
    ),
    on(Actions.selectRunner, (state, {runnerId}) =>
    {
        //deselekcija trkaca
        if(state.selectedRunnerId1 == runnerId)
            return {
                ...state,
                selectedRunnerId1: null
            }
        if(state.selectedRunnerId2 == runnerId)
            return {
                ...state,
                selectedRunnerId2: null
            }
        //selekcija trkaca
        if(state.selectedRunnerId1 == null)
            return {
                ...state,
                selectedRunnerId1: runnerId
            }
        if(state.selectedRunnerId2 == null)
            return {
                ...state,
                selectedRunnerId2: runnerId
            }
        
        return state;
    }
    )
)