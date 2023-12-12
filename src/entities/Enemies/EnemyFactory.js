import EnemyType from "../../enums/EnemyType.js";
import Skeleton from "./Skeleton.js";

/**
 * Encapsulates all definitions for instantiating new enemies.
 */
export default class EnemyFactory {
	/**
	 * @param {string} type A string using the EnemyType enum.
	 * @param {array} sprites The sprites to be used for the enemy.
	 * @returns An instance of an enemy specified by EnemyType.
	 */
	static createInstance(type, dimensions, position, level) {
		switch (type) {
			case EnemyType.Skeleton:
				return new Skeleton(dimensions, position, level);
			// case EnemyType.Slime:
			// 	return new Slime(sprites);
		}
	}
}
