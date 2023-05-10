const express = require("express");
const router = express();
const stateController = require("../../controller/stateController");

router.route("/").get(stateController.GetStates);

router.route("/:state").get(stateController.GetState);

router.route("/:state/funfact")
      .get(stateController.GetStateFunfact)
      .post(stateController.CreateNewFunfact)
      .patch(stateController.PatchFunfact)
      .delete(stateController.DeleteFunfact);

router.route("/:state/capital")
      .get(stateController.GetStateCapital)

router.route("/:state/nickname")
      .get(stateController.GetStateNickname)

router.route("/:state/population")
      .get(stateController.GetStatePopulation)
    
router.route("/:state/admission")
      .get(stateController.GetStateAdmission)

module.exports = router;