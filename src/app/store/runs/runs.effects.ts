import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RunsService } from "../../services/runs-service/runs-service";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";
import * as RunsActions from './runs.actions'
@Injectable()
export class runsEffects{
    actions$ = inject(Actions);
    runsService = inject(RunsService);

    loadRuns$ = createEffect(() => 
        this.actions$.pipe(
            ofType("Load Runs"),
            exhaustMap(() => 
                this.runsService.getAll().pipe(
                    map(runs => 
                        RunsActions.loadRunsSuccess({runs})
                    ),
                    catchError(() => EMPTY)
                )
            )
        )
    )
}