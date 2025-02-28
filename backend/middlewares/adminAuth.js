import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    try{
        const {token} = req.headers;

        if(!token){
            return res.status(403).json({message: "You are Unauthorized User"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(403).json({message: "Unauthorized User"});
        }
        next();
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export default adminAuth;