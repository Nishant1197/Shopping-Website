import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModal.js'

export const protect= asyncHandler(async(req,res,next)=>{
//   res.json("Success")
    let token
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
{
    try{
        token=req.headers.authorization.split(' ')[1]
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        req.user=await User.findById(decode.id).select('-password')
        next()
    }
    catch(error)
    {
        res.status(401)
        throw new Error('Not authorized,token failed')
    }
  
}

}
)