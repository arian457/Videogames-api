import React, { useState } from 'react'
import { connect } from 'react-redux'
import '../styles/addGame.css'
import { submitGame } from '../redux/actions'

const platforms = ["PS4", "PS5", "XBOX ONE", "XBOX SERIES", "NINTENDO SWITCH", "GOOGLE PLAY", "IOs", "PC"]

const AddGame = ({ genres, submitGame }) => {
    const [game, setGame] = useState({
        name: "",
        description: "",
        img: "",
        rating: "",
        date:"",
        generos: [],
        platforms: []
    })
    const handleSelect = (e) => {
        if (!game[e.name].includes(e)) {
            setGame({
                ...game,
                [e.name]: [...game[e.name], e.value]
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
            submitGame(game)
            
        
    }

    return (

        <form className='form-div'>
            <input type='text' placeholder='Nombre del juego' name='name' onChange={(e) => setGame({ ...game, [e.target.name]: e.target.value })} ></input>
            <textarea placeholder='descripción' name='description' onChange={(e) => setGame({ ...game, [e.target.name]: e.target.value })}></textarea>
            <input type='text' placeholder='Inserte URL de la imagen del juego' name='img' onChange={(e) => setGame({ ...game, [e.target.name]: e.target.value })} ></input>
            <input type='date' placeholder= 'Fecha de lanzamiento' name= 'date' onChange={(e) => setGame({ ...game, [e.target.name]: e.target.value })} ></input>
            <input type='number' placeholder='rating' name='rating' onChange={(e) => setGame({ ...game, [e.target.name]: e.target.value })} ></input>
            <select name='generos' onChange={(e) => handleSelect(e.target)}>
                <option selected hidden>seleccione generos:</option>
                {genres.map(gen => {
                    return (<option value={gen.id}>
                        {gen.name}
                    </option>)
                })}
            </select>
            <select name='platforms' onChange={(e) => handleSelect(e.target)}>
                <option selected hidden>seleccione plataformas:</option>
                {platforms.map(pl => {
                    return (<option value={pl}>
                      {pl}
                    </option>)
                })}
            </select>

            {game.name && game.description && game.rating && game.generos.length > 0 && game.platforms.length > 0 ? <button onClick={(e) => handleSubmit(e)}>Agregar</button> : <p>termina</p>}
        </form>

    )
}

const mapStateToProps = (state) => ({

    genres: state.genres

})

const mapDispatchToProps = (dispatch) => {
    return {
        submitGame: (game) => dispatch(submitGame(game))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGame)
