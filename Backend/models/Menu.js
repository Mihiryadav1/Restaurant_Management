import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  averagePreparationTime: {
    type: Number, // in minutes
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  image:{
    type:String,
    default:"https://tse4.mm.bing.net/th/id/OIP.GBKOdbD50IkAgwo_jeTWiQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  }
}, { timestamps: true });

export default mongoose.model('Menu', menuSchema);
