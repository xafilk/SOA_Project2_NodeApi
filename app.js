const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const port = 3000;

server.use(bodyParser.json());

const neo4j = require("neo4j-driver").v1;

const driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "1234")
);
const session = driver.session();

server.post("/Catalog/Service", async (req, res) => {
  console.log(req.body);
  let success;
  try {
    let Ress_Id = req.body["Ress_Id"];
    let Ress_Name = req.body["Ress_Name"];
    let Ress_Description = req.body["Ress_Description"];
    const resultPromise = await session.run(
      "CREATE (a: Service {ServiceId: $Ress_Id, ServiceName: $Ress_Name, ServiceDescription: $Ress_Description}) RETURN a",
      {
        Ress_Id: Ress_Id,
        Ress_Name: Ress_Name,
        Ress_Description: Ress_Description
      }
    );
    console.log(resultPromise);
    success = { Succes: true, Result: resultPromise };
  } catch (err) {
    success = { Succes: false, Result: err };
    console.log(err);
  }
  res.send(success);
});

server.put("/Catalog/Service", async (req, res) => {
  console.log(req.body);
  let success;
  try {
    let Ress_Id = req.body["Ress_Id"];
    let Ress_Name = req.body["Ress_Name"];
    let Ress_Description = req.body["Ress_Description"];
    const resultPromise = await session.run(
      `MATCH (n { ServiceId: '${Ress_Id}' })
            SET n.ServiceName = toString('${Ress_Name}')
            SET n.ServiceDescription = toString('${Ress_Description}')
                RETURN n`,
      { Ress_Name: Ress_Name, Ress_Description: Ress_Description }
    );
    console.log(resultPromise);
    success = { Succes: true, Result: resultPromise };
  } catch (err) {
    success = { Succes: false, Result: err };
    console.log(err);
  }
  res.send(success);
});

server.get("/Catalog/Service", async (req, res) => {
  console.log(req.body);
  let success;
  try {
    let Ress_Id = req.body["Ress_Id"];
    const resultPromise = await session.run(
      `MATCH (n { ServiceId: '${Ress_Id}' }) RETURN n`
    );
    console.log(resultPromise);
    success = { Succes: true, Result: resultPromise };
  } catch (err) {
    success = { Succes: false, Result: err };
    console.log(err);
  }
  res.send(success);
});
server.delete("/Catalog/Service", async (req, res) => {
  console.log(req.body);
  let success;
  try {
    let Ress_Id = req.body["Ress_Id"];
    const resultPromise = await session.run(
      `MATCH (n { ServiceId: '${Ress_Id}' }) DELETE n`
    );
    console.log(resultPromise);
    success = { Succes: true, Result: resultPromise };
  } catch (err) {
    success = { Succes: false, Result: err };
    console.log(err);
  }
  res.send(success);
});
server.post("/Catalog/Schedule", async (req, res) => {
  console.log(req.body);
  let success;
  try {
    let Ress_Id = req.body["Ress_Id"];
    let Ress_Restaurant_Id = req.body["Ress_Restaurant_Id"];
    let Ress_Rest_Services_Id = req.body["Ress_Rest_Services_Id"];
    let Ress_Day = req.body["Ress_Day"];
    let Ress_Start_Time = req.body["Ress_Start_Time"];
    let Ress_End_Time = req.body["Ress_End_Time"];
    const resultPromise = await session.run(
      `MATCH(r:Restaurant{idRest:${Ress_Restaurant_Id}})
        CREATE (r)-[:Tiene]->(a: Schedule 
          {ScheduleId: $Ress_Id, Ress_Day: $Ress_Day, Ress_Start_Time: $Ress_Start_Time, Ress_End_Time: $Ress_End_Time})`,
      {
        Ress_Id: Ress_Id,
        Ress_Rest_Services_Id: Ress_Rest_Services_Id,
        Ress_Day: Ress_Day,
        Ress_Start_Time: Ress_Start_Time,
        Ress_End_Time: Ress_End_Time
      }
    );
    const resultPromise2 = await session.run(
      `MATCH(a:Schedule{ScheduleId:'${Ress_Id}'}),
          (b:Service{ServiceId:'${Ress_Rest_Services_Id}'})
          Create (a)-[:Tiene]->(b)`
    );
    console.log(resultPromise);
    console.log(resultPromise2);
    success = { Succes: true, Result: resultPromise };
  } catch (err) {
    success = { Succes: false, Result: err };
    console.log(err);
  }
  res.send(success);
});

server.put("/Catalog/Schedule", async (req, res) => {
  console.log(req.body);
  let success;
  try {
    let Ress_Id = req.body["Ress_Id"];
    let Ress_Day = req.body["Ress_Day"];
    let Ress_Start_Time = req.body["Ress_Start_Time"];
    let Ress_End_Time = req.body["Ress_End_Time"];
    const PromiseUpdateGeneral = await session.run(
      `MATCH (n:Schedule { ScheduleId: '${Ress_Id}' })
              SET n.Ress_Day =toString('${Ress_Day}')
              SET n.Ress_Start_Time =toString('${Ress_Start_Time}')
              SET n.Ress_End_Time =toString('${Ress_End_Time}')
                  RETURN n`,
      {
        Ress_Day: Ress_Day,
        Ress_Start_Time: Ress_Start_Time,
        Ress_End_Time: Ress_End_Time
      }
    );
    console.log(PromiseUpdateGeneral);
    success = { Succes: true, PromiseUpdateGeneral: PromiseUpdateGeneral };
  } catch (err) {
    success = { Succes: false, Result: err };
    console.log(err);
  }
  res.send(success);
});

server.get("/Catalog/Schedule", async (req, res) => {
  console.log(req.body);
  let success;
  try {
    let Ress_Id = req.body["Ress_Id"];
    const resultPromise = await session.run(
      `MATCH (n { ScheduleId: '${Ress_Id}' }) RETURN n`
    );
    console.log(resultPromise);
    success = { Succes: true, Result: resultPromise };
  } catch (err) {
    success = { Succes: false, Result: err };
    console.log(err);
  }
  res.send(success);
});
server.delete("/Catalog/Schedule", async (req, res) => {
  console.log(req.body);
  let success;
  try {
    let Ress_Id = req.body["Ress_Id"];
    const resultPromise = await session.run(
      `MATCH (n { ScheduleId: '${Ress_Id}' }) DETACH  DELETE n`
    );
    console.log(resultPromise);
    success = { Succes: true, Result: resultPromise };
  } catch (err) {
    success = { Succes: false, Result: err };
    console.log(err);
  }
  res.send(success);
});

server.listen(port, () => console.log(`Listening on port ${port}`));
