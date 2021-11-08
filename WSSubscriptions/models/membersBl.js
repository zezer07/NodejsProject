const Member = require('../models/membersModel')
const axios = require('axios')

exports.countdocuments = ()=>
{
    return new Promise((resolve,reject) =>
    {
        if(Member)

        {
         resolve(Member.count())
        }
        
        else 
        {
          reject("Error")
        }
    })
}


// Function which load the Members from the https://api.tvmaze.com/shows adress 
exports.loadMembersfromExternDataSource = async ()=>
{
    let resp = await axios.get("https://jsonplaceholder.typicode.com/users")
    let members = resp.data
    let mbrs = members.map(x=> 
        {
            return {Name : x.name, Email : x.email, City : x.address.city} 
        })


           mbrs.forEach(mbr=>{
            return new Promise((resolve,reject) =>
            {
                let member = new Member({
                    Name : mbr.Name, 
                    Email : mbr.Email, 
                    City : mbr.City
                });
        
                member.save(err =>
                    {
                        if(err)
                        {
                            reject(err);
                        }
                        else
                        {
                            resolve('Created  with id : ' + member._id);
                        }
                    })
            })

          }) 

    return mbrs
}


exports.getAllMembers = ()=>
{

    return new Promise((resolve,reject)=>
    {
        Member.find({},function(err,data)
        {
            if(err)
            {
                reject(err)
            }

            else resolve(data)
        })
    })

}

exports.getMember = (id)=>
{
    return new Promise((resolve,reject)=>
    {
        Member.findById(id,function(err,data)
        {
            if(err)
            {
                reject(err)
            }

            else 
            {
                resolve(data)
            }
        })

    })
}

exports.addMember=(obj)=>
{
    return new Promise((resolve,reject)=>
    {
        let member = new Member(
            {
                Name : obj.name,
                Email : obj.email, 
                City : obj.city
            })

            member.save(err=>
                {
                    if(err)
                    {
                        reject(err)
                    }

                    else 
                    {
                        resolve('Created  with id : ' + member._id)
                    }
                })
    })
}

exports.updateMember=(id,obj)=>
{
    return new Promise((resolve,reject)=>
    {
        Member.findByIdAndUpdate(id,
            {
                Name : obj.name,
                Email : obj.email,
                City : obj.city,
                
            }, function(err)
            {
                if(err)
                {
                    reject(err)
                }

                else 
                {
                    resolve('Updated')
                }

            })
    })

}

exports.deleteMember =(id)=>
{
    return new Promise ((resolve,reject)=>
    {

        Member.findByIdAndDelete(id,function(err)
        {
            if(err)
            {
              reject(err)
            }

            else 
            {
                resolve('Deleted')
            }
        })

    })
}

