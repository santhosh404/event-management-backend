import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/envConfig.js";


// Middleware for token authorization
const authorizeByToken = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: "Error",
            message: "Authorization Failed!",
            data: {
                error: "No token provided!"
            }
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decode) => {
        if (err) {
            return res.status(401).json({
                status: "Error",
                message: "Authorization Failed!",
                data: {
                    error: "Invalid token!"
                }
            });
        }
        req.user = decode;
        next();
    })
}


// Middleware for admin role authorization
const authorizeByAdminRole = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
        return;
    }
    return res.status(403).json({
        status: "Error",
        message: "Unauthorized Access!",
        data: {
            error: "You are not authorized to perform this action!"
        }
    })
}

export { authorizeByToken, authorizeByAdminRole }

