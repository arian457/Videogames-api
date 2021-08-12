import './App.css';
import {connect} from 'react-redux'
import {getAllGames, getAllGenres} from './redux/actions'
import {useState, useEffect} from 'react'
import Cards from './components/Cards';
import NavBar from './components/NavBar';
import AddGame from './components/addGame';
import {Link, Route} from 'react-router-dom'
import Genres from './components/Genres';
import PageButtons from './components/PageButtons';
import Card from './components/Card';
function App({getAllGames, getAllGenres}) {

  useEffect(() => {  
    getAllGames()
    getAllGenres()}
    ,[])

  return (
    <div className="App">
     
      <NavBar></NavBar>
      <Route path='/Home'><PageButtons /> </Route>
     <Route exact path = '/'><Link to='/Home'><button>Entrar!</button></Link></Route>
     <Route exact path='/Home' component={Cards}/>
     <Route exact path='/Home/genres/:genresId' component={Genres} />
     <Route exact path='/game/:gameId'  component ={Card} /> 
     <Route exact path = '/addGame' component = {AddGame}/> 
    </div>
  );
}


const mapDispatchToProps = (dispatch) => {
  return{
    getAllGames : () => dispatch(getAllGames()), 
    getAllGenres : () => dispatch(getAllGenres())
  }
}
const mapStateToProps = (state) => {
  return{
    genres : state.genres
  }
}

export default connect(null, mapDispatchToProps)(App)