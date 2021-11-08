const Subscription = require('../models/subscriptionsModel')


exports.getAllSubscriptions = ()=>
{
    return new Promise((resolve,reject)=>
    {
        Subscription.find({},function(err,data)
        {
            if(err)
            {
                reject(err)
            }

            else resolve(data)
        })
    })

}

exports.getSubscription = (id)=>
{
    return new Promise((resolve,reject)=>
    {
        Subscription.findById(id,function(err,data)
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

exports.addSubscription=(obj)=>
{
    return new Promise((resolve,reject)=>
    {
        let sub = new Subscription(
            {
                MemberId : obj.memberId,
                Movies : obj.movies,
                
            })

            sub.save(err=>
                {
                    if(err)
                    {
                        reject(err)
                    }

                    else 
                    {
                        resolve('Created  with id : ' + sub._id)
                    }
                })
    })
}

exports.updateSubscriptions=(id,obj)=>
{
    return new Promise((resolve,reject)=>
    {
        Subscription.findByIdAndUpdate(id,
            {
                MemberId : obj.memberId,
                Movies : obj.movies,

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

exports.deleteSubscription =(id)=>
{
    return new Promise ((resolve,reject)=>
    {

        Subscription.findByIdAndDelete(id,function(err)
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