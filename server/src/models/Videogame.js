const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    description: {
      type: DataTypes.TEXT,
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "https://w7.pngwing.com/pngs/594/540/png-transparent-super-nintendo-entertainment-system-video-game-game-controllers-coSmputer-icons-video-games-miscellaneous-game-logo.png",
    },
    rating: {
      type: DataTypes.INTEGER
    },
    platforms: {
      type: DataTypes.JSON,
      allowNull: false
    }

  }, {
    createdAt: false,
    updatedAt: false
  });

  sequelize.define('genres', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  }, {
    createdAt: false,
    updatedAt: false
  })

};
