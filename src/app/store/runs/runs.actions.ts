import { createAction, props } from "@ngrx/store";
import { Run } from "../../models/Run";

export const loadRuns = createAction("Load Runs")
export const loadRunsSuccess = createAction("Load Runs Success", 
    props<{runs: Run[]}>()
)
