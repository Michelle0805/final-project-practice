const { DailyNutrition } = require("../../models");
const { RequestError } = require("../../helpers");

const removeMeal = async (req, res) => {
  const { mealId } = req.params;
  console.log(mealId);

  const result = await DailyNutrition.findByIdAndDelete(mealId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: "Meal deleted" });
}

module.exports = removeMeal;
