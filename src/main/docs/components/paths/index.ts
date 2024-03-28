import login from "./login";
import token from "./token";
import user from "./users";

export const pathSchema = {
    "/authentication": login,
    "/authentication/token": token,
    "/users": user,
};