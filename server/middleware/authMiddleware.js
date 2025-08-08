import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;

export const protect = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }


    const token = authHeader.split(" ")[1];


    const decoded = jwt.verify(token, JWT_SECRET);


    req.user = decoded.userId;


    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
