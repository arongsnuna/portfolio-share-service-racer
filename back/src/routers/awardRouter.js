import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router();

//전체 수상내역 조회
awardRouter.get("/award/:user_id", login_required, async function (req, res, next) {
  const { user_id } = req.params;
  try {
    const awards = await awardService.findAll({ user_id });
    res.status(200).json(awards);
  } catch (error) {
    next(error);
  }
});

//수상내역 추가
awardRouter.post("/award/:user_id", login_required, async (req, res, next) => {
  const { user_id } = req.params;
  const { awardName, awardDate, awardInstitution, awardDescription } = req.body;

  if (!awardName || !awardDate || !awardInstitution || !awardDescription) {
    return res.status(400).json({ message: "awardName, awardDate, awardInstitution, awardDescription 이 모두 입력되었는지 확인하세요." });
  }

  const newAward = { awardName, awardDate, awardInstitution, awardDescription };

  try {
    const updatedUser = await awardService.createAward({ user_id, newAward });
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});


//수상내역 수정
awardRouter.patch("/award/:user_id/:award_id", login_required, async (req, res, next) => {
  const { user_id, award_id } = req.params;
  const { awardName, awardDate, awardInstitution, awardDescription } = req.body;

  if (!awardName || !awardDate || !awardInstitution || !awardDescription) {
    return res.status(400).json({ message: "awardName, awardDate, awardInstitution, awardDescription 이 모두 입력되었는지 확인하세요." });
  }

  const revisedAward = { awardName, awardDate, awardInstitution, awardDescription }; 

  try {
    const updatedAward = await awardService.updateAward({ user_id, award_id, revisedAward });
    res.status(200).json(updatedAward);
  } catch (error) {
    next(error)
  }
});

//수상내역 삭제
awardRouter.delete("/award/:user_id/:award_id", login_required, async (req, res, next) => {
  const { user_id, award_id } = req.params;
  try {
    const deletedAward = await awardService.deleteAward({ user_id, award_id });
    res.status(200).json(deletedAward);
  } catch (error) {
    next(error)
  }
});

export { awardRouter };