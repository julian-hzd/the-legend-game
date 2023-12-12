

import Animation from "../../../../lib/Animation.js";
import State from "../../../../lib/State.js";
import { keys } from "../../../globals.js";
import PlayerStateName from "../../../enums/PlayerStateName.js";
import Player from "../../../entities/Player.js"



export default class PlayerJumpingState extends State {


    constructor(player) {
        super();
        this.addJumpHeight = 0;

        this.player = player;
        this.animation = new Animation([16, 17, 18, 19, 20, 21, 22, 23], 0.1);
        this.player.extraJump=true;
        this.actualWidth = this.player.dimensions.x
    }

    enter() {
        this.player.velocity.y = this.player.jumpForce.y;
        this.player.currentAnimation = this.animation;
    }
    exit(){
        this.player.dimensions.x = this.actualWidth
        super.exit();
    }
    update(dt) {

		this.player.checkObjectCollisions(object => this.onObjectCollision(object));

        if (keys[' '] && this.player.extraJump) {

            this.player.extraJump = !this.player.extraJump
			this.player.defaultJumpForce();
			this.player.changeState(PlayerStateName.Jumping);
		}
        else if (this.player.velocity.y >= 0) {
            this.player.changeState(PlayerStateName.Falling);
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

        this.player.velocity.add(this.player.gravityForce, dt);

    }

    onObjectCollision(object) {
        this.player.leftRightCollision(object);
    }

}