import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ConstantsHelper } from '../constants/constants.helper';
import { ApiParams } from './params.model';

@Injectable()
export class ApiService<T> {
  baseUrl: string;
  resourceUrl: string;

  constructor(
    protected httpClient: HttpClient,
    resourceEndpoint: string,
    resourceMidpoint: string = 'api'
  ) {
    const constants = ConstantsHelper.getConstants();
    this.baseUrl = `${constants.appApiUri}${resourceMidpoint}`;
    this.resourceUrl = `${this.baseUrl}/${resourceEndpoint}`;
  }

  /**
   * Creates a new entity.
   * @param {T} entity
   * @returns {Observable<T>}
   */
  create(entity: T): Observable<T> {
    return this.httpClient.post<T>(this.resourceUrl, entity);
  }

  /**
   * Updates an entity.
   * @param {T} entity
   * @returns {Observable<T>}
   */
  update(entity: T): Observable<T> {
    return this.httpClient.put<T>(this.resourceUrl, entity);
  }

  /**
   * Finds an entity by it's ID.
   * @param {number} id
   * @returns {Observable<T>}
   */
  findOneById(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.resourceUrl}/${id}`);
  }

  /**
   * Gets all of the entities according to the page and sorting options requested.
   * @param {ApiParams} [params]
   * @returns {Observable<HttpResponse<T[]>>}
   */
  query(params?: ApiParams): Observable<HttpResponse<T[]>> {
    return this.httpClient.get<T[]>(this.resourceUrl, {
      observe: 'response',
      params: params
    });
  }

  /**
   * Deletes the entity with the ID provided.
   * @param {number | string} id If using an ID of an entity, this will be a string, otherwise it
   *     can also be a string, i.e. `login` of a user.
   * @returns {Observable<HttpResponse<any>>}
   */
  delete(id: number | string): Observable<HttpResponse<any>> {
    return this.httpClient.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response',
      responseType: 'text'
    });
  }
}
