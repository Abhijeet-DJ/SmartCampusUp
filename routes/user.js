const { Router } = require("express");
const mongoose = require('mongoose');
const Bell = require("../models/bell_data");
const NPK = require("../models/NPK")
const { handleSignIn, handleLogIn, handleSignUp, handleUserCreation } = require("../controllers/user");
const Student = require("../models/student");
const pumpStatus = require("../models/pumpStatus");
const bellStatus = require("../models/bell_status");
const Event = require("../models/event_data");

const routes = Router();

routes.get("/", (req, res) => {
    res.render("Home_html", {
        user: req.user,
        bell_Data: Bell,
        Attendance_data: Student,
    });
});

// routes.get("/attendance",(req,res)=>{
//     res.render("");
// });


routes.get("/signin", handleSignIn);

routes.post("/signin", handleLogIn);

routes.get("/signup", handleSignUp);

routes.post("/signup", handleUserCreation);

routes.get("/addBell", (req, res) => {
    res.render("addBell");
});
routes.get("/addEvent", (req, res) => {
    res.render("addEvent");
});


routes.post("/api/Bell_data", async (req, res) => {
    const { bellName, bellTime, bellFrequency, bellDate } = req.body;
    const newBell = new Bell({
        bell_Name: bellName,
        bell_Time: bellTime,
        bell_Frequency: bellFrequency,
        bell_Date: bellDate,
        createdBy: req.user._id,
    });
    await newBell.save();
    res.render("addBell");
});

routes.post("/api/Event_data", async (req, res) => {
    const { eventName, eventStartTime,eventEndTime, bellDate } = req.body;
    const newBell = new Bell({
        event_Name: eventName,
        bell_StartTime: eventStartTime,
        bell_EndTime: eventEndTime,
        bell_Date: bellDate,
        createdBy: req.user._id,
    });
    await newBell.save();
    res.render("addEvent");
});


routes.get("/api/Bell_data/", async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            console.error("User ID is not available");
            return res.status(400).json({ message: "User ID is required" });
        }

        const userId = req.user._id;
        const objectId = new mongoose.Types.ObjectId(userId);

        let data = await Bell.find({ createdBy: objectId });

        // If no data is found, create a new default record
        if (!data || data.length === 0) {
            console.log("No data found for this user, creating a new entry...");

            const newBell = new Bell({
                createdBy: userId,  // Set createdBy field
                bell_Frequency: "Monday",  // Default values (adjust as needed)
                bell_Time: ["08:00"], 
            });

            await newBell.save();
            data = [newBell]; // Return the newly created data
        }

        res.json(data);
    } catch (error) {
        console.error("Error fetching or creating data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


routes.put('/api/Bell_data/:id', async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const updatedBell = await Bell.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBell) {
            return res.status(404).json({ message: 'Bell not found' });
        }
        res.json(updatedBell);
    } catch (error) {
        console.error('Error updating bell:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

routes.delete('/api/bell_data/:id', async (req, res) => {   

    try {

        const deletedBell = await Bell.findByIdAndDelete(req.params.id);
        if (!deletedBell) {
            return res.status(404).json({ message: 'Bell not found' });
        }
        res.json(deletedBell);
    } catch (error) {
        console.error('Error deleting bell:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
);
routes.delete('/api/Event_data/:id', async (req, res) => {   

    try {

        const deletedBell = await Bell.findByIdAndDelete(req.params.id);
        if (!deletedBell) {
            return res.status(404).json({ message: 'Bell not found' });
        }
        res.json(deletedBell);
    } catch (error) {
        console.error('Error deleting bell:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
);

routes.get("/api/pumpStatus", async (req, res) => {
    const currentStat=req.query.status
    if (!currentStat) {
        try {
            const pumpStat = await pumpStatus.find({});
            // const statuses = pumpStat.map(doc => doc.Status);
            const status = pumpStat[0].Status
            res.json(status);
        } catch (error) {
            console.error('Error fetching pump status:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    else if(currentStat){
        try { 
            const newStatus = req.query.status; 
            if (newStatus) { 
            await pumpStatus.findOneAndUpdate({}, { Status: newStatus }); 
            res.json({ message: 'Pump status updated successfully' }); 
            } 
            else { 
                const pumpStat = await pumpStatus.find({}); 
                const status = pumpStat[0].Status; 
                res.json(status);
                } 
            } 
                catch (error) { console.error('Error handling pump status:', error); res.status(500).json({ error: 'Internal Server Error' }); }
    }
});

routes.get("/api/Bell_data/status", async (req, res) => {
    try {
        const currentStat = req.query.status;
        let bellStat = await bellStatus.findOne({}); // Fetch the first document
        console.log("Bell status from routes : ",bellStat);

        // If no document exists, create one with a default status
        if (!bellStat) {
            bellStat = await bellStatus.create({ Status: 0 }); // Change "default" to your desired initial value
        }

        if (!currentStat) {
            res.json(bellStat.Status); // Return the current status
        } else {
            // Update the status if a new value is provided
            await bellStatus.findOneAndUpdate({}, { Status: currentStat });
            res.json({ message: 'Bell status updated successfully' });
        }
    } catch (error) {
        console.error('Error handling bell status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

routes.get("/api/NPK_data", async (req, res) => {
    const currentStat = req.query;
    
    if (!currentStat) {    
        try {
            const npkStat = await NPK.find({});
            console.log(npkStat);
            res.json(npkStat);
        } catch (error) {
            console.error('Error fetching NPK status:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    else if(currentStat){
        try { 
            const newStatus = req.query;
             
            if (newStatus) { 
                const data = [];
                const dataVal = await NPK.findOneAndUpdate({}, { N_Val: newStatus.N_Val, P_Val: newStatus.P_Val, K_Val: newStatus.K_Val, moistureLevel: newStatus.moistureLevel, soilTemperature: newStatus.soilTemperature, PH_Level: newStatus.PH_Level },{ upsert: true }); 
                data.push(dataVal);
            
            res.json({ message: 'NPK status updated successfully',
                data
            }); 

            } 
            else { 
                const npkStat = await NPK.find({}); 
                res.json(npkStat);
                } 
            } 
                catch (error) { console.error('Error handling pump status:', error); res.status(500).json({ error: 'Internal Server Error' }); }
    }

});


routes.get("/api/Event_data/", async (req, res) => {

    try {
        if (!req.user || !req.user._id) {
            console.error('User ID is not available');
            return res.status(400).json({ message: 'User ID is required' });
        }
        const Id = req.user._id; 
        // console.log('User ID:', Id);
        const objectId = new mongoose.Types.ObjectId(Id);

        const data = await Event.find({ createdBy: objectId });

        if (!data || data.length === 0) {
            console.log('No data found for this user');
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(data);
        // console.log('The bells are:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = routes; 