import React from "react"

import { FontAwesomeIcon as ReactFaIcon } from "@fortawesome/react-fontawesome"
import { faRss } from "@fortawesome/free-solid-svg-icons"
import {
	faDiscord,
	faFacebookF,
	faGithub,
	faHackerNews,
	faLinkedinIn,
	faMediumM,
	faRedditAlien,
	faStackOverflow,
	faTwitch,
	faTwitter,
	faVk,
	faYoutube,
	faXing,
} from "@fortawesome/free-brands-svg-icons"

import { FontAwesomeIcon } from "../types"

interface FaIconProperties {
	icon: FontAwesomeIcon
}

const FaIcon = ({ icon }: FaIconProperties) => <ReactFaIcon icon={iconForName(icon)} />

// don't use a library (e.g. `library.add(fas, fab)`) because,
// if the icons are referenced by string, they require JavaScript to show up;
// importing them explicitly works around that
const iconForName = (icon: FontAwesomeIcon) => {
	switch (icon) {
		case FontAwesomeIcon.Discord:
			return faDiscord
		case FontAwesomeIcon.FacebookF:
			return faFacebookF
		case FontAwesomeIcon.Github:
			return faGithub
		case FontAwesomeIcon.HackerNews:
			return faHackerNews
		case FontAwesomeIcon.LinkedinIn:
			return faLinkedinIn
		case FontAwesomeIcon.MediumM:
			return faMediumM
		case FontAwesomeIcon.RedditAlien:
			return faRedditAlien
		case FontAwesomeIcon.Rss:
			return faRss
		case FontAwesomeIcon.StackOverflow:
			return faStackOverflow
		case FontAwesomeIcon.Twitch:
			return faTwitch
		case FontAwesomeIcon.Twitter:
			return faTwitter
		case FontAwesomeIcon.Vk:
			return faVk
		case FontAwesomeIcon.YouTube:
			return faYoutube
		case FontAwesomeIcon.Xing:
			return faXing
		default:
			throw new Error(`Unknown FontAwesome icon: "${icon}".`)
	}
}

export default FaIcon
