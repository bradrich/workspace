import { Constants } from './constants.model';

let constants: Constants;

export class ConstantsHelper {
  /**
   * Sets `constants`.
   * @param {Constants} val
   */
  static setConstants(val: Constants) {
    constants = val;
  }

  /**
   * Gets `constants`.
   * @returns {Constants}
   */
  static getConstants(): Constants {
    return constants;
  }
}
