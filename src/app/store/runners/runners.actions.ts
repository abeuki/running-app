import { createAction, props } from "@ngrx/store";
import { Runner } from "../../models/Runner";

export const loadRunners = createAction("Load Runners");

export const loadRunnersSuccess = createAction("Load Runners Success",
    props<{runners: Runner[]}>()
)

export const selectRunner = createAction("Select Runner",
    props<{runnerId: number}>()
)

