const axios = require('axios')

exports.getAllSubscriptions=async ()=>
{
    let resp = await axios.get("http://localhost:8000/api/subscriptions");
    let subscriptions = resp.data
    return subscriptions
}

exports.updateSubscriptions=async (id,obj)=>
{
    let resp = await axios.put("http://localhost:8000/api/subscriptions/"+ id,obj)
    let status = resp.data
    return status
}

exports.addSubscripton =async (obj)=>
{
    let resp = await axios.post("http://localhost:8000/api/subscriptions/",obj)
    let status = resp.data
    return status
}