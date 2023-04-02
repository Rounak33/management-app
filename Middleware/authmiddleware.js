const isAuth=(req,res,next)=>{
    if(req.session.isAuth){
        next()
    }else{
        return res.send({
            status:401,
            message:"Log in to continue",
        })
    }
}
module.exports={isAuth};