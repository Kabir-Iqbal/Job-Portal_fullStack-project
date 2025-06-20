
import jwt from 'jsonwebtoken';



const auth = async (req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message: "User not authorized",
                success: false,
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded){
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }
        req.id = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            success: false,
        });
    }
}


export default auth;

