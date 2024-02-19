const data = { name: "Test", number: "00-000000" };
const data_str = JSON.stringify(data);

fetch("http://localhost:3001/api/persons", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(data_str),
    connection: "Close",
  },
  body: data_str,
});
