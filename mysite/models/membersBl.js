const axios = require('axios')

exports.getAllMembers=async ()=>
{
    let resp = await axios.get("http://localhost:8000/api/members");
    let members = resp.data
    return members
}

exports.getMember =async (id)=>
{
    let resp = await axios.get("http://localhost:8000/api/members/" + id);
    let member = resp.data
    return member
}

exports.addMember =async (obj)=>
{
    let resp = await axios.post("http://localhost:8000/api/members/",obj)
    let status = resp.data
    return status
}

exports.updateMember =async (id,obj)=>
{
    let resp = await axios.put("http://localhost:8000/api/members/"+ id,obj)
    let status = resp.data
    return status
}

exports.deleteMember =async (id)=>
{
    let resp = await axios.delete("http://localhost:8000/api/members/"+ id)
    let status = resp.data
    return status
}