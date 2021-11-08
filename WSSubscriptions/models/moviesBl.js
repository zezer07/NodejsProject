const Movie = require('../models/moviesModel')
const axios = require('axios')

exports.countdocuments = ()=>
{
    return new Promise((resolve,reject) =>
    {
        if(Movie)

        {
        resolve(Movie.count())
        }
        
        else 
        {
          reject("Error")
        }
    })
}

// Function which load the movies from the https://api.tvmaze.com/shows adress 
exports.loadMoviesfromExternDataSource = async ()=>
{
    let resp = await axios.get("https://api.tvmaze.com/shows")
    let movies = resp.data
    let movs = movies.map(x=> 
        {
            return {Name : x.name, Genres : x.genres, Image : x.image.medium, Premiered : x.premiered} 
        })


           movs.forEach(mov=>{
            return new Promise((resolve,reject) =>
            {
                let movie = new Movie({
                    Name : mov.Name,
                    Genres : mov.Genres,
                    Image: mov.Image,
                    Premiered : mov.Premiered
                });
        
                movie.save(err =>
                    {
                        if(err)
                        {
                            reject(err);
                        }
                        else
                        {
                            resolve('Created  with id : ' + movie._id);
                        }
                    })
            })

          }) 

    return movs
}


exports.getAllMovies = ()=>
{
    return new Promise((resolve,reject)=>
    {
        Movie.find({},function(err,data)
        {
            if(err)
            {
                reject(err)
            }

            else resolve(data)
        })
    })

}

exports.getMovie = (id)=>
{
    return new Promise((resolve,reject)=>
    {
        Movie.findById(id,function(err,data)
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

exports.addMovie=(obj)=>
{
    return new Promise((resolve,reject)=>
    {
        let mov = new Movie(
            {
                Name : obj.name,
                Genres : obj.genres,
                Image : obj.image,
                Premiered : obj.premiered
            })

            mov.save(err=>
                {
                    if(err)
                    {
                        reject(err)
                    }

                    else 
                    {
                        resolve('Created  with id : ' + mov._id)
                    }
                })
    })
}

exports.updateMovie=(id,obj)=>
{
    return new Promise((resolve,reject)=>
    {
        Movie.findByIdAndUpdate(id,
            {
                Name : obj.name,
                Genres : obj.genres,
                Image : obj.image,
                Premiered : obj.premiered

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

exports.deleteMovie =(id)=>
{
    return new Promise ((resolve,reject)=>
    {

        Movie.findByIdAndDelete(id,function(err)
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