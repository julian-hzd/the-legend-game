import State from "../../../../lib/State.js";
import Animation from "../../../../lib/Animation.js";
import Vector from "../../../../lib/Vector.js";
import PlayerStateName from "../../../enums/PlayerStateName.js";
import { CANVAS_HEIGHT, keys } from "../../../globals.js";
import Player from "../../../entities/Player.js"
export default class PlayerFallingState extends State {

	static SMALL_GAP =10;
    constructor(player ) {
		super();

		this.player = player;

		this.animation = new Animation([22, 23], 0.1);
	}


    enter() {
		this.player.currentAnimation = this.animation;
	}


    update(dt) {
		
		this.player.velocity.add(this.player.gravityForce, dt);		
		this.player.checkObjectCollisions(object => this.onObjectCollision(object));

		if(keys[' '] && this.player.extraJump){
			keys[' '] = false;
			this.player.extraJump = !this.player.extraJump;
			this.player.defaultJumpForce();
			this.player.changeState(PlayerStateName.Jumping);
		}
		else if (this.player.position.y > CANVAS_HEIGHT) {
			console.log(this.player)
			this.player.velocity.y=0
			this.player.position.y = CANVAS_HEIGHT-this.player.dimensions.y;
			this.player.changeState(PlayerStateName.Idle)
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



	onObjectCollision(object) {
		if (object.isSolid) {
			if(this.playerAbovePlatform(object)){
				this.player.position.y = object.position.y - this.player.dimensions.y;
				this.player.velocity.y = 0;
				this.player.changeState(PlayerStateName.Idle);
				this.player.extraJump = !this.player.extraJump;
			}
			else{
				this.player.leftRightCollision(object);
			}
		}
	}

	playerAbovePlatform(object){
		return this.player.position.y + this.player.dimensions.y < object.position.y + Player.SMALL_GAP;
	}

}