/*
    CIT 281 Project 3
    Name: Beatrice Wetton
*/

const fs = require('fs');
const { coinCount } = require("./p3-module.js");
const fastify = require("fastify")();


fastify.get("/", (request, reply) => {

    //const { denom, count } = toString(request.query)

  
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
        if (err) {
            console.log(err);
            reply.code = 500;
            reply.header('Content-Type', 'text/html');
            reply.send("Error processing request");
        } else {
            reply.code = 200;
            console.log("URL: ", request.url);
            reply.header('Content-Type', 'text/html');
            reply.send(data);
        }
    });
});

fastify.get("/coin", (request, reply) => {
    const { denom = 0, count = 0 } = request.query;
    const coinValue = coinCount({
      denom: parseInt(denom),
      count: parseInt(count),
    });
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(
        `<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`
      );
  });

  fastify.get("/coins", (request, reply) => {
    let coinValue = 0;
    const coins = [
      { denom: 25, count: 2 },
      { denom: 1, count: 7 },
    ];
  const { option } = request.query;
    switch (option) {
      case "1":
        coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
        break;
      case "2":
        coinValue = coinCount(...coins);
        break;
      case "3":
        coinValue = coinCount(coins);
        break;
    }
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(
        `<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`
      );
  });
  
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});


