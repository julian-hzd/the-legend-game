
import Animation from "../../../../lib/Animation.js";
import State from "../../../../lib/State.js";
import { keys } from "../../../globals.js";
import PlayerStateName from "../../../enums/PlayerStateName.js";
import Vector from "../../../../lib/Vector.js";

export default class PlayerClimbState extends State{
    static CLIMBING_WIDTH = 10;
    constructor(player) {
        super();

        this.player = player;
        this.animation = new Animation([30,31,32], 0.3);
    }

    
    enter() {
        this.player.currentAnimation = this.animation;
        this.player.dimensions.x -= PlayerClimbState.CLIMBING_WIDTH;
        this.player.extraJumping = true;
    }

    update() {
        this.player.velocity = new Vector(0, 0)
        if (keys[' ']) {
            this.player.extraJump = true;
            keys[' '] = false;
			this.player.defaultJumpForce();
			this.player.changeState(PlayerStateName.Jumping);
		}
    }
    exit() {
        this.player.extraJumping=true;
    }
}