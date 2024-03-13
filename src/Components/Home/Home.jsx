import React, { useEffect, useState } from 'react'
import "./Home.scss" 
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BiPlay,BiPlus } from 'react-icons/bi'

const apikey= "5ec9b2847d4baf20314de63ba96a6f0e "
const url= "https://api.themoviedb.org/3/movie"
const upcoming="upcoming"
const imgUrl="https://image.tmdb.org/t/p/original"
const nowPlaying="now_playing"
const popular="popular"
const topRated="top_rated"

const Card=({img})=>  <img className='card'  src={img} alt="poster" />


const Row=({title,arr=[]})=>(
  <div className='row'>
    <h2>{title}</h2>
    <div>
    {arr.map((item , index)=>(
    <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
     ) )}
    </div>
  </div>
)

const Home = () => {

 const [upcomingMovies,setUpcomingMovies]= useState([])
 const [nowPlayingMovies,setNowPlayingMovies]= useState([])
 const [popularMovies,setPopularMovies]= useState([])
 const [topRatedMovies,setTopRatedMovies]= useState([])
 const [genre,setGenre]= useState([])

  useEffect(()=>{
    const fetchUpcoming= async()=>{
       const {data:{results}} = await axios.get(`${url}/${upcoming}?api_key=${apikey}`);
       setUpcomingMovies(results);
    };
    const fetchNowPlaying= async()=>{
      const {data:{results}} = await axios.get(`${url}/${nowPlaying}?api_key=${apikey}`);
      setNowPlayingMovies(results);
   };
   const fetchPopular= async()=>{
    const {data:{results}} = await axios.get(`${url}/${popular}?api_key=${apikey}`);
    setPopularMovies(results);
 };
 const fetchTopRated= async()=>{
  const {data:{results}} = await axios.get(`${url}/${topRated}?api_key=${apikey}`);
  setTopRatedMovies(results);
};
  
const getAllGenre= async()=>{
  const {data:{genres}} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}`);
  setGenre(genres);
};
    getAllGenre();
    fetchUpcoming()
    fetchNowPlaying()
    fetchPopular()
    fetchTopRated()
  },[])

  return (
    <section className="home">
      <div className="banner" 
        style={{
        backgroundImage:  popularMovies[0] ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`:"none"
        }}>

       {  popularMovies[0] && <h1>{ popularMovies[0].original_title}</h1> }
       {  popularMovies[0] && <p>{popularMovies[0].overview}</p> }

       <div>
         <button><BiPlay/>Play</button>
         <button>My List <BiPlus/></button>
      </div>

     </div>
      <Row title={"Upcoming "} arr={upcomingMovies}/>
      <Row title={"Now Playing "} arr={nowPlayingMovies}/>
      <Row title={"Popular "} arr={popularMovies}/>
      <Row title={"Top Rated "} arr={topRatedMovies}/>

       <div className="genreBox">
        {genre.map((item)=>(
         <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))}
       </div>

    </section>
  )
}

export default Home
