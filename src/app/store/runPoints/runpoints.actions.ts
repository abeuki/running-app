import { createAction, props } from "@ngrx/store";
import { RunPoint } from "../../models/RunPoint";
export const loadRunPointsByRunId = createAction("Load RunPoints By RunId", 
    props<{runId: number}>()
)

export const loadRunPointsByRunIdSuccess = createAction("Load RunPoints By RunId Success",
    props<{runId: number, runPoints: RunPoint[]}>()
)