import express from 'express';
import cors from 'cors';
import { router } from './routes/feedback.route';

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)




app.listen(process.env.PORT || 4000).on('listening', () => console.log('Server running 🚀'))