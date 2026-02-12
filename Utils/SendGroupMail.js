const SendMail = require('./SendMail')
const SendGroupMail = async (listOfUsers,subject,content)=>
{
    try
    {
        console.log(listOfUsers,subject,content)
        listOfUsers.forEach(async(Email) => {
           await SendMail("Test Application",Email,subject,content) 
        });
    }
    catch(err)
    {
        console.log(`Error sending group mail Message:${err.message}`)
    }
}
module.exports = SendGroupMail