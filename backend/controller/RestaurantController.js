//RestaurantModelModel
class RestaurantModelController {
    create = async (request, response) => {
        const form = { ...request.body };
        
        let rbody = { };
        let rstatus = 200;

        try {
            const restaurantModel = new RestaurantModelModel( {
                _id : new mongoose.Types.ObjectId(),
                name: form.name, 
                location: form.location,
                technology: form.technology, 
                phone_number: form.phone_number
            } );
            const restaurantModelRes = await restaurantModel.save();

            const restaurantDoc = await RestaurantModelModel.findOne({_id: restaurantModel._id}).lean();

            rbody = {
                data : restaurantDoc,
                isError: false
            };

            console.log("create", rbody); 
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in creating restaurant.\n${error}`},
                isError: true
            };         

            console.log("create", rbody); 

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);
    }     

    update = async (request, response) => {
        //path variables
        const id = request.params.id;
        //form posted
        const form = { ...request.body };
        
        //
        let rbody = {};
        let rstatus = 200;

        try {
            const updatableRestaurantModel = {
                name: form.name, 
                location: form.location,
                technology: form.technology, 
                phone_number: form.phone_number
            };  
            const restaurantModelRes = await RestaurantModelModel.findOneAndUpdate(
                        { _id : id }, 
                        updatableRestaurantModel, 
                        {new: true});
            const updatedRestaurantModel = await RestaurantModelModel.findOne({ _id: id });
            
            if(!updatedRestaurantModel) {
                rbody = {
                    data : {"message" : "restaurant is not found"},
                    isError: true
                };

                 console.log(rbody); 

                rstatus = 404;
            }
            else {
                rbody = {
                    data : updatedRestaurantModel,
                    isError: false,
                    isLoggedIn: true
                };

                console.log(rbody); 
            }
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in updating restaurant.\n${error}`},
                isError: true,
                isLoggedIn: true
            };

            console.log(rbody); 

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);        
    }
    
    remove = async (request, response) => {
        const id = request.params.id;
        
        let rbody = {};
        let rstatus = 200;

        try {
            const restaurantModelRes = await RestaurantModelModel.findOneAndDelete({ _id : id });

            if(!restaurantModelRes) {
                rbody = {
                    data : {"message" : "restaurant is not found"},
                    isError: true
                };

                console.log(rbody); 

                rstatus = 404;
            } 
            else {
                rbody = {
                    data : {message: "restaurant is Deleted successfully."},
                    isError: false
                }; 

                console.log(rbody); 
            }
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in deleting restaurant.\n${error}`},
                isError: true
            };

            console.log(rbody); 

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);
    }  

    readAll = async (request, response) => {
        let rbody = {};
        let rstatus = 200;

        try {
            const restaurantDocs = await RestaurantModelModel.find().lean();

            rbody = {
                data : restaurantDocs,
                isError: false
            };
            
            console.log(rbody); 
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in reading all restaurants.\n${error}`},
                isError: true
            };

            console.log(rbody);

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);  
    }
    
    readById = async (request, response) => {
        const id = request.params.id;

        let rbody = {};
        let rstatus = 200;

        try {
            const restaurantDoc = await RestaurantModelModel.findOne({ _id : id }).lean(); 

            if(!restaurantDoc) {
                rbody = {
                    data : {"message" : "restaurant is not found"},
                    isError: true
                };

                 console.log(rbody);

                rstatus = 404;
            }
            else {
                rbody = {
                    data : restaurantDoc,
                    isError: false
                };

                console.log(rbody); 
            }
        }
        catch( error ) {
            rbody = {
                data : {message : `Error in reading restaurant.\n${error}`},
                isError: false
            };

             console.log(rbody);  

            rstatus = 500;
        }

        response.status(rstatus).send(rbody);
    }

}

module.exports = RestaurantModelController;