import { minutesPerKilometer } from "./datatypes";

export interface PaceSegment{
  startMinute: number;
  endMinute: number;
  pace: minutesPerKilometer;
}