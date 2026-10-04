import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RunPointsService } from "../../services/run-points/run-points-service";
import * as RunPointsActions from './runpoints.actions'
import { catchError, EMPTY, exhaustMap, map } from "rxjs";

@Injectable()
export class runPointsEffects{
    actions$ = inject(Actions);
    runPointsService = inject(RunPointsService);

    loadRunPointsByRunId$ = createEffect(() => 
        this.actions$.pipe(
            ofType(RunPointsActions.loadRunPointsByRunId),
            exhaustMap(({runId}) => 
                this.runPointsService.getRunPointsByRunId(runId).pipe(
                    map(runPoints => 
                        RunPointsActions.loadRunPointsByRunIdSuccess({
                            runId, 
                            runPoints
                        })
                    ),
                    catchError(() => EMPTY)
                    
                )
            )
        )
    );
}