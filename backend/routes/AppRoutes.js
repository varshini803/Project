class AppRoutes {   
    restaurant = (restaurantController) => {
        app.post("/this.restaurant",  this.restaurantController.create);             
        app.get("/this.restaurant",  this.restaurantController.readAll);     
        app.get("/this.restaurant/:id", this.restaurantController.readById);
        app.put("/this.restaurant/:id", this.restaurantController.update);
        app.delete("/this.restaurant/:id", this.restaurantController.remove);
    }
    
    root = (appController) => {
        app.get("/", appController.serverRootAction); 
    }
}

module.exports = AppRoutes;