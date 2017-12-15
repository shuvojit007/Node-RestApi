const express = require('express');
const router = require('express-promise-router')();
const UserController = require('../controllers/users');
const { validateParam, validateBody, schemas } = require('../helpers/routerHelpers');

router.route('/')
    .get(UserController.index)
    .post(validateBody(schemas.userSchema), UserController.newUser);

router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), UserController.getUser)
    .put([validateParam(schemas.idSchema, 'userId'),
            validateBody(schemas.userSchema)
        ],
        UserController.replaceUser)
    .patch([validateParam(schemas.idSchema, 'userId'),
        validateBody(schemas.userOptionalSchema)
    ], UserController.updateUser)
    .delete(UserController.removeUser);

router.route('/:userId/cars')
    .get(validateParam(schemas.idSchema, 'userId'), UserController.getUserCars)
    .post([validateParam(schemas.idSchema, 'userId'),
        validateBody(schemas.usercarSchema)
    ], UserController.newUserCar)

module.exports = router;