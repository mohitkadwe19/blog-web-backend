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
 *       400:
 *         description: Error occurred.
 */

blogRouter.get("/getBlogById/:id", blogController.getBlogById);

/**
 * @swagger
 * /api/blog/updateBlog/{id}:
 *   put:
 *     summary: update blog post by id
 *     description: This endpoint updates a blog post by its ID.
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 100
 *               content:
 *                 type: string
 *                 minLength: 20
 *               author:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               comments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     author:
 *                       type: string
 *               likes:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     fileName:
 *                       type: string
 *                     size:
 *                       type: number
 *                     mimetype:
 *                       type: string
 *                     updatedBy:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *               dislikes:
 *                 type: array
 *                 items:
 *                   type: string
 *               views:
 *                 type: number
 *     responses:
 *       200:
 *         description: Blog post updated successfully.
 *       400:
 *         description: Error occurred.
 */
blogRouter.put("/updateBlog/:id", blogController.updateBlog);

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
