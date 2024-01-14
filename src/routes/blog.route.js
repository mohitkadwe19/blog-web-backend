const express = require("express");
const blogRouter = express.Router();
const blogController = require("../controllers/blog.controller");
const { upload, uploadMultiple } = require("../utils/multer/multer");
const multer = require("multer");
const { auth } = require("../utils/middleware/auth/jwt.middleware");

/**
 * @swagger
 * /api/blog/createBlog:
 *   post:
 *     tags:
 *       - Blog
 *     summary: Create a blog
 *     description: Creates a new blog and returns the created blog from the database.
 *     security:
 *       - BearerAuth: []
 *     operationId: createBlog
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog.
 *                 example: "My New Blog Post"
 *               content:
 *                 type: string
 *                 description: The content of the blog.
 *                 example: "This is the content of my blog post."
 *               tags:
 *                 type: array
 *                 description: Tags associated with the blog.
 *                 items:
 *                   type: string
 *                 example: ["Technology", "Innovation", "Startups"]
 *     responses:
 *       200:
 *         description: Blog created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blog created successfully."
 *       400:
 *         description: Bad request.
 *       401:
 *         description: No token, authorization denied.
 *       500:
 *         description: Internal server error.
 */
blogRouter.post("/createBlog", auth, uploadMultiple, blogController.createBlog);

/**
 * @swagger
 * /api/blog/getAllBlogs:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get all blogs
 *     description: Returns all blogs from the database.
 *
 * */
blogRouter.get("/getAllBlogs", blogController.getAllBlogs);

/**
 * @swagger
 * /api/blog/getBlogById/{id}:
 *  get:
 *     summary: Get blog by id
 *     description: Returns a message of success or error in the endpoint.
 *     tags: [Blog]
 *  parameters:
 *       - in: blog_id
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog id
 * responses:
 *       200:
 *         description: Returns a message of success or error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Get blog by id successfully"
 *       404:
 *             description: Blog not found
 *             content:
 *                 application/json:
 *               schema:
 *                type: object
 *                properties:
 *                  message:
 *                     type: string
 *                     example: "Blog not found"
 *       500:
 *              description: Blog server error
 *               content:
 *                   application/json:
 *                 schema:
 *                  type: object
 *                  properties:
 *                  message:
 *                     type: string
 *                     example: "Blog internal server error"
 *
 * */

blogRouter.get("/getBlogById/:id", blogController.getBlogById);

// Error handling middleware
blogRouter.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    res.status(500).send(err.message);
  } else {
    // An unknown error occurred when uploading.
    next(err);
  }
});
module.exports = blogRouter;
