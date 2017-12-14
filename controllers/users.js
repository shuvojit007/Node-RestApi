const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
    // Validation: Done
    index: async(req, res) => {
        const users = await User.find({});
        res.status(200).json(users);
    },
    // Validation: Done
    newUser: async(req, res) => {
        const newUser = new User(req.value.body);
        const user = await newUser.save();
        res.status(201).json(user);
    },
    // Validation: Done
    getUser: async(req, res) => {
        // old way = > req.params.userId
        //new way => req.value.params.userId //validate id
        const user = await User.findById(req.value.params.userId);
        res.send(user)
    },
    // Validation: Done
    replaceUser: async(req, res) => {
        const newUser = req.value.body;
        const user = await User.findByIdAndUpdate(req.value.params.userId, newUser)
        res.status(200).json({ success: true });
    },
    // Validation: Done
    updateUser: async(req, res) => {
        const newUser = req.value.body;
        const user = await User.findByIdAndUpdate(req.value.params.userId, newUser)
        res.status(200).json({ success: true });
    },
    removeUser: async(req, res) => {
        const user = await User.findByIdAndRemove(req.params.userId)
        res.status(200).json({ success: true });
    },
    // Validation: Done
    getUserCars: async(req, res) => {
        const user = await User.findById(req.value.params.userId).populate("cars");
        console.log('user', user);
        res.send(user.cars);
    },
    // Validation: Done
    newUserCar: async(req, res) => {
        const newCar = new Car(req.value.body);
        //get a user
        const user = await User.findById(req.value.params.userId);
        //Assign user as a car seller
        newCar.seller = user;
        await newCar.save();
        //Add the car to the user selling array 'cars'
        user.cars.push(newCar);
        await user.save();
        res.status(201).json(newCar);
    }

}

/*
We can interact mongoose in 3 dffrn ways:
1. Callbacks
2. Promises
3. Asyns.Await (to use this wee need to update the node to v7)
*/