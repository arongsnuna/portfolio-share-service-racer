import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router();

awardRouter.get("/award", login_required, async function (req, res, next) {
  res.json("테스트입니다.", req.params.user_id);
});

awardRouter.get("/award/:user_id", async function (req, res, next) {
  const { user_id } = req.params;
  try {
    const awards = await awardService.findAll({ user_id });
    res.status(200).json(awards);
  } catch (error) {
    next(error);
  }
});

awardRouter.post("/award/:user_id", async (req, res, next) => {
  const { user_id } = req.params;
  const { newAward } = req.body;
  try {
    const updatedUser = await awardService.createAward({ user_id, newAward });
  } catch (error) {
    next(error);
  }
});

awardRouter.patch("/award/:user_id/:award_id", async (req, res, next) => {
  const { user_id, award_id } = req.params;
  const { fieldToUpdate, newValue } = req.body;
  try {
    const updatedAward = await awardService.updateAward({ user_id, award_id, fieldToUpdate, newValue});
    res.status(200).json(updatedAward);
  } catch (error) {
    next(error)
  }
})

awardRouter.delete("/award/:user_id/:award_id", async (req, res, next) => {
  const { user_id, award_id } = req.params;
  try {
    const deletedAward = await awardService.deleteAward({ user_id, award_id });
    res.status(200).json(deletedAward);
  } catch (error) {
    next(error)
  }
});

export { awardRouter };
