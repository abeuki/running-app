import { bpm, metres, seconds } from "./datatypes";

export interface RunPoint{
    id: number;
    runId: number;
    datetime: string;
    latitude: metres; //geografska sirina
    longitude: metres; //geografska duzina
    altitude: metres;
    heartRate: bpm;
}