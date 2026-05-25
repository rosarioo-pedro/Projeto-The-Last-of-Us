var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/salvar", function (req, res) {
    quizController.salvar(req, res);
});

router.get("/metricas", function (req, res) {
    quizController.obterMetricas(req, res);
});

module.exports = router;
