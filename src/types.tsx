import { DateTime } from "luxon"

export interface Schedule {
	months(): number[]
	streamsOn(day: DateTime): Stream[]
}

export interface Streamer {
	name: string
	color: string
	channels: Location[]
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

export enum FontAwesomeIcon {
	Discord,
	FacebookF,
	Github,
	HackerNews,
	LinkedinIn,
	MediumM,
	RedditAlien,
	Rss,
	StackOverflow,
	Twitch,
	Twitter,
	Vk,
	YouTube,
	Xing,
}
