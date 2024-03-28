
import { Router } from "express";
import { ExpressRouteAdapter } from "../../adapters/express-route-adapter";
import { ensureAuthenticated } from "../config/ensureAuthenticated";
import { CreateUsersFactory } from "../../factories/create-users-factory";
import { YupAdapter } from "../../adapters/yup-adapter";
import usersSchemas from "../../../infra/validations/usersSchemas";

const userRouter = Router();
userRouter.post("/",ensureAuthenticated, YupAdapter.adapt(usersSchemas), ExpressRouteAdapter.adapt(CreateUsersFactory.register()));

export { userRouter };