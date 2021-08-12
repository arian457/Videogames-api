import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import { useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
import { filterByGenre } from '../redux/actions'
import '../styles/Genres.css'
import { PageButtons } from './PageButtons'
  function Genres ({games, genres, filterByGenre}){
     const match = useRouteMatch()
     const id = parseInt(match.params.genresId)
      useEffect(() => {
         filterByGenre(id)
     }, [id])
    
   return(<div>
       <h2>Otros generos:</h2>
       <div className='genres-div'>
       {genres.map(gen => {
           return(
               <Link to ={`/Home/genres/${gen.id}`}> {gen.name} </Link>
           )})}
       </div>
           <div className = 'cards-div' id='cards-div-genres-display'>
        { games.map(game => {
          return (<div className= 'cards-item' key={game.id}>
                  <img src={game.img} />
                  <Link to = {`/game/${game.id}`}><h2>{game.name}</h2></Link> 
                  <span>{game.genres.map(gen => {
                      return(<strong><Link to={`/Home/genres/${gen.id}`}> {gen.name} </Link> </strong>)
                    })}
                    </span>
                    </div>)}) }
                    </div>
                 </div>)
                
  }
 
 const mapStateToProps = (state) => {
     return{
         games : state.shownGames,
         genres: state.genres
     }
}
const mapDispatchToProps = {
    filterByGenre: id => filterByGenre(id)
}

 export default connect(mapStateToProps, mapDispatchToProps)(Genres)