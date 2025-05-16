import express from 'express';

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// In-memory data for demo
let users = {
  1: { name: "Alice" },
  2: { name: "Bob" }
};

// PUT route to update a user
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  if (!users[id]) {
    return res.status(404).json({ error: "User not found" });
  }

  users[id].name = name;
  res.json({ message: "User updated", user: users[id] });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
