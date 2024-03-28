
import { Router } from "express";
import { ExpressRouteAdapter } from "../../adapters/express-route-adapter";
import { ensureAuthenticated } from "../config/ensureAuthenticated";
import { CreateUsersFactory } from "../../factories/create-users-factory";

const userRouter = Router();
userRouter.post("/",ensureAuthenticated, ExpressRouteAdapter.adapt(CreateUsersFactory.register()));

export { userRouter };