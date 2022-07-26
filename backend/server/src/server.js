const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");
const config = require("./config");
const { TripManagementApiError, errorHandler } = require("./errors");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.disable("x-powered-by");

app.use("/", express.static(config.FRONTEND_DIR));
app.use("/upload", express.static(config.FRONTEND_DIR_UPLOAD));

app.get("/", async (req, res) => {
  res.status(200).send({ API: "This is the TRIPS MANAGEMENT API" });
});

require("./resources/users/user.controller").addRoutesTo(app);
require("./resources/travel/travel.controler").addRoutesTo(app);
require("./resources/components/accommodation/accommodation.controller").addRoutesTo(
  app
);
require("./resources/comments/comments.controller").addRoutesTo(app);
require("./resources/score/score.controller").addRoutesTo(app);
require("./resources/components/restaurant/restaurant.controller").addRoutesTo(
  app
);

require("./resources/components/transport/transport.controller").addRoutesTo(
  app
);

require("./resources/components/plans/plans.controller").addRoutesTo(app);

app.all("/*", async (req, res, next) => {
  next(new TripManagementApiError(404, `Not Found`));
});

app.use(errorHandler);

const startServer = async () => {
  await db.connect();
  app.listen(config.SERVER_PORT, () => {
    const mode = config.NODE_ENV.toUpperCase();
    console.log(
      `Trips Management API Server (mode ${mode}) listening on port :${config.SERVER_PORT}`
    );
  });
};

startServer();
