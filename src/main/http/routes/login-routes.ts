
import { Router } from "express";
import { ExpressRouteAdapter } from "../../adapters/express-route-adapter";
import { CreateLoginFactory } from "../../factories/create-login-factory";
import { CreateTokenFactory } from "../../factories/create-token-factory";

const loginRouter = Router();

loginRouter.post("/", ExpressRouteAdapter.adapt(CreateLoginFactory.register()));
loginRouter.post("/token", ExpressRouteAdapter.adapt(CreateTokenFactory.register()));

export { loginRouter };