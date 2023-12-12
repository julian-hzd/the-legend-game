import State from "../../../../../lib/State.js";
import Animation from "../../../../../lib/Animation.js";
import Direction from "../../../../enums/Direction.js";
import SkeletonStateName from '../../../../enums/SkeletonStateName.js'
import { getRandomPositiveInteger, didSucceedPercentChance } from "../../../../../lib/RandomNumberHelpers.js";
import { timer, keys } from "../../../../globals.js";


// Based on Vik's snail moving code but
// modified with tweening
export default class SkeletonWalkState extends State {
	static RANGE =10;
	static DISTANCE_MOVE = 20;
	constructor(skeleton) {
		super();

		this.skeleton = skeleton;

		this.animation = new Animation([11, 12, 13, 15, 16, 16, 17, 18, 19, 20, 21, 22, 23], 0.1);
		this.reset();
		
	}

	enter() {
		this.skeleton.currentAnimation = this.animation;

		this.reset();
		
		this.startTimer();

	}
	exit() {
		this.timerTask?.clear();
	}
	update() {
		this.playerNearby()

		this.move();
	}
	move() {
		if (this.skeleton.direction === Direction.Right) {
			this.skeleton.direction = Direction.Right;

			timer.tween(this.skeleton.position, ['x', 'y'], [this.skeleton.position.x+SkeletonWalkState.DISTANCE_MOVE, this.skeleton.position.y], 1,()=>{});
		}
		else {
			this.skeleton.direction = Direction.Left;
			timer.tween(this.skeleton.position, ['x', 'y'], [this.skeleton.position.x-SkeletonWalkState.DISTANCE_MOVE, this.skeleton.position.y], 1,()=>{});
		}
	}

	reset() {
		this.skeleton.direction = this.skeleton.direction === Direction.Right ? Direction.Left : Direction.Right;
		this.moveDuration = 4;
	}

	startTimer() {
		this.timerTask = timer.wait(this.moveDuration, () => this.decideMovement());
	}

	decideMovement() {
		if (didSucceedPercentChance(0.5)) {
			this.skeleton.changeState(SkeletonStateName.Idle);
		}
		else {
			this.reset();
			this.startTimer();
		}
	}

	playerNearby() {
		let player = this.skeleton.level.entities[this.skeleton.level.entities.length - 1];
		switch (this.skeleton.direction) {
			case Direction.Left:
				this.isAtLeft(player);
				break;
			case Direction.Right:
				this.isAtRight(player);
				break;
			default:
				break;
		}
		if (keys.u) {
			keys.u = false;
			console.log(player)
			console.log(this.skeleton)
		}

	}
	isAtLeft(player) {
		let playerWidth = player.position.x + player.dimensions.x
		let skeX = this.skeleton.position.x
		if (playerWidth >= skeX - SkeletonWalkState.RANGE && playerWidth < skeX + this.skeleton.dimensions.x / 2 && player.position.y - 1 === this.skeleton.position.y) {
			this.skeleton.changeState(SkeletonStateName.Attack);
		}
	}
	isAtRight(player) {
		let playerX = player.position.x
		let skeletonWidth = this.skeleton.position.x+this.skeleton.dimensions.x

		if (playerX >=  skeletonWidth && playerX <= skeletonWidth + SkeletonWalkState.RANGE &&  player.position.y - 1 === this.skeleton.position.y) {
			this.skeleton.changeState(SkeletonStateName.Attack);
		}
	}
	
}
