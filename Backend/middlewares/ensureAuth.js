import jwt from 'jsonwebtoken'

export async function ensureAuthenticated (req,res,next){

 const authHeader = req.headers['authorization'];
 const token = authHeader && authHeader.split(' ')[1];
    

    if(!token){
        return res.status(401) .json({message:"Access token not found"})
    }

    try{
        const decodedAcessToken = jwt.verify(token,process.env.SECRET_KEY)

        req.user ={id:decodedAcessToken.userId} //This allows subsequent middleware functions or route handlers to access req.user to identify the logged-in user.
        next()
    }catch(error){
        return res.status(401).json({message:'Access token invalid or expired'})

    }
    
}