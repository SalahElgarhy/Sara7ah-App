
export const isAuthorized = (userRoles) => {
    return (req, res, next) => {
        if (!userRoles.includes(req.user.userRole)) {
            return next(new Error("You are not authorized to access this resource", { cause: 403 }));
        }
        return next();
    }
}


