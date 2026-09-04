import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const tour = {
  id: "heritage-demo",
  title: "Heritage Virtual Tour",
  slug: "heritage-demo",
  description: "Matterport-style interactive virtual tour demo",
  rooms: [
    {
      id: "courtyard",
      name: "Courtyard",
      description: "Historic courtyard",
      panoramaUrl: "/panoramas/courtyard.png",
      sortOrder: 1,
      hotspots: [
        {
          id: "hotspot-1",
          label: "Go to Entrance",
          x: 5,
          y: 0,
          z: -7,
          targetRoomId: "entrance"
        }
      ]
    },
    {
      id: "entrance",
      name: "Entrance",
      description: "Main entrance",
      panoramaUrl: "/panoramas/entrance.png",
      sortOrder: 2,
      hotspots: [
        {
          id: "hotspot-2",
          label: "Go to Courtyard",
          x: -5,
          y: 0,
          z: -7,
          targetRoomId: "courtyard"
        },
        {
          id: "hotspot-3",
          label: "Go to Garden",
          x: 6,
          y: 0,
          z: -5,
          targetRoomId: "garden"
        }
      ]
    },
    {
      id: "garden",
      name: "Garden",
      description: "Beautiful garden area",
      panoramaUrl: "/panoramas/garden.png",
      sortOrder: 3,
      hotspots: [
        {
          id: "hotspot-4",
          label: "Go to Entrance",
          x: -6,
          y: 0,
          z: -6,
          targetRoomId: "entrance"
        }
      ]
    }
  ]
};

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running"
  });
});

app.get("/api/tours/:slug", (req, res) => {
  if (req.params.slug !== tour.slug) {
    return res.status(404).json({
      message: "Tour not found"
    });
  }

  res.json(tour);
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});