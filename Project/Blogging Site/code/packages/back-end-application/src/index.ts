import express,{Response, Request} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_SERVER_PORT || 3001;

app.get('/', (req: Request, res: Response) => {
	res.send('TypeScript Express Server is Running!');
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});