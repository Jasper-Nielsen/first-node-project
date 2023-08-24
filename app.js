import express from "express"; //hvad er express
import fs from "fs/promises"; //hvad er fs, hvad er primise. få fat i fs/promises udgaven
import cors from "cors"; // hvad er cors - noget man skal gøre for at få ting til at virke

const app = express();
const port = 3333;

app.use(express.json()); //to parse JSON bodies
app.use(cors());

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});

app.get("/", (request, response)=> {
    response.send("Det virker!");
});

app.get("/test", (request,response) =>{
    response.send("This is a test route2");
});

app.get("/users", async (request,response)=> {
    const data = await fs.readFile("data.json");
    const users = JSON.parse(data); //why not writing this part right from start
    response.json(users);
});
app.post("/users", async (request, response)=>{
    const newUser = request.body;
    newUser.id = new Date().getTime();
    console.log(newUser);

    const data = await fs.readFile("data.json");
    const users = JSON.parse(data);

    users.push(newUser);
    console.log(users);
    fs.writeFile("data.json", JSON.stringify(users))
    response.json(users);
    
});

app.put("/users/:id", async (request, response)=>{
    const id = Number(request.params.id);
    console.log(id);

    const data = await fs.readFile("data.json");
    const users = JSON.parse(data);
    const userToUpdate = users.find(user=>user.id===id);
   const body = request.body;
   console.log(body);
   userToUpdate.image = body.image;
   userToUpdate.mail = body.mail;
   userToUpdate.name = body.name;
   userToUpdate.title = body.title;

   fs.writeFile("data.json", JSON.stringify(users));
   response.json(users);

});

app.delete("/users/:id", async (request, response)=>{
const id = Number(request.params.id);

const data = await fs.readFile("data.json");
const users = JSON.parse(data);

const newUsers = users.filter((user) => user.id === id);
fs.writeFile("data.json", JSON.stringify(newUsers));
response.json(users);

});