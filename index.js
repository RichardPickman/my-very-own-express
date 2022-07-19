const Application = require('./framework/Application');
const userRouter = require('./src/user-router');
const jsonParser = require('./framework/middlewares/parseJSON');
const bodyParser = require('./framework/middlewares/parseBody');


const app = new Application();
const PORT = process.env.PORT || 8280;

app.use(bodyParser);
app.use(jsonParser);

app.addRouter(userRouter);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
