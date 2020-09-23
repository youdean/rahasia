import express from 'express';
import fs from 'fs';
export const router = express.Router();

import rootScopeModule from './../rootScope.js';
var rootScope = rootScopeModule.rootScope;
import MathExpressionBAC from './../MathExpressionBAC.js';
import ParameterBuilder from './../ParameterBuilder.js';

var writeStream;



/**
 * @swagger
 * /getPremi:
 *   post:
 *     description: Get Premi and Validation From ME
 *     tags:
 *       - getPremi
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: getPremi
 *         description: GET PREMI
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: get premi
 */
router.post('/getPremi', (req, res, next) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        rootScope = rootScopeModule.rootScope;
        console.log('rootscope ' + rootScope.INPUT);
        MathExpressionBAC.setRootScope(rootScope)
        // var tmpReq = JSON.parse(req.body.param);
        var tmpReq = req.body;
        writeStream = fs.createWriteStream( "./log/" + tmpReq.policyNumber + '_log.json');

        // writeStreamBody = fs.createWriteStream(__basedir + "/log/" + tmpReq.policyNumber + new Date().getMilliseconds().toString() + '_request.json');
        // writeStreamBody.write(req.body.param);
        // writeStrea8mBody.end();

        // writeStreamBodyA = fs.createWriteStream(__basedir + "/log/" + tmpReq.policyNumber + '_request_afterAlterPrep.json');
        // writeStreamBodyErr = fs.createWriteStream(__basedir + "/log/" + tmpReq.policyNumber + '_error.log');

        var coverageCdList = [];
        var req = MathExpressionBAC.reMappingCode(tmpReq, coverageCdList);

        rootScope.RATE = rootScope.RATEDETAIL;

        try {
            var response = MathExpressionBAC.getUnappliedPremium(req, "flagHitung", undefined);
            writeStream.end();
            // writeStreamBodyA.end();
            // writeStreamBodyErr.end();
            res.send(response);
        } catch (e) {
            writeToConsole("EVAL ERROR : " + e.message + "\r\n" + e.stack);
            res.send("Error 500: " + e.message + "\r\n" + e.stack);
        }


    } catch (e) {
        writeToConsole("EVAL ERROR : " + e.message + "\r\n" + e.stack);
        res.send("Error 500: " + e.message + "\r\n" + e.stack);
    }
});

/**
 * @swagger
 * /calculate:
 *   post:
 *     description: get calculation from ME
 *     tags:
 *       - calculate
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: calculate
 *         description: calculation
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: hasil calculate
 */
router.post('/calculate', (req, res, next) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        rootScope = rootScopeModule.rootScope;
        MathExpressionBAC.setRootScope(rootScope);
        // var tmpReq = JSON.parse(req.body.param);
        var tmpReq = req.body;
        // writeStream = fs.createWriteStream( "./log/" + tmpReq.policyNumber + 'calculate_error.log');

        let paramProcessIllustration = req.body;
        // writeStream = fs.createWriteStream('testSCB.txt');
        writeStream = fs.createWriteStream("./log/" + tmpReq.prodCd + '_log.json');
        var coverageCdList = [];
        var req = MathExpressionBAC.reMappingCode(paramProcessIllustration, coverageCdList);

        rootScope.RATE = rootScope.RATEDETAIL;

        try {
            var response = MathExpressionBAC.processIlustration(paramProcessIllustration, 0);
            writeStream.end();
            // writeStreamBodyErr.end();
            res.send(response);
        } catch (e) {
            writeToConsole("EVAL ERROR : " + e.message + "\r\n" + e.stack);
            res.send("Error 500: " + e.message + "\r\n" + e.stack);
        }
    } catch (e) {
        writeToConsole("EVAL ERROR : " + e.message + "\r\n" + e.stack);
        res.send("Error 500: " + e.message + "\r\n" + e.stack);
    }
});

/**
 * @swagger
 * /generateParam:
 *   post:
 *     description: Get Param from input
 *     tags:
 *       - generateParam
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: channelCode
 *         description: Kode channel
 *         in: formData
 *         required: false
 *         type: string
 *       - name: prodCd
 *         description: Kode produk
 *         in: formData
 *         required: false
 *         type: string
 *       - name: currCd
 *         description: Kode Currency
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: menampilkan parameter
 */
router.post('/generateParam', (req, res, next) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        rootScope = rootScopeModule.rootScope;
        req = req.body;
        try {
            var response = ParameterBuilder.getParameter(req);
            res.send(response);
        } catch (e) {
            writeToConsole("EVAL ERROR : " + e.message + "\r\n" + e.stack);
            res.send("Error 500: " + e.message + "\r\n" + e.stack);
        }


    } catch (e) {
        writeToConsole("EVAL ERROR : " + e.message + "\r\n" + e.stack);
        res.send("Error 500: " + e.message + "\r\n" + e.stack);
    }
});

function writeToLogFile(log) {
    writeStream.write(JSON.stringify(log, null, "\t") + "\n");
}

function writeToConsole(log) {
    console.log(log);
    writeStreamBodyErr.write(log.toString());
}

function parseToLogFile(paramMap, ITEM, tmpFormula, stringFormulaOri, stringFormula, stringFormulaAlt, description,
    result, resultAlternativeAsumtion, formula, logFile) {
    var log = {};
    log.desc = description;
    log.year = paramMap.year;
    log.item_code = ITEM.code != undefined ? ITEM.code : ITEM.coverage;
    log.item_type = tmpFormula.itemType.toUpperCase();
    log.coverage = ITEM.coverageCode;
    log.formula_code = tmpFormula.formulaCd;
    log.formula_asli = stringFormulaOri;
    log.formula_client = stringFormula;
    log.formula_alt = stringFormulaAlt;
    log.hasil_client = result;
    log.hasil_alt = resultAlternativeAsumtion;
    log.formula_type = formula.formulaTypeCd;
    log.output = tmpFormula.output;

    writeToLogFile(log);
}

export default {
    parseToLogFile
};