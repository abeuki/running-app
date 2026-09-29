import { bpm, metres, seconds } from "./datatypes";

export interface RunPoint{
    id: number;
    runId: number;
    timestamp: seconds;
    latitude: metres;
    longitude: metres;
    altitude: metres;
    heartRate: bpm;
}