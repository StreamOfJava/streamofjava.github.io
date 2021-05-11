import { DateTime } from "luxon";

export interface Schedule {

	streamsOn(day: DateTime): Stream[]

}

export interface Stream {

	startTime: DateTime

}
