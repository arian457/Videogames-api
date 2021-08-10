import {connect} from 'react-redux'
import {useState} from 'react'
import { useRouteMatch } from 'react-router'
import {Link} from 'react-router-dom'
import '../styles/Genres.css'
  function Genres ({games, genres}){
     const match = useRouteMatch()
     const id = parseInt(match.params.genresId)
     genres = genres.filter(gen => gen.id != id)
     games = games.filter(game => {
      if(game.genres) {  
     let flag = game.genres.find(gen => gen.id === id)
         if (flag) return game
        }
     })
    
   return(<div>
       <h2>Otros generos:</h2>
       <div className = 'genres-div'>
       {genres.map(gen => {
           return(
               <Link to ={`/genres/${gen.id}`}> {gen.name} </Link>
           )})}
           </div>
           <div className = 'cards-div' id='cards-div-genres-display'>
        { games.map(game => {
          return (<div className= 'cards-item' key={game.id}>
                  <img src={game.img} />
                  <Link to = {`/game/${game.id}`}><h2>{game.name}</h2></Link> 
                  <span>{game.genres.map(gen => {
                      return(<strong><Link to={`/genres/${gen.id}`}> {gen.name} </Link> </strong>)
                    })}
                    </span>
                    </div>)}) }
                    </div>
                 </div>)
                
  }
 
 const mapStateToProps = (state) => {
     return{
         games : state.allGames,
         genres: state.genres
     }
 }

 export default connect(mapStateToProps, null)(Genres)