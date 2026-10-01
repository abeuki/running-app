import { createAction, props } from "@ngrx/store";

export const loadRuns = createAction("Load Runs",
    props<{runnerId: number}>()
)