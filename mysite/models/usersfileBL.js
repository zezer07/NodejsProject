let jsonfile = require('jsonfile')

exports.getUsers =()=>
{
    return new Promise((resolve,reject)=>{
        
    jsonfile.readFile('./DAL/users.json',function(err,obj)
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

exports.addUser =(obj)=>
{
    return new Promise((resolve,reject)=>{
        
    jsonfile.writeFile('./DAL/users.json',obj,function(err)
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

