import {connect} from 'react-redux'
import { useState } from 'react'
import { filterGamesperName, filterByAlph, filterByRating } from '../redux/actions'
import {toJadenCase} from '../utils'
import '../styles/NavBar.css'
import { Link } from 'react-router-dom'

  function NavBar ({filterGamesperName, filterByAlph, filterByRating}) {

  const handleInput = (e) => {
   e = toJadenCase(e)
  filterGamesperName(e)
  }
  const handleOptions = (e) => {
    e.name === 'alph' ? filterByAlph(e.value) : filterByRating(e.value)
  }

    return (<nav className='navbar'>
      <Link to = '/Home'> <button>Home</button></Link>
      <Link to = '/Home'><input type='text' name= 'search' onChange={(e)=> handleInput(e.target.value)}></input></Link>
      <Link to = '/Home'> <select name= 'alph'onClick={(e) => handleOptions(e.target)}> 
   
     <option hidden selected >Ordenar alfabeticamente</option>
         <option > Reestablecer</option>
         <option value='A-Z' >A-Z ↓</option>
         <option value= 'Z-A'>Z-A ↑</option>
     </select></Link>
     <Link to = '/Home'><select name= 'rating'onClick={(e) => handleOptions(e.target)}>
       <option hidden selected>Ordenar por rating</option>
         <option>Reestablecer</option>
         <option value='Mejor' >Mejor calificado</option>
         <option value='Peor'>Peor calificado</option>
     </select></Link>
     <Link to = '/addGame' ><button>Añadir juego</button></Link>
    </nav>)
}

const mapDispatchToProps = (dispatch) => {
    return{
        filterGamesperName :(name) =>  dispatch(filterGamesperName(name)),
        filterByAlph : (option) => dispatch(filterByAlph(option)),
        filterByRating : (option) => dispatch(filterByRating(option))

    }
}

export default connect(null, mapDispatchToProps)(NavBar)