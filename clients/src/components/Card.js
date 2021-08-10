import {connect} from 'react-redux'
import { useState, useEffect } from 'react'
import { useRouteMatch, Redirect  } from 'react-router'
import '../styles/Card.css'

const onSearch = (array, id) => {
  return array.find(e => e.id === id)
}


const Card = ({ games }) => {
  
  const match = useRouteMatch()
  const id = parseInt(match.params.gameId)
  games = onSearch(games, id)
  
  return (<div className='card'>
      <div className='container'>
      <h1>{games.name} </h1>
      <img src={games.img} className='card-img'></img>
      </div>
       <div>
      <span>{games.genres.map(gen => {
        return (
            <h4>{gen.name} </h4>
          )
      })} </span>
      <span>{games.description && <h4>{games.description} </h4>} </span>
      <span>{games.release} </span>
      <h5>{games.rating} </h5>
      {games.platforms.map(pl => {
         return(<h5>{pl}</h5>)
      })}
      <p>{games.playtime} </p>
       </div>
       </div>)

}


function mapStateToProps(state) {
    return {
      games: state.allGames
    };
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Card);
  