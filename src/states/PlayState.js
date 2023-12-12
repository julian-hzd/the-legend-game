import State from "../../lib/State.js";
import Sprite from "../../lib/Sprite.js";
import { images, context, stateMachine } from "../globals.js";
import Graphic from "../../lib/Graphic.js";
import ImageName from "../enums/ImageName.js";
import Plarform from "../objects/Plarform.js"
import Level from "../objects/Level.js"
import Player from "../entities/Player.js";
import Skeleton from "../entities/Enemies/Skeleton.js";
import Vector from "../../lib/Vector.js";
import Camera from "../../lib/Camera.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT, timer } from "../globals.js";
import GameStateName from "../enums/GameStateName.js";

export default class PlayState extends State {
	constructor() {
		super();

		this.level = new Level();

        this.player = new Player( 
			new Vector(Player.WIDTH, Player.HEIGHT),
			new Vector(300, 0),
			this.level 
		);

		this.level.player=this.player;
		this.camera = new Camera(
			this.player,
			new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
			new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
		);

		this.level.addEntity(this.player);

		this.level.addCamera(this.camera);
		this.once=true;
	}

	enter(){
	}
	update(dt) {
		this.level.update(dt);
		this.camera.update();
		timer.update(dt);

		this.winOrLose();
	}

	render() {
		this.level.render();
		context.font = '40px Monogram';

		context.fillStyle = 'white';
		context.textBaseline = 'middle';
		context.textAlign = 'center';

		let lives = this.player.numLives;
		context.fillText('Lives: ', 100, 50);

		context.fillStyle = 'red';
		context.fillText(lives, 145, 51);

		context.fillStyle = 'lightblue';
		context.fillText('J = Attack', CANVAS_WIDTH-80, CANVAS_HEIGHT-50);
		context.fillText('K = Slide', CANVAS_WIDTH-80, CANVAS_HEIGHT-20);

	}

	winOrLose(){
		if (this.level.player.numLives===0 && this.once) {

			stateMachine.change(GameStateName.Transition, {
				fromState: this,
				toState: stateMachine.states[GameStateName.TitleScreen]
			});
			this.once=false;
		}
	}
}
