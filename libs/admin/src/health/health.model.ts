export interface IHealth {
  name?: string;
  error?: any;
  status?: string;
  details?: any;
}

export class Health {
  name?: string;
  error?: any;
  status?: string;
  details?: any;

  constructor(obj?: IHealth) {
    this.name = obj && obj.name ? obj.name : null;
    this.error = obj && obj.error ? obj.error : null;
    this.status = obj && obj.status ? obj.status : null;
    this.details = obj && obj.details ? obj.details : null;
  }
}
