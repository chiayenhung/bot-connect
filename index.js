const restify = require("restify");
const restifyBodyParser = require("restify-plugins").bodyParser;
const request = require("request");

const server = restify.createServer();
server.use(restifyBodyParser());

const DEFAULT_PROXY = "http://localhost:3000/api/messages";

const defaultOptions = {
  url: process.env.PROXY_URL || DEFAULT_PROXY
};

server.post("/api/messages", (req, res, next) => {
  console.log(req.header("Authorization"));
  const body = req.body;
  const options = Object.assign({}, defaultOptions, { body: JSON.stringify(body) });
  request.post(options).pipe(res);
  next();
});

server.get("/", (req, res, next) => {
  res.send(`${server.name} listening at ${server.url}`);
  next();
});

server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log('%s listening at %s', server.name, server.url);
});
