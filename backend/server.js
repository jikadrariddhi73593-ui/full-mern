const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Student = require("./models/Student");

const app = express();

app.use(cors());
app.use(express.json());

/* ------------------ MongoDB Connect ------------------ */
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));


/* ------------------ CREATE ------------------ */
app.post("/add", async (req, res) => {
  try {

    console.log("Incoming Data:", req.body);  // ✅ Debug line

    const { name, age } = req.body;

    if (!name || !age) {
      return res.status(400).json({ message: "All fields required" });
    }

    const student = new Student({
      name,
      age: Number(age)
    });

    await student.save();

    res.status(201).json(student);

  } catch (err) {
    console.log("ERROR:", err);   // ✅ Error debug
    res.status(500).json({ error: err.message });
  }
});


/* ------------------ READ ------------------ */
app.get("/students", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ------------------ UPDATE ------------------ */
app.put("/update/:id", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Updated Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ------------------ DELETE ------------------ */
app.delete("/delete/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ------------------ Server Start ------------------ */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});