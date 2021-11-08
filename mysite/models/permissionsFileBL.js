let jsonfile = require('jsonfile')


exports.getPermissions =()=>
{
    return new Promise((resolve,reject)=>{
        
    jsonfile.readFile('./DAL/permissions.json',function(err,obj)
    {  
        if(err)
    
        {
           reject(err)
        }
         
        else 
        
        {
          resolve(obj)
        }
    })
    
  })
    
}

exports.addPermission =(obj)=>
{
    return new Promise((resolve,reject)=>{
        
    jsonfile.writeFile('./DAL/permissions.json',obj,function(err)
    {  
        if(err)
    
        {
           reject(err)
        }
         
        else 
        
        {
          resolve('Created')
        }
    })
    
  })
    
}