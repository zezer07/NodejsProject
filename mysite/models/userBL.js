const User = require('../models/usersModel');

exports.getAllUsers =  function()
{
    return new Promise((resolve, reject) =>
    {
        User.find({}, function(err, data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    });
}

exports.getUser =  function()
{
    return new Promise((resolve, reject) =>
    {
        User.find({}, function(err, data)
        {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(data);
            }
        })
    });
}

exports.addUser = function(obj)
{ 
    return new Promise((resolve,reject)=>
    {
        let use = new User({
            UserName : obj.userName
        })
    
        use.save(err=>
            {
                if(err)
                {
                    reject(err)
                }

                else 
                {
                   resolve(use._id)
                }
            })
    })
}


exports.updateUser =  function(id,obj)
{
    return new Promise((resolve, reject) =>
    {
        User.findByIdAndUpdate(id,
            {
               UserName : obj.UserName,
               Password : obj.Password,
            },
            function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else 
                {
                    resolve("Updated")
                }
            })
    })
}

exports.deleteUser =  function(id)
{
    return new Promise((resolve, reject) =>
    {
        User.findByIdAndRemove(id,function(err)
        {
            if(err)
            {
               reject(err)
            }

            else 
            {
               resolve("Deleted")
            }
        })
    })
}

