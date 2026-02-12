import {DataTypes} from 'sequelize';
import sequelize from '../config/database.js';

const Restaurant = sequelize.define('restaurant', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },

    name : { type : DataTypes.STRING,
        allowNull : false,

    },
    category : { 
        type : DataTypes.STRING,
        allowNull : true,
    },
    image_url : {
        type : DataTypes.STRING,
        allowNull: true,
    },
});
export default Restaurant;