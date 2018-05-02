import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {
  /**
   * Determines if the sorting of the data will be ascending or descending.
   * @param {string} sort
   * @returns {boolean}
   */
  parseAscending(sort: string): boolean {
    let sortArray = sort.split(',');
    sortArray = sortArray.length > 1 ? sortArray : sort.split('%2C');

    // Default to true when no sort is supplied.
    return sortArray.length > 1 ? sort.split(',').slice(-1)[0] === 'asc' : true;
  }

  /**
   * Parses the predicate string passed in to a proper array string.
   * @param {string} sort
   * @returns {string}
   */
  parsePredicate(sort: string): string {
    return sort.split(',')[0].split('%2C')[0];
  }

  /**
   * Parses the passed-in parameters into a sort array.
   * @param {string} predicate
   * @param {boolean} reverse
   * @param {boolean} ignoreId
   * @param {string} specialPredicate
   * @returns {string[]}
   */
  parseSort(
    predicate: string,
    reverse: boolean,
    ignoreId?: boolean,
    specialPredicate?: string
  ): string[] {
    const result = [`${predicate},${reverse ? 'asc' : 'desc'}`];
    if (predicate !== 'id' && !ignoreId) {
      result.push('id');
    }
    if (specialPredicate) {
      result.unshift(specialPredicate);
    }
    return result;
  }
}
