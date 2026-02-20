import express from "express";
import { createRestaurant , 
         getAllRestaurants ,
         getRestaurantById ,
         updateRestaurant,
         deleteRestaurant } from "../controllers/restaurantController.js";  
import { protect } from "../middlewares/authMiddleware.js";    
     

         const router = express.Router();

         router.post("/" , protect , createRestaurant);
         router.get("/" , getAllRestaurants);
         router.get("/:id" , getRestaurantById);
         router.put("/:id" , protect , updateRestaurant);
         router.delete("/:id" , protect , deleteRestaurant);

         export default router ;




