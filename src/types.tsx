import { DateTime } from "luxon";

export interface Schedule {

	streamsOn(day: DateTime): Stream[]

}

export interface Stream {

	title: string
	startTime: DateTime
	locations: Location[]
	color: string

}

export interface Location {

	platform: Platform
	url: URL

}

export enum Platform {
	Twitch,
	YouTube,
}
