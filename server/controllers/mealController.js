const { Meal } = require('../models')
const moment = require('moment')

const mealController = {
    getMeals(req, res) {
        Meal.find()
            .select('-__v')
            .sort({ date: 1 })
            .populate(
                [
                    {
                        path: 'breakfast',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    },
                    {
                        path: 'breakfast',
                        populate: {
                            path: 'recipes',
                            populate: {
                                path: 'recipeId',
                                model: 'Recipe'
                            }
                        }
                    },
                    {
                        path: 'lunch',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    },
                    {
                        path: 'lunch',
                        populate: {
                            path: 'recipes',
                            populate: {
                                path: 'recipeId',
                                model: 'Recipe'
                            }
                        }
                    },
                    {
                        path: 'dinner',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    },
                    {
                        path: 'dinner',
                        populate: {
                            path: 'recipes',
                            populate: {
                                path: 'recipeId',
                                model: 'Recipe'
                            }
                        }
                    },
                    {
                        path: 'snacks',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    },
                    {
                        path: 'snacks',
                        populate: {
                            path: 'recipes',
                            populate: {
                                path: 'recipeId',
                                model: 'Recipe'
                            }
                        }
                    }
                ]
            )
            .then((dbMealData) => {
                res.json(dbMealData)
            })
            .catch((err) => {
                console.log(err)
                res.json(500).json(err)
            })
    },
    getMealByDate(req, res) {
        //Need to search for the date only not time
        console.log(moment().format(moment().format('L')))
        const today = moment().startOf('day')
        Meal.findOne({
            date: {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate()
            }
        })
            .select('-__v')
            .populate(
                [
                    {
                        path: 'breakfast',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    },
                    {
                        path: 'breakfast',
                        populate: {
                            path: 'recipes',
                            populate: {
                                path: 'recipeId',
                                model: 'Recipe'
                            }
                        }
                    },
                    {
                        path: 'lunch',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    },
                    {
                        path: 'lunch',
                        populate: {
                            path: 'recipes',
                            populate: {
                                path: 'recipeId',
                                model: 'Recipe'
                            }
                        }
                    },
                    {
                        path: 'dinner',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    },
                    {
                        path: 'dinner',
                        populate: {
                            path: 'recipes',
                            populate: {
                                path: 'recipeId',
                                model: 'Recipe'
                            }
                        }
                    },
                    {
                        path: 'snacks',
                        populate: {
                            path: 'ingredients',
                            populate: {
                                path: 'foodId',
                                model: 'Food'
                            }
                        }
                    },
                    {
                        path: 'snacks',
                        populate: {
                            path: 'recipes',
                            populate: {
                                path: 'recipeId',
                                model: 'Recipe'
                            }
                        }
                    }
                ]
            )
            .then((dbMealData) => {
                console.log(dbMealData)
                res.json(dbMealData)
            })
            .catch((err) => {
                console.log(err)
                res.json(500).json(err)
            })
    },
    createMeal(req, res) {
        const date = moment(req.body.date).format()
        // can this be updated to like the get above
        Meal.findOne({ date })
            .then((foundMeal) => {
                console.log(foundMeal)
                if (foundMeal) {
                    res.json({ success: false, message: 'matching meal plan date' });
                } else {
                    Meal.create(req.body)
                        .then((dbMealData) => {
                            res.json({ success: true, ...dbMealData })
                        })
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }
}

module.exports = mealController