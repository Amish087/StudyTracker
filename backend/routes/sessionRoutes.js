import express from "express";
import Session from "../models/sessionModel.js";

const router = express.Router();

// Get all sessions (optionally filter by subject or date range)
router.get("/", async (req, res) => {
  try {
    const { subject, from, to } = req.query;
    const query = {};
    if (subject) query.subject = subject;
    if (from || to) query.date = {};
    if (from) query.date.$gte = from;
    if (to) query.date.$lte = to;

    const sessions = await Session.find(query).sort({ date: 1 });
    res.json(sessions);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json(session);
  } catch (e) {
    res.status(400).json({ error: "Invalid session data" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    await Session.findByIdAndDelete(req.params.id);
    res.json({ message: "Session deleted" });
  } catch (e) {
    res.status(500).json({ error: "Failed to delete session" });
  }
});

// Update (optional)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Session.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: "Failed to update session" });
  }
});

export default router;
