import State from "../../../../../lib/State.js";
import Animation from "../../../../../lib/Animation.js";
import { getRandomPositiveInteger } from "../../../../../lib/RandomNumberHelpers.js";
import SkeletonStateName from '../../../../enums/SkeletonStateName.js'
import Direction from '../../../../enums/Direction.js'
import SoundName from '../../../../enums/SoundName.js'
import { keys, timer, sounds } from "../../../../globals.js";


export default class SkeletonAttackState extends State {

    constructor(skeleton) {
		super();

		this.skeleton = skeleton;
		this.animation = new Animation([25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41], 0.1,1);
	}
    enter() {
        this.once=true;

		this.skeleton.currentAnimation = this.animation;
    }

	update(){

        if (this.skeleton.currentAnimation.isHalfwayDone()) {
			this.setSwordHitbox();
		}

        if (this.skeleton.currentAnimation.isDone()) {
			this.skeleton.currentAnimation.refresh();
			this.skeleton.changeState(SkeletonStateName.Idle);
		}

        let player = this.skeleton.level.entities[this.skeleton.level.entities.length-1]
        if (player.didCollideWithEntity(this.skeleton.swordHitbox) && this.once) {
            player.numLives-=1;
		    sounds.play(SoundName.HumanDmg);
            this.once = false;
        }
	}
    // Code based from Vik and refactored in a 2D game
    setSwordHitbox(){
        let hitboxX, hitboxY, hitboxWidth, hitboxHeight;

		// The magic numbers here are to adjust the hitbox offsets to make it line up with the sword animation.
		if (this.skeleton.direction === Direction.Left) {
			hitboxWidth = this.skeleton.dimensions.x
			hitboxHeight = this.skeleton.dimensions.y;
			hitboxX = this.skeleton.position.x - hitboxWidth;
			hitboxY = this.skeleton.position.y ;
		}
		else if (this.skeleton.direction === Direction.Right) {
            hitboxWidth = this.skeleton.dimensions.x
			hitboxHeight = this.skeleton.dimensions.y;
			hitboxX = this.skeleton.position.x + hitboxWidth;
			hitboxY = this.skeleton.position.y ;
		}

		this.skeleton.swordHitbox.set(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
    }

    exit(){
		this.skeleton.swordHitbox.set(0, 0, 0, 0);
    }
}