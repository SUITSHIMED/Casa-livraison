import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const OrderItem = sequelize.define ('OrderItem' ,{
    id :{
        type: DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true,
    },
    quantity :{
        type : DataTypes.INTEGER,
        allowNull : false,
    },
});

export default OrderItem ;