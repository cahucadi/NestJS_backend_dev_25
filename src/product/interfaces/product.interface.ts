import { Document } from "mongoose";

export interface IProduct extends Document{

    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly createdAt: Date;

}