const express = require("express");

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

app.use(express.json());

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

app.get("/info", (request, response) => {
  const len = persons.length;
  const phoneBookInfo = `<p>Phonebook has info for ${len} people.</p>`;
  const timeText = `${new Date()}`;
  response.status(200).send(`${phoneBookInfo}${timeText}`);
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
