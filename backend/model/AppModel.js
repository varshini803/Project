

class AppModel {
RestaurantModel = () => {
      const collection_name = 'restaurant';
      const collection_fields = {
          name: String,
          type:String, 
          location: String,
          rating:Number,
          top_food: String
      };
      const collection_config = {
          timestamps: false
      };
      
      const schema = mongoose.Schema(collection_fields, collection_config);
      const Model = mongoose.model(collection_name, schema);
  
      return Model;
  }
}

module.exports = AppModel;