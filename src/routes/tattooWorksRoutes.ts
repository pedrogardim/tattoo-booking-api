import express from "express";
import {
  getTattooWorkById,
  getTattooWorks,
  createTattooWork,
  updateTattooWork,
  deleteTattooWork,
  getMyTattooWorks,
  getMyTattooWorkById,
  createMyTattooWork,
  updateMyTattooWork,
  deleteMyTattooWork,
} from "../controllers/tattooWorksControllers";
import { asyncWrapper } from "../utils/wrappers";
import { roleCheck } from "../middleware/roleCheck";

const router = express.Router();

//User - Tattooist CRUD

const tattooistRouter = express.Router();
tattooistRouter.use(roleCheck("tattooist"));
//TODO

tattooistRouter.get("/", asyncWrapper(getMyTattooWorks));
tattooistRouter.get("/:id", asyncWrapper(getMyTattooWorkById));
tattooistRouter.post("/", asyncWrapper(createMyTattooWork));
tattooistRouter.put("/:id", asyncWrapper(updateMyTattooWork));
tattooistRouter.delete("/:id", asyncWrapper(deleteMyTattooWork));

//Admin CRUD
const adminRouter = express.Router();
adminRouter.use(roleCheck("super_admin"));

adminRouter.get("/", asyncWrapper(getTattooWorks));
adminRouter.get("/:id", asyncWrapper(getTattooWorkById));
adminRouter.post("/", asyncWrapper(createTattooWork));
adminRouter.put("/:id", asyncWrapper(updateTattooWork));
adminRouter.delete("/:id", asyncWrapper(deleteTattooWork));

router.use("/my/", tattooistRouter);
router.use("/", adminRouter);

export default router;
