const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
//make stylesheet available to client
const path = require("path");
const session = require('express-session');
const helpers = require('./utils/helpers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 180000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 4001;
app.use(session(sess));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// turn on routes
app.use(routes);

const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
