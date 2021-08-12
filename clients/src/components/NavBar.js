import {connect} from 'react-redux'
import { useState } from 'react'
import { filterGamesperName, filterByAlph, filterByRating, filterByGenre, filterByLocal } from '../redux/actions'
import {toJadenCase} from '../utils'
import '../styles/NavBar.css'
import { Link } from 'react-router-dom'

  function NavBar ({filterGamesperName, filterByAlph, filterByRating, filterByGenre, filterByLocal, genres}) {

  const handleInput = (e) => {
   e = toJadenCase(e)
  filterGamesperName(e)
  }
  const handleOptions = (e) => {
    e.name === 'alph' ? filterByAlph(e.value) : filterByRating(e.value)
    }
    const handleSelect = (e) => {
      filterByGenre(e.value)
    }

    return (<nav className='navbar'>
      <Link to = '/Home'> <button onClick={(e) => handleOptions(e.target)}>Home</button></Link>
      <Link to='/Home'><input type='text' name='search' onChange={(e) => handleInput(e.target.value)}></input></Link>
      <select onChange={(e) => handleSelect(e.target)}>
        <option hidden selected >Ordenar por genero</option>
        <option value=''> Reestablecer</option>
          {genres  && genres.map(gen => <option value={gen.id}>{gen.name} </option>)}
     </select>
      <Link to = '/Home'> <select name= 'alph'onClick={(e) => handleOptions(e.target)}> 
     <option hidden selected >Ordenar alfabeticamente</option>
         <option onClick={(e) => handleOptions(e.target)} > Reestablecer</option>
         <option value='A-Z' >A-Z ↓</option>
         <option value= 'Z-A'>Z-A ↑</option>
     </select></Link>
     <Link to = '/Home'><select name= 'rating'onClick={(e) => handleOptions(e.target)}>
       <option hidden selected>Ordenar por rating</option>
         <option onClick={(e) => handleOptions(e.target)}>Reestablecer</option>
         <option value='Mejor' >Mejor calificado</option>
         <option value='Peor'>Peor calificado</option>
     </select></Link>
      <Link to='/addGame' ><button>Añadir juego</button></Link>
      <label>Mis Juegos</label><input type='checkbox' onClick={() => filterByLocal()} ></input>
    </nav>)
}
const mapStateToProps = (state) => ({
     genres: state.genres
})

const mapDispatchToProps = (dispatch) => {
    return{
        filterGamesperName :(name) =>  dispatch(filterGamesperName(name)),
        filterByAlph : (option) => dispatch(filterByAlph(option)),
        filterByRating: (option) => dispatch(filterByRating(option)),
        filterByGenre: (id) => dispatch(filterByGenre(id)),
        filterByLocal: () => dispatch(filterByLocal())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)