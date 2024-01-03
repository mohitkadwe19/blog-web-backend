const Blog = require('../models/blog.model');

const getAllBlogs = async () => {
  try {
    const blogs = await Blog.find();
    return blogs;
  } catch (error) {
    throw new Error(error);
  }
};

const createBlog = async (data) => {
  try {
    const blog = await Blog.create(data);
    return blog;
  } catch (error) {
    throw new Error(error);
  }
};

const updateBlog = async (id, data) => {
  try {
    const blog = await Blog.findByIdAndUpdate(id, data);
    return blog;
  } catch (error) {
    throw new Error(error);
  }
}

const deleteBlog = async (id) => {
  try {
    const blog = await Blog.findByIdAndDelete(id);
    return blog;
  } catch (error) {
    throw new Error(error);
  }
};

const getBlogById = async (id) => {
  try {
    const blog = await Blog.findById(id);
    return blog;
  } catch (error) {
    throw new Error(error);
  }
};


module.exports = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById
}