import { Address } from "./address";
import { Department } from "./department";

export interface Employee {
    id?:number;
    employeeId?:string;
    name?:string;
    designation?:string;
    status?:Status;
    gender?:string;
    phoneNumber?:string;
    active?:boolean;
    department?:Department;
    address?:Address
}

export enum Status {
    MARRIED = 'MARRIED',
    UN_MARRIED = 'UN_MARRIED',
    SINGLE = 'SINGLE'
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}
