import {connect} from 'react-redux'
import {togglePage} from '../redux/actions'
import {useState, useEffect} from 'react'
import '../styles/Cards.css'
import PacmanLoader from "react-spinners/PacmanLoader";
import {Link} from 'react-router-dom'

const Cards = ({games,loader,togglePage}) => {
  const [loading, toggleLoading] = useState(true)
  useEffect(() => {
    if(!loader){
      toggleLoading(false)
    }
  },[loader])
  
  return (<div className='cards'>
       {!loading ?  <div className='btn-group'>
       <button className='change-page' onClick={() => 
          togglePage("-")
          } >←</button>
        <button className='change-page' onClick={() => 
          togglePage("+")
          } >→</button> 
           </div>
           : null}
       <div className= 'cards-div'>
      {games.length > 0 ? games.map(game => {
          return (<div className= 'cards-item' key={game.id}>
                  <img src={game.img} />
                 <Link to = {`/game/${game.id}`}><h2>{game.name}</h2></Link> 
                 {game.genres ? <span>{game.genres.map(gen => {
                      return(<strong><Link to={`/genres/${gen.id}`}> {gen.name} </Link> </strong>)
                    })}
                    </span>:<span>sin generos</span>}
                    
               </div>)
      }) : <PacmanLoader size={100} loading={loading} />}
      </div>
     
       </div>)

}


function mapStateToProps(state) {
    return {
      games: state.shownGames,
      page: state.pageIndex,
      loader: state.loading
    };
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      
      togglePage : (index) => dispatch(togglePage(index)) 
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Cards);
  