import State from "../../lib/State.js";
import GameStateName from "../enums/GameStateName.js";
import ImageName from "../enums/ImageName.js";
// import SoundName from "../enums/SoundName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, keys, sounds, stateMachine, timer } from "../globals.js";

import SoundName from "../enums/SoundName.js";


export default class TitleScreenState extends State {
	/**
	 * Displays a title screen where the player
	 * can press enter to start a new game.
	 */
	constructor() {
		super();
	}

	enter() {
		// sounds.play(SoundName.Intro);
	}

	exit() {
	}

	update(dt) {
		if (true) {
			stateMachine.change(GameStateName.Play, {
				level: this.level,
				player: this.player,
			});
		}
	}

	render() {
		images.render(ImageName.TitleBc, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.font = '60px Dungeon';
		context.fillStyle = 'white';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('The Legend', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
		context.font = '30px Dungeon';
		context.fillText('Enter = Adventure!', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 40);
	}
}

