const blogService = require('../services/blog.service');
const uploadImage = require('../utils/uploadImages');

const createBlog = async (req, res) => {
  try {
    const buildImage = await uploadImage(req.files, 'multiple', req.user.email, req.user.password);
    if(!buildImage && buildImage.length === 0) {
      return res.status(400).json({error: 'Failed to upload image'});
    }
    const data = req.body;
    data.image = buildImage;
    data.author = req.user._id;
    const blog = await blogService.createBlog(data);
    res.status(201).json({
      message: 'Blog created successfully',
      blog
    });
    res.send({
      status: "SUCCESS",
      imageName: buildImage
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log('error from createBlog', error);
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