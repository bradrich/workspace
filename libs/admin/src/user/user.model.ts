import { AuthRole, IAccount } from '@swampfox/auth';
import { ConstantsHelper } from '@swampfox/shared';

export interface IUser extends IAccount {
  password?: string;
}

export class User {
  password?: string;

  // From `Account` model
  id?: number;
  activated?: boolean;
  authorities?: AuthRole[];
  email?: string;
  firstName?: string;
  imageUrl?: string;
  langKey?: string;
  lastName?: string;
  login?: string;
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;

  constructor(obj?: IUser) {
    this.password = obj && obj.password ? obj.password : null;
    this.id = obj && obj.id ? obj.id : null;
    this.activated = obj && obj.activated !== undefined ? obj.activated : false;
    this.authorities = obj && obj.authorities ? obj.authorities : [];
    this.email = obj && obj.email ? obj.email : null;
    this.firstName = obj && obj.firstName ? obj.firstName : null;
    this.imageUrl = obj && obj.imageUrl ? obj.imageUrl : null;
    this.langKey =
      obj && obj.langKey ? obj.langKey : ConstantsHelper.getConstants().appDefaultLangKey;
    this.lastName = obj && obj.lastName ? obj.lastName : null;
    this.login = obj && obj.login ? obj.login : null;
    this.createdBy = obj && obj.createdBy ? obj.createdBy : null;
    this.createdDate = obj && obj.createdDate ? obj.createdDate : null;
    this.lastModifiedBy = obj && obj.lastModifiedBy ? obj.lastModifiedBy : null;
    this.lastModifiedDate = obj && obj.lastModifiedDate ? obj.lastModifiedDate : null;
  }
}
