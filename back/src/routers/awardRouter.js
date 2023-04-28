import { Router } from "express";
import { awardService } from "../services/awardService";

const awardRouter = Router();

//전체 수상내역 조회
awardRouter.get("/:userId", async function (req, res, next) {
  const { userId } = req.params;

  try {
    const awards = await awardService.findAll({ userId });
    res.status(200).json(awards);
  } catch (error) {
    next(error);
  }
});

//수상내역 추가
awardRouter.post("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const { awardName, awardDate, awardInstitution, awardDescription } = req.body;
  const newAward = { awardName, awardDate, awardInstitution, awardDescription };

  if (!awardName || !awardDate || !awardInstitution || !awardDescription) {
    return res.status(400).json({ message: "awardName, awardDate, awardInstitution, awardDescription 이 모두 입력되었는지 확인하세요." });
  }

  try {
    const updatedUser = await awardService.createAward({ userId, newAward });
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});


//수상내역 수정
awardRouter.put("/:userId/:awardId", async (req, res, next) => {
  const { userId, awardId } = req.params;
  const { awardName, awardDate, awardInstitution, awardDescription } = req.body;
  const newAward = { awardName, awardDate, awardInstitution, awardDescription }; 

  if (!awardName || !awardDate || !awardInstitution || !awardDescription) {
    return res.status(400).json({ message: "awardName, awardDate, awardInstitution, awardDescription 이 모두 입력되었는지 확인하세요." });
  }

  
  try {
    const updatedAward = await awardService.updateAward({ userId, awardId, newAward });
    res.status(200).json(updatedAward);
  } catch (error) {
    next(error)
  }
});

//수상내역 삭제
awardRouter.delete("/:userId/:awardId", async (req, res, next) => {
  const { userId, awardId } = req.params;
  try {
    const deletedAward = await awardService.deleteAward({ userId, awardId });
    res.status(200).json(deletedAward);
  } catch (error) {
    next(error)
  }
});

export { awardRouter };