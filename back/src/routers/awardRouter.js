import { Router } from "express";
import { awardService } from "../services/awardService";

const awardRouter = Router();

//전체 수상내역 조회
awardRouter.get("/:user_id", async function (req, res, next) {
  const { user_id } = req.params;

  try {
    const awards = await awardService.findAll({ user_id });
    res.status(200).json(awards);
  } catch (error) {
    next(error);
  }
});

//수상내역 추가
awardRouter.post("/:user_id", async (req, res, next) => {
  const { user_id } = req.params;
  const { awardName, awardDate, awardInstitution, awardDescription } = req.body;
  const newAward = { awardName, awardDate, awardInstitution, awardDescription };

  if (!awardName || !awardDate || !awardInstitution || !awardDescription) {
    return res.status(400).json({ message: "awardName, awardDate, awardInstitution, awardDescription 이 모두 입력되었는지 확인하세요." });
  }

  try {
    const updatedUser = await awardService.createAward({ user_id, newAward });
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});


//수상내역 수정
awardRouter.put("/:user_id/:awardId", async (req, res, next) => {
  const { user_id, awardId } = req.params;
  const { awardName, awardDate, awardInstitution, awardDescription } = req.body;
  const newAward = { awardName, awardDate, awardInstitution, awardDescription }; 

  if (!awardName || !awardDate || !awardInstitution || !awardDescription) {
    return res.status(400).json({ message: "awardName, awardDate, awardInstitution, awardDescription 이 모두 입력되었는지 확인하세요." });
  }

  
  try {
    const updatedAward = await awardService.updateAward({ user_id, awardId, newAward });
    res.status(200).json(updatedAward);
  } catch (error) {
    next(error)
  }
});

//수상내역 삭제
awardRouter.delete("/:user_id/:awardId", async (req, res, next) => {
  const { user_id, awardId } = req.params;
  try {
    const deletedAward = await awardService.deleteAward({ user_id, awardId });
    res.status(200).json(deletedAward);
  } catch (error) {
    next(error)
  }
});

export { awardRouter };