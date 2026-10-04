import { createAction, props } from "@ngrx/store";
import { RunPoint } from "../../models/RunPoint";

export const loadRunPoints = createAction("Load RunPoints", 
    props<{runId: number}>()
)

export const loadRunPointsSuccess = createAction("Load RunPoints Success",
    props<{runId: number, runPoints: RunPoint[]}>()
)