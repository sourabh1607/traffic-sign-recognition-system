import express from "express"
import multer from "multer"
import cors from "cors"
import path from "path"
import imageRouter from "./routes/imageRoute.js"
import videoRouter from "./routes/videoRoute.js"

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/image', imageRouter);
app.use('/api/video', videoRouter);

app.listen(PORT,() => console.log(`Server running on port ${PORT}`));