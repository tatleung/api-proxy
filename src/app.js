const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const port = 3000;

app.all("/proxy", async (req, res) => {
  let status = 400;
  let respData = {};

  console.log("\n\n>>> request:\n");
  console.log(req.body);
  const response = await axios({
    method: req.query.method,
    url: req.query.targetUrl,
    data: req.body,
  });

  status = response.status;
  respData = response.data;

  console.log("\n\n<<< response:\n");
  console.log(respData);
  res.status(status).send(respData);
});

app.listen(port, () => {
  console.log(`Proxy is listening at http://proxy.cydence.com:${port}`);
});

