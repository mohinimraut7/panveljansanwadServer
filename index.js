require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); // ✅ Fix SRV DNS issue

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const addUserRoutes = require("./routes/user");
const revenueRoutes = require("./routes/revenue");
const InwardApplicationRoutes = require("./routes/InwardApplication");
const availabilityRoutes=require("./routes/Availability");
const citizenRoutes = require("./routes/Citizen");

// uploads folder serve करण्यासाठी:
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use("/uploads/excel", express.static(path.join(process.cwd(), "uploads/excel")));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas PanvelJansanwad connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

app.use("/api", addUserRoutes);
app.use("/api", revenueRoutes);
app.use("/api", InwardApplicationRoutes);
app.use("/api",availabilityRoutes)
app.use("/api/citizen", citizenRoutes);



app.get("/", (req, res) => {
  res.send("Hello world....");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
