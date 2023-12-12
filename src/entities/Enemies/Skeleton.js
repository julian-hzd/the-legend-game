import GameEntity from '../GameEntity.js'
import StateMachine from "../../../lib/StateMachine.js";
import { images, sounds, context } from "../../globals.js";

import SkeletonIdleState from "../../states/entity/Enemies/Skeleton/SkeletonIdleState.js";
import SkeletonWalkState from "../../states/entity/Enemies/Skeleton/SkeletonWalkState.js";
import SkeletonAttackState from "../../states/entity/Enemies/Skeleton/SkeletonAttackState.js";

import ImageName from "../../enums/ImageName.js";
import Sprite from "../../../lib/Sprite.js";

import SkeletonStateName from "../../enums/SkeletonStateName.js";
import Hitbox from "../../../lib/Hitbox.js";

export default class Skeleton extends GameEntity {

    static HEIGHT = 32;
    static WIDTH_IDLE = 24;

    static IDLE_COL =11;
    static WALK_COL =13;
    static ATTACK_COL =18;

    static VELOCITY_LIMIT = 40;
    constructor(dimensions, position, level, player) {
        super(dimensions, position, Skeleton.VELOCITY_LIMIT, level);

        this.sprites = Skeleton.generateSprites();

        this.stateMachine = new StateMachine();
        this.stateMachine.add(SkeletonStateName.Idle, new SkeletonIdleState(this));
        this.stateMachine.add(SkeletonStateName.Walking, new SkeletonWalkState(this));
        this.stateMachine.add(SkeletonStateName.Attack, new SkeletonAttackState(this));

		this.swordHitbox = new Hitbox(0, 0, 0, 0, 'blue');
        
    
		this.changeState(SkeletonStateName.Walking);

    }

    static generateSprites() {
        const sprites = [];

        for (let k = 0; k < Skeleton.IDLE_COL; k++) {

            sprites.push(new Sprite(
                images.get(ImageName.SkeletonIdle),
                k*Skeleton.WIDTH_IDLE,
                0,
                Skeleton.WIDTH_IDLE,
                Skeleton.HEIGHT,
            ));
        }
        for (let i = 0; i < Skeleton.WALK_COL; i++) {
            sprites.push(new Sprite(
                images.get(ImageName.SkeletonWalk),
                i*(Skeleton.WIDTH_IDLE-2),
                0,
                Skeleton.WIDTH_IDLE-2,
                Skeleton.HEIGHT,
            ));
        }
        for (let i = 0; i < Skeleton.ATTACK_COL; i++) {
            sprites.push(new Sprite(
                images.get(ImageName.SkeletonAttack),
                i*43,
                0,
                43,
                47,
            ));
        }
        return sprites;
    }

    render(){
        this.swordHitbox.render(context);

		super.render();
	}
}