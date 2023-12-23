const express = require('express');
const apiRouter = express.Router();
const authRouter = require('./api/authRoutes')
const eventRouter = require('./api/eventRoutes')
const userRouter = require('./api/userRoutes')
const adminRouter = require('./api/adminRoutes')

apiRouter.use("/auth", authRouter)
apiRouter.use("/user", userRouter)
apiRouter.use("/admin", adminRouter)
apiRouter.use("/event", eventRouter)

module.exports = apiRouter;