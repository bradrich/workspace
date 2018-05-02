import { Audit, languageDefaultKey } from '@swampfox/shared';

import { AuthRole } from '../auth.constants';

export interface IAccount extends Audit {
  id?: number;
  activated?: boolean;
  authorities?: AuthRole[];
  email?: string;
  firstName?: string;
  imageUrl?: string;
  langKey?: string;
  lastName?: string;
  login?: string;
}

export class Account {
  id?: number;
  activated?: boolean;
  authorities?: AuthRole[];
  email?: string;
  firstName?: string;
  imageUrl?: string;
  langKey?: string;
  lastName?: string;
  login?: string;

  // From `Audit` model.
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;

  constructor(obj?: IAccount) {
    this.id = obj && obj.id ? obj.id : null;
    this.activated = obj && obj.activated !== undefined ? obj.activated : false;
    this.authorities = obj && obj.authorities ? obj.authorities : [];
    this.email = obj && obj.email ? obj.email : null;
    this.firstName = obj && obj.firstName ? obj.firstName : null;
    this.imageUrl = obj && obj.imageUrl ? obj.imageUrl : null;
    this.langKey = obj && obj.langKey ? obj.langKey : languageDefaultKey;
    this.lastName = obj && obj.lastName ? obj.lastName : null;
    this.login = obj && obj.login ? obj.login : null;
    this.createdBy = obj && obj.createdBy ? obj.createdBy : null;
    this.createdDate = obj && obj.createdDate ? obj.createdDate : null;
    this.lastModifiedBy = obj && obj.lastModifiedBy ? obj.lastModifiedBy : null;
    this.lastModifiedDate = obj && obj.lastModifiedDate ? obj.lastModifiedDate : null;
  }
}
