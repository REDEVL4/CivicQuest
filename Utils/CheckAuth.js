const localStorage = require('./LocalStorage')
const CheckAuth = async (req,res,next)=>
{
    try
    {
        const isLoggedIn = localStorage.getItem("isLoggedIn")
        if(isLoggedIn)
        {
            next()
        }
        else
        {
            return res.redirect('AdminLogin');
        }
    }   
    catch(err)
    {
        console.log(err)
    }
}
module.exports =  CheckAuth