
import Animation from "../../../../lib/Animation.js";
import State from "../../../../lib/State.js";
import { keys } from "../../../globals.js";
import PlayerStateName from "../../../enums/PlayerStateName.js";



export default class PlayerIdleState extends State {

    constructor(player) {
		super();

		this.player = player;
		this.animation = new Animation([0, 1, 2, 3], 0.3);

	}

    enter() {
		this.player.currentAnimation = this.animation;
    }

    update() {

		const collisionObjects = this.player.checkObjectCollisions();

		if (keys.q) {
			this.player.shouldWalk = !this.player.shouldWalk ;
			keys.q = false;
		}
		else if(keys.j){
			this.player.changeState(PlayerStateName.Attack);
		}
		else if(keys.k){
			this.player.changeState(PlayerStateName.Slide);
		}
		else if (keys.q){
			this.player.shouldWalk != this.player.shouldWalk ;
		}
		else if (keys[' ']) {
            keys[' '] = false;
			this.player.defaultJumpForce();
			this.player.changeState(PlayerStateName.Jumping);
		}
		else if (keys.a || keys.d) {
			this.player.changeState(PlayerStateName.Walking);
		}

	}
}