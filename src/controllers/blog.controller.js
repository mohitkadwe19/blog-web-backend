const blogService = require('../services/blog.service');

const createBlog = async (req, res) => {
  try {
    const data = req.body;
    const blog = await blogService.createBlog(data);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogService.getBlogById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const blog = await blogService.updateBlog(id, data);
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogService.deleteBlog(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
}