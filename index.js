const express = require("express");
const cors = require("cors");
const request = require("request");
const app = express();
const port = process.env.PORT || 5000;

//middlewires in use

app.use(cors());
app.use(express.json());

//test api

app.post("/test", (req, res) => {
  try {
    const { requestStrig, xVerify } = req.body;
    var options = {
      method: "POST",
      url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
      headers: {
        "Content-Type": "application/json",
        "X-Verify": xVerify,
      },
      body: JSON.stringify({
        request: requestStrig,
      }),
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      res.send(response.body);
    });
  } catch (error) {
    res.send(error);
  }
});

app.get("/callback/afterpayment", (req, res) => {
  console.log("Headers: ", req.headers);
  console.log("\nrequest: ", req);
  res.send({message:"Hellow World"})
});

app.get("/", (req, res) => {
  res.send("Hello from test server");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
