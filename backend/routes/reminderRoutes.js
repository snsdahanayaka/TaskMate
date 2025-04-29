const express = require("express");
const Reminder = require("../models/Reminder");

const router = express.Router();

// Add a new reminder
router.post("/add", async(req, res) => {
    try {
        const { text, date, time } = req.body;

        // Check if required fields are missing
        if (!text || !date || !time) {
            return res
                .status(400)
                .json({ error: "All fields (text, date, time) are required" });
        }

        const newReminder = new Reminder({ text, date, time });
        const savedReminder = await newReminder.save();

        res.status(201).json({
            success: true,
            message: "Reminder created successfully",
            reminder: savedReminder,
        });
    } catch (error) {
        console.error("Error adding reminder:", error);
        res.status(500).json({ error: error.message });
    }
});



// Get all reminders
router.get("/view", async(req, res) => {
    try {
        const reminders = await Reminder.find();
        const now = new Date();

        const updatedReminders = reminders.map((reminder) => {
            const reminderDateTime = new Date(`${reminder.date} ${reminder.time}`);
            if (reminder.status !== "completed") {
                reminder.status = reminderDateTime < now ? "missed" : "upcoming";
            }
            return reminder;
        });

        res.status(200).json({ success: true, reminders: updatedReminders });
    } catch (error) {
        console.error("Error retrieving reminders:", error);
        res.status(500).json({ error: "Failed to retrieve reminders" });
    }
});

// Get a reminder by ID
router.get("/get/:id", async(req, res) => {
    try {
        const reminder = await Reminder.findById(req.params.id);
        if (!reminder) {
            return res
                .status(404)
                .json({ success: false, message: "Reminder not found" });
        }
        res.status(200).json({ success: true, reminder });
    } catch (error) {
        console.error("Error retrieving reminder:", error);
        res.status(500).json({ error: "Failed to retrieve reminder" });
    }
});

// Get reminders by date
router.get("/get/date/:date", async(req, res) => {
    try {
        const reminders = await Reminder.find({ date: req.params.date });
        if (reminders.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No reminders found for this date" });
        }
        res.status(200).json({ success: true, reminders });
    } catch (error) {
        console.error("Error retrieving reminders:", error);
        res.status(500).json({ error: "Failed to retrieve reminders" });
    }
});
// Update a reminder by ID
router.put("/update/:id", async(req, res) => {
    try {
        const updatedReminder = await Reminder.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );
        if (!updatedReminder) {
            return res
                .status(404)
                .json({ success: false, message: "Reminder not found" });
        }
        res
            .status(200)
            .json({ success: true, message: "Reminder updated", updatedReminder });
    } catch (error) {
        res.status(500).json({ error: "Failed to update reminder" });
    }
});

// Delete a reminder by ID
router.delete("/delete/:id", async(req, res) => {
    try {
        const deletedReminder = await Reminder.findByIdAndDelete(req.params.id);
        if (!deletedReminder) {
            return res
                .status(404)
                .json({ success: false, message: "Reminder not found" });
        }
        res.status(200).json({ success: true, message: "Reminder deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete reminder" });
    }
});

module.exports = router;