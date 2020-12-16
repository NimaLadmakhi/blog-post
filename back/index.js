const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const path = require('path');
const cors = require('cors');
const controller = require('./controller/notFound');
const { Messages } = require('./help/Messages');

// config .env files
dotenv.config();

// config images access
server.use('/images', express.static(path.resolve(__dirname, 'images')));

// config mongoose
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
mongoose.connection.on("open", () => console.log(Messages.databaseRunning));

// config middlewares
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

// config routes
server.use('/posts', postRoutes);
server.use('/users', userRoutes);
server.use(controller.NotFoundRoute);

server.listen(process.env.PORT || 4000, () => console.log(Messages.portRunning));