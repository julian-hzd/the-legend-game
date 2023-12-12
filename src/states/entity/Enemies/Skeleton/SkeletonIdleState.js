import State from "../../../../../lib/State.js";
import Animation from "../../../../../lib/Animation.js";
import { getRandomPositiveInteger } from "../../../../../lib/RandomNumberHelpers.js";
import SkeletonStateName from '../../../../enums/SkeletonStateName.js'
import Direction from '../../../../enums/Direction.js'
import { keys, timer } from "../../../../globals.js";


export default class SkeletonIdleState extends State {

	static RANGE = 10;
	constructor(skeleton) {
		super();

		this.skeleton = skeleton;
		this.animation = new Animation([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0.1);
	}
	enter() {
		this.idleDuration = getRandomPositiveInteger(2, 5);

		this.skeleton.currentAnimation = this.animation;

		// this.startTimer();
	}

	update() {
		this.playerNearby()
	}
	startTimer() {
		this.timerTask = timer.wait(this.idleDuration, () => this.skeleton.changeState(SkeletonStateName.Walking));
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
		if (playerWidth >= skeX - SkeletonIdleState.RANGE && playerWidth < skeX + this.skeleton.dimensions.x / 2 && player.position.y - 1 === this.skeleton.position.y) {
			this.skeleton.changeState(SkeletonStateName.Attack);
		}
	}
	isAtRight(player) {
		let playerX = player.position.x
		let skeletonWidth = this.skeleton.position.x+this.skeleton.dimensions.x

		if (playerX >=  skeletonWidth && playerX <= skeletonWidth + SkeletonIdleState.RANGE &&  player.position.y - 1 === this.skeleton.position.y) {
			this.skeleton.changeState(SkeletonStateName.Attack);
		}
	}
}