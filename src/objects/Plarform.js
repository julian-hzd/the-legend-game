import ImageName from "../enums/ImageName.js";
import Sprite from "../../lib/Sprite.js";
import { images, sounds, context } from "../globals.js";
import GameObject from "./GameObject.js";
import Vector from "../../lib/Vector.js";

export default class Platform extends GameObject {
    static WIDTH=112;
    static HEIGHT=96;

    static SPRITE_Y = 240;
    static SPRITE_X = 240;

    // Grass numbers below are to show the little grass from the sprite
    static GRASS_WIDTH = 13;
    static GRASS_HEIGHT = 10;

    static GRASS_X = 5;
    static GRASS_Y = 4.5;
    constructor(position) {

        super(new Vector(Platform.WIDTH + Platform.GRASS_WIDTH - 2.5, Platform.HEIGHT +  Platform.GRASS_HEIGHT - 1), new Vector(position.x, position.y));

		this.isCollidable = true;
		this.isSolid = true;

        this.sprites = Platform.generateSprites();
    }

    render(){
        // this.renderBox('blue');
        
        super.render();
    }


    static generateSprites() {


        return [new Sprite(
            images.get(ImageName.Ground),
            Platform.SPRITE_X - Platform.GRASS_X,
            Platform.SPRITE_Y - Platform.GRASS_Y,
            Platform.WIDTH + Platform.GRASS_WIDTH,
            Platform.HEIGHT + Platform.GRASS_HEIGHT,
        )];
    }


}