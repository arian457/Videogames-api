const { Router } = require('express');
const Axios = require('axios')

const { Videogame, Genres } = require('../db.js');
const {
    API_KEY
} = process.env

const router = Router();



router.get('/videogames', async (req, res) => {
    let { name, page } = req.query
    var promiseGames1 = await Axios.get(`http://api.rawg.io/api/games?key=${API_KEY}&page=1`)
    var promiseGames2 = await Axios.get(`http://api.rawg.io/api/games?key=${API_KEY}&page=2`)
    var promiseGames3 = await Axios.get(`http://api.rawg.io/api/games?key=${API_KEY}&page=3`)
    var promiseGames4 = await Axios.get(`http://api.rawg.io/api/games?key=${API_KEY}&page=4`)
    var promiseGames5 = await Axios.get(`http://api.rawg.io/api/games?key=${API_KEY}&page=5`)
    var promiseMyGames = await Videogame.findAll({
        include: Genres 
    })
  
    var apiPromises = Promise.all([promiseGames1, promiseGames2, promiseGames3, promiseGames4, promiseGames5])
  
    Promise.all([apiPromises, promiseMyGames])
        .then(async (resultados) => {

            var dbGames = resultados[1]
            var apiGames = resultados[0].map(page => {
                return page.data.results
            })
            var final = [].concat(...apiGames)

            apiGames = final.map(game => {

                return {
                    id: game.id,
                    name: game.name,
                    release: game.released,
                    rating: game.rating,
                    img: game.background_image,
                    platforms: game.platforms.map(platform => platform.platform.name),
                    playtime: game.playtime,
                    genres: game.genres.map(gen => {
                        return {
                            id: gen.id,
                            name: gen.name
                        }
                    })
                }
            })
            dbGames = dbGames.map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    description: game.description,
                    img: game.img,
                    releaseDate: game.releaseDate,
                    rating: game.rating,
                    platforms: game.platforms,
                    genres: game.genres.map(gen => gen.dataValues),
                    isLocal: game.isLocal
                }
            })
         
            var allGames = apiGames.concat(dbGames)
            if (name) {
                name = name[0].toUpperCase()
                var filterGames = allGames.filter(game => {
                    if (game.name.includes(name)) {
                        return game
                    }
                })
                filterGames.length > 0 ? res.json(filterGames) : res.send('no se encontro')
            }
            else {
                res.json(allGames)

            }
        })
        .catch(err => console.error(err.data))
})

router.get('/videogames/:id', async (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    var promiseGames = await Axios.get(`http://api.rawg.io/api/games?key=${API_KEY}`)
    var promiseMyGames = await Videogame.findAll()
    Promise.all([promiseGames, promiseMyGames])
        .then(resultados => {
            var apiGames = resultados[0].data.results
            var dbGames = resultados[1]
            apiGames = apiGames.map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    release: game.released,
                    rating: game.rating,
                    img: game.background_image,
                    metacritic_points: game.metacritic,
                    platforms: game.platforms,
                    playtime: game.playtime,
                    genres: game.genres
                }
            })
            dbGames = dbGames.map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    img: game.img,
                    description: game.description,
                    releaseDate: game.releaseDate,
                    rating: game.rating,
                    platforms: game.platforms
                }
            })
            var allGames = apiGames.concat(dbGames)
            var filterGame = allGames.filter(game => game.id === id)
            filterGame.length > 0 ? res.json(filterGame) : res.send('no se encontro')
        }).catch(err => console.error(err.data))
})
router.post('/videogames', async(req, res) => {
    let { name, description, img, date, rating, platforms, generos } = req.body
    name = name.replace(/(^|\s)[a-z]/g, function (x) { return x.toUpperCase(); });
    if(!img) img = "https://es.gamewallpapers.com/img_script/wallpaper_dir/img.php?src=wallpaper_demons_souls_2020_04_2560x1440.jpg&height=450&width=800&fill-to-fit&sharpen" 
    const vidiojuego = await Videogame.create({
        name,
        description,
        date,
        rating,
        platforms,
        img
    })
    let generosEncontrados = await Genres.findAll({
        where: {
            id: generos 
        }
    })
    await vidiojuego.addGenres(generosEncontrados)
   
    res.json("lito")
})


module.exports = router;

