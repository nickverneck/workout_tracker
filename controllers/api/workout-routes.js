const router = require('express').Router();
const { Workout } = require('../../models');

router.post("/workouts", async (req, res) => {
    try {
        const workoutData = await Workout.create({});
        res.status(200).json(workoutData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/workouts/:id", async (req, res) => {
    try {
        const workoutData = await Workout.findByIdAndUpdate(
            req.params.id,
            { $push: { exercises : req.body } },
            { new: true }
        );
        res.status(200).json(workoutData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/workouts", async (req, res) => {
    try {
        const workoutData = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration'
                    },
                },
            },
        ])
        res.status(200).json(workoutData)
    } catch (err) {
        res.status(500).json(err)
    }
});


router.get("/workouts/range", async (req, res) => {
    try {
        const workoutData = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration'
                    },
                },
            },
        ])
        .sort({ _id: -1 })
        .limit(7);
        res.status(200).json(workoutData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});


router.delete("/workouts", async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.body);
        res.status(200).json(true)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;