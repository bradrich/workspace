import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {
  /**
   * Converts multiple entities within an array into an object where each property contains all of
   * the values from each entities' property values.
   * @param {*} objTemplate
   * @param {Array<any>} entities
   * @returns {*}
   */
  convertEntityArrayToCommonEntityObject(objTemplate: any, entities: Array<any>): any {
    const reduce = (target) => {
      return target.reduce(function(allVals, val) {
        if (val in allVals) {
          allVals[val]++;
        } else {
          allVals[val] = 1;
        }
        return allVals;
      }, {});
    };

    const sort = (target) => {
      return Object.keys(target).sort(function(a, b) {
        return target[b] - target[a];
      });
    };

    Object.keys(objTemplate).forEach((key: string) => {
      // Add each matching property value of every item within the entity array to the array
      // associated with the property within the object template.
      entities.forEach((entity) => {
        objTemplate[key].push(entity[key]);
      });

      // Reduce the array for the property to an object where each value of the array is given a
      // score for how many times it is inside of the array.
      objTemplate[key] = reduce(objTemplate[key]);

      // Sort the new properties for the property into an array where the score for how many times
      // the value showed up in the previous array before the reduce determines the order of the
      // items within the array.
      objTemplate[key] = sort(objTemplate[key]);
    });

    return objTemplate;
  }
}
