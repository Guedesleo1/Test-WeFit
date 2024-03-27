import { Router } from "express";
import { loginRouter } from "./login-routes";
import { userRouter } from "./user-routes";

const routes = Router();

routes.use("/authentication", loginRouter);
routes.use("/users", userRouter);

export { routes };