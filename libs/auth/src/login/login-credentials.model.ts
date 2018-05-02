export interface ILoginCredentials {
  username?: string;
  password?: string;
  isPasswordType?: boolean;
  rememberMe?: boolean;
}

export class LoginCredentials {
  username?: string;
  password?: string;
  isPasswordType?: boolean;
  rememberMe?: boolean;

  constructor(obj?: ILoginCredentials) {
    this.username = obj && obj.username ? obj.username : null;
    this.password = obj && obj.password ? obj.password : null;
    this.isPasswordType = obj && obj.isPasswordType !== undefined ? obj.isPasswordType : true;
    this.rememberMe = obj && obj.rememberMe !== undefined ? obj.rememberMe : false;
  }
}
