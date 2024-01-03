const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title should not be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [20, 'Content should be at least 20 characters long']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  comments: [{
    text: String,
    createdAt: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User' }
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  image: {
    type: String,
    trim: true
  },
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


module.exports = mongoose.model('blogs', blogSchema);