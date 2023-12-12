import ImageName from "../enums/ImageName.js";
import Sprite from "../../lib/Sprite.js";
import { images, sounds, context } from "../globals.js";
import GameEntity from "./GameEntity.js";
import StateMachine from "../../lib/StateMachine.js";

import PlayerIdleState from "../states/entity/player/PlayerIdleState.js";
import PlayerFallingState from "../states/entity/player/PlayerFallingState.js";
import PlayerWalkingState from "../states/entity/player/PlayerWalkingState.js";
import PlayerJumpingState from "../states/entity/player/PlayerJumpingState.js";
import PlayerClimbState from "../states/entity/player/PlayerClimbState.js";
import PlayerAttackState from "../states/entity/player/PlayerAttackState.js";
import PlayerSlideState from "../states/entity/player/PlayerSlideState.js";


import PlayerStateName from "../enums/PlayerStateName.js";
import Vector from "../../lib/Vector.js";

import Direction from "../enums/Direction.js";
import Hitbox from "../../lib/Hitbox.js";

export default class Player extends GameEntity{

	static SMALL_GAP=10;
	
    static WIDTH = 20;
    static HEIGHT = 31;

    static SPRITE_WIDTH = 50;
    static SPRITE_HEIGHT = 37;

	static DEF_Y_JUMP_FORCE = -300;

    static SPRITE_ROWS = 12;
    static SPRITE_COLS = 8;

	static WALKING_SPEED =110;
	static RUNNING_SPEED =170;
	
    constructor(dimensions, position, level){
        super(dimensions, position, null, level);
		this.gravityForce = new Vector(0, 500 );
        
        this.sprites = Player.generateSprites();
		this.jumpForce = new Vector(0, Player.DEF_Y_JUMP_FORCE);

        this.speedScalar = 150;
		this.frictionScalar = 0;

		this.stateMachine = new StateMachine();
		this.stateMachine.add(PlayerStateName.Idle, new PlayerIdleState(this));
		this.stateMachine.add(PlayerStateName.Falling, new PlayerFallingState(this));
		this.stateMachine.add(PlayerStateName.Walking, new PlayerWalkingState(this));
		this.stateMachine.add(PlayerStateName.Jumping, new PlayerJumpingState(this));
		this.stateMachine.add(PlayerStateName.Climbing, new PlayerClimbState(this));
		this.stateMachine.add(PlayerStateName.Attack, new PlayerAttackState(this));
		this.stateMachine.add(PlayerStateName.Slide, new PlayerSlideState(this));
		
		this.changeState(PlayerStateName.Falling);
		this.shouldWalk=false;

		this.currentSpeed;
		this.numLives = 3;

		this.swordHitbox = new Hitbox(0, 0, 0, 0, 'blue');
    }

	render(){
        this.swordHitbox.render(context);

		super.render();
	}

	// Magic numbers below to adjust player width and height to screen so they match with
	// his actual body width and height
    static generateSprites() {
		const sprites = [];

		for (let i = 0; i < Player.SPRITE_ROWS; i++) {
            for (let k = 0; k < Player.SPRITE_COLS; k++) {
                
                sprites.push(new Sprite(
                    images.get(ImageName.Player),
                    k * Player.SPRITE_WIDTH+15,
                    i * Player.SPRITE_HEIGHT+5,
                    Player.SPRITE_WIDTH-15,
                    Player.SPRITE_HEIGHT-6,
                ));
            }
        }
		return sprites;
    }

	onObjectCollision(object) {
		const collisionObjects = [];

		if (object.isSolid || object.isCollidable) {
			collisionObjects.push(object);
		}
		else if (object.isConsumable) {
			object.onConsume(this);
		}

		return collisionObjects;
	}


    checkObjectCollisions(onCollision = object => this.onObjectCollision(object)) {
		let collisionObjects = [];

		this.level.objects.forEach((object) => {
			if (object.didCollideWithEntity(this)) {
				collisionObjects = onCollision(object);
			}
		});

		return collisionObjects;
	}

    // Movement

    moveLeft() {
		this.direction = Direction.Left;
		this.currentSpeed = this.shouldWalk ? Player.WALKING_SPEED : Player.RUNNING_SPEED; 
		this.velocity.x = Math.max(this.velocity.x - this.speedScalar , -this.currentSpeed);
	}

	moveRight() {
		this.direction = Direction.Right;
		this.currentSpeed = this.shouldWalk ? Player.WALKING_SPEED : Player.RUNNING_SPEED; 
		this.velocity.x = Math.min(this.velocity.x + this.speedScalar, this.currentSpeed);
	}

    stop() {
		this.velocity.x=0;
	}

	defaultJumpForce(){
		this.jumpForce = new Vector(0, Player.DEF_Y_JUMP_FORCE);
	}

	leftRightCollision(object){

		if (this.position.x + this.dimensions.x <= object.position.x + object.dimensions.x/2 ) {
			this.position.x = object.position.x-this.dimensions.x;
			this.changeState(PlayerStateName.Climbing)
		}
		else if(this.position.x >= object.position.x + object.dimensions.x/2){
			this.position.x = object.position.x + object.dimensions.x + this.dimensions.x/2;
			this.changeState(PlayerStateName.Climbing)
		}
	}
}