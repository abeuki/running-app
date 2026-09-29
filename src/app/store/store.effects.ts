import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RunnerActions from "./store.actions"
import { RunnerService } from "../services/runner-service";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";

@Injectable()
export class runnersEffects{
    actions$ = inject(Actions);
    runnerService = inject(RunnerService);

    loadSongs$ = createEffect(() => 
    this.actions$.pipe(
        ofType("Load Runners"),
        exhaustMap(() => 
        this.runnerService.getAll().pipe(
            map((runners) => 
            RunnerActions.loadRunnersSuccess({runners})),
            catchError(() => EMPTY)
        )
        )
    ))
}