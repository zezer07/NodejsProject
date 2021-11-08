const axios = require('axios')

exports.getAllMovies =async ()=>
{
    let resp = await axios.get("http://localhost:8000/api/movies");
    let movies = resp.data
    return movies
}

exports.getMovie =async (id)=>
{
    let resp = await axios.get("http://localhost:8000/api/movies/" + id);
    let movie = resp.data
    return movie
}

exports.addMovie =async (obj)=>
{
    let resp = await axios.post("http://localhost:8000/api/movies/",obj)
    let status = resp.data
    return status
}

exports.updateMovie =async (id,obj)=>
{
    let resp = await axios.put("http://localhost:8000/api/movies/"+ id,obj)
    let status = resp.data
    return status
}

exports.deleteMovie=async (id)=>
{
    let resp = await axios.delete("http://localhost:8000/api/movies/"+ id)
    let status = resp.data
    return status
}