
import { Router } from "express";
import { ExpressRouteAdapter } from "../../adapters/express-route-adapter";
import { CreateLoginFactory } from "../../factories/create-login-factory";

const userRouter = Router();

userRouter.post("/", ExpressRouteAdapter.adapt(CreateLoginFactory.register()));

export { userRouter };