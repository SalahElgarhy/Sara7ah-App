import connectDB from "./DB/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import globalErrorHandler from "./utils/errorHandler/golobalErrorHandler.js";
import messagesRouter from "./modules/messages/messages.controller.js";
import cors from "cors";

const bootstrap = async (app, express) => {
    await connectDB();
    app.use(express.json());
    app.use(cors());
    
    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/messages" , messagesRouter);

    app.use(globalErrorHandler);



}




export default bootstrap;