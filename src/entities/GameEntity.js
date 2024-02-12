import { context } from "../globals.js";
import Level from "../objects/Level.js";
import Vector from "../../lib/Vector.js";
import Timer from "../../lib/Timer.js";
import { isAABBCollision } from "../../lib/CollisionHelpers.js";
import Hitbox from "../../lib/Hitbox.js";
import Direction from "../enums/Direction.js";

export default class Entity {
  /**
   * The base class to be extended by all entities in the game.
   *
   * @param {Vector} dimensions The height and width of the entity.
   * @param {Vector} position The x and y coordinates of the entity.
   * @param {Vector} velocityLimit The maximum speed of the entity.
   * @param {Level} level The level that the entity lives in.
   */
  constructor(dimensions, position, velocityLimit, level) {
    this.dimensions = dimensions;
    this.position = position;
    this.currentAnimation = null;
    this.stateMachine = null;
    this.sprites = [];
    this.velocity = new Vector(0, 0);
    this.timer = new Timer();
    this.direction = Direction.Right;
    this.isDead = false;
    this.cleanUp = false;
    this.level = level;
    this.velocityLimit = velocityLimit;
    this.hitbox = new Hitbox(
      this.position.x,
      this.position.y,
      this.dimensions.x,
      this.dimensions.y,
    );
  }

  changeState(state, params) {
    this.stateMachine.change(state, params);
  }

  update(dt) {
    this.stateMachine.update(dt);
    this.position.add(this.velocity, dt);
    this.currentAnimation.update(dt);
    this.timer.update(dt);
    this.hitbox.set(
      this.position.x,
      this.position.y,
      this.dimensions.x,
      this.dimensions.y,
    );
  }

  render() {
    this.stateMachine.render();

    if (this.isDead) {
      return;
    }

    this.renderEntity();
    // this.hitbox.render(context);
  }

  /**
   * Draw character, this time getting the current frame from the animation.
   * We also check for our direction and scale by -1 on the X axis if we're facing left.
   */
  renderEntity() {
    if (this.direction === Direction.Left) {
      context.save();
      context.translate(
        Math.floor(this.position.x) + this.dimensions.x,
        Math.floor(this.position.y),
      );
      context.scale(-1, 1);
      this.sprites[this.currentAnimation.getCurrentFrame()].render(0, 0);
      context.restore();
    } else {
      this.sprites[this.currentAnimation.getCurrentFrame()].render(
        Math.floor(this.position.x),
        Math.floor(this.position.y),
      );
    }
  }

  didCollideWithEntity(hitbox) {
    return this.hitbox.didCollide(hitbox);
  }
}
