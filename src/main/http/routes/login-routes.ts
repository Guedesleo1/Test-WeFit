
import { Router } from "express";
import { ExpressRouteAdapter } from "../../adapters/express-route-adapter";
import { CreateLoginFactory } from "../../factories/create-login-factory";
import { CreateTokenFactory } from "../../factories/create-token-factory";
import authenticationSchemas from "../../../infra/validations/authenticationSchemas";
import { YupAdapter } from "../../adapters/yup-adapter";
import tokenSchemas from "../../../infra/validations/tokenSchemas";

const loginRouter = Router();

loginRouter.post("/", YupAdapter.adapt(authenticationSchemas), ExpressRouteAdapter.adapt(CreateLoginFactory.register()));
loginRouter.post("/token",YupAdapter.adapt(tokenSchemas), ExpressRouteAdapter.adapt(CreateTokenFactory.register()));

export { loginRouter };