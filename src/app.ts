import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import NotFound from './app/middlewares/NotFound';
import GlobalErrorHandler from './app/middlewares/globalErrorhandler';
import router from './app/routes';

const app: Application = express();
app.use(express.json());
app.use(cors());

// ========================
// application routes
// ========================
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send(`Assinment 4 Server is running `);
});

app.use(GlobalErrorHandler);
app.use(NotFound);

export default app;
