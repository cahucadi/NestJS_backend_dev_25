import { Document } from "mongoose";
export interface IStudent extends Document{
    
    readonly code : string;
    readonly name : string;
    readonly photoURL : string;
    readonly createdAt : Date;

}