import Vector from "../../lib/Vector.js";
import Camera from "../../lib/Camera.js";
import { getRandomPositiveInteger, didSucceedPercentChance } from "../../lib/RandomNumberHelpers.js";
import Platform from "./Plarform.js";
import Player from "../entities/Player.js";
import Skeleton from "../entities/Enemies/Skeleton.js";
import EnemyFactory from "../entities/Enemies/EnemyFactory.js";
import Background from "./Background.js"
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../globals.js";
import Direction from '../enums/Direction.js'
import EnemyType from '../enums/EnemyType.js'


export default class Level {

    static beginning = 375;
    static NUMBER_PLATFORMS = 6;

    static ARBITRARY_X_DIVISION = 70;
    static ARBITRARY_Y_DIVISION = 90;


    constructor(entities = []) {
        this.entities = entities;
        this.objects = this.generatePlatforms();
		this.background = new Background(new Vector(CANVAS_WIDTH,CANVAS_HEIGHT));
    }


    update(dt) {
		this.background.update();

        this.updateEntities(dt);
    }

    render() {
		this.background.render();

        this.objects.forEach((p, i) => {
            p.render();
        })

        this.entities.forEach((entity) => {
            entity.render();
        });
    }

    generatePlatforms() {
        let platforms = [];

        for (let i = 0; i < Level.NUMBER_PLATFORMS; i++) {

            let y = i % 2 === 0 ? Level.beginning + Level.ARBITRARY_Y_DIVISION : Level.beginning - Level.ARBITRARY_Y_DIVISION;
            let x = (Platform.WIDTH + Level.ARBITRARY_X_DIVISION);

            if(i%2===0)
                this.generateSkeleton((x*i)+Platform.WIDTH, y);

            platforms.push(new Platform(new Vector(x*i, y)))
            platforms.push(new Platform(new Vector(x*i+Platform.WIDTH, y)))

        }
        return platforms;
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    addCamera(camera) {
		this.background.addCamera(camera);
	}

     generateSkeleton(x,y) {

        let sk = EnemyFactory.createInstance(EnemyType.Skeleton,new Vector(Skeleton.WIDTH_IDLE, Skeleton.HEIGHT),new Vector(x, y-Skeleton.HEIGHT),this)

        if (didSucceedPercentChance(0.5)) 
			sk.direction = Direction.Right;
		
        this.entities.push(sk)
    }

    updateEntities(dt){
        this.entities.forEach((entity) => {

            entity.update(dt);
        });
    }

    cleanUpEntitiesAndObjects() {
		this.entities = this.entities.filter((entity) => !entity.isDead);
	}
}

