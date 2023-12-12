
import Animation from "../../../../lib/Animation.js";
import State from "../../../../lib/State.js";
import PlayerStateName from "../../../enums/PlayerStateName.js";
import { timer } from "../../../globals.js";

export default class PlayerSlideState extends State{
    static CLIMBING_WIDTH = 10;
    static SLIDE_LENGTH = 80;
    static SLIDE_ANIMATION_TIME = 0.5;
    constructor(player) {
        super();

        this.player = player;
        this.animation = new Animation([25,26,27,28,29], 0.1,1);
    }

    
    enter() {
        this.player.currentAnimation = this.animation;
        this.advance();
    }

    update() {
        if (this.player.currentAnimation.isDone()) {
			this.player.currentAnimation.refresh();
			this.player.changeState(PlayerStateName.Idle);
		}
    }
    exit() {
    }

    advance(){
        let position = this.player.position;
        switch (this.player.direction) {
            case 3:
                timer.tween(position, ['x', 'y'], [position.x+PlayerSlideState.SLIDE_LENGTH, position.y], PlayerSlideState.SLIDE_ANIMATION_TIME,()=>{});
            break;
            case 2:
                timer.tween(position, ['x', 'y'], [position.x-PlayerSlideState.SLIDE_LENGTH, position.y], PlayerSlideState.SLIDE_ANIMATION_TIME,()=>{});
            break;
        }
    }
}