export interface Department {
    id?:number;
    name?:string;
    code?:Code;
    description?:string;
}

export enum Code {
  IT = 'IT',
  DEV_OPS = 'DEV_OPS',
  TESTING = 'TESTING',
  HR = 'HR',
  MANAGEMENT = 'MANAGEMENT'
}
