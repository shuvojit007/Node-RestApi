const Car = require('../models/car');
const User = require('../models/user');

module.exports = {
    index: async(req, res) => {
        //Get all Cars
        const car = await Car.find({});
        res.status(200).json(car);
    },
    //Valditaion : Done 
    newCar: async(req, res) => {
        //Find the acutal seller 
        const seller = await User.findById(req.value.body.seller)
        const newCar = req.value.body;
        delete newCar.seller;
        const car = new Car(newCar);
        car.seller = seller;
        await car.save();

        //add newly created car to actual seller
        seller.cars.push(car)
        await seller.save()

        //we are done 
        res.status(200).json(car)
    },
    // Validation: Done
    getCar: async(req, res) => {
        // old way = > req.params.userId
        //new way => req.value.params.userId //validate id
        const car = await Car.findById(req.value.params.carId).populate("seller");
        res.send(car)
    },
    // Validation: Done
    replaceCar: async(req, res) => {
        const car = await Car
            .findByIdAndUpdate(
                req.value.params.carId,
                req.value.body)
        res.status(200).json({ sucess: true });
    },
    // Validation: Done
    updateCar: async(req, res) => {
        const car = await Car
            .findByIdAndUpdate(
                req.value.params.carId,
                req.value.body)
        res.status(200).json({ sucess: true });
    },

    deleteCar: async(req, res) => {
        const car = await Car.findById(req.value.params.carId);
        if (!car) {
            //we use to retun break the method
            //otherwise its throw a error like :-
            //Error: Can't set headers after they are sent.
            return res.status(404).json({ error: "Car doesn\'t exist" })
        }
        const sellerId = car.seller;
        const seller = await User.findById(sellerId);
        await car.remove();
        seller.cars.pull(car);
        await seller.save();
        res.status(200).json({ seucess: true });
    }

}