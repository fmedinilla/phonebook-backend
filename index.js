const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT ?? 3001;

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const app = express();

app.use(cors());

app.use(express.json());

morgan.token("body", (request) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (request, response) => {
  response.status(200).json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number.parseInt(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    response.status(404).end();
  } else {
    response.status(200).json(person);
  }
});

app.post("/api/persons", (request, response) => {
  const { body } = request;

  if (!body.name) {
    return response.status(400).json({ error: "name is required" });
  }

  if (!body.number) {
    return response.status(400).json({ error: "number is required" });
  }

  const duplicateName = persons
    .map((person) => person.name)
    .some((name) => name === body.name);

  if (duplicateName) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const newPerson = {
    id: Math.floor(Math.random() * 9999999999),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);

  response.status(201).json(newPerson);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number.parseInt(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.get("/info", (request, response) => {
  const len = persons.length;
  const phoneBookInfo = `<p>Phonebook has info for ${len} people.</p>`;
  const timeText = `${new Date()}`;
  response.status(200).send(`${phoneBookInfo}${timeText}`);
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
