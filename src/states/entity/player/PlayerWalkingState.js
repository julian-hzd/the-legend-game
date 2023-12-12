import State from "../../../../lib/State.js";
import Animation from "../../../../lib/Animation.js";
import { keys } from "../../../globals.js";
import PlayerStateName from "../../../enums/PlayerStateName.js";


export default class PlayerWalkingState extends State {

	/**
	 * Player's movement on the X axis. 
	 * Notice that the player's transition between running and walking is directed
	 * by a boolean which is triggered with the letter q
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();
		this.player = player;
		this.animation = new Animation([9, 10, 11, 12, 13], 0.1);
	}

	enter() {
		this.player.currentAnimation = this.animation;
	}

	update(dt) {


		const collisionObjects = this.player.checkObjectCollisions();
		
		if (collisionObjects.length === 0) {
			this.player.changeState(PlayerStateName.Falling);
		}
		else if (keys.q) {
			this.player.shouldWalk = !this.player.shouldWalk;
			keys.q = false;
			
		}
		else if (keys[' ']) {
            keys[' '] = false;
			this.player.extraJump = true;
			this.player.defaultJumpForce();
			this.player.changeState(PlayerStateName.Jumping);
		}
		else if (!keys.a && !keys.d && Math.abs(this.player.velocity.x) === 0) {
			this.player.changeState(PlayerStateName.Idle);
		}
		else if (keys.a) {
			this.player.moveLeft();
		}
		else if (keys.d) {
			this.player.moveRight();
		}
		else {
			this.player.stop();
		}
	}


}
