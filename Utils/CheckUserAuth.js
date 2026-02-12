const localStorage = require('./LocalStorage')
const CheckAuth = async (req,res,next)=>
{
    try
    {
        const userLoggedIn = localStorage.getItem("userLoggedIn")
        const userEmailAddress = localStorage.getItem("userEmailAddress")
        if(userLoggedIn && userEmailAddress)
        {
            next()
        }
        else
        {
            return res.redirect('UserLogin');
        }
    }   
    catch(err)
    {
        console.log(err)
    }
}
module.exports =  CheckAuth