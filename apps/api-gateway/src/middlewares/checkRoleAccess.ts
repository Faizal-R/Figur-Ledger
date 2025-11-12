import { Request, Response, NextFunction } from "express";

export const checkRoleAccess = (allowedRoles?: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!allowedRoles || allowedRoles.length === 0) return next();

    const userRole = (req as any).user?.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: Insufficient Permissions" });
    }

    next();
  };
};
