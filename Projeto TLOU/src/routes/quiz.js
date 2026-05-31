var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/salvar", function (req, res) {
    quizController.salvar(req, res);
});

router.get("/ultimas", function (req, res) {
    quizController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real", function (req, res) {
    quizController.buscarMedidasEmTempoReal(req, res);
});

module.exports = router;
