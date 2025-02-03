import { Request } from "express";

export interface ExtendRequest extends Request { // this interface to let the request have the user object
  user?: any;
}