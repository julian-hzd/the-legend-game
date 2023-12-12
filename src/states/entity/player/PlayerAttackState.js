
import Animation from "../../../../lib/Animation.js";
import State from "../../../../lib/State.js";
import PlayerStateName from "../../../enums/PlayerStateName.js";
import { sounds } from "../../../globals.js";
import SoundName from '../../../enums/SoundName.js'
import Direction from '../../../enums/Direction.js'

export default class PlayerAttackState extends State{
    static CLIMBING_WIDTH = 10;
    static SWORD_WIDTH = 10;
    constructor(player) {
        super();

        this.player = player;
        this.animation = new Animation([40,41, 42, 43, 44, 45, 46, 47, 48], 0.1,1);
    }

    
    enter() {
        this.player.currentAnimation = this.animation;
    }

    update() {
        if (this.player.currentAnimation.isHalfwayDone()) {
            sounds.play(SoundName.HumanAttack)
			this.setSwordHitbox();

        }

        if (this.player.currentAnimation.isDone()) {
			this.player.currentAnimation.refresh();
			this.player.changeState(PlayerStateName.Idle);
		}

        this.player.level.entities.forEach(e=> {
            
            if (e!== this.player && e.didCollideWithEntity(this.player.swordHitbox)) {
                e.isDead=true;
            }
        });
    }

    setSwordHitbox(){
        let hitboxX, hitboxY, hitboxWidth, hitboxHeight;

		// The magic numbers here are to adjust the hitbox offsets to make it line up with the sword animation.
		if (this.player.direction === Direction.Left) {
			hitboxWidth = this.player.dimensions.x
			hitboxHeight = this.player.dimensions.y;
			hitboxX = this.player.position.x - hitboxWidth;
			hitboxY = this.player.position.y ;
		}
		else if (this.player.direction === Direction.Right) {
            hitboxWidth = this.player.dimensions.x
			hitboxHeight = this.player.dimensions.y;
			hitboxX = this.player.position.x + hitboxWidth;
			hitboxY = this.player.position.y ;
		}

		this.player.swordHitbox.set(hitboxX, hitboxY, hitboxWidth, hitboxHeight);
    }
    exit(){
		this.player.swordHitbox.set(0, 0, 0, 0);
    }
}