const SendMail = async (from,to,subject,content)=>
{
    console.log(JSON.stringify(
        {
            from:from,
            to:to,
            subject:subject,
            content:content
        }))
    try
    {
        const URL = `https://prod-20.southindia.logic.azure.com:443/workflows/a7110e3cab6b40fe871d06652c967b99/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=qmsUXaTNxn0Za93ZwMjhcidmz_oCPUzMd4FectoLrPY`
        const response = await fetch(URL,{
            method:'POST',
            body:JSON.stringify(
                {
                    from:from,
                    to:to,
                    subject:subject,
                    content:content
                }
            )
        })
        if(response.status===200)
        {
            console.log(`Mail has been sent successfully to ${to}`)
        }
        else
            throw new Error({statusCode:response.status,statusText:response.statusText})
    }   
    catch(err)
    {
        console.error(`Sending mail failed for ${to} with statusCode:${err.statusCode}, Message:${err.statusText}`)
    } 
}
module.exports = SendMail