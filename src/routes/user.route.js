const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const { auth } = require("../utils/middleware/auth/jwt.middleware");

/**
 * @swagger
 * /api/user/getAllUsers:
 *   get:
 *     summary: Get all users
 *     description: Returns a list of all users in the endpoint.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Returns a list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Get all users successfully"
 */
userRouter.get("/getAllUsers", userController.getAllUsers);

/**
 * @swagger
 * /api/user/getUserById/{id}:
 *   get:
 *     summary: Get user by id
 *     description: Returns a user by id in the endpoint.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: Returns a user by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Get user by id successfully"
 */
userRouter.get("/getUserById/:id", userController.getUserById);

/**
 * @swagger
 * /api/user/getUserByEmail/{email}:
 *   get:
 *     summary: Get user by email
 *     description: Returns a user by email in the endpoint.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: User email
 *     responses:
 *       200:
 *         description: Returns a user by email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Get user by email successfully"
 * */
userRouter.get("/getUserByEmail/:email", userController.getUserByEmail);

/**
 * @swagger
 * /api/user/createUser:
 *   post:
 *     summary: Create user
 *     description: Returns a message of success or error in the endpoint.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               role:
 *                 type: string
 *                 example: "admin"
 *               email:
 *                 type: string
 *                 example: "johndoe@ex.com"
 *               password:
 *                 type: string
 *                 example: "password"
 *     responses:
 *       200:
 *         description: Returns a message of success or error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Create user successfully"
 * */
userRouter.post("/createUser", userController.createUser);

/**
 * @swagger
 * /api/user/updateUser/{id}:
 *   put:
 *     summary: Update user
 *     description: Returns a message of success or error in the endpoint.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               role:
 *                 type: string
 *                 example: "user"
 *               email:
 *                 type: string
 *                 example: "Jpj2f@example.com"
 *               password:
 *                 type: string
 *                 example: "password"
 *     responses:
 *       200:
 *         description: Returns a message of success or error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Update user successfully"
 * */
userRouter.put("/updateUser/:id", userController.updateUser);

/** 
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     description: Returns a message of success or error in the endpoint.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@ex.com"
 *               password:
 *                 type: string
 *                 example: "password"
 *     responses:
 *       200:
 *         description: Returns a message of success or error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successfully"
 * */
userRouter.post("/login", userController.loginUser);


/**
 * @swagger
 * /api/user/deleteUser/{id}:
 *   delete:
 *     summary: Delete user
 *     description: Returns a message of success or error in the endpoint.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User id
 *     responses:
 *       200:
 *         description: Returns a message of success or error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Delete user successfully"
 * */
userRouter.delete("/deleteUser/:id", userController.deleteUser);

module.exports = userRouter;
