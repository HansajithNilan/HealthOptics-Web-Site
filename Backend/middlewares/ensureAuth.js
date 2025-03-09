import jwt from 'jsonwebtoken'

export async function ensureAuthenticated (req,res,next){

    const accessToken = req.headers.authorization

    if(!accessToken){
        return res.status(401) .json({message:"Access token not found"})
    }

    try{
        const decodedAcessToken = jwt.verify(accessToken,process.env.SECRET_KEY)

        req.user ={id:decodedAcessToken.userId} //This allows subsequent middleware functions or route handlers to access req.user to identify the logged-in user.
        next()
    }catch(error){
        return res.status(401).json({message:'Access token invalid or expired'})

    }
    
}