const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
global.__basedir = __dirname;

var fs = require('fs');
var rootScopeModule = require(__basedir + '/rootScope');
// var rootScopeModuleScb = require(__basedir + '/rootScopeScb8');
var rootScope = rootScopeModule.rootScope;

var sourceMappingCode = require(__basedir + '/sourceMappingCode');
var mappingCode = {};

const preparation = require(__basedir + '/alterPreparation');

/////
var pg = require('pg');
var conString = "postgres://postgres:postgres@10.170.49.191:5432/newsqs";

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
/*https.createServer({
    key: fs.readFileSync(__basedir + '/key.pem'),
    cert: fs.readFileSync(__basedir + '/cert.pem'),
    passphrase: 'asdasdasd'
}, app)
.listen(3001, () => console.log('Example app listening on port 3001!'));*/

app.listen(3003, () => console.log('Example app listening on port 3001!'))

// app.listen(3003, '0.0.0.0', function() {
//     console.log('Listening to port:  ' + 3003);
// });

var writeStream;

app.get('/alteration/test', function (req, res){
	res.send("_");
});
app.post('/alteration/getPremi', function (req, res){
	try{
		rootScope = rootScopeModule.rootScope;

		var tmpReq = JSON.parse(req.body.param);
		writeStream = fs.createWriteStream(__basedir + "/log/" + tmpReq.policyNumber + '_log.json');

		//call alter preparation	
		writeStreamBody = fs.createWriteStream(__basedir + "/log/" + tmpReq.policyNumber + new Date().getMilliseconds().toString() + '_request.json');
		writeStreamBody.write(req.body.param);
		writeStreamBody.end();
		
		writeStreamBodyA = fs.createWriteStream(__basedir + "/log/" + tmpReq.policyNumber + '_request_afterAlterPrep.json');
		writeStreamBodyErr = fs.createWriteStream(__basedir + "/log/" + tmpReq.policyNumber + '_error.log');
		
		//remap code
		var coverageCdList = [];
		var req = reMappingCode(tmpReq, coverageCdList);
		
		getRateFromDB(coverageCdList, function(){
			try{
				var response = getUnappliedPremium(req, "flagHitung", undefined);
				writeStream.end();
				writeStreamBodyA.end();				
				writeStreamBodyErr.end();
				res.send(response);
			} catch(e){
				writeToConsole("EVAL ERROR : "+e.message +"\r\n"+e.stack);
				res.send("Error 500: " + e.message +"\r\n"+e.stack);
			}
		});	

	}catch(e){
		writeToConsole("EVAL ERROR : "+e.message+"\r\n"+e.stack);
		res.send("Error 500: " + e.message +"\r\n"+e.stack);
	}
})

app.post('/nb/getPremiScb', function (req, res){
	try{
		rootScope = rootScopeModuleScb.rootScope;

		var tmpReq = JSON.parse(req.body.param);
		writeStream = fs.createWriteStream(__basedir + "/log/" + tmpReq.policyNumber + '_log.json');

		//call alter preparation	
		writeStreamBody = fs.createWriteStream(__basedir + "/log/" + tmpReq.policyNumber + new Date().getMilliseconds().toString() + '_request.json');
		writeStreamBody.write(req.body.param);
		writeStreamBody.end();
		
		writeStreamBodyA = fs.createWriteStream(__basedir + "/log/" + tmpReq.policyNumber + '_request_afterAlterPrep.json');
		writeStreamBodyErr = fs.createWriteStream(__basedir + "/log/" + tmpReq.policyNumber + '_error.log');
		
		//remap code
		var coverageCdList = [];
		var req = reMappingCode(tmpReq, coverageCdList);
		
		getRateFromDB(coverageCdList, function(){
			try{
				var response = getUnappliedPremium(req, "flagHitung", undefined);
				writeStream.end();
				writeStreamBodyA.end();				
				writeStreamBodyErr.end();
				res.send(response);
			} catch(e){
				writeToConsole("EVAL ERROR : "+e.message +"\r\n"+e.stack);
				res.send("Error 500: " + e.message +"\r\n"+e.stack);
			}
		});	

	}catch(e){
		writeToConsole("EVAL ERROR : "+e.message+"\r\n"+e.stack);
		res.send("Error 500: " + e.message +"\r\n"+e.stack);
	}
})


app.post('/alteration/calculate', function (req, res){
	try{
		rootScope = rootScopeModule.rootScope;
		var tmpReq = JSON.parse(req.body.param);
		writeStreamBodyErr = fs.createWriteStream(__basedir + "/log/" + tmpReq.policyNumber + 'calculate_error.log');

		paramProcessIllustration = JSON.parse(req.body.param);
		writeStream = fs.createWriteStream('test.txt');

		//remap code
		var coverageCdList = [];
		var req = reMappingCode(paramProcessIllustration, coverageCdList);

		getRateFromDB(coverageCdList, function(){
			try{
				var response = processIlustration(paramProcessIllustration, 0);
				writeStream.end();
				writeStreamBodyErr.end();
				res.send(response);
			} catch(e){
				writeToConsole("EVAL ERROR : "+e.message +"\r\n"+e.stack);
				res.send("Error 500: " + e.message +"\r\n"+e.stack);
			}
		});	

	}catch(e){
		writeToConsole("EVAL ERROR : "+e.message +"\r\n"+e.stack);
		res.send("Error 500: " + e.message +"\r\n"+e.stack);
	}
	
});


app.post('/nb/calculateScb', function (req, res){
	try{
		rootScope = rootScopeModuleScb.rootScope;
		var tmpReq = JSON.parse(req.body.param);
		writeStreamBodyErr = fs.createWriteStream(__basedir + "/log/" + tmpReq.policyNumber + 'calculate_error.log');

		paramProcessIllustration = JSON.parse(req.body.param);
		writeStream = fs.createWriteStream('testScb.txt');

		//remap code
		var coverageCdList = [];
		var req = reMappingCode(paramProcessIllustration, coverageCdList);

		getRateFromDB(coverageCdList, function(){
			try{
				var response = processIlustration(paramProcessIllustration, 0);
				writeStream.end();
				writeStreamBodyErr.end();
				res.send(response);
			} catch(e){
				writeToConsole("EVAL ERROR : "+e.message +"\r\n"+e.stack);
				res.send("Error 500: " + e.message +"\r\n"+e.stack);
			}
		});	

	}catch(e){
		writeToConsole("EVAL ERROR : "+e.message +"\r\n"+e.stack);
		res.send("Error 500: " + e.message +"\r\n"+e.stack);
	}
	
});


function reMappingCode(param, coverageCdList){	
	var manfaatList = param.manfaatList;
	var listMappingCode = rootScope.COVERAGE_TERM;

	mappingCode = {}
	listMappingCode.forEach((code, index) => mappingCode[code.life_asia_cd] = code.coverage_cd);

	var manfaat;
	var newCode;
	var oldCode;
	for(var ii = 0; ii < manfaatList.length; ii++){
		manfaat = manfaatList[ii];		
		oldCode = manfaat.code;
		newCode = mappingCode[oldCode];

		param.manfaatList[ii].code = newCode == undefined ? oldCode : newCode;
		param.manfaatList[ii].oldCode = oldCode;
		
		coverageCdList.push("'" + param.manfaatList[ii].code + "'");
	}

	var alterationDataHist = param.alterationDataHist;
	if(alterationDataHist != undefined){
		for(var hh = 0; hh < alterationDataHist.length; hh++){
			manfaatList = alterationDataHist[hh].manfaatList;

			for(var jj = 0; jj < manfaatList.length; jj++){
				manfaat = manfaatList[jj];		
				oldCode = manfaat.code;
				newCode = mappingCode[oldCode];
		
				param.alterationDataHist[hh].manfaatList[jj].code = newCode == undefined ? oldCode : newCode;
				param.alterationDataHist[hh].manfaatList[jj].oldCode = oldCode;
				
				coverageCdList.push("'" + param.alterationDataHist[hh].manfaatList[jj].code + "'");
			}		
		}
	}
	//writeToConsole(coverageCdList);
	return param;
}

function getRateFromDB(coverageCdList, _callback){
	var coverageCdAsString = coverageCdList.join(',');

	rootScope.RATE = rootScope.RATEDETAIL;
	_callback();

	// var queryStr = "select rv.rate_cd, r.rate_type_cd, " +
	// 					" CASE WHEN rv.age_life1 IS NULL THEN ' ' " +
	// 					" 	WHEN rv.age_life1 = '' THEN ' ' " +
	// 					"	ELSE rv.age_life1 END AS age_life_1, " + 
	// 					" CASE WHEN rv.age_life2 IS NULL THEN ' '  " +
	// 					" 	WHEN rv.age_life2 = '' THEN ' ' " +
	// 					" 	ELSE rv.age_life2 END AS age_life_2, " +
	// 					" CASE WHEN rv.gender IS NULL THEN ' '  " +
	// 					" 	WHEN rv.gender = '' THEN ' ' " +
	// 					" 	ELSE rv.gender END AS gender,  " +
	// 					" CASE WHEN rv.smoker_status IS NULL THEN ' ' " + 
	// 					" 	WHEN rv.smoker_status = '' THEN ' ' " +
	// 					" 	ELSE rv.smoker_status END AS smoker_status, " + 
	// 					" CASE WHEN rv.term IS NULL THEN ' '  " +
	// 					" 	WHEN rv.term = '' THEN ' ' " +
	// 					" 	ELSE rv.term END AS term,  " +
	// 					" CASE WHEN rv.plan IS NULL THEN ' ' " + 
	// 					" 	WHEN rv.plan = '' THEN ' ' " +
	// 					" 	ELSE rv.plan END AS plan,  " +
	// 					" CASE WHEN rv.class IS NULL THEN ' ' " + 
	// 					" 	WHEN rv.class = '' THEN ' ' " +
	// 					" 	ELSE rv.class END AS clazz,  " +
	// 					" CASE WHEN rv.benefit_term IS NULL THEN ' ' " + 
	// 					" 	WHEN rv.benefit_term = '' THEN ' ' " +
	// 					" 	ELSE rv.benefit_term END AS \"benefitTerm\", " + 
	// 					" CASE WHEN rv.value IS NULL THEN ' '  " +
	// 					" 	WHEN rv.value= '' THEN ' ' " +
	// 					" 	ELSE rv.value END AS \"value\",  " +
	// 					" CASE WHEN rv.effective_date IS NULL THEN '1900-01-01' " + 	 
	// 					" 	ELSE to_char(rv.effective_date, 'YYYY-MM-DD') END AS effective_date, " + 
	// 					" CASE WHEN rv.expiry_date IS NULL THEN '1900-01-01' " +
	// 					" 	ELSE to_char(rv.expiry_date, 'YYYY-MM-DD') END AS expiry_date, " + 
	// 					" CASE WHEN rv.action IS NULL THEN ' '  " +
	// 					" 	WHEN rv.action = '' THEN ' ' " +
	// 					" 	ELSE rv.action END AS \"action\",  " +
	// 					" CASE WHEN rv.year IS NULL THEN ' '  " +
	// 					" 	WHEN rv.year = '' THEN ' ' " +
	// 					" 	ELSE rv.year END AS \"year\",  " +
	// 					" CASE WHEN rv.premium_payment_term IS NULL THEN ' ' " + 
	// 					" 	WHEN rv.premium_payment_term = '' THEN ' ' " +
	// 					" 	ELSE rv.premium_payment_term END AS premium_payment_term, " +
	// 					" rv.isdelete, rv.id  " + 
	// 					"from rate.rate_value rv " +                                                                             
	// 					"join rate.rate r on rv.rate_cd = r.cd where rv.isdelete is false and r.cd in (select rate_cd " +
	// 					"from coverage.coverage_rate " +
	// 					"where coverage_cd in ( " + coverageCdAsString + "))";

	// var query2Str = "select cd as rate_cd, rate_type_cd, rate_detail, rate_detail_component from rate.rate where cd in (select rate_cd from coverage.coverage_rate where coverage_cd in (" + coverageCdAsString + ",'H1X5','H1Y5'))";

	// var client = new pg.Client(conString);
	// client.connect(function(err) {
	// 	if(err) {
	// 	  return console.log('could not connect to postgres', err);
		   
	// 	}

	// 	console.log('connected to postgres');
	// 	client.query(query2Str, function(err, result) {
	// 	  if(err) {			
	// 		return console.log('error running query', err);
	// 	  }

	// 	  console.log(result.rows.length);		  
	// 	  rootScope.RATE = result.rows;
	// 	  client.end();
	// 	  console.log('connection terminated');
		  
	// 	  _callback();		  
	// 	});
	// });
}


		function writeToLogFile(log){
			//rootScope.log.push(log);
			//fs.appendFileSync("test.txt", JSON.stringify(log, null, "\t") + "\n");
			writeStream.write(JSON.stringify(log, null, "\t") + "\n");
		}

		function writeToLogFilePphClient(log){
			//rootScope.log_pph_client.push(log);
			//fs.appendFileSync("test.txt", JSON.stringify(log, null, "\t") + "\n");
			writeStream.write(JSON.stringify(log, null, "\t") + "\n");
		}

		function writeToLogFilePphAlt(log){
			//rootScope.log_pph_alt.push(log);
			//fs.appendFileSync("test.txt", JSON.stringify(log, null, "\t") + "\n");
			writeStream.write(JSON.stringify(log, null, "\t") + "\n");
		}
				
		function writeToConsole(log){
			console.log(log);
			//writeStreamBodyErr.write(log.toString());
		}
		
		function applyRoundingToSomeCases(output, result){
			if(output == 'CVPREMIUMPERCENTLOW'){
				return result.toFixed(10);
			}
			else if(output == 'MONTHRETURNRATELOW'){
				return result.toFixed(9);
			}
			else if(output == 'MONTHRETURNRATELOWPOW'){
				return result.toFixed(14);
			}
			else if(output == 'COIDEBTLOW' || output == 'COIDEBTMED' || output == 'COIDEBTHIGH'){
				return result.toFixed(4);
			}
			else if(output == 'PREMIUMINCREASEBEFOREROUNDING'){
				return Math.ceil(result);
			}
			return result;
		}

		function applyRoundingToSomeCases2(output, result){
			if(output == 'LOWRATEPOW' || output == 'MEDRATEPOW' ||output == 'HIGHRATEPOW'){
				return result.toFixed(9);
			}
			else if(output == 'CVPREMILOWTEMP' || output == 'CVPREMIMEDTEMP' || output == 'CVPREMIHIGHTEMP'){
				return result.toFixed();
			}
			return result;
		}

		function applyRoundingToSomeCases3(tmpFormula, result, resultAlternativeAsumtion){
			if(tmpFormula.output == 'COIDEBTLOWTEMP03' || tmpFormula.output == 'COIDEBTMEDTEMP03' || tmpFormula.output == 'COIDEBTHIGHTEMP03'){
				
				result = result < 0 ? Math.ceil(result) : Math.floor(result);
				resultAlternativeAsumtion = resultAlternativeAsumtion < 0 ? Math.ceil(resultAlternativeAsumtion) : Math.floor(resultAlternativeAsumtion);
			  	// result = Math.floor(result);
			  	// resultAlternativeAsumtion = Math.floor(resultAlternativeAsumtion);	
		  	}
			else if(tmpFormula.output == 'OF_RU_TEMPSUGGESTPREM'){
				result = Math.ceil(result);
				resultAlternativeAsumtion = Math.ceil(resultAlternativeAsumtion);
			}

			return {
				result: result,
				resultAlternativeAsumtion: resultAlternativeAsumtion
			};
		}
		
		function applyRoundingToSomeCasesAll(tmpFormula, result, resultAlternativeAsumtion){
			/*if(tmpFormula.roundingType != 'NoRounding'){
				if(tmpFormula.roundingType == 'HalfUp'){
					result = result.toFixed(tmpFormula.roundingDigit);
					resultAlternativeAsumtion = resultAlternativeAsumtion.toFixed(tmpFormula.roundingDigit);
				}
				else if(tmpFormula.roundingType == 'Down'){
					result = Math.floor(result);
					resultAlternativeAsumtion = Math.floor(resultAlternativeAsumtion);
				}
				else if(tmpFormula.roundingType == 'Up'){
					result = Math.ceil(result);
					resultAlternativeAsumtion = Math.ceil(resultAlternativeAsumtion);
				}
			}
			else if(tmpFormula.roundingNearestType != 'NoRounding'){
				if(tmpFormula.roundingNearestType == 'HalfUp'){
					result = Math.round(result/tmpFormula.roundingNearestNumber)*tmpFormula.roundingNearestNumber;
					resultAlternativeAsumtion = Math.round(resultAlternativeAsumtion/tmpFormula.roundingNearestNumber)*tmpFormula.roundingNearestNumber;
				}
				else if(tmpFormula.roundingNearestType == 'Down'){
					result = Math.floor(result/tmpFormula.roundingNearestNumber)*tmpFormula.roundingNearestNumber;
					resultAlternativeAsumtion = Math.floor(resultAlternativeAsumtion/tmpFormula.roundingNearestNumber)*tmpFormula.roundingNearestNumber;
				}
				else if(tmpFormula.roundingNearestType == 'Up'){
					result = Math.ceil(result/tmpFormula.roundingNearestNumber)*tmpFormula.roundingNearestNumber;
					resultAlternativeAsumtion = Math.ceil(resultAlternativeAsumtion/tmpFormula.roundingNearestNumber)*tmpFormula.roundingNearestNumber;
				}
			}*/
			if(tmpFormula.output == 'CVPREMIUMPERCENTLOW'){
				result = result.toFixed(10);
				resultAlternativeAsumtion = resultAlternativeAsumtion.toFixed(10);
			}
			else if(tmpFormula.output == 'MONTHRETURNRATELOW'){
				result = result.toFixed(9);
				resultAlternativeAsumtion = resultAlternativeAsumtion.toFixed(9);
			}
			else if(tmpFormula.output == 'MONTHRETURNRATELOWPOW'){
				result =  result.toFixed(14);
				resultAlternativeAsumtion = resultAlternativeAsumtion.toFixed(14);
			}
			else if(tmpFormula.output == 'COIDEBTLOW' || tmpFormula.output == 'COIDEBTMED' || tmpFormula.output == 'COIDEBTHIGH'){
				result =  result.toFixed(4);
				resultAlternativeAsumtion = resultAlternativeAsumtion.toFixed(4);
			}
			else if(tmpFormula.output == 'PREMIUMINCREASEBEFOREROUNDING'){
				result =  Math.ceil(result);
				resultAlternativeAsumtion = Math.ceil(resultAlternativeAsumtion);
			}
			else if(tmpFormula.output == 'LOWRATEPOW' || tmpFormula.output == 'MEDRATEPOW' ||tmpFormula.output == 'HIGHRATEPOW'){
				result =  result.toFixed(9);
				resultAlternativeAsumtion = resultAlternativeAsumtion.toFixed(9);
			}
			else if(tmpFormula.output == 'CVPREMILOWTEMP' || tmpFormula.output == 'CVPREMIMEDTEMP' || tmpFormula.output == 'CVPREMIHIGHTEMP'){
				result =  result.toFixed();
				resultAlternativeAsumtion = resultAlternativeAsumtion.toFixed();
			}
			else if(tmpFormula.output == 'COIDEBTLOWTEMP03' || tmpFormula.output == 'COIDEBTMEDTEMP03' || tmpFormula.output == 'COIDEBTHIGHTEMP03'){
				result = result < 0 ? Math.ceil(result) : Math.floor(result);
				resultAlternativeAsumtion = resultAlternativeAsumtion < 0 ? Math.ceil(resultAlternativeAsumtion) : Math.floor(resultAlternativeAsumtion);
			}
		  	else if(tmpFormula.output == 'OF_RU_TEMPSUGGESTPREM'){
			  	result = Math.ceil(result);
			  	resultAlternativeAsumtion = Math.ceil(resultAlternativeAsumtion);
			}
			else if(tmpFormula.output == 'OF_PREMIUMLOADROP' || tmpFormula.output == 'OF_PMLOADROP'
					|| tmpFormula.output == 'OF_STDPREMIUMROP' || tmpFormula.output == 'OF_TOTALPREMIUMROP_EXCL'
					|| tmpFormula.output == 'OF_STDCONTNONPAR' || tmpFormula.output == 'OF_TOTAL_STD_EXTRA_CONTNONPAR'){
				result = Math.round(Math.round(result)/1000)*1000;
				resultAlternativeAsumtion = Math.round(Math.round(resultAlternativeAsumtion)/1000)*1000;
			}
			else if(tmpFormula.output == 'OFF_SVROPNLG'){
				result = Math.round(result);
				resultAlternativeAsumtion = Math.round(resultAlternativeAsumtion);
			}
			
			return {
				result : result,
				resultAlternativeAsumtion : resultAlternativeAsumtion
			};
		}

		function inquireRateValByParameter(tempListRateCd, itemSelected, param, mapProperties, usingParamYear, pphMax){
			if(tempListRateCd){
				for(var j = 0; j < tempListRateCd.length; j++){
					var tertanggungAge;
					var mainLifeAge;
					
					if(tempListRateCd[j].startsWith('CH')){
						if(itemSelected.tertanggungAgeNew != undefined){
							tertanggungAge = (+itemSelected.tertanggungAgeNew + (param.year - 1));
						}
						else{
							tertanggungAge = (+itemSelected.tertanggungAge + (param.year - 1));
						}

						//ADD BENEFIT TERM
						if(itemSelected.ageNew != undefined){
							if(param.year != undefined){
								mainLifeAge = (+itemSelected.ageNew + (param.year-1));
							}else{
								mainLifeAge = +itemSelected.ageNew;
							}
							//alter
							param.age = +itemSelected.ageNew + (param.year - 1);
							//alter end
						}
						else{
							if(param.year != undefined){
								mainLifeAge = (+itemSelected.age + (param.year-1));
							}else{
								mainLifeAge = +itemSelected.age;
							}
							//alter
							param.age = +itemSelected.age + (param.year - 1);
							//alter end
						}
					}	
					else{
						tertanggungAge = (+itemSelected.tertanggungAge + (param.year - 1));

						if(param.year != undefined){
							mainLifeAge = (+itemSelected.age + (param.year-1));
						}else{
							mainLifeAge = +itemSelected.age;
						}
						//alter
						param.age = +itemSelected.age + (param.year - 1);
						//alter end
					}

					var benefitTerm;
					if(mapProperties['PDTERM'] > 0){
						benefitTerm = (mapProperties['PDTERM'] - mainLifeAge);
					}

					if(param.smokerStatus == undefined){
						param.smokerStatus = itemSelected.smokerStatus;
					}
					
					if(itemSelected.clazz != undefined && itemSelected.clazz != ""){
						param.clazz = itemSelected.clazz;
					}

					//Untuk mendapatkan rate value berdasarkan parameter
					var tmpRate;
					if(pphMax){
						if(itemSelected.code.match(/H1X.*/)){
							var tmpRate = getRateVal('RTH1X5', param, tertanggungAge, mapProperties['PDTERM'], mapProperties['PDPLAN'], mapProperties['PDPLANFORRATE'], benefitTerm);
						}else if(itemSelected.code.match(/H1Y.*/)){
							var tmpRate = getRateVal('RTH1Y5', param, tertanggungAge, mapProperties['PDTERM'], mapProperties['PDPLAN'], mapProperties['PDPLANFORRATE'], benefitTerm);
						}else if(itemSelected.code.match(/H1Z1.*/) || itemSelected.code.match(/H1Z5.*/)){
							var maxPlan = undefined;
							outer:
							for(var k = 0; k < itemSelected.itemInput.length; k++){
								if(itemSelected.itemInput[k].key == 'PDPLAN'){
									var splitValue = itemSelected.itemInput[k].inputAdvanceFull.split('|');
									for(var kk = 0; kk < splitValue.length; kk++){
										if(splitValue[kk].indexOf(itemSelected.itemInput[k].inputValueForRate) == -1){
											maxPlan = splitValue[kk].slice(0, splitValue[kk].indexOf(','));
											break outer;
										}
									}
								}
							}
							//var tmpRate = getRateVal(maxPlan, param, tertanggungAge, mapProperties['PDTERM'], mapProperties['PDPLAN'], mapProperties['PDPLANFORRATE'], benefitTerm);
							var tmpRate = getRateVal(tempListRateCd[j], param, tertanggungAge, mapProperties['PDTERM'], mapProperties['PDPLAN'], maxPlan, benefitTerm);
						}
					}
					else{
						if(usingParamYear){
							tmpRate = getRateVal(tempListRateCd[j], param, tertanggungAge, mapProperties['PDTERM'], mapProperties['PDPLAN'], mapProperties['PDPLANFORRATE'], benefitTerm);
						}else{
							tmpRate = getRateVal(tempListRateCd[j], param, tertanggungAge, mapProperties['PDTERM'], mapProperties['PDPLAN'], mapProperties['PDPLANFORRATE'], benefitTerm);
						}
					}

					if(tmpRate){
						mapProperties[tmpRate.rate_type_cd] = tmpRate.value;
					}
				}
			}
		}

		function processPowAndMinusNegativeOnFormula(stringFormula, stringFormulaAlt){
			//check POW operator
			if(stringFormula.includes("--") || stringFormulaAlt.includes("--")) {
				stringFormula = stringFormula.replace("--","+");
				stringFormulaAlt = stringFormulaAlt.replace("--","+");
			}
			if(stringFormula.match(/\b--/gi)){
				stringFormula = stringFormula.replace(new RegExp("\\b(?:--)\\b","g"), "+");	
			}

			if(stringFormulaAlt.match(/\b--/gi)){
				stringFormulaAlt = stringFormulaAlt.replace(new RegExp("\\b(?:--)\\b","g"), "+");	
			}

			if(stringFormula.indexOf('^') > -1 ){
				var strForml = stringFormula.split('^');

				var frml1 = getResultExpression(strForml[0]);
				var frml2 = getResultExpression(strForml[1]);

				stringFormula = Math.pow(frml1, frml2);
			}

			if(stringFormulaAlt.indexOf('^') > -1 ){
				var strForml = stringFormulaAlt.split('^');

				var frml1 = getResultExpression(strForml[0]);
				var frml2 = getResultExpression(strForml[1]);

				stringFormulaAlt = Math.pow(frml1, frml2);
			}

			return {
				stringFormula: stringFormula,
				stringFormulaAlt: stringFormulaAlt
			};
		}

		function checkingIfButtonHitung(buttonType, tmpFormula, formula, mapResultFormula, mapOutputCoverage, result, mapOutputFundAltLimited, 
				mapOutputFundAltWhole, checkMapOutputCoverageSABASIC, checkMapOutputFund) {
			if('hitung' === buttonType){
				if('SA_BASIC' === tmpFormula.output.toUpperCase()){
					mapResultFormula['SA_BASIC'] = result;
				}
				else if('SABASIC' === tmpFormula.output.toUpperCase()){
					mapResultFormula['SABASIC'] = result;
					if(checkMapOutputCoverageSABASIC && !mapOutputCoverage['SABASIC']){
						mapOutputCoverage['SABASIC'] = result;
					}
				}
				else if('OUT_SA_U1ZR' === tmpFormula.output.toUpperCase()){
					mapResultFormula['OUT_SA_U1ZR'] = result;
				}
				else if('OUT_DETERMINED_FACULTATIVE_U1ZR' === tmpFormula.output.toUpperCase()){
					mapResultFormula['OUT_DETERMINED_FACULTATIVE_U1ZR'] = result;
				}
				else if('OUT_TOT_ACC_U1ZR' === tmpFormula.output.toUpperCase()){
					mapResultFormula['OUT_TOT_ACC_U1ZR'] = result;
				}
				else if('OUT_SA_I1DR' === tmpFormula.output.toUpperCase()){
					mapResultFormula['OUT_SA_I1DR'] = result;
				}
				else if('OUT_FACULTATIVE_U1ZR' === tmpFormula.output.toUpperCase()){
					mapResultFormula['OUT_FACULTATIVE_U1ZR'] = result;
				}
				else if('OUT_MED_U1ZR' === tmpFormula.output.toUpperCase()){
						mapResultFormula['OUT_MED_U1ZR'] = result;
				}
				else if("TOTALDEATHBENEFIT" === tmpFormula.output.toUpperCase()){
					mapResultFormula['TOTALDEATHBENEFIT'] = result;
				}
				else if('MINSA' === formula.formulaTypeCd.toUpperCase()){
				  mapResultFormula['MINSA'] = result;
				}
				else if('MAXSA' === formula.formulaTypeCd.toUpperCase()){
				  mapResultFormula['MAXSA'] = result;
				}
				else if('UNAPPLIED' === formula.formulaTypeCd.toUpperCase()){
				  mapResultFormula['UNAPPLIED'] = result;
				}
				else if('HSPLAN' === formula.formulaTypeCd.toUpperCase() && tmpFormula.output.toUpperCase() === 'HSPLAN'){
				  mapResultFormula['HSPLAN'] = result;
				}
				else if('SARIDER' === tmpFormula.output.toUpperCase()){
				  mapResultFormula['SARIDER'] = result;
				}
				else if(checkMapOutputFund){
					if('BASICPREMIUM1' === tmpFormula.output.toUpperCase()){
						mapOutputFundAltLimited['BASICPREMIUM1'] = result;
					}
					else if('BASICPREMIUM2' === tmpFormula.output.toUpperCase()){
						mapOutputFundAltWhole['BASICPREMIUM2'] = result;
					}
					else if('TOPUPSAVER1' === tmpFormula.output.toUpperCase()){
						mapOutputFundAltLimited['TOPUPSAVER1'] = result;
					}
					else if('TOPUPSAVER2' === tmpFormula.output.toUpperCase()){
						mapOutputFundAltWhole['TOPUPSAVER2'] = result;
					}
				}
			}
		}

		function parseToLogFile(paramMap, ITEM, tmpFormula, stringFormulaOri, stringFormula, stringFormulaAlt, description,
				result, resultAlternativeAsumtion, formula, logFile){
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
			
			if(logFile == 'nonPph'){
				writeToLogFile(log);
			}
			else if(logFile == 'pphClient'){
				writeToLogFilePphClient(log);
			}
			else if(logFile == 'pphAlt'){
				writeToLogFilePphAlt(log);
			}
		}

		function checkCovTermPpayorAndCovTermWaiver(tmpFormula, itemSelected, mapOutputCoverage, result){
			var tmpCount = 0;
			for(var i = 0; i < itemSelected.itemInput.length; i++){
				if(itemSelected.itemInput[i].code != undefined && itemSelected.itemInput[i].code.indexOf('PLANOPTION') != -1){
					tmpCount = i;
					break;
				}
			}
			if((tmpFormula.output === 'COVTERM_PPAYOR01' || tmpFormula.output === 'COVTERM_WAIVER01') && 
					(itemSelected.tertanggungKey == 3 && itemSelected.itemInput[tmpCount].inputValue == 'Y')){
				if(mapOutputCoverage[tmpFormula.output]){
					result = 0;
				}
			}else if((tmpFormula.output === 'COVTERM_PPAYOR01' || tmpFormula.output === 'COVTERM_WAIVER01') && 
					(itemSelected.tertanggungKey == 3 && itemSelected.itemInput[tmpCount].inputValue == 'N')){
				if(mapOutputCoverage[tmpFormula.output]){
					result = 0;
			  	}else{
				 	result = 50;
			  	}
		  	}else if((tmpFormula.output === 'COVTERM_PPAYOR02' || tmpFormula.output === 'COVTERM_WAIVER02') && 
			  		(itemSelected.tertanggungKey == 3 && itemSelected.itemInput[tmpCount].inputValue == 'Y')){
			  	if(mapOutputCoverage[tmpFormula.output]){
					result = 0;
			  	}else{
				  	result = undefined;
			  	}
		  	}else if((tmpFormula.output === 'COVTERM_PPAYOR02' || tmpFormula.output === 'COVTERM_WAIVER02') && 
			  		(itemSelected.tertanggungKey == 3 && itemSelected.itemInput[tmpCount].inputValue == 'N')){
			  	if(mapOutputCoverage[tmpFormula.output]){
					result = 0;
			 	}else{
				  	result = 50;
			  	}
		  	}
//------------------------------------------------------------------------------------------------------------------------------------------------------
			if((tmpFormula.output === 'COVTERM_WAIVER02' || tmpFormula.output === 'COVTERM_PPAYOR02') && 
					(itemSelected.tertanggungKey == 4 && itemSelected.itemInput[tmpCount].inputValue == 'Y')){
				if(mapOutputCoverage[tmpFormula.output]){
				  	result = 0;
			  	}
		  	}else if((tmpFormula.output === 'COVTERM_WAIVER02' || tmpFormula.output === 'COVTERM_PPAYOR02') && 
					(itemSelected.tertanggungKey == 4 && itemSelected.itemInput[tmpCount].inputValue == 'N')){
			  	if(mapOutputCoverage[tmpFormula.output]){
				  	result = 0;
			  	}else{
				  	result = 50;
			  	}
		  	}else if((tmpFormula.output === 'COVTERM_WAIVER01' || tmpFormula.output === 'COVTERM_PPAYOR01') && 
			  		(itemSelected.tertanggungKey == 4 && itemSelected.itemInput[tmpCount].inputValue == 'Y')){
				if(mapOutputCoverage[tmpFormula.output]){
				  	result = mapOutputCoverage[tmpFormula.output];
			  	}else{
				  	result = undefined;
			  	}
		  	}else if((tmpFormula.output === 'COVTERM_WAIVER01' || tmpFormula.output === 'COVTERM_PPAYOR01') && 
			  		(itemSelected.tertanggungKey == 4 && itemSelected.itemInput[tmpCount].inputValue == 'N')){
				if(mapOutputCoverage[tmpFormula.output]){
				  	result = 0;
			  	}else{
				  	result = 50;
			  	}	
		  	}

		  	return result;
		}

		function setResultToZeroBySomeCases(flag, tmpFormula, formula, isPIA, paramMap, result){
			if(!flag && (tmpFormula.formulaCd == 'FRMLALLOPREMI09' || tmpFormula.formulaCd == 'FRMLALLOPREMI08') 
					&& tmpFormula.output == 'ALLOCATEDSAVER'){
				result = 0;
		  	}
		  	else if(!flag && 'ALLOCATEDPREMIUM' == formula.formulaTypeCd){
				// result = 0; tidak perlu di reset buat PAA2
		  	}
		  	else if('ALLOCATEDPREMIUM' == formula.formulaTypeCd && isPIA && paramMap.year > 1){
			  	result = 0;	
		  	}
		  	else if(!flag && 'ALLOCATEDTOPUP' == formula.formulaTypeCd){
				if(tmpFormula.output == 'TOPUPSAVER1' || tmpFormula.output == 'TOPUPSAVER2'){
					result = 0;
				}
		  	}
		  	else if(!flag && tmpFormula.output == 'TOTALPREMIUMWITHACCPREMIUM'){
			  	result = 0;
		  	}
		  	else if(!flag && (tmpFormula.formulaCd == 'FRMLALLOPREMI09') 
					&& tmpFormula.output == 'ALLOCATEDSAVER'){
				result = 0;
			}
			else if(!flag && tmpFormula.output == 'TOTALTOPUP' && formula.formulaTypeCd == 'ALLOCATEDPREMIUM'){
				result = 0;
			}
			else if(!flag && formula.formulaTypeCd == 'SUMASSUREDINC'){
				result = 0;					      		
			}
			else if(!flag && tmpFormula.output == 'ALLOCLB'){
				result = 0;					      		
			}

			return result;
		}

		function setParamMapByResultAndResultAltBasedOnFormulaTypeCd(formula, tmpFormula, paramMap, result, resultAlternativeAsumtion){
			if(formula.formulaTypeCd == 'CVPREMILOW'){
				paramMap['TOTALCVPREMILOW'+paramMap.year] = (paramMap['TOTALCVPREMILOW'+paramMap.year]==undefined?0:paramMap['TOTALCVPREMILOW'+paramMap.year])+result;
				paramMap['TOTALCVPREMILOWALT'+paramMap.year] = (paramMap['TOTALCVPREMILOWALT'+paramMap.year]==undefined?0:paramMap['TOTALCVPREMILOWALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'CVPREMILOWLASTYEAR'){
				paramMap['TOTALCVPREMILOWLASTYEAR'+paramMap.year] = (paramMap['TOTALCVPREMILOWLASTYEAR'+paramMap.year]==undefined?0:paramMap['TOTALCVPREMILOWLASTYEAR'+paramMap.year])+result;
				paramMap['TOTALCVPREMILOWLASTYEARALT'+paramMap.year] = (paramMap['TOTALCVPREMILOWLASTYEARALT'+paramMap.year]==undefined?0:paramMap['TOTALCVPREMILOWLASTYEARALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'CVPREMIMED'){
				paramMap['TOTALCVPREMIMED'+paramMap.year] = (paramMap['TOTALCVPREMIMED'+paramMap.year]==undefined?0:paramMap['TOTALCVPREMIMED'+paramMap.year])+result;
				paramMap['TOTALCVPREMIMEDALT'+paramMap.year] = (paramMap['TOTALCVPREMIMEDALT'+paramMap.year]==undefined?0:paramMap['TOTALCVPREMIMEDALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'CVPREMIMEDLASTYEAR'){
				paramMap['TOTALCVPREMIMEDLASTYEAR'+paramMap.year] = (paramMap['TOTALCVPREMIMEDLASTYEAR'+paramMap.year]==undefined?0:paramMap['TOTALCVPREMIMEDLASTYEAR'+paramMap.year])+result;
				paramMap['TOTALCVPREMIMEDLASTYEARALT'+paramMap.year] = (paramMap['TOTALCVPREMIMEDLASTYEARALT'+paramMap.year]==undefined?0:paramMap['TOTALCVPREMIMEDLASTYEARALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'CVPREMIHIGH'){
				paramMap['TOTALCVPREMIHIGH'+paramMap.year] = (paramMap['TOTALCVPREMIHIGH'+paramMap.year]==undefined?0:paramMap['TOTALCVPREMIHIGH'+paramMap.year])+result;
				paramMap['TOTALCVPREMIHIGHALT'+paramMap.year] = (paramMap['TOTALCVPREMIHIGHALT'+paramMap.year]==undefined?0:paramMap['TOTALCVPREMIHIGHALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'CVPREMIHIGHLASTYEAR'){
				paramMap['TOTALCVPREMIHIGHLASTYEAR'+paramMap.year] = (paramMap['TOTALCVPREMIHIGHLASTYEAR'+paramMap.year]==undefined?0:paramMap['TOTALCVPREMIHIGHLASTYEAR'+paramMap.year])+result;
				paramMap['TOTALCVPREMIHIGHLASTYEARALT'+paramMap.year] = (paramMap['TOTALCVPREMIHIGHLASTYEARALT'+paramMap.year]==undefined?0:paramMap['TOTALCVPREMIHIGHLASTYEARALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'CVTOPUPLOW' && tmpFormula.output == 'CVTOPUPLOW'){
				paramMap['TOTALCVTOPUPLOW'+paramMap.year] = (paramMap['TOTALCVTOPUPLOW'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPLOW'+paramMap.year])+result;
				paramMap['TOTALCVTOPUPLOWALT'+paramMap.year] = (paramMap['TOTALCVTOPUPLOWALT'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPLOWALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'CVTOPUPLOWLASTYEAR'){
				paramMap['TOTALCVTOPUPLOWLASTYEAR'+paramMap.year] = (paramMap['TOTALCVTOPUPLOWLASTYEAR'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPLOWLASTYEAR'+paramMap.year])+result;
				paramMap['TOTALCVTOPUPLOWLASTYEARALT'+paramMap.year] = (paramMap['TOTALCVTOPUPLOWLASTYEARALT'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPLOWLASTYEARALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'CVTOPUPMED' && tmpFormula.output == 'CVTOPUPMED'){
				paramMap['TOTALCVTOPUPMED'+paramMap.year] = (paramMap['TOTALCVTOPUPMED'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPMED'+paramMap.year])+result;
				paramMap['TOTALCVTOPUPMEDALT'+paramMap.year] = (paramMap['TOTALCVTOPUPMEDALT'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPMEDALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'CVTOPUPMEDLASTYEAR'){
				paramMap['TOTALCVTOPUPMEDLASTYEAR'+paramMap.year] = (paramMap['TOTALCVTOPUPMEDLASTYEAR'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPMEDLASTYEAR'+paramMap.year])+result;
				paramMap['TOTALCVTOPUPMEDLASTYEARALT'+paramMap.year] = (paramMap['TOTALCVTOPUPMEDLASTYEARALT'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPMEDLASTYEARALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'CVTOPUPHIGH' && tmpFormula.output == 'CVTOPUPHIGH'){
				paramMap['TOTALCVTOPUPHIGH'+paramMap.year] = (paramMap['TOTALCVTOPUPHIGH'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPHIGH'+paramMap.year])+result;
				paramMap['TOTALCVTOPUPHIGHALT'+paramMap.year] = (paramMap['TOTALCVTOPUPHIGHALT'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPHIGHALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'CVTOPUPHIGHLASTYEAR'){
				paramMap['TOTALCVTOPUPHIGHLASTYEAR'+paramMap.year] = (paramMap['TOTALCVTOPUPHIGHLASTYEAR'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPHIGHLASTYEAR'+paramMap.year])+result;
				paramMap['TOTALCVTOPUPHIGHLASTYEARALT'+paramMap.year] = (paramMap['TOTALCVTOPUPHIGHLASTYEARALT'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPHIGHLASTYEARALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'TOTALCVLOWSURRVALUE'){
				paramMap['TOTALCVLOWSURRVALUE'+paramMap.year] = (paramMap['TOTALCVLOWSURRVALUE'+paramMap.year]==undefined?0:paramMap['TOTALCVLOWSURRVALUE'+paramMap.year])+result;
				paramMap['TOTALCVLOWSURRVALUEALT'+paramMap.year] = (paramMap['TOTALCVLOWSURRVALUEALT'+paramMap.year]==undefined?0:paramMap['TOTALCVLOWSURRVALUEALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'TOTALCVTOPUPLOWSURRVALUE' && tmpFormula.output == 'TOTALCVTOPUPLOWSURRVALUE'){
				paramMap['TOTALCVTOPUPLOWSURRVALUE'+paramMap.year] = (paramMap['TOTALCVTOPUPLOWSURRVALUE'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPLOWSURRVALUE'+paramMap.year])+result;
				paramMap['TOTALCVTOPUPLOWSURRVALUEALT'+paramMap.year] = (paramMap['TOTALCVTOPUPLOWSURRVALUEALT'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPLOWSURRVALUEALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'TOTALCVMEDSURRVALUE'){
				paramMap['TOTALCVMEDSURRVALUE'+paramMap.year] = (paramMap['TOTALCVMEDSURRVALUE'+paramMap.year]==undefined?0:paramMap['TOTALCVMEDSURRVALUE'+paramMap.year])+result;
				paramMap['TOTALCVMEDSURRVALUEALT'+paramMap.year] = (paramMap['TOTALCVMEDSURRVALUEALT'+paramMap.year]==undefined?0:paramMap['TOTALCVMEDSURRVALUEALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'TOTALCVTOPUPMEDSURRVALUE' && tmpFormula.output == 'TOTALCVTOPUPMEDSURRVALUE'){
				paramMap['TOTALCVTOPUPMEDSURRVALUE'+paramMap.year] = (paramMap['TOTALCVTOPUPMEDSURRVALUE'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPMEDSURRVALUE'+paramMap.year])+result;
				paramMap['TOTALCVTOPUPMEDSURRVALUEALT'+paramMap.year] = (paramMap['TOTALCVTOPUPMEDSURRVALUEALT'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPMEDSURRVALUEALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'TOTALCVHIGHSURRVALUE'){
				paramMap['TOTALCVHIGHSURRVALUE'+paramMap.year] = (paramMap['TOTALCVHIGHSURRVALUE'+paramMap.year]==undefined?0:paramMap['TOTALCVHIGHSURRVALUE'+paramMap.year])+result;
				paramMap['TOTALCVHIGHSURRVALUEALT'+paramMap.year] = (paramMap['TOTALCVHIGHSURRVALUEALT'+paramMap.year]==undefined?0:paramMap['TOTALCVHIGHSURRVALUEALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'TOTALCVTOPUPHIGHSURRVALUE' && tmpFormula.output == 'TOTALCVTOPUPHIGHSURRVALUE'){
				paramMap['TOTALCVTOPUPHIGHSURRVALUE'+paramMap.year] = (paramMap['TOTALCVTOPUPHIGHSURRVALUE'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPHIGHSURRVALUE'+paramMap.year])+result;
				paramMap['TOTALCVTOPUPHIGHSURRVALUEALT'+paramMap.year] = (paramMap['TOTALCVTOPUPHIGHSURRVALUEALT'+paramMap.year]==undefined?0:paramMap['TOTALCVTOPUPHIGHSURRVALUEALT'+paramMap.year])+resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'TOTALCVLOWSTD'){
				paramMap['TOTALCVLOWLASTYEARSTDCLIENT'] = result;
				paramMap['TOTALCVLOWLASTYEARSTDALT'] = resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'TOTALCVLOW'){
				paramMap['TOTALCVLOWLASTYEARCLIENT'] = result;
				paramMap['TOTALCVLOWLASTYEARALT'] = resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'TOTALCVMED'){
				paramMap['TOTALCVMEDLASTYEARCLIENT'] = result;
				paramMap['TOTALCVMEDLASTYEARALT'] = resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'TOTALCVHIGH'){
				paramMap['TOTALCVHIGHLASTYEARCLIENT'] = result;
				paramMap['TOTALCVHIGHLASTYEARALT'] = resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'LOYALTYBONUSVALUELOW'){
				paramMap['TOTALLBAVLOWRATE'+paramMap.year] = (paramMap['TOTALLBAVLOWRATE'+paramMap.year]==undefined?0:paramMap['TOTALLBAVLOWRATE'+paramMap.year])+result;
			}
			else if(formula.formulaTypeCd == 'LOYALTYBONUSVALUEMED'){
				paramMap['TOTALLBAVMEDRATE'+paramMap.year] = (paramMap['TOTALLBAVMEDRATE'+paramMap.year]==undefined?0:paramMap['TOTALLBAVMEDRATE'+paramMap.year])+result;	
			}
			else if(formula.formulaTypeCd == 'LOYALTYBONUSVALUHIGH'){
				paramMap['TOTALLBAVHIGHRATE'+paramMap.year] = (paramMap['TOTALLBAVHIGHRATE'+paramMap.year]==undefined?0:paramMap['TOTALLBAVHIGHRATE'+paramMap.year])+result;
			}
			else if(formula.formulaTypeCd == 'TOTALCVTOPUPLOW'){
				paramMap['CVTOTALTOPUPLOWLASTYEARCLIENT'] = result;
				paramMap['CVTOTALTOPUPLOWLASTYEARALT'] = resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'TOTALCVTOPUPMED'){
				paramMap['CVTOTALTOPUPMEDLASTYEARCLIENT'] = result;
				paramMap['CVTOTALTOPUPMEDLASTYEARALT'] = resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'TOTALCVTOPUPHIGH'){
				paramMap['CVTOTALTOPUPHIGHLASTYEARCLIENT'] = result;
				paramMap['CVTOTALTOPUPHIGHLASTYEARALT'] = resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'CVTOTALLOWLASTYEAR' || formula.formulaTypeCd == 'CVTOTALMEDLASTYEAR' || formula.formulaTypeCd == 'CVTOTALHIGHLASTYEAR'){
				paramMap[formula.formulaTypeCd+'_CLIENT'+paramMap.year] = result;
				paramMap[formula.formulaTypeCd+'_ALT'+paramMap.year] = resultAlternativeAsumtion;
			}
			else if(formula.formulaTypeCd == 'TOTALSURRVALUELOWLASTYEAR' || formula.formulaTypeCd == 'TOTALSURRVALUEMEDLASTYEAR' || formula.formulaTypeCd == 'TOTALSURRVALUEHIGHLASTYEAR'){
				paramMap[formula.formulaTypeCd+'_CLIENT'+paramMap.year] = result;
				paramMap[formula.formulaTypeCd+'_ALT'+paramMap.year] = resultAlternativeAsumtion;
			}
		}

		//'ALLOCATEDPREMIUM_ALT', 'ALLOCATEDPREMIUM_CLIENT', 'FT_COPYPREVAL_ALT', 'FT_COPYPREVAL_CLIENT', 'FT_SETTOZERO_ALT', 'FT_SETTOZERO_CLIENT'
		function setParamMapByFormulaOutputAndFormulaTypeCd(tmpFormula, formula, paramMap, result, resultAlternativeAsumtion){
			if(formula.formulaTypeCd.indexOf('_CLIENT') != -1){
				paramMap[tmpFormula.output+'CLIENT'] = result;
			}
			else if(formula.formulaTypeCd.indexOf('_ALT') != -1){
				paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
			}
		}

		function setStringFormulaForFormulaSaverByFormulaElementTypeIsFormulaFund(fe, stringFormula, stringFormulaAlt, paramMap,
				tmpFormula, ITEM, mapOutputFund, mapOutputFundAlt, mapOutputFundAltLimited, mapOutputFundAltWhole, isPphAlt){
			if(fe.value.toUpperCase() == 'TOPUPDEDUCTIONLOW01'){
				stringFormula += paramMap['TOPUPDEDUCTIONLOW01CLIENT'];
				stringFormulaAlt += paramMap['TOPUPDEDUCTIONLOW01ALT'];
			}else if(fe.value.toUpperCase() == 'TOPUPDEDUCTIONMED01'){
				stringFormula += paramMap['TOPUPDEDUCTIONMED01CLIENT'];
				stringFormulaAlt += paramMap['TOPUPDEDUCTIONMED01ALT'];
			}else if(fe.value.toUpperCase() == 'TOPUPDEDUCTIONHIGH01'){
				stringFormula += paramMap['TOPUPDEDUCTIONHIGH01CLIENT'];
				stringFormulaAlt += paramMap['TOPUPDEDUCTIONHIGH01ALT'];
			}else if(fe.value.toUpperCase() == 'TOPUPDEDUCTIONLOW02'){	
				stringFormula += paramMap['TOPUPDEDUCTIONLOW02CLIENT'];
				stringFormulaAlt += paramMap['TOPUPDEDUCTIONLOW02ALT'];
			}else if(fe.value.toUpperCase() == 'TOPUPDEDUCTIONMED02'){
				stringFormula += paramMap['TOPUPDEDUCTIONMED02CLIENT'];
				stringFormulaAlt += paramMap['TOPUPDEDUCTIONMED02ALT'];
			}else if(fe.value.toUpperCase() == 'TOPUPDEDUCTIONHIGH02'){
				stringFormula += paramMap['TOPUPDEDUCTIONHIGH02CLIENT'];
				stringFormulaAlt += paramMap['TOPUPDEDUCTIONHIGH02ALT'];								         	
			}else if(fe.value.toUpperCase() === 'TOTALCVTOPUPLOWLASTYEAR' && paramMap.year > 1){
				stringFormula += paramMap['TOTALCVTOPUPLOWLASTYEAR'+(paramMap.year-1)];
				stringFormulaAlt += paramMap['TOTALCVTOPUPLOWLASTYEARALT'+(paramMap.year-1)];
			}else if(fe.value.toUpperCase() === 'TOTALCVTOPUPMEDLASTYEAR' && paramMap.year > 1){
				stringFormula += paramMap['TOTALCVTOPUPMEDLASTYEAR'+(paramMap.year-1)];
				stringFormulaAlt += paramMap['TOTALCVTOPUPMEDLASTYEARALT'+(paramMap.year-1)];
			}else if(fe.value.toUpperCase() === 'TOTALCVTOPUPHIGHLASTYEAR' && paramMap.year > 1){
				stringFormula += paramMap['TOTALCVTOPUPHIGHLASTYEAR'+(paramMap.year-1)];
				stringFormulaAlt += paramMap['TOTALCVTOPUPHIGHLASTYEARALT'+(paramMap.year-1)];		
			}else if(fe.value.toUpperCase() == 'CVTOPUPLOW' && tmpFormula.output == 'CVTOPUPLOWSURRVALUE'){
				if(isPphAlt){
					stringFormula += getValueFund(ITEM.code, 'CVTOPUPLOWTEMP', mapOutputFundAltLimited);
					stringFormulaAlt += getValueFund(ITEM.code, 'CVTOPUPLOWTEMP', mapOutputFundAltWhole);
				}
				else{
					stringFormula += getValueFund(ITEM.code, 'CVTOPUPLOWTEMP', mapOutputFund);
					stringFormulaAlt += getValueFund(ITEM.code, 'CVTOPUPLOWTEMP', mapOutputFund);
				}
			}else if((fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICLOWLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICMEDLASTYEAR'
					|| fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICHIGHLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERLOWLASTYEAR'
					|| fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERMEDLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERHIGHLASTYEAR') && paramMap.year > 1){
				stringFormula += paramMap[fe.value.toUpperCase()+'_CLIENT'+(paramMap.year-1)];
				stringFormulaAlt += paramMap[fe.value.toUpperCase()+'_ALT'+(paramMap.year-1)];
			}else{
				if(isPphAlt){
					stringFormula += getValueFund(ITEM.code, fe.value, mapOutputFundAltLimited);
					stringFormulaAlt += getValueFund(ITEM.code, fe.value, mapOutputFundAltWhole);		
				}
				else{
					stringFormula += getValueFund(ITEM.code, fe.value, mapOutputFund);
					stringFormulaAlt += getValueFund(ITEM.code, fe.value, mapOutputFundAlt);		
				}
			}

			return {
				stringFormula: stringFormula,
				stringFormulaAlt: stringFormulaAlt
			}; 
		}

		function setStringFormulaForFormulaBasicByFormulaElementTypeIsFormulaFund(fe, stringFormula, stringFormulaAlt,
				paramMap, ITEM, mapOutputFund, mapOutputFundAlt){
			if(fe.value.toUpperCase() === 'TOTALCVLOWLASTYEARSTD' && paramMap.year > 1){
				stringFormula += paramMap['TOTALCVLOWLASTYEARSTDCLIENT'];
				stringFormulaAlt += paramMap['TOTALCVLOWLASTYEARSTDALT'];
			}else if(fe.value.toUpperCase() === 'TOTALCVLOWLASTYEAR' && paramMap.year > 1){
				stringFormula += paramMap['TOTALCVLOWLASTYEARCLIENT'];
				stringFormulaAlt += paramMap['TOTALCVLOWLASTYEARALT'];
			}else if(fe.value.toUpperCase() === 'TOTALCVMEDLASTYEAR' && paramMap.year > 1){
				stringFormula += paramMap['TOTALCVMEDLASTYEARCLIENT'];
				stringFormulaAlt += paramMap['TOTALCVMEDLASTYEARALT'];
			}else if(fe.value.toUpperCase() === 'TOTALCVHIGHLASTYEAR' && paramMap.year > 1){
				stringFormula += paramMap['TOTALCVHIGHLASTYEARCLIENT'];
				stringFormulaAlt += paramMap['TOTALCVHIGHLASTYEARALT'];	
			}else if(fe.value.toUpperCase() === 'TOTALCVPREMILOWLASTYEAR' && paramMap.year > 1){
				stringFormula += paramMap['TOTALCVPREMILOWLASTYEAR'+(paramMap.year-1)];
				stringFormulaAlt += paramMap['TOTALCVPREMILOWLASTYEARALT'+(paramMap.year-1)];
			}else if(fe.value.toUpperCase() === 'TOTALCVPREMIMEDLASTYEAR' && paramMap.year > 1){
				stringFormula += paramMap['TOTALCVPREMIMEDLASTYEAR'+(paramMap.year-1)];
				stringFormulaAlt += paramMap['TOTALCVPREMIMEDLASTYEARALT'+(paramMap.year-1)];
			}else if(fe.value.toUpperCase() === 'TOTALCVPREMIHIGHLASTYEAR' && paramMap.year > 1){
				stringFormula += paramMap['TOTALCVPREMIHIGHLASTYEAR'+(paramMap.year-1)];
				stringFormulaAlt += paramMap['TOTALCVPREMIHIGHLASTYEARALT'+(paramMap.year-1)];
			}else if(fe.value.toUpperCase() === 'TOTALCVTOPUPLOWLASTYEAR' && paramMap.year > 1){
				stringFormula += paramMap['TOTALCVTOPUPLOWLASTYEAR'+(paramMap.year-1)];
				stringFormulaAlt += paramMap['TOTALCVTOPUPLOWLASTYEARALT'+(paramMap.year-1)];
			}else if(fe.value.toUpperCase() === 'TOTALCVTOPUPMEDLASTYEAR' && paramMap.year > 1){
				stringFormula += paramMap['TOTALCVTOPUPMEDLASTYEAR'+(paramMap.year-1)];
				stringFormulaAlt += paramMap['TOTALCVTOPUPMEDLASTYEARALT'+(paramMap.year-1)];
			}else if(fe.value.toUpperCase() === 'TOTALCVTOPUPHIGHLASTYEAR' && paramMap.year > 1){
				stringFormula += paramMap['TOTALCVTOPUPHIGHLASTYEAR'+(paramMap.year-1)];
				stringFormulaAlt += paramMap['TOTALCVTOPUPHIGHLASTYEARALT'+(paramMap.year-1)];			
			}else if((fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICLOWLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICMEDLASTYEAR'
					|| fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICHIGHLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERLOWLASTYEAR'
					|| fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERMEDLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERHIGHLASTYEAR') && paramMap.year > 1){
				stringFormula += paramMap[fe.value.toUpperCase()+'_CLIENT'+(paramMap.year-1)];
				stringFormulaAlt += paramMap[fe.value.toUpperCase()+'_ALT'+(paramMap.year-1)];
			}else{
				stringFormula += getValueFund(ITEM.code, fe.value, mapOutputFund);
				stringFormulaAlt += getValueFund(ITEM.code, fe.value, mapOutputFundAlt);
			}

			return {
				stringFormula: stringFormula,
				stringFormulaAlt: stringFormulaAlt
			};
		}
		
		function predefinedCalculation(tempData, newManfaatList, mapProperties, param, mapOutputCoveragePrecalculated, i, isPphAlt, flagProcess){
			var ITEM_PREDEFINED;
			var listItemPredefined = [];
			var itemCategory = (param.process != undefined && param.process == 'ALTER' ? 'Alter' : 'New Business');
			//temp
			if(tempData !== undefined){
				ITEM_PREDEFINED = rootScope.COVERAGE[tempData.code];
				var itemSelected = tempData;
				if(ITEM_PREDEFINED != undefined){
					var predefined;
					if(flagProcess == 'flagHitung'){
						predefined = ITEM_PREDEFINED.FORMULA.filter( function(item){return (item.category == itemCategory || item.category == 'Both');} );
					}
					else{
						predefined = ITEM_PREDEFINED.FORMULA.filter( function(item){return ((item.category == itemCategory || item.category == 'Both') && item.groupSequence != null);} );
					}
					if(predefined.length > 0){
						for(var j = 0; j <predefined.length; j++){
							if(predefined[j].formulaCd.indexOf('FRMLRIDERPREMITY09') != -1 &&
									itemSelected.isPPH != undefined && itemSelected.isPPH != "M"){
								continue;
							}
							var obj = predefined[j];
							obj.coverage = itemSelected.code;
							obj.type = 'COVERAGE';
							obj.ALLOCATION_VALUE = ITEM_PREDEFINED.ALLOCATION_VALUE;
							obj.CHANNEL = ITEM_PREDEFINED.CHANNEL;
							obj.itemSelected = itemSelected;

							listItemPredefined.push(Object.assign({}, obj))		
						}
					}							
				}
				listItemPredefined.push(Object.assign({}, obj))
			}
			//end temp
			
			//ambil total SA dari input awal, bukan di manfaat list yang akan digunakan untuk kalkulasi
			var tempManfaatList;
			//if(param.process == undefined || param.process == 'NB'){
				tempManfaatList = newManfaatList;
			/*}
			else{
				tempManfaatList = param.manfaatListOri;
			}*/

			for(var i = 0; i < tempManfaatList.length; i++){
				ITEM_PREDEFINED = rootScope.COVERAGE[tempManfaatList[i].code];
				var itemSelected = tempManfaatList[i];
				//if(itemSelected.itemInput[0].code == 'INPUTSA'){
				if(itemSelected.itemInput[0].key == 'PDSA'){
					if(!mapProperties['PDSA_'+itemSelected.code]){
						mapProperties['PDSA_'+itemSelected.code] = itemSelected.itemInput[0].inputValue;
					}else{
						mapProperties['PDSA_'+itemSelected.code] = parseInt(mapProperties['PDSA_'+itemSelected.code])
							+parseInt(itemSelected.itemInput[0].inputValue);
					}
				//}else if(itemSelected.itemInput[0].code == 'INPUTPREMI'){
				}else if(itemSelected.itemInput[0].key == 'PDPREMI'){
					if(!mapProperties['PDPREMI_'+itemSelected.code]){
						mapProperties['PDPREMI_'+itemSelected.code] = itemSelected.itemInput[0].inputValue;
					}else{
						mapProperties['PDPREMI_'+itemSelected.code] = parseInt(mapProperties['PDPREMI_'+itemSelected.code])
							+parseInt(itemSelected.itemInput[0].inputValue);
					}
				}

				if(ITEM_PREDEFINED != undefined){
					var predefined;
					if(flagProcess == 'flagHitung'){
						predefined = ITEM_PREDEFINED.FORMULA.filter( function(item){return (item.category == itemCategory || item.category == 'Both');} );
					}
					else{
						predefined = ITEM_PREDEFINED.FORMULA.filter( function(item){return ((item.category == itemCategory || item.category == 'Both') && item.groupSequence != null);} );
					}
					
					if(predefined.length > 0){
						for(var j = 0; j <predefined.length; j++){
							if(predefined[j].formulaCd.indexOf('FRMLRIDERPREMITY09') != -1 &&
									newManfaatList[i].isPPH != undefined && newManfaatList[i].isPPH != "M"){
								continue;
							}
							var obj = predefined[j];
							obj.coverage = newManfaatList[i].code;
							obj.type = 'COVERAGE';
							obj.ALLOCATION_VALUE = ITEM_PREDEFINED.ALLOCATION_VALUE;
							obj.CHANNEL = ITEM_PREDEFINED.CHANNEL;
							obj.itemSelected = itemSelected;

							listItemPredefined.push(Object.assign({}, obj))		
						}
					}							
				}	
			}
			//end ambil total SA dari input awal, bukan di manfaat list yang akan digunakan untuk kalkulasi

			listItemPredefined.sort(function(a,b) {return (parseInt(a.groupSequence) > parseInt(b.groupSequence)
				|| (parseInt(a.groupSequence) == parseInt(b.groupSequence) && parseInt(a.sequence) > parseInt(b.sequence))) ? 1 : 
				((parseInt(b.groupSequence) > parseInt(a.groupSequence) 
				|| (parseInt(b.groupSequence) == parseInt(a.groupSequence) && parseInt(b.sequence) > parseInt(a.sequence))) ? -1 : 0);} );

			for(var y = 0; y < listItemPredefined.length; y++){
				var obj = listItemPredefined[y];
			  	mapProperties['RTPREMI'] = undefined;
				mapProperties['NEEDCALCULATE'] = obj.itemSelected.isNeedToBeCalculated != undefined ? obj.itemSelected.isNeedToBeCalculated : true;

				var itemInputList = obj.itemSelected.itemInput;
				var pdPremiExist = 0;
				var pdSaExist = 0;
				//INI SALAH HARUSNYA?
				for(var j = 0; j < obj.itemSelected.length; j++){
					if(itemInputList[j].key === 'PDPREMI'){
						pdPremiExist = itemInputList[j].inputValue;
					}
					else if(itemInputList[j].key === 'PDSA'){
						pdSaExist = itemInputList[j].inputValue;
						mapProperties['PDSA'] = itemInputList[j].inputValue;
					}
				}		
				//end INI SALAH HARUSNYA?
				

				//input previousPremi
				setPremiPrevDecEtc(mapProperties, obj.itemSelected, pdPremiExist, pdSaExist);

				 //FROM ITEM INPUT
			  var itemInputList = obj.itemSelected.itemInput;

			  setMapPropertiesToUndefined(mapProperties);

			  for(var j = 0; j < itemInputList.length; j++){
				if(itemInputList[j].key === 'PDALLO'){
					fundAllocationValue = itemInputList[j].inputValue;
					fundAllocationValueTopup = itemInputList[j].inputValueTopup;
					mapProperties['PDALLO'] = itemInputList[j].inputValue/100;
					mapProperties['PDALLO_TOPUP'] = itemInputList[j].inputValueTopup/100;
					break;
				}
				else{
					mapProperties[itemInputList[j].key] = itemInputList[j].inputValue;
				}
				
				if(itemInputList[j].key == 'PDPLAN'){
					mapProperties['PDPLANFORRATE'] = undefined;
					if(itemInputList[j].inputValueForRate != undefined){
						mapProperties['PDPLANFORRATE'] = itemInputList[j].inputValueForRate;
					}
				}
			  }

				if(obj.type === 'COVERAGE'){
					//ALLOCATION VALUE
					var allocationValue = obj.ALLOCATION_VALUE[param.year];
					mapProperties['ALLOVALUE'] = allocationValue == null ? 0 : allocationValue;

					//FROM RATE
					var tempListRateCd = obj.CHANNEL[param.channelCode];
					setMapCustAgeWhenNotAdditionalLife(mapProperties, obj.itemSelected);
					obj.keyTertanggungAge = 'CUSTAGE'+'0'+(obj.itemSelected.tertanggungKey-1);
					inquireRateValByParameter(tempListRateCd, obj.itemSelected, param, mapProperties, true, false);
				}

				if(obj.itemSelected.code == 'T1JR' || obj.itemSelected.code == 'T1KR'){
					mapProperties['SA_LINKTERM'] = obj.itemSelected.itemInput[0].inputValue;
					if(param.process == 'ALTER'){
						mapProperties['SA_LINKTERM_NEW'] = obj.itemSelected.currValueSA;
					}
					else{
						mapProperties['SA_LINKTERM_NEW'] = mapProperties['SA_LINKTERM'];
					}
				}else if(obj.itemSelected.code == 'U10R' || obj.itemSelected.code == 'U10D' || obj.itemSelected.code == 'U11R' || obj.itemSelected.code == 'U1ZR'
						|| obj.itemSelected.code == 'U1SR' || obj.itemSelected.code == 'U1BR' || obj.itemSelected.code == 'U1HR'){
					mapProperties['SA_BASIC'] = obj.itemSelected.itemInput[0].inputValue;
					if(param.process == 'ALTER'){
						mapProperties['SA_BASIC_NEW'] = obj.itemSelected.currValueSA; 
					}
					else{
						mapProperties['SA_BASIC_NEW'] = mapProperties['SA_BASIC']; 
					}
				}
				
				if(isPphAlt){
					formulaPrecalculateALT(obj, param, mapProperties, mapOutputCoveragePrecalculated);
				}
				else{
					formulaPrecalculate(obj, param, mapProperties, mapOutputCoveragePrecalculated);
				}
			}
		}

		function setMapCustAgeWhenNotAdditionalLife(mapProperties, itemSelected){
			if(itemSelected.tertanggungKey < 3){
				mapProperties['CUSTAGE'+'0'+(itemSelected.tertanggungKey-1)] = itemSelected.tertanggungAge;
			}
		}
		
		function setMapPropertiesOnPreparedParameter(mapProperties, param){
			mapProperties['mainCoverage']	= param.prodCd;
			mapProperties['CUSTPAYTYPE'] = param.paymentFrequency;
			mapProperties['PDPAYTERM'] = param.premiumPaymentTerm;
			mapProperties['INCSA'] = param.flagSaIncrease;
			mapProperties['FREEADMIN'] = param.flagFreeAdmin;
			//FOR VALIDASI RULE; TIDAK BISA MEMILIH BEBERAPA COVERAGE DALAM 1 GROUP
			mapProperties['PDSELECTEDML'] = 0;
			mapProperties['PDSELECTEDAL2'] = 0;
			mapProperties['PDSELECTEDAL3'] = 0;
			mapProperties['PDSELECTEDAL4'] = 0;
			mapProperties['PDSELECTEDAL5'] = 0;
			
			// SAR CLIENT FIN
			mapProperties['AMOUNTSAR_DB_CLIENT'] = param.AMOUNTSAR_DB_CLIENT;
			mapProperties['AMOUNTSAR_TPD_CLIENT'] = param.AMOUNTSAR_TPD_CLIENT;
			mapProperties['AMOUNTSAR_ADDAD_CLIENT'] = param.AMOUNTSAR_ADDAD_CLIENT;
			mapProperties['AMOUNTSAR_ADDCC_CLIENT'] = param.AMOUNTSAR_ADDCC_CLIENT;
			mapProperties['AMOUNTSAR_ESCC_CLIENT'] = param.AMOUNTSAR_ESCC_CLIENT;
			mapProperties['AMOUNTSAR_ACC_CLIENT'] = param.AMOUNTSAR_ACC_CLIENT;
			mapProperties['AMOUNTSAR_HOSPTCASH_CLIENT'] = param.AMOUNTSAR_HOSPTCASH_CLIENT;
			mapProperties['AMOUNTSAR_PRUMED_CLIENT'] = param.AMOUNTSAR_PRUMED_CLIENT;
			mapProperties['AMOUNTSAR_HSCPPH_CLIENT'] = param.AMOUNTSAR_HSCPPH_CLIENT;
			mapProperties['AMOUNTSAR_JCC_CLIENT'] = param.AMOUNTSAR_JCC_CLIENT;
			
			// SAR POLICY FIN
			mapProperties['AMOUNTSAR_DB_POLICY'] = param.AMOUNTSAR_DB_POLICY;
			mapProperties['AMOUNTSAR_TPD_POLICY'] = param.AMOUNTSAR_TPD_POLICY;
			mapProperties['AMOUNTSAR_ADDAD_POLICY'] = param.AMOUNTSAR_ADDAD_POLICY;
			mapProperties['AMOUNTSAR_ADDCC_POLICY'] = param.AMOUNTSAR_ADDCC_POLICY;
			mapProperties['AMOUNTSAR_ESCC_POLICY'] = param.AMOUNTSAR_ESCC_POLICY;
			mapProperties['AMOUNTSAR_ACC_POLICY'] = param.AMOUNTSAR_ACC_POLICY;
			mapProperties['AMOUNTSAR_HOSPTCASH_POLICY'] = param.AMOUNTSAR_HOSPTCASH_POLICY;
			mapProperties['AMOUNTSAR_PRUMED_POLICY'] = param.AMOUNTSAR_PRUMED_POLICY;
			mapProperties['AMOUNTSAR_HSCPPH_POLICY'] = param.AMOUNTSAR_HSCPPH_POLICY;
			mapProperties['AMOUNTSAR_JCC_POLICY'] = param.AMOUNTSAR_JCC_POLICY;
			
			// SAR CLIENT MED
			mapProperties['AMOUNTSAR_DB_CLIENT_MED'] = param.AMOUNTSAR_DB_CLIENT_MED;
			mapProperties['AMOUNTSAR_TPD_CLIENT_MED'] = param.AMOUNTSAR_TPD_CLIENT_MED;
			mapProperties['AMOUNTSAR_ADDAD_CLIENT_MED'] = param.AMOUNTSAR_ADDAD_CLIENT_MED;
			mapProperties['AMOUNTSAR_ADDCC_CLIENT_MED'] = param.AMOUNTSAR_ADDCC_CLIENT_MED;
			mapProperties['AMOUNTSAR_ESCC_CLIENT_MED'] = param.AMOUNTSAR_ESCC_CLIENT_MED;
			mapProperties['AMOUNTSAR_ACC_CLIENT_MED'] = param.AMOUNTSAR_ACC_CLIENT_MED;
			mapProperties['AMOUNTSAR_HOSPTCASH_CLIENT_MED'] = param.AMOUNTSAR_HOSPTCASH_CLIENT_MED;
			mapProperties['AMOUNTSAR_PRUMED_CLIENT_MED'] = param.AMOUNTSAR_PRUMED_CLIENT_MED;
			mapProperties['AMOUNTSAR_HSCPPH_CLIENT_MED'] = param.AMOUNTSAR_HSCPPH_CLIENT_MED;
			mapProperties['AMOUNTSAR_JCC_CLIENT_MED'] = param.AMOUNTSAR_JCC_CLIENT_MED;

			// SAR POLICY MED
			mapProperties['AMOUNTSAR_DB_POLICY_MED'] = param.AMOUNTSAR_DB_POLICY_MED;
			mapProperties['AMOUNTSAR_TPD_POLICY_MED'] = param.AMOUNTSAR_TPD_POLICY_MED;
			mapProperties['AMOUNTSAR_ADDAD_POLICY_MED'] = param.AMOUNTSAR_ADDAD_POLICY_MED;
			mapProperties['AMOUNTSAR_ADDCC_POLICY_MED'] = param.AMOUNTSAR_ADDCC_POLICY_MED;
			mapProperties['AMOUNTSAR_ESCC_POLICY_MED'] = param.AMOUNTSAR_ESCC_POLICY_MED;
			mapProperties['AMOUNTSAR_ACC_POLICY_MED'] = param.AMOUNTSAR_ACC_POLICY_MED;
			mapProperties['AMOUNTSAR_HOSPTCASH_POLICY_MED'] = param.AMOUNTSAR_HOSPTCASH_POLICY_MED;
			mapProperties['AMOUNTSAR_PRUMED_POLICY_MED'] = param.AMOUNTSAR_PRUMED_POLICY_MED;
			mapProperties['AMOUNTSAR_HSCPPH_POLICY_MED'] = param.AMOUNTSAR_HSCPPH_POLICY_MED;
			mapProperties['AMOUNTSAR_JCC_POLICY_MED'] = param.AMOUNTSAR_JCC_POLICY_MED;

			// FLAG OTHER POLIS
			mapProperties['HSCOTHERPOLISH'] = param.hsOtherPolis;
			mapProperties['CHCOTHERPOLISH'] = param.chcOtherPolis;
			mapProperties['PPHOTHERPOLISH'] = param.pphOtherPolis;

			//CUST PREMI PER TAHUN
			mapProperties['CUSTPREMI'] = param.manfaat.premi;
			mapProperties['CUSTPREMIPREVIOUS'] = param.manfaat.premiPrev;

			//CUSTSA
			mapProperties['CUSTSA'] = param.custSA;

			//CUSTSAVER
			mapProperties['CUSTSAVER'] = param.custSaver;

			//AGE
			mapProperties['CUSTAGE'] = param.age;
			mapProperties['CUSTAGEML'] = param.age;
			mapProperties['OF_CUSTAGEPOLICY'] = param.age;
			//CUSTPREMIPLAN -- Ian PJ Coding
			mapProperties['CUSTPREMIPLAN'] = param.manfaat.rencanaPembayaran;

			//CUST PREMI PER TAHUN
			mapProperties['CUSTPREMI'] = param.manfaat.premi;

			//CUSTSA
			mapProperties['CUSTSA'] = param.custSA;

			//CUSTSAVER
			mapProperties['CUSTSAVER'] = param.custSaver;

			//AGE
			mapProperties['CUSTAGE'] = param.age;
			mapProperties['CUSTAGEML'] = param.age;

			//MONTH AGE
			mapProperties['CUSTAGEMONTH'] = param.custAgeMonth;

			//DAY AGE
			mapProperties['CUSTAGEDAY'] = param.custAgeDay;

			//ADMIN FEE
			mapProperties['CHARGE'] = param.adminFee;

			mapProperties['CUSTOCCUPATIONCLASS'] = param.clazz;

			//CUST INCOME
			mapProperties['CUSTINCOME'] = param.custIncome;

			//CUSTPREMIPLAN -- Ian PJ Coding
			mapProperties['CUSTPREMIPLAN'] = param.manfaat.rencanaPembayaran;
			mapProperties['YEAR'] = param.year;
			mapProperties['ISALTER'] = param.process == 'ALTER' ? true : false;

			//CAMPAIGN TYPE
			mapProperties['CAMPAIGN_TYPE'] = param.campaignType == undefined ? '' : param.campaignType;

			// TOTAL BUNDLE PREMIUM
			mapProperties['TOTALBUNDLEPREMIUM'] = param.TOTALBUNDLEPREMIUM == undefined ? '0.0' : param.manfaatListObsolete.length > 0 ? param.TOTALBUNDLEPREMIUM : '0.0';
			//mapProperties['ISBUNDLE'] = param.manfaatListObsolete.length > 0 ? true : false;

			mapProperties['ALLOPRCF'] = param.ALLO_BASIC_PRCF ? param.ALLO_BASIC_PRCF : 0;
			mapProperties['ALLOPSCB'] = param.ALLO_BASIC_PSCB ? param.ALLO_BASIC_PSCB : 0;
			mapProperties['CONTPAYTYPE'] = param.contPayType;
		}

		function setMapPropertiesToUndefined(mapProperties){
			mapProperties['PDPLAN'] = undefined;
			mapProperties['PDSA'] = undefined;
			mapProperties['PDUNIT'] = undefined;
		}
		
		function setPremiPrevDecEtc(mapProperties, itemSelected, pdPremiExist, pdSaExist){
			//input previousPremi
			mapProperties['PDPREMIPREVIOUS'] = itemSelected.previousPremi != undefined && itemSelected.previousPremi != null ? itemSelected.previousPremi : '0.0';
			mapProperties['PDPREMIEXIST'] = pdPremiExist;
			mapProperties['PDSAPREVIOUS'] = itemSelected.previousSA != undefined && itemSelected.previousSA != null ? itemSelected.previousSA : '0.0';
			mapProperties['PDSAEXIST'] = pdSaExist;
			if(itemSelected.coverageType != undefined && (itemSelected.coverageType.toLowerCase() == 'topup' || itemSelected.coverageType.toLowerCase() == 'saver')){
				mapProperties['CUSTSAVERPREVIOUS'] = itemSelected.previousSaver != undefined && itemSelected.previousSaver != null ? itemSelected.previousSaver : '0.0';
			}
			mapProperties['PDSAPREVDEC'] = itemSelected.histValueSA == undefined ? 0 : isNaN(itemSelected.histValueSA) ? "\'" + itemSelected.histValueSA + "\'" : itemSelected.histValueSA;
			mapProperties['PDUNITPREVDEC'] = itemSelected.histValueUnit == undefined ? 0 : isNaN(itemSelected.histValueUnit) ? "\'" + itemSelected.histValueUnit + "\'" : itemSelected.histValueUnit;
			mapProperties['PDPLANPREVDEC'] = itemSelected.histValuePlan == undefined ? (mapProperties['PDPLAN'] == undefined ? '0.0' : (isNaN(mapProperties['PDPLAN']) ? '\'@\'' : '0.0')) : isNaN(itemSelected.histValuePlan) ? "\'" + itemSelected.histValuePlan + "\'" : itemSelected.histValuePlan;
			mapProperties['PDTERMPREVDEC'] = itemSelected.histValueTerm == undefined ? 0 : isNaN(itemSelected.histValueTerm) ? "\'" + itemSelected.histValueTerm + "\'" : itemSelected.histValueTerm;
			mapProperties['PDSASUM'] = itemSelected.currValueSA;
			mapProperties['PDSASUM_' + itemSelected.code] = itemSelected.currValueSA;
			mapProperties['ALTERRIDERADD'] = itemSelected.newRider;
			mapProperties['RIDERSTATUS'] = itemSelected.riderStatus;
			mapProperties['PDSAORIGINAL'] = itemSelected.saOriginal;
			mapProperties['APPROVALTYPE'] = itemSelected.approvalTypeConversion != undefined ? itemSelected.approvalTypeConversion : mapProperties['APPROVALTYPE'];
			mapProperties['CUMULATIVECALCULATEUSINGNEWRATE'] = itemSelected.cumulativeCalculateUsingNewRate ? '1' : '0';
			mapProperties['CUMULATIVECURRENTRESULT'] = itemSelected.cumulativeCurrentResult;
			mapProperties['CUMULATIVEPREVIOUSSA'] = itemSelected.cumulativePreviousSA;
			mapProperties['CUMULATIVEPREVIOUSSUMRESULT'] = itemSelected.cumulativePreviousSumResult;
			mapProperties['ACCMPREVIOUS'] = itemSelected.histValueAccm == undefined ? 0 : itemSelected.histValueAccm;
			mapProperties['ACCMEXIST'] = itemSelected.currValueAccm == undefined ? 0 : isNaN(itemSelected.currValueAccm) ? "\'" + itemSelected.currValueAccm + "\'" : itemSelected.currValueAccm;
			
			if(itemSelected.tertanggungKey == 3){
				mapProperties['CUSTAGE01'] = itemSelected.tertanggungAge;
			}
			else{
				mapProperties['CUSTAGE01'] = undefined;
			}

			if(itemSelected.tertanggungKey == 4){
				mapProperties['CUSTAGE02'] = itemSelected.tertanggungAge;
			}
			else{
				mapProperties['CUSTAGE02'] = undefined;
			}
		}
		
		function processOnPreparedParameter(newManfaatList, mapProperties, manfaatListCodeSelected, param, flagProcess,
				mapResult, mapOutputFund, mapOutputFundAlt, type, tmpCoverageGroupList, coverageList, mapOutputCoverage,
				totalLowRate, totalMedRate, totalHighRate, mapXLimit, mapXWhole, DIFFLVPREMI, bufferArr, pdAlloArr){
			var mapResultCalculateCoverage = {};
			var mapOutpunFunPerYear = {};
			var mapOutputCoverageAlt = {};
			var mapFundPerYear = {};
			var mapBasicPremium = [];
			var itemCategory = (param.process != undefined && param.process == 'ALTER' ? 'Alter' : 'New Business');

			if(flagProcess == 'ALT'){
				var mapOutputFundAltLimited = mapOutputFund;
				var mapOutputFundAltWhole = mapOutputFundAlt;
			}
			
			for(var i = 0; i < newManfaatList.length; i++){
				//alter part if there are several 
				var latestManfaat = true;
				if(newManfaatList[i+1] != undefined && newManfaatList[i].code == newManfaatList[i+1].code
						&& newManfaatList[i].tertanggungKey == newManfaatList[i+1].tertanggungKey){
					latestManfaat = false;
				}
				//end alter part
				
				var itemSelected = newManfaatList[i];
				if(itemSelected.smokerStatus != undefined && itemSelected.smokerStatus != null){
					param.smokerStatus = itemSelected.smokerStatus;
				}
				mapProperties['RTPREMI'] = undefined;
				mapProperties['NEEDCALCULATE'] = itemSelected.isNeedToBeCalculated != undefined ? itemSelected.isNeedToBeCalculated : true;

				var ITEM;
				var fundAllocationValue;
				var fundAllocationValueTopup;

				if(type != 'proses'){
					manfaatListCodeSelected.push(itemSelected.code);
				}

				//ITEM = GET FULL DATA FROM JSONStore PUBLISH by itemCode
				if(itemSelected.type === 'COVERAGE'){
					ITEM = rootScope.COVERAGE[itemSelected.code];
					// if(itemSelected.code == 'D1ER'){
					// 	var xxx = 0;
					// }
					if(flagProcess == 'flagHitung'){
						ITEM.FORMULA_BOTH = ITEM.FORMULA.filter( function(item){return (item.category == itemCategory || item.category == 'Both');} );
					}
					else{
						ITEM.FORMULA_BOTH = ITEM.FORMULA.filter( function(item){return ((item.category == itemCategory || item.category == 'Both') && item.groupSequence == null);} );
					}
					
					//alter to get alter_process_status
					if(itemSelected.isNeedToBeCalculated != undefined &&
							itemCategory == 'Alter'){
						if(!itemSelected.isNeedToBeCalculated){//None
							ITEM.FORMULA_BOTH = ITEM.FORMULA_BOTH.filter( function(item){return (item.alterProcessStatus.indexOf('None') != -1);} );
						}
						else if(itemSelected.isNeedToBeCalculated && !latestManfaat){//Partial
							ITEM.FORMULA_BOTH = ITEM.FORMULA_BOTH.filter( function(item){return (item.alterProcessStatus.indexOf('Partial') != -1);} );
						}
						else{//full
							ITEM.FORMULA_BOTH = ITEM.FORMULA_BOTH.filter( function(item){return (item.alterProcessStatus.indexOf('Full') != -1);} );
						}
					}
					//end alter to get alter_process_status
				}else if(itemSelected.type === 'FUND'){
					ITEM = rootScope.FUND[itemSelected.code];
					var x = ITEM.FORMULA.filter( function(item){return (item.category == itemCategory || item.category == 'Both');} );
					ITEM.FORMULA_BASIC = x.filter( function(item){return (item.target == 'Basic');} );
					ITEM.FORMULA_SAVER = x.filter( function(item){return (item.target == 'Saver');} );
					ITEM.FORMULA_BOTH = x.filter( function(item){return (item.target == 'Both');} );
					ITEM.FORMULA_EMPTY = x.filter( function(item){return (item.target == '' || item.target == null || item.target == 'Summary');} );
					ITEM.flagDB = itemSelected.flagDB;
				}

				var pdselectedKey = "";

				if(itemSelected.tertanggungKey == 2){
					pdselectedKey = "ML";
				}else if(itemSelected.tertanggungKey == 3){
					pdselectedKey = "AL2";
				}else if(itemSelected.tertanggungKey == 4){
					pdselectedKey = "AL3";
				}else if(itemSelected.tertanggungKey == 5){
					pdselectedKey = "AL4";
				}else if(itemSelected.tertanggungKey == 6){
					pdselectedKey = "AL5";
				}
				mapProperties['PDSELECTED'+pdselectedKey] = 1;

				if(param.mainCoverage == 'U2LR' || param.mainCoverage == 'U2LD'){
                    var tmpTopupMin = null;
                    var tmpWithdrawalMin = null;
					for(var d = 0; d < param.topupList.length; d++){
                        var tmpTopup = param.topupList[d];

                        if (d==0){
                            tmpTopupMin = tmpTopup.amount;
                        }

                        if (parseInt(tmpTopup.amount) < parseInt(tmpTopupMin) ){
                            mapProperties['CUSTTOPUP_MIN'] = tmpTopup.amount;
                        }else{
                            mapProperties['CUSTTOPUP_MIN'] = tmpTopupMin;
						}
						
                        if(tmpTopup.year == param.year){
                            mapProperties['CUSTTOPUP'] = tmpTopup.amount;
                            break;
                        }
                    }
					//CUST WITHDRAWAL PER TAHUN
					for(var d = 0; d < param.withdrawalList.length; d++){
						var tmpWithdrawal = param.withdrawalList[d];

                        if (d==0){
                            tmpWithdrawalMin = tmpWithdrawal.amount;
                        }

                        if (parseInt(tmpWithdrawal.amount) < parseInt(tmpWithdrawalMin) ){
                            mapProperties['CUSTWITHDRAW_MIN'] = tmpWithdrawal.amount;
                        }else{
                            mapProperties['CUSTWITHDRAW_MIN'] = tmpWithdrawalMin;
						}
						
						if(tmpWithdrawal.year == param.year){
                            mapProperties['CUSTWITHDRAW'] = tmpWithdrawal.amount;
                        }
                    }

                    mapProperties['CUSTTOPUP_LENGTH'] = param.topupList.length;
                    mapProperties['CUSTWITHDRAW_LENGTH'] = param.withdrawalList.length;
				}else{
					//CUST TOPUP PER TAHUN
					for(var d = 0; d < param.topupList.length; d++){
						var tmpTopup = param.topupList[d];
						if(tmpTopup.year == param.year){
							mapProperties['CUSTTOPUP'] = tmpTopup.amount;
							break;
						}
					}
					//CUST WITHDRAWAL PER TAHUN
					for(var d = 0; d < param.withdrawalList.length; d++){
						var tmpWithdrawal = param.withdrawalList[d];
						if(tmpWithdrawal.year == param.year){
							mapProperties['CUSTWITHDRAW'] = tmpWithdrawal.amount;
							break;
						}
					}
				}

				setMapPropertiesToUndefined(mapProperties);

				//FROM ITEM INPUT
				var itemInputList = itemSelected.itemInput;
				var pdPremiExist = 0;
				var pdSaExist = 0;
				for(var j = 0; j < itemInputList.length; j++){
					if(itemInputList[j].key === 'PDALLO'){
						fundAllocationValue = itemInputList[j].inputValue;
						fundAllocationValueTopup = itemInputList[j].inputValueTopup;
						mapProperties['PDALLO'] = itemInputList[j].inputValue/100;
						mapProperties['PDALLO_TOPUP'] = itemInputList[j].inputValueTopup/100;
						break;
					}
					else{
						if(!(itemInputList[j].key === 'PDPREMI' && itemSelected.code == mapProperties["PREVIOUSRIDERCODE"] && itemSelected.tertanggungKey == mapProperties["PREVIOUSCUSTOMERKEY"])){
							mapProperties[itemInputList[j].key] = itemInputList[j].inputValue;
						}
					}
					
					if(itemInputList[j].key === 'PDPREMI'){
						pdPremiExist = itemInputList[j].inputValue;
					}
					else if(itemInputList[j].key === 'PDSA'){
						pdSaExist = itemInputList[j].inputValue;
						mapProperties['PDSA'] = itemInputList[j].inputValue;
					}
					else if(itemInputList[j].key == 'PDPLAN'){
						mapProperties['PDPLANFORRATE'] = undefined;
						if(itemInputList[j].inputValueForRate != undefined){
							mapProperties['PDPLANFORRATE'] = itemInputList[j].inputValueForRate;
						}
					}
				}
				
				//input previousPremi
				setPremiPrevDecEtc(mapProperties, itemSelected, pdPremiExist, pdSaExist);

				//if(flagProcess == 'flagHitung' && itemSelected.code.match(/H1X.*/) || itemSelected.code.match(/H1Y.*/) || itemSelected.code.match(/H1Z1.*/)){
				if(flagProcess == 'flagHitung' && (itemSelected.code.match(/H1X.*/) || itemSelected.code.match(/H1Y.*/) || itemSelected.code.match(/H1Z1.*/))){
					getMaxLvlPremiPPH(param, mapProperties, ITEM, itemSelected);
				}

				//ALLOCATION AND RATE JUST FOR COVERAGE NOT FUND
				if(itemSelected.type === 'COVERAGE'){
					//ALLOCATION VALUE
					var allocationValue = ITEM.ALLOCATION_VALUE[param.year];
					mapProperties['ALLOVALUE'] = allocationValue == null ? 0 : allocationValue;

					//TOPUP_ALLOCATION VALUE
					var topupAllocationValue = ITEM.TOPUPALLOCATION_VALUE[param.year];
					mapProperties['TOPUPALLOVALUE'] = topupAllocationValue == null ? 0 : topupAllocationValue;

					//LAV_ALLOCATION VALUE
					var lavAllocationValue = ITEM.BONUSALLOCATION_VALUE[param.year];
					mapProperties['BONUSALLOVALUE'] = lavAllocationValue == null ? 0 : lavAllocationValue;	
					
					//LAV_ALLOCATION VALUE
					var lavToBavAllocationValue = ITEM.LAVTOBPAVALLOCATION_VALUE[param.year];
					mapProperties['LAVTOBPAVALLOVALUE'] = lavToBavAllocationValue == null ? 0 : lavToBavAllocationValue;	

					//SURR_ALLOCATION VALUE
					if(ITEM.SURRENDERALLOCATION_VALUE != undefined){
						var surrAllocationValue = ITEM.SURRENDERALLOCATION_VALUE[param.year];
						mapProperties['SURRALLOVALUE'] = surrAllocationValue == null ? 0 : surrAllocationValue;	
					}
					
					//RTSARANNUITY VALUE
					if(mapProperties['CUSTAGEMONTH'] != undefined){
						var rtsarannuityValue = getFactorFromAnuityByMonth(mapProperties['CUSTAGEMONTH'], ITEM.ANNUITY);
						mapProperties['RTSARANNUITY'] = rtsarannuityValue == null ? 0 : rtsarannuityValue;
					}
					
					mapProperties['YEAR'] = param.year;
					
					//FROM RATE
					var tempListRateCd = ITEM.CHANNEL[param.channelCode];
					setMapCustAgeWhenNotAdditionalLife(mapProperties, itemSelected);
					ITEM.keyTertanggungAge = 'CUSTAGE'+'0'+(itemSelected.tertanggungKey-1);
					inquireRateValByParameter(tempListRateCd, itemSelected, param, mapProperties, true, false);
				}

				//PROPERTIES FOR FUND
				if(itemSelected.type === 'FUND'){
					var lowRate = ITEM.lowRate/100;
					var mediumRate = ITEM.mediumRate/100;
					var highRate = ITEM.highRate/100;

					mapProperties['LOWRATE'] = lowRate;
					mapProperties['MEDRATE'] = mediumRate;
					mapProperties['HIGHRATE'] = highRate;

					if(totalLowRate != undefined && totalLowRate != 0){
						mapProperties['TOTALLOWRATE'] = totalLowRate;
						mapProperties['TOTALMEDRATE'] = totalMedRate;
						mapProperties['TOTALHIGHRATE'] = totalHighRate;
					}
					
					if(flagProcess == 'flagHitung'){
						// Rate Buat PAA 2
						var tempListRateCd = ITEM.CHANNEL[param.channelCode];

						inquireRateValByParameter(tempListRateCd, itemSelected, param, mapProperties, true, false);
					}
				}

				//BATAS TERM, IF ANY
				var flag = param.year <= param.manfaat.rencanaPembayaran ? true : false;

				//get term dari tiap" manfaat yg dipilih
				var term = getTerm(itemSelected);

				if(flagProcess == 'ALT'){
					mapProperties['CURRSVROPT'] = param.MAXSVROPT;
					mapXWhole['CURRSVROPT'] = param.MAXSVROPT; //current saver rider PPH
					mapXWhole['MAXSVROPT'] = param.MAXSVROPT;
					mapXLimit['CURRSVROPT'] = param.MAXSVROPT;
					mapXLimit['MAXSVROPT'] = param.MAXSVROPT;
					
					if(param.year > param.manfaat.rencanaPembayaran){
						mapXLimit['CURRSVROPT'] = '0.0';
						mapXLimit['MAXSVROPT'] = '0.0';
					}
					mapProperties['mapXWhole'] = mapXWhole;
					mapProperties['mapXLimit'] = mapXLimit;
				}else{
					mapProperties['CURRSVROPT'] = param.CURRSVROPT; //current saver rider PPH
				}
				
				mapProperties['MAXSVROPT'] = param.MAXSVROPT; //maximum saver rider PPH

				//fungsi  di bawah ini bermaksud untuk mengabaikan perhitungan jika umur tertanggung dibawah dari term yg dipilih kecuali proses hitung
				if(flagProcess == 'flagHitung'){
					mapFundPerYear = mapOutpunFunPerYear[itemSelected.code];
					if(param.isPPH){
						mapResult = getResultFormulaCVPPHClient(itemSelected, ITEM, mapProperties, mapResult, mapFundPerYear, mapOutputCoverage, mapOutputCoverageAlt, mapOutputFund, mapOutputFundAlt, param, flag, type, latestManfaat);
					}else{
						mapResult = getResultFormula(itemSelected, ITEM, mapProperties, mapResult, mapFundPerYear, mapOutputCoverage, mapOutputCoverageAlt, mapOutputFund, mapOutputFundAlt, param, flag, type, latestManfaat);
					}

					mapOutputCoverage = mapResult.MAPOUTPUTCOVERAGE;
					mapOutputFund = mapResult.MAPOUTPUTFUND;
					mapOutputCoverageAlt = mapResult.MAPOUTPUTCOVERAGEALT;
					mapOutputFundAlt = mapResult.MAPOUTPUTFUNDALT;
				}else{
					if(term){
						if(param.age <= term){
							mapFundPerYear = mapOutpunFunPerYear[itemSelected.code];
							if(flagProcess == 'ALT'){
								if(param.isPPH){
									mapResult = getResultFormulaCVPPHAlternatif(itemSelected, ITEM, mapProperties, mapResult, mapFundPerYear, mapOutputCoverage, mapOutputCoverageAlt, mapOutputFundAltLimited, mapOutputFundAltWhole, param, flag, type, DIFFLVPREMI, bufferArr, pdAlloArr, latestManfaat);
								}else{
									mapResult = getResultFormula(itemSelected, ITEM, mapProperties, mapResult, mapFundPerYear, mapOutputCoverage, mapOutputCoverageAlt, mapOutputFund, mapOutputFundAlt, param, flag, type, DIFFLVPREMI, bufferArr, pdAlloArr);
								}
							}
							else{
								if(param.isPPH){
									mapResult = getResultFormulaCVPPHClient(itemSelected, ITEM, mapProperties, mapResult, mapFundPerYear, mapOutputCoverage, mapOutputCoverageAlt, mapOutputFund, mapOutputFundAlt, param, flag, type, DIFFLVPREMI, bufferArr, pdAlloArr, latestManfaat);
								}else{
									mapResult = getResultFormula(itemSelected, ITEM, mapProperties, mapResult, mapFundPerYear, mapOutputCoverage, mapOutputCoverageAlt, mapOutputFund, mapOutputFundAlt, param, flag, type, DIFFLVPREMI, bufferArr, pdAlloArr, latestManfaat);
								}
							}
							mapOutputCoverage = mapResult.MAPOUTPUTCOVERAGE;
							mapOutputFund = mapResult.MAPOUTPUTFUND;
							mapOutputCoverageAlt = mapResult.MAPOUTPUTCOVERAGEALT;
							mapOutputFundAlt = mapResult.MAPOUTPUTFUNDALT;
							mapOutputFundAltLimited = mapResult.MAPOUTPUTFUNDALT_LIMITED;
							mapOutputFundAltWhole = mapResult.MAPOUTPUTFUNDALT_WHOLE;
						}
					}
					//bwh ini sama kyk yg atas
					else{
						mapFundPerYear = mapOutpunFunPerYear[itemSelected.code];
						if(flagProcess == 'ALT'){
							if(param.isPPH){
								mapResult = getResultFormulaCVPPHAlternatif(itemSelected, ITEM, mapProperties, mapResult, mapFundPerYear, mapOutputCoverage, mapOutputCoverageAlt, mapOutputFundAltLimited, mapOutputFundAltWhole, param, flag, type, DIFFLVPREMI, bufferArr, pdAlloArr, latestManfaat);
							}else{
								mapResult = getResultFormula(itemSelected, ITEM, mapProperties, mapResult, mapFundPerYear, mapOutputCoverage, mapOutputCoverageAlt, mapOutputFund, mapOutputFundAlt, param.year, flag, type,DIFFLVPREMI, latestManfaat);
							}								
						}
						else{
							if(param.isPPH){
								mapResult = getResultFormulaCVPPHClient(itemSelected, ITEM, mapProperties, mapResult, mapFundPerYear, mapOutputCoverage, mapOutputCoverageAlt, mapOutputFund, mapOutputFundAlt, param, flag, type, DIFFLVPREMI, bufferArr, pdAlloArr, latestManfaat);
							}else{
								mapResult = getResultFormula(itemSelected, ITEM, mapProperties, mapResult, mapFundPerYear, mapOutputCoverage, mapOutputCoverageAlt, mapOutputFund, mapOutputFundAlt, param, flag, type, DIFFLVPREMI, bufferArr, pdAlloArr, latestManfaat);
							}
						}
						mapOutputCoverage = mapResult.MAPOUTPUTCOVERAGE;
						mapOutputFund = mapResult.MAPOUTPUTFUND;	      			
						mapOutputCoverageAlt = mapResult.MAPOUTPUTCOVERAGEALT;
						mapOutputFundAlt = mapResult.MAPOUTPUTFUNDALT;
						mapOutputFundAltLimited = mapResult.MAPOUTPUTFUNDALT_LIMITED;
						mapOutputFundAltWhole = mapResult.MAPOUTPUTFUNDALT_WHOLE;
					}
				}
				//oldCode cuma dipake di service, bukan device
				if(mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId] == null){
					mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId] = {};
					mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].riderPremium = 0;
					mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].chargeRider = 0;
					mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].chargeInsurance = 0;
					mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].code = itemSelected.code;
				}
				if(mapResult.riderPremium){
					if(mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].riderPremium != null &&
							mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].riderPremium != 0){
						mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].riderPremium = 
							mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].riderPremium + mapResult.riderPremium;
					}
					else{
						mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].riderPremium = mapResult.riderPremium;
					}
				}
				if(mapResult['CHARGERIDER']){
					mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].chargeRider = mapResult['CHARGERIDER'];
				}
				if(mapResult['CHARGEINSURANCE']){
					if(mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].chargeInsurance != null &&
							mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].chargeInsurance != 0){
						mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].chargeInsurance = 
							mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].chargeInsurance + mapResult['CHARGEINSURANCE'];
					}
					else{
						mapResultCalculateCoverage[itemSelected.oldCode + '|' + itemSelected.tertanggungCustomerId].chargeInsurance = mapResult['CHARGEINSURANCE'];
					}
				}
				
				if(mapResult.basicPremium){
					var mapBasicPremiumMember = {};
					mapBasicPremiumMember.code = itemSelected.oldCode;
					mapBasicPremiumMember.tertanggungCustomerId = itemSelected.tertanggungCustomerId;
					mapBasicPremiumMember.alterationDate = itemSelected.alterationDate;
					mapBasicPremiumMember.basicPremium = mapResult.basicPremium;
					// mapBasicPremiumMember.cumulativeCurrentResult = mapResult.cumulativeCurrentResultCalculated;
					// mapBasicPremiumMember.cumulativeCalculateUsingNewRate = itemSelected.cumulativeCalculateUsingNewRate;
					mapBasicPremiumMember.cumulativeCurrentResult = mapResult['MAPOUTPUTCOVERAGE'].ACCUMULATIONCALCULATE;
					mapBasicPremiumMember.cumulativeCalculateUsingNewRate = true;
					mapBasicPremium.push(mapBasicPremiumMember);
				}

				if(itemSelected.type === 'FUND'){
					mapOutpunFunPerYear[itemSelected.code] = mapResult.MAPOUTPUTFUNDPERTAHUN;
					mapOutpunFunPerYear[itemSelected.code].ALLOCATION = fundAllocationValue;
					mapOutpunFunPerYear[itemSelected.code].ALLOCATION_TOPUP = fundAllocationValueTopup;
				}

				//GENERATE NEW FORMAT COVERAGE
				var tmpCoverageListMember = {};
				tmpCoverageListMember.itemCd = ITEM.coverageCode;
				tmpCoverageListMember.keyTertanggungAge = ITEM.keyTertanggungAge;
				tmpCoverageListMember.itemType = 'COVERAGE';
				tmpCoverageListMember.properties = Object.assign({}, mapProperties);
				tmpCoverageListMember.mapOutputCoverage = mapOutputCoverage;
				tmpCoverageListMember.mapOutputFund = mapOutputFund;
				tmpCoverageListMember.isNeedToBeCalculated = itemSelected.isNeedToBeCalculated != undefined ? itemSelected.isNeedToBeCalculated : true;
				coverageList.push(tmpCoverageListMember);

				//GENERATE TEMP BEFORE CHANGE FORMAT COVERAGE_GROUP
				var tmpCoverageGroup = {};
				tmpCoverageGroup.coverageCd = ITEM.coverageCode;
				tmpCoverageGroup.keyTertanggungAge = ITEM.keyTertanggungAge;
				tmpCoverageGroup.coverageGroupCdList = ITEM.COVERAGE_GROUP;
				tmpCoverageGroup.properties = mapProperties;
				tmpCoverageGroup.mapOutputCoverage = mapOutputCoverage;
				tmpCoverageGroup.mapOutputFund = mapOutputFund;
				tmpCoverageGroupList.push(tmpCoverageGroup);

				mapFundPerYear = {};
			}
			mapResult.MAPRESULTCALCULATE = mapResultCalculateCoverage;
			mapResult.MAPOUTPUTFUNDPERTAHUN = mapOutpunFunPerYear;
			mapResult.MAPCOV2 = mapOutputCoverage;
			mapResult.MAPCOVALT2 = mapOutputCoverageAlt;
			mapResult.MAPRESULTBASICPREMIUM = mapBasicPremium;
		}
	
		var mapPPH = {};
		var tmpCurr = "";
		var mapChargeRider = {};
		
		// function untuk cek String expression string true or false
		function isValidExpression(expression) {
			var result = parseFloat(expression);
			if(result === 'Nan'){
				return false;
			}else{
				return true;
			}
		}

		// function untuk hitung dari string setelah dicek function isValidExpression()
		function getResultExpression(expression) {
			try{
				var result = eval(expression);
			}catch(e){
				writeToConsole(expression);
				writeToConsole(e.stack);
				if(e instanceof SyntaxError){
					writeToConsole("EVAL ERROR : "+e.message);
				}
			}
			return result;
		}

		// variable penampung kumpulan manfaat" yang telah dipilih customer dan telah disorting sesuai sequence manfaat yg harus dihitung
		var mymanfaatlist = [];
		var isPPHC = false;

		//function saat tombol proses ilustrasi diklik
		function processIlustration(param, DIFFLVPREMI){
			 mapChargeRider = {};
			 var response = {};
			 var mapOutputFundList = {};

			 //variable dibawah ini digunakan dan dideklarasikan diluar looping karena terakumulasi dari nilai" yg telah dihitung, sehingga mempengaruhi cash value dari tahun ke tahun
			 var mapOutputFund = {};
			 var mapOutputFundAlt = {};
			 var mapFundNLG = {};
			 var mapFundNLGAlt = {};
			 var mapOutput = {};
			 var mapOutputFundList = {};

			 var mapOutputMainPAA = {};
			 var mapOutputPAAPPHALT = {};
			 //var mapOutputPAAPPHDB = {};

			 var mapOutputFundAltLimited = {};
			 var mapOutputFundAltWhole = {};

			 var mapOutputFundDBClient = {};
			 var mapOutputFundDBAlt = {};

			 if(param.prodCd.indexOf('T1P') != -1 || param.prodCd.indexOf('T1Q') != -1){
				var itemInput = [];
				itemInput.push({
					key : 'PDALLO',
					inputValue : 100,
					inputValueTopup : 100
				});
				var fundList = [];
				fundList.push({
					code : 'PRMF',
					itemInput : itemInput,
					type : 'FUND'
				});
				param.fundList = fundList;
			 }
			 else if(param.prodCd.indexOf('T1R') != -1 || param.prodCd.indexOf('T1S') != -1){
				var itemInput = [];
				itemInput.push({
					key : 'PDALLO',
					inputValue : 100,
					inputValueTopup : 100
				});
				var fundList = [];
				fundList.push({
					code : 'PSMF',
					itemInput : itemInput,
					type : 'FUND'
				});
				param.fundList = fundList;
			 }
			 
			 var tempFundSaverTotal = 0;
			 for(var i = 0; i < param.fundList.length; i++){
			 	for(var j = 0; j < param.fundList[i].itemInput.length; j++){
			 		if(param.fundList[i].itemInput[j].key == 'PDALLO'){
						tempFundSaverTotal = tempFundSaverTotal + param.fundList[i].itemInput[j].inputValueTopup;
			 			break;
			 		}
			 	}
			 }
			 if(tempFundSaverTotal < 100 
			 		|| ((param.custSaver == undefined || param.custSaver <= 0) && (param.topupList == undefined || param.topupList.length == 0))){
			 	for(var i = 0; i < param.fundList.length; i++){
					for(var j = 0; j < param.fundList[i].itemInput.length; j++){
						if(param.fundList[i].itemInput[j].key == 'PDALLO'){
							if(param.fundList[i].itemInput[j].inputValue == 0){
								param.fundList.splice(i, 1);
								i--;
							}
							else{
								param.fundList[i].itemInput[j].inputValueTopup =
									param.fundList[i].itemInput[j].inputValue;
							}
							break;
						}
					}
				 }	
			 }

			 // FOR PIA GIO
			 param.ALLO_BASIC_PRCF = 0;
			 for(var i = 0; i < param.fundList.length; i++){
				for(var j = 0; j < param.fundList[i].itemInput.length; j++){
					if(param.fundList[i].itemInput[j].key == 'PDALLO'){
						param['ALLO_BASIC_' + param.fundList[i].code] = param.fundList[i].itemInput[j].inputValue;
					}
				}
			 }
			 
			 //set isPPH
			 for(var i = 0; i < param.manfaatList.length; i++){
				if(param.manfaatList[i].code.match(/H1X.*/) || param.manfaatList[i].code.match(/H1Y.*/) || param.manfaatList[i].code.match(/H1Z1.*/)){
					param.isPPH = true;
					break;
				}
			 }
			 
			 //set isPPH
			 for(var i = 0; i < param.manfaatList.length; i++){
				if(param.manfaatList[i].code.match(/H1X.*/) || param.manfaatList[i].code.match(/H1Y.*/) || param.manfaatList[i].code.match(/H1Z1.*/) || param.manfaatList[i].code.match(/H1Z5.*/)){
					param.isPPH = true;
					break;
				}
			 }
			 
			 param = setParamMainCoverage(param);
			
			 var year = 1;
			 var ageCustomer = param.age;
			 var setManfaatList = sortingRiderTopupMain(param.manfaatList, param.age);
			 mymanfaatlist = setManfaatList.PHC; // perhitungan db untuk pph setManfaatList.isPHCExists;
			 param.ManfaatListCVCalc = setManfaatList.PHC; // perhitungan cv untuk pph
			 param.ManfaatListCovCalc = setManfaatList.isPHCExists; // perhitungan COVERAGE untuk pph
			 
			 param.issuedDate = Date.now();

			 //Untuk keperluar PPH

			param.MAXSVROPT = setManfaatList.MAXSVROPT;
			param.CURRSVROPT = setManfaatList.CURRSVROPT;

			if(param.CURRSVROPT == 'Tidak dipilih' || param.CURRSVROPT == 'Tidak Dipilih'){
				param.CURRSVROPT = '0.0';
			}
			if(param.MAXSVROPT == 'Tidak dipilih' || param.MAXSVROPT == 'Tidak Dipilih'){
				param.MAXSVROPT = '0.0';
			}

			 //memasukkan fund yg telah dipilih customer kedalam mymanfaatlist untuk hitung cash Value
			 for(var i = 0; i < param.fundList.length; i++){
				param.fundList[i].flagDB = false;
				mymanfaatlist.push(param.fundList[i]);
			}

			//memasukkan fund yg telah dipilih customer kedalam mymanfaatlist untuk hitung cash Value
			for(var i = 0; i < param.fundList.length; i++){
				var bantu = {
					code : param.fundList[i].code,
					name : param.fundList[i].name,
					checked : param.fundList[i].checked,
					taken : param.fundList[i].taken,
					flagSearch : param.fundList[i].flagSearch,
					itemInput : param.fundList[i].itemInput,
					type : param.fundList[i].type,
					flagDB : true
				}
				mymanfaatlist.push(bantu);
			}			

			 //memberi default value rencana pembayaran jika tidak diisi customer
			 if(param.manfaat.rencanaPembayaran==0){
				 param.manfaat.rencanaPembayaran = param.alternatifRencanaPembayaran;
			 }

			var res = processIlustrationClient(ageCustomer, param, year, mapOutputFund, mapOutputFundAlt, mapFundNLG, mapFundNLGAlt, mapOutput, mapOutputFundList, 'CLIENT', DIFFLVPREMI,mapOutputMainPAA);

			if(res != undefined){
				isPPHC = false;
					if(res.status == '0'){
							if(param.MAXSVROPT != undefined){
								isPPHC = true;
								// kalau pilih rider PPH
								processIlustrationAlt(ageCustomer, param, year, mapOutputFundAltLimited, mapOutputFundAltWhole, mapFundNLG, mapFundNLGAlt, mapOutput, mapOutputFundList, 'ALT',DIFFLVPREMI,mapOutputPAAPPHALT);
							}
							if(isPPHC == true){
								mapOutputFundList = {
									mapOutputMainPAA : mapOutputMainPAA,
									mapOutputPAAPPHALT : mapOutputPAAPPHALT,
								};
							}else{
								mapOutputFundList = {
									mapOutputMainPAA : mapOutputMainPAA
								};
							}

							if(param.mainCoverage == 'U10R' || param.mainCoverage == 'U10D' || param.mainCoverage == 'U11R'){
								response.content = generateOutputPAA2(param, mapOutputFundList);
							}else if(param.mainCoverage == 'T1PR' || param.mainCoverage == 'T1QR'){
								response.content = generateOutputROP(param, mapOutputFundList);
							}else if(param.mainCoverage == 'T1RR'){
								response.content = generateOutputNonPAR(param, mapOutputFundList);
							}else if(param.mainCoverage == 'U2LR' || param.mainCoverage == 'U2LD'){
								response.content = generateOutputFIA(param, mapOutputFundList);
							}else{
								response.content = generateOutput(param, mapOutputFundList);
							}
							
					}else{
							response = res;
					}
			}else{
				isPPHC = false;
					if(param.MAXSVROPT != undefined){
						isPPHC = true;
						// kalau pilih rider PPH
						processIlustrationAlt(ageCustomer, param, year, mapOutputFundAltLimited, mapOutputFundAltWhole, mapFundNLG, mapFundNLGAlt, mapOutput, mapOutputFundList, 'ALT',DIFFLVPREMI,mapOutputPAAPPHALT);
					}

					if(isPPHC == true){
						mapOutputFundList = {
							mapOutputMainPAA : mapOutputMainPAA,
							mapOutputPAAPPHALT : mapOutputPAAPPHALT,
						};
					}else{
						mapOutputFundList = {
							mapOutputMainPAA : mapOutputMainPAA
						};
					}

					response.status = '0';

					if(param.mainCoverage == 'U10R' || param.mainCoverage == 'U10D' || param.mainCoverage == 'U11R'){
						response.content = generateOutputPAA2(param, mapOutputFundList);
					}else if(param.mainCoverage == 'T1PR' || param.mainCoverage == 'T1QR'){
						response.content = generateOutputROP(param, mapOutputFundList);
					}else if(param.mainCoverage == 'T1RR'){
						response.content = generateOutputNonPAR(param, mapOutputFundList);
					}else if(param.mainCoverage == 'U2LR' || param.mainCoverage == 'U2LD'){
						response.content = generateOutputFIA(param, mapOutputFundList);
					}else{
						response.content = generateOutput(param, mapOutputFundList);
					}
			}
			 return response;
		 }

		 function setParamMainCoverage(param){
			//set param.mainCoverage
			if(param.mainCoverage == undefined){
				for(var i = 0; i < param.manfaatList.length; i++){
					if(param.manfaatList[i].coverageType == 'main'){
						param.mainCoverage = param.manfaatList[i].code;
						break;
					}
				}
			}
			//end set param.mainCoverage
			
			return param;
		 }

		 function setCumulativeAttribute(manfaatList){
			for(var i = 0; i < manfaatList.length; i++){
				if(manfaatList[i].coverageType.toLowerCase() == 'main'){
					for(var j = 0; j < manfaatList[i].custList[0].itemInput.length; j++){
						if(manfaatList[i].custList[0].itemInput[j].key == 'PDSA'){
							manfaatList[i].cumulativeCalculateUsingNewRate = true;
							manfaatList[i].cumulativeRemainingSA = manfaatList[i].custList[0].itemInput[j].inputValue;
						}
					}
				}
			}
		 }

		 function sustainabilityProcess(param){
			sustainabilityProcessDetail(param.manfaatList);
			if(param.alterationDataHist != undefined && param.alterationDataHist.length > 0){
				for(var i = 0; i < param.alterationDataHist.length; i++){
					sustainabilityProcessDetail(param.alterationDataHist[i].manfaatList);
				}
			}
		 }

		 function sustainabilityProcessDetail(manfaatList){
			var sustainTerm = "";
			for(var i=0; i<manfaatList.length; i++){
				if(manfaatList[i].coverageType.toLowerCase() == 'main'){
					if(manfaatList[i].custList[0].termSustainability == undefined || 
							(manfaatList[i].custList[0].termSustainability != undefined && manfaatList[i].custList[0].termSustainability == 0)){
						return;
					}
					for(var j=0; j<manfaatList[i].custList[0].itemInput.length; j++){
						if(manfaatList[i].custList[0].itemInput[j].key == 'PDTERM'){
							sustainTerm = manfaatList[i].custList[0].itemInput[j].inputValue;
							break;
						}
					}
					break;
				}
			}

			for(var i=0; i<manfaatList.length; i++){
				for(var j=0; j<manfaatList[i].custList[0].itemInput.length; j++){
					if(manfaatList[i].custList[0].itemInput[j].key == 'PDTERM'){

						var listTerm = [];
						listTerm = rootScope.COVERAGE[manfaatList[i].code].TERM;
						listTerm.sort(function(a,b) {return b-a;});

						if(!listTerm[0]){
							manfaatList[i].custList[0].itemInput[j].inputValue = sustainTerm;
						} else {
							if(listTerm.indexOf(sustainTerm) != -1){
								manfaatList[i].custList[0].itemInput[j].inputValue = sustainTerm;
							} else {
								if(listTerm[0] < sustainTerm){
									manfaatList[i].custList[0].itemInput[j].inputValue = listTerm[0];
								} else {
									for(var k=0; k<listTerm.length; k++){
										if(listTerm[k+1] > sustainTerm){
											continue;
										} else {
											manfaatList[i].custList[0].itemInput[j].inputValue = listTerm[k];
											break;
										}
									}
								}
							}
						}
					}
				}
			}
		 }

		 //function untuk hitung
		 //untuk menghasilkan UNAppliedPremi
		 //atau mengecek apa value yg diinput dah memenuhi standart perhitungan yg diizinkan
		 function getUnappliedPremium(param, flagProcess, DIFFLVPREMI){
			mapChargeRider = {};
			param.year = 1;
			tmpCurr = param.currCd;
			param = setParamMainCoverage(param);
			 
			//set param.process
			if(param.process == undefined){
				param.process = 'NB';
			}
			//end set param.process

			/* start sustainability process */
			// sustainabilityProcess(param);
			/* end sustainability process */

			/* start separate obsolete rider */
			var obsoleteRiders = '';
			var coverageList = [];
			var channel = rootScope.CHANNEL ? rootScope.CHANNEL[param.channelCode] : undefined;
			if(channel){
				var channelProdCat = channel.PRODUCT_CATEGORY;
				for(var i=0; i<channelProdCat.length; i++){
					if(channelProdCat[i].code === param.productCdCat){
						var channelProduct = channelProdCat[i].PRODUCT;
						for(var j=0; j<channelProduct.length; j++){
							if(channelProduct[j].code === param.prodCd){
								var channelCurrency = channelProduct[j].CURRENCY;
								for(var k=0; k<channelCurrency.length; k++){
									if(channelCurrency[k].code === param.currCd){
										obsoleteRiders = channelCurrency[k].COVERAGE_BUNDLE == undefined ? '' : channelCurrency[k].COVERAGE_BUNDLE;
										coverageList = channelCurrency[k].COVERAGE;
										break;
									}
								}
								break;
							}							
						}
						break;
					}
				}
			}
			
			var tempManfaatList = [];
			param.manfaatListObsolete = [];

			for(var obs=0; obs<param.manfaatList.length; obs++){
				if(param.manfaatList[obs].coverageType === 'rider'){
					var isExistsInCoverageList = false;
					if(obsoleteRiders.indexOf(param.manfaatList[obs].code) !== -1){
						param.manfaatListObsolete.push(param.manfaatList[obs]);
					} else{
						for(var cl=0; cl<coverageList.length; cl++){
							if(coverageList[cl].coverageCd === param.manfaatList[obs].code){
								isExistsInCoverageList = true;
								break;
							}
						}

						if(isExistsInCoverageList){
							tempManfaatList.push(param.manfaatList[obs]);
						} else {
							param.manfaatListObsolete.push(param.manfaatList[obs]);
						}
					}
				} else {
					tempManfaatList.push(param.manfaatList[obs]);
				}
			}

			param.manfaatList = tempManfaatList;
			/* end separate obsolete rider */

			//prepare parameter that will be used in alter
			if(param.process == 'ALTER'){
				//update load code
				//updateLoadCode(param);
				//end update load code

				param.manfaatListOri = param.manfaatList.slice(0);
				try {
					param.manfaatList = preparation.prepareAlterationData(param);

					/* start set pd premi basic with pd premi basic prev */
					var prevPremiBasic = 0;
					var lastHistData = param.alterationDataHist[0].manfaatList;
					for(var i=0; i<lastHistData.length; i++){
						if(lastHistData[i].coverageType.toLowerCase() == 'main'){
							for(var j=0; j<lastHistData[i].custList[0].itemInput.length; j++){
								if(lastHistData[i].custList[0].itemInput[j].key == 'PDPREMI'){
									prevPremiBasic = lastHistData[i].custList[0].itemInput[j].inputValue;
									break;
								}
							}
							break;
						}
					}

					for(var i=0; i<param.manfaatList.length; i++){
						if(param.manfaatList[i].coverageType.toLowerCase() == 'main'){
							for(var j=0; j<param.manfaatList[i].custList[0].itemInput.length; j++){
								if(param.manfaatList[i].custList[0].itemInput[j].key == 'PDPREMI'){
									param.manfaatList[i].custList[0].itemInput[j].inputValue = prevPremiBasic;
									break;
								}
							}
							break;
						}
					}
					/* end set pd premi basic with pd premi basic prev */

					writeToLogFile(param);
				}
				catch (e) {
					writeToConsole("Prepare Alteration Data Error: " + e.message);
				}
			}
			else{
				// Start Conversion Process New Business
				var isConversion = null;
				var approvalTypeConversion = "";
				var manfaatHist = param.manfaatListFromNonSales ? param.manfaatListFromNonSales : [];
				for(var cp = 0; cp < param.manfaatList.length; cp++){
					param.manfaatList[cp].custList[0].code = param.manfaatList[cp].code;
					var resultConversionProcess = preparation.conversionProcess(param.manfaatList[cp].custList[0], manfaatHist, param.campaignType, isConversion, false, false, approvalTypeConversion);
					param.manfaatList[cp]['approvalTypeConversion'] = resultConversionProcess.approvalTypeConversion;
				}
				// End Conversion Process New Business
				setCumulativeAttribute(param.manfaatList);
			}
			writeStreamBodyA.write(JSON.stringify(param));
			var setManfaatList = sortingRiderTopupMain(param.manfaatList, param.age);
			
			mymanfaatlist = setManfaatList.PHC;//setManfaatList.isPHCExists;

			param.issuedDate = new Date();
			 
			 //Untuk keperluar PPH
			param.MAXSVROPT = setManfaatList.MAXSVROPT;
			param.CURRSVROPT = setManfaatList.CURRSVROPT;

			var start = new Date().getMilliseconds();

			if(param.CURRSVROPT == 'Tidak dipilih' || param.CURRSVROPT == 'Tidak Dipilih'){
				param.CURRSVROPT = '0.0';
			}
			if(param.MAXSVROPT == 'Tidak dipilih' || param.MAXSVROPT == 'Tidak Dipilih'){
				param.MAXSVROPT = '0.0';
			}

			param.ManfaatListCVCalc = setManfaatList.PHC;
			param.ManfaatListCovCalc = setManfaatList.isPHCExists;

			 //proses hitung tanpa hitung cashvalue karena fund tidak disertakan
			 if(DIFFLVPREMI){
				 var map = preparedParameter('hitung', param, {}, {}, flagProcess, 'COVERAGE', DIFFLVPREMI);
			 }else{
				 var map = preparedParameter('hitung', param, {}, {}, flagProcess, 'COVERAGE', null);
			 }

			 console.log(new Date().getMilliseconds()-start);

			 if(!param.DIFFLVPREMI){
				 param.DIFFLVPREMI = DIFFLVPREMI;
			 }
			 return map;
		 }
		
		function updateLoadCode(param){
			for(var i = 0; i < param.manfaatList.length; i++){
				for(var j = 0; j < param.manfaatList[i].custList.length; j++){
					if(param.manfaatList[i].custList[j].loadList != undefined){
						for(var k = 0; k < param.manfaatList[i].custList[j].loadList.length; k++){
							if(param.manfaatList[i].custList[j].loadList[k].code == undefined || param.manfaatList[i].custList[j].loadList[k].code == '' ||
									param.manfaatList[i].custList[j].loadList[k].selectedCode == undefined || param.manfaatList[i].custList[j].loadList[k].selectedCode == ''){
								var key = param.manfaatList[i].code + '|' + (parseInt(param.manfaatList[i].custList[j].key)-1).toString() + '|' + 
									param.manfaatList[i].custList[j].loadList[k].selectedValue + '|' + param.manfaatList[i].custList[j].loadList[k].divider;
								param.manfaatList[i].custList[j].loadList[k].divider = param.manfaatList[i].custList[j].loadList[k].divider == 'percent' ? '100' : '1000';
								var value = rootScope.LOAD[key];
								param.manfaatList[i].custList[j].loadList[k].code = value.load_class;
								param.manfaatList[i].custList[j].loadList[k].selectedCode = value.load_cd;
							}
						}
					}
				}
			}
		}

		 // function untuk mempersiapkan segala parameter dari ui membentuk map untuk mempermudah get key
		 // (key berasal dari formula)
		 var objParam = {};
		function preparedParameter(type, param, paramMapOutputFund, paramMapOutputFundAlt, flagProcess, pphProcess,DIFFLVPREMI){
			var mapResult = {};
			var mapProperties = {};

			//CLIENT_PLANNING
			var mapOutputCoverage = {};
			var mapOutputCoveragePrecalculated = {};
			var mapOutputFund = paramMapOutputFund;

			//ALTERNATIVE
			var mapOutputFundAlt = paramMapOutputFundAlt;

			//COVERAGE_GROUP
			var coverageList = [];
			var coverageGroupList = [];
			var tmpCoverageGroupList = [];

			var xTerm;


			var manfaatListCodeSelected = [];

			var manfaatList = [];
			var tempData;

			//jika button hitung diklik proses perhitungan sesuai dengan manfaat" yg telah dipilih
			//jika proses ilustrasi diklik proses perhitungan sesuai dengan manfaat" dan fund yg telah dipilih

			if(pphProcess == 'COVERAGE'){
				manfaatList = param.ManfaatListCovCalc;
			}else{
				manfaatList = param.ManfaatListCVCalc;
			}

			var newManfaatList = [];

			if(pphProcess == 'CLIENT'){
				for(var x = 0; x < manfaatList.length; x++){
					var data = manfaatList[x];
					if(data.isPPH == 'M'){
						continue;
					}
					newManfaatList.push(data);

				}
			}else if(pphProcess == 'ALT'){
				for(var x = 0; x < manfaatList.length; x++){
					var data = manfaatList[x];
					if(data.isPPH == 'O'){
						continue;
					}
					newManfaatList.push(data);
				}
			}else{
				newManfaatList = manfaatList;
			}

			// STart precalculated formula

			setMapPropertiesOnPreparedParameter(mapProperties, param);
			
			predefinedCalculation(tempData, newManfaatList, mapProperties, param, mapOutputCoveragePrecalculated, 0, false, flagProcess);
			
			processOnPreparedParameter(newManfaatList, mapProperties, manfaatListCodeSelected, param, flagProcess,
				mapResult, mapOutputFund, mapOutputFundAlt, type, tmpCoverageGroupList, coverageList, mapOutputCoverage,
				undefined, undefined, undefined, null, null, DIFFLVPREMI, null, null);
				
			if(type === 'hitung'){
				//GENERATE MAP COVERAGE -> COVERAGE_GROUP
				coverageGroupList = generateCoverageGroup(tmpCoverageGroupList);

				//GET RULE VALIDATION COVERAGE_GROUP
				mapResult.rule = getRuleValidation(param.mainCoverage, mapOutputCoverage, coverageList.concat(coverageGroupList), mymanfaatlist, param.process, param.manfaatListObsolete);
			}

			if(type != 'proses'){
				mapResult.manfaatList = manfaatListCodeSelected;
			}


			return mapResult;
		}

		function getTerm(itemSelected){
			var t;
			for(var h = 0; h < itemSelected.itemInput.length; h++){
				var is = itemSelected.itemInput[h];
				if(is.key){
					if(is.key == 'PDTERM'){
						t = is.inputValue;
						break;
					}
				}
			}
			return t;
		}

		function getRateVal(rate_cd, param, age_life_2, term, plan, planForRate, benefitTerm){
			var obj;
			var age_life_1 = param.age;
			var gender = param.gender;
			var smoker_status = param.smokerStatus;
			var clazz = param.clazz;
			var year = param.year;
			var issuedDate = param.issuedDate;
			var premiumPaymentTerm = param.premiumPaymentTerm;
			plan = planForRate != undefined ? planForRate : plan;

			var rate = {};
			rate = rootScope.RATE;
			currentRate = rate[rate_cd];

			if(currentRate){
				obj = {};
				var rate_detail_component = currentRate.rateDetailComponent.split('|');
				var j = 0;
				var component = '';
				if(rate_detail_component[j] == 'age_life1'){
					component += age_life_1 + '|';
					j++;
				}
				if(rate_detail_component[j] == 'age_life2'){
					component += age_life_2 + '|';
					j++;
				}
				if(rate_detail_component[j] == 'gender'){
					component += gender + '|';
					j++;
				}
				if(rate_detail_component[j] == 'smoker_status'){
					component += smoker_status + '|';
					j++;
				}
				if(rate_detail_component[j] == 'term'){
					component += term + '|';
					j++;
				}
				if(rate_detail_component[j] == 'plan'){
					component += plan + '|';
					j++;
				}
				if(rate_detail_component[j] == 'class'){
					component += clazz + '|';
					j++;
				}
				if(rate_detail_component[j] == 'benefit_term'){
					component += benefitTerm + '|';
					j++;
				}
				if(rate_detail_component[j] == 'year'){
					component += year + '|';
					j++;
				}
				if(rate_detail_component[j] == 'premium_payment_term'){
					component += premiumPaymentTerm + '|';
					j++;
				}
				component = component.substring(0, component.length-1);
				obj.rate_type_cd = currentRate.rateTypeCd;
				if(typeof currentRate.rateDetail === 'string'){
					currentRate.rateDetail = JSON.parse(currentRate.rateDetail);
				}
				obj.value = currentRate.rateDetail[component];
			
				if(rate_cd == 'RTH1JR' || rate_cd == 'RTH1GR'){
					obj.value = +obj.value * 10;
				}

				return obj;
			}

			/*for(var i = 0; i < rate.length; i++){
				if((!rate_cd || rate[i].rate_cd == ' ' || rate[i].rate_cd == rate_cd) &&
						(!age_life_1 || rate[i].age_life_1 == ' ' || rate[i].age_life_1 == age_life_1) &&
							(!age_life_2 || rate[i].age_life_2 == ' ' || rate[i].age_life_2 == age_life_2 ) &&
								(!gender || rate[i].gender == ' ' || rate[i].gender == gender) &&
									(!smoker_status || rate[i].smoker_status == ' ' || rate[i].smoker_status == smoker_status) &&
										(!clazz || rate[i].clazz == ' ' || rate[i].clazz == clazz) &&
											(!term || rate[i].term == ' ' || rate[i].term == term ) &&
												(!plan || rate[i].plan == ' ' || rate[i].plan == plan) &&
													(!benefitTerm || rate[i].benefitTerm == ' ' || rate[i].benefitTerm == benefitTerm ) &&
														(!year || rate[i].year == ' ' || rate[i].year == year ) &&
															//(new Date(rate[i].effective_date) <= issuedDate && new Date(rate[i].expiry_date) > issuedDate) &&
																(!premiumPaymentTerm || rate[i].premium_payment_term == ' ' || rate[i].premium_payment_term == premiumPaymentTerm)){
					obj = rate[i];
					break;
				}
			}*/
		
			return obj;
		}

		function getFactorFromAnuityByMonth(month, annuityList){
			for(var v = 0; v < annuityList.length; v++){
				if(annuityList[v].month == month){
					return annuityList[v].factor;
					break;
				}
			}
		}

		function getResultFormula(itemSelected, ITEM, map, mapResult, mapFundPerYear, mapOutputCoverage, mapOutputCoverageAlt, mapOutputFund, mapOutputFundAlt, paramMap, flag, buttonType, DIFFLVPREMI, bufferArr, pdAlloArr, latestManfaat){
			var mapResultFormula = mapResult;
			var tempMapFormulaList = ITEM.FORMULA_BOTH;

			/* sorting sequence */
			tempMapFormulaList.sort(function(a,b) {return a.sequence - b.sequence;} );

			paramMap['OF_CUSTAGEPOLICY'] = map['CUSTAGE'];
			
			var mapResultPerYear = {};
			var TOTALCVLOWFUNDAVAL = 0;
			var cvWithdrawValue = 0;
			var sumAssuredPIA = 0;
			var sumAssuredFIA = 0;
			var isPIA = (map.mainCoverage == 'U1L' || map.mainCoverage == 'U1M');
			var isFIA = (map.mainCoverage == 'U2L');
			var isPAA2 = (map.mainCoverage == 'U10' || map.mainCoverage == 'U11');
			var PDALLO = '';
			
			var isGio = false;
			var covTermP = 0;
			if(ITEM.flagDB == true){
				mapResultPerYear = mapFundPerYear;
			}
			
			//BOTH
			for(var j = 0; j < tempMapFormulaList.length; j++){
				var tmpFormula = tempMapFormulaList[j];
				var stringFormula = '';
				var stringFormulaAlt = '';
				var stringFormulaOri = '';
				var result = 0;
				var resultAlternativeAsumtion = 0;
				var value;	
				
				//kalo coverage brarti kan uda jelas formulanya nempel ke coverage tersebut, tapi kalo tipenya fund, harus ditempelin jg si formula tersebut nempelnya ke coverage yang mana
				if(tmpFormula.itemType.toLowerCase() == 'fund' && tmpFormula.itemGroupProductCd.indexOf(map.mainCoverage) == -1){
					continue;
				}

				var formula = rootScope.FORMULA[tmpFormula.formulaCd];
				if(formula){
						var isProcess = false;
					  if(ITEM.flagDB == true && (formula.formulaTypeCd.indexOf('TOTALCVDB') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVTOPUPLOWDISPLAY') !== -1)){
						  isProcess = true;
					  }else if(ITEM.flagDB == false && (formula.formulaTypeCd.indexOf('TOTALCVDB') === -1 && formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVTOPUPLOWDISPLAY') === -1)){
						  isProcess = true;
					}else if(itemSelected.type === 'COVERAGE'){
						  isProcess = true;
					}

					if(isProcess){
						  var tempFormulaElementList = formula.FORMULA_ELEMENT;

						for(var k = 0; k < tempFormulaElementList.length; k++){
							var fe = tempFormulaElementList[k];
							fe.value = fe.value == "''" ? '' : fe.value.trim();
							stringFormulaOri += fe.value;

							if(fe.type.toLowerCase().trim() === "coverage"
								|| fe.type.toLowerCase().trim() === "customer"
								|| fe.type.toLowerCase().trim() === "rate"
								|| fe.type.toLowerCase().trim() === "fund"
								|| fe.type.toLowerCase().trim() === "product"
								|| fe.type.toLowerCase().trim() === "allocation"
								|| fe.type.toLowerCase().trim() === "predefined"){

								if(fe.value.toUpperCase() === 'CUSTINCOME'){
									stringFormula += "\'" + map[fe.value] +"\'";
									stringFormulaAlt += "\'" + map[fe.value] +"\'";
								}else if(fe.value.toUpperCase() == 'PDSA' && isPIA){
									stringFormula += sumAssuredPIA;
									stringFormulaAlt += sumAssuredPIA;
								}else if(fe.value.toUpperCase() == 'PDSA' && isFIA){
									stringFormula += sumAssuredFIA;
									stringFormulaAlt += sumAssuredFIA;
								}else if(tmpFormula.output == 'FUNDAVAL' && fe.value.toUpperCase() == 'TOTALCVLOW'){
									stringFormula += TOTALCVLOWFUNDAVAL;
									stringFormulaAlt += TOTALCVLOWFUNDAVAL;
								}else if(ITEM.flagDB == true && fe.value.indexOf('TOTALCV') !== -1){
									stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
									stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
								}else if(fe.value.toUpperCase() === 'ALLOVALUE' && isPAA2){
									//for PAA2
									stringFormula += map[fe.value] ? map[fe.value] : '0.0';
									stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';

									PDALLO = map[fe.value] ? map[fe.value]: '0.0';						        
								}else if(fe.value.toUpperCase() === 'PDPLAN'){
									stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
									stringFormulaAlt += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
								}else{
									stringFormula += map[fe.value] && map[fe.value].toString().trim() != '' ? (isNaN(map[fe.value]) ? (map[fe.value].charAt(0) == "'" ? map[fe.value] : "\'" + map[fe.value] +"\'") : map[fe.value]) : '0.0';
									stringFormulaAlt += map[fe.value] && map[fe.value].toString().trim() != '' ? (isNaN(map[fe.value]) ? (map[fe.value].charAt(0) == "'" ? map[fe.value] : "\'" + map[fe.value] +"\'") : map[fe.value]) : '0.0';
								}

							}else if(fe.type.toLowerCase().trim() === "load"){
								stringFormula += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								stringFormulaAlt += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
							}else if(fe.type.toLowerCase().trim() === "formula"){
								if(fe.value.toUpperCase() === 'MAXLVPREMI'){
									stringFormula += "\'" + map[fe.value] +"\'";
									  stringFormulaAlt += "\'" + map[fe.value] +"\'";
								}else if(fe.value.toUpperCase() === 'DIFFLVPREMI'){
									stringFormula += "" + (DIFFLVPREMI != undefined?DIFFLVPREMI:0) +"";
									  stringFormulaAlt += "" + (DIFFLVPREMI != undefined?DIFFLVPREMI:0) +"";
								}else if(fe.value.toUpperCase() == 'TOTALSAWITHACCSA'){
									stringFormula += paramMap['TOTALSAWITHACCSACLIENT'] ? paramMap['TOTALSAWITHACCSACLIENT'] : '0.0';
									  stringFormulaAlt += paramMap['TOTALSAWITHACCSAALT'] ? paramMap['TOTALSAWITHACCSAALT'] : '0.0';
								  }else if(fe.value.toUpperCase() == 'TOTALPREMIUMWITHACCPREMIUMLBDB'){
									stringFormula += paramMap['TOTALPREMIUMWITHACCPREMIUMLBDBCLIENT'] ? paramMap['TOTALPREMIUMWITHACCPREMIUMLBDBCLIENT'] : '0.0';
									  stringFormulaAlt += paramMap['TOTALPREMIUMWITHACCPREMIUMLBDBALT'] ? paramMap['TOTALPREMIUMWITHACCPREMIUMLBDBALT'] : '0.0';	
								  }else if(fe.value.toUpperCase() == 'TOTALSAWITHACCSALINKTERM'){
									  stringFormula += paramMap['TOTALSAWITHACCSALINKTERMCLIENT'] ? paramMap['TOTALSAWITHACCSALINKTERMCLIENT'] : '0.0';					          		
									  stringFormulaAlt += paramMap['TOTALSAWITHACCSALINKTERMALT'] ? paramMap['TOTALSAWITHACCSALINKTERMALT'] : '0.0';
								  }else if(fe.value.toUpperCase() == 'PREMIUMINCREASEBEFOREROUNDING'){
									  stringFormula += paramMap['PREMIUMINCREASEBEFOREROUNDINGCLIENT'] ? paramMap['PREMIUMINCREASEBEFOREROUNDINGCLIENT'] : '0.0';					          		
									  stringFormulaAlt += paramMap['PREMIUMINCREASEBEFOREROUNDINGALT'] ? paramMap['PREMIUMINCREASEBEFOREROUNDINGALT'] : '0.0';
								  }else if(fe.value.toUpperCase() == 'OF_CUSTAGEPOLICY'){
									stringFormula += paramMap['OF_CUSTAGEPOLICY'] ? paramMap['OF_CUSTAGEPOLICY'] : '0.0';
									  stringFormulaAlt += paramMap['OF_CUSTAGEPOLICY'] ? paramMap['OF_CUSTAGEPOLICY'] : '0.0';
								}else if(fe.value.toUpperCase() == 'OF_TOTALANNUALIZEDPREMIUMROP' ||
										fe.value.toUpperCase() == 'OF_ANNUALPREMIUMROP' ||
										fe.value.toUpperCase() == 'OF_TOTALANNUALIZEDCONTNONPAR' ||
										fe.value.toUpperCase() == 'OF_ANNUALCONTNONPAR'){
									stringFormula += paramMap[fe.value.toUpperCase()] ? paramMap[fe.value.toUpperCase()] : '0.0';
									stringFormulaAlt += paramMap[fe.value.toUpperCase()+'ALT'] ? paramMap[fe.value.toUpperCase()+'ALT'] : '0.0';
								}else if(fe.value.toUpperCase() == 'ALLOCATEDSAVER'){
									stringFormula += mapOutputCoverage[fe.value.toUpperCase()+'_CLIENT'] ? mapOutputCoverage[fe.value.toUpperCase()+'_CLIENT'] : '0.0';
		  							stringFormulaAlt += mapOutputCoverageAlt[fe.value.toUpperCase()+'_CLIENT'] ? mapOutputCoverageAlt[fe.value.toUpperCase()+'_CLIENT'] : '0.0';	  					          					          						          						          			
								}else if(fe.value.toUpperCase() === 'SA_AMOUNT_PRUMED'){
									stringFormula += map[fe.value] ? map[fe.value] : '0.0';
									  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
								}else{
									stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
									  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
								}
							}else if(fe.type.toLowerCase().trim() === "formulafund"){					        	
							  stringFormula += getValueFund(ITEM.code, fe.value, mapOutputFund);
							  stringFormulaAlt += getValueFund(ITEM.code, fe.value, mapOutputFundAlt);
							}else if(fe.type.toLowerCase().trim() === "string"){
							  stringFormula += "\'"+fe.value+"\'";
							  stringFormulaAlt += "\'"+fe.value+"\'";
							}else{
							  stringFormula += fe.value;
							  stringFormulaAlt += fe.value;
							}
						}

						if(isValidExpression(stringFormula)){

							var tempStringFormula = processPowAndMinusNegativeOnFormula(stringFormula, stringFormulaAlt);

							  result = getResultExpression(tempStringFormula.stringFormula);
							  resultAlternativeAsumtion = getResultExpression(tempStringFormula.stringFormulaAlt);
							
							  var yearC = paramMap.year;
							  if((formula.formulaTypeCd === 'CHARGERIDER' || formula.formulaTypeCd === 'CHARGEINSURANCE') && yearC == 1
									&& tmpFormula.output === 'TOTALCHARGE'){
							  	if(!mapChargeRider[ITEM.coverageCode+itemSelected.tertanggungKey]){
									if(formula.formulaTypeCd === 'CHARGERIDER'){
										mapChargeRider[ITEM.coverageCode+itemSelected.tertanggungKey] = result/12;
									}else{
										mapChargeRider[ITEM.coverageCode+itemSelected.tertanggungKey] = result;
									}
								}
								else{
									if(formula.formulaTypeCd === 'CHARGERIDER'){
										mapChargeRider[ITEM.coverageCode+itemSelected.tertanggungKey] = 
											mapChargeRider[ITEM.coverageCode+itemSelected.tertanggungKey] + result/12;
									}else{
										mapChargeRider[ITEM.coverageCode+itemSelected.tertanggungKey] = 
										 mapChargeRider[ITEM.coverageCode+itemSelected.tertanggungKey] + result;
									}
								}
							  }
							
							result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isPIA, paramMap, result);
							
							if(isFIA){
								result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isFIA, paramMap, result);
							}

							  if(tmpFormula.output == 'TOTALPREMIUMWITHACCPREMIUM'){
								  paramMap['TOTALPREMIUMWITHACCPREMIUM']	= resultAlternativeAsumtion;
							  }

							result = checkCovTermPpayorAndCovTermWaiver(tmpFormula, itemSelected, mapOutputCoverage, result);

								  if(tmpFormula.output == 'CVWITHDRAW'){
									  cvWithdrawValue = result;
								  }

								  if(tmpFormula.output === 'COVTERM_PPAYOR01' || tmpFormula.output === 'COVTERM_WAIVER02'
									  || tmpFormula.output === 'COVTERM_PPAYOR02' || tmpFormula.output === 'COVTERM_WAIVER01'){

									  if(mapOutputCoverage[tmpFormula.output]){
										  result = 0;
									  }

								  }

								  if(tmpFormula.output == 'SA_PIA' || tmpFormula.output == 'SA_PSIA'){
									  sumAssuredPIA += result;
									  if(isFIA){
										sumAssuredFIA += result;
									  }
								  }

								  if(isPIA){
									  if(tmpFormula.output == 'PIAGIOIDR' && result == '1'){
										  mapResult['isGio'] = '1';				  				
									  }else if(tmpFormula.output == 'PIAGIOUSD' && result == '1'){
										  mapResult['isGio'] = '1';					  				
									  }else if(tmpFormula.output == 'PSIAGIO' && result == '1'){
										  mapResult['isGio'] = '1';
									  }
									 
									  if((tmpFormula.output == 'PIAGIOIDR' || tmpFormula.output == 'PIAGIOUSD' || tmpFormula.output == 'PSIAGIO') && paramMap.year == '1'){
										for(var pi = 0; pi < paramMap.manfaatList.length; pi++){
											if(itemSelected.code == paramMap.manfaatList[pi].code){
												paramMap.manfaatList[pi].showCode = result;
											}
										}
									  }
								  }

								  if(isFIA){
									if(tmpFormula.output == 'FIAGIOIDR' && result == '1'){
										mapResult['isGio'] = '1';				  				
									}else if(tmpFormula.output == 'FIAGIOUSD' && result == '1'){
										mapResult['isGio'] = '1';					  				
									}else if(tmpFormula.output == 'FSIAGIO' && result == '1'){
										mapResult['isGio'] = '1';
									}

									if((tmpFormula.output == 'FIAGIOIDR' || tmpFormula.output == 'FIAGIOUSD' || tmpFormula.output == 'FSIAGIO') && paramMap.year == '1'){
									  for(var pi = 0; pi < paramMap.manfaatList.length; pi++){
										  if(itemSelected.code == paramMap.manfaatList[pi].code){
											  paramMap.manfaatList[pi].showCode = result;
										  }
									  }
									}
								  }

								  if(tmpFormula.output == 'FUNDAVAL' && cvWithdrawValue > 1){
									  if(result == '1'){
										  mapOutputCoverage[tmpFormula.output] = result;
										  break;
									  }
								  }

								  if(formula.formulaTypeCd == 'BUFFER' && buttonType != 'hitung'){
									  bufferArr.push(resultAlternativeAsumtion);			  				
								  }

								  if(formula.formulaTypeCd.toUpperCase() == 'SUMMPREM' && isPAA2 && buttonType != 'hitung' && PDALLO != ''){
									  pdAlloArr.push(PDALLO);
								  }

								  if(tmpFormula.output == 'PREMIUMACCUMULATION' && buttonType != 'hitung'){

									  var temp = 0;
									var len = bufferArr.length;
									var min = 1;
									

									  for(var i = 0; i < bufferArr.length; i++){
									   temp = getResultExpression(bufferArr[i]*pdAlloArr[len-min]+temp);
									   min++;									   
									}
									
									result = temp;
									resultAlternativeAsumtion = temp;
								  }

								  
								  if(tmpFormula.output == 'TOTALSAWITHACCSALINKTERM' && paramMap.year == '1'){
									  /*result = getResultExpression((mapOutputCoverage['SA_LINKTERM'] ? mapOutputCoverage['SA_LINKTERM'] : 0.0)
									  +(mapOutputCoverage['SAINCREASELINKTERM'] ? mapOutputCoverage['SAINCREASELINKTERM'] : 0.0));									  */
									  resultAlternativeAsumtion = result;
								  }
								  
								  tempResult = applyRoundingToSomeCasesAll(tmpFormula, result, resultAlternativeAsumtion);
								  result = tempResult.result;
								  resultAlternativeAsumtion = tempResult.resultAlternativeAsumtion;
								  
								  if(tmpFormula.formulaCd == 'FRML_INCOME_CUST'){
									  result = "'" + result + "'";
									  resultAlternativeAsumtion = "'" + resultAlternativeAsumtion + "'";
								  }

								parseToLogFile(paramMap, ITEM, tmpFormula, stringFormulaOri, stringFormula, stringFormulaAlt, 
									'in function getResultFormula BOTH', result, resultAlternativeAsumtion, formula, 'nonPph');

							if(tmpFormula.output){
								if('COVERAGE' === tmpFormula.itemType.toUpperCase()){
									//CLIENT_PLANNING
									value = mapOutputCoverage[tmpFormula.output];									
									if(value){
										if("ADMINCHARGE" === mapOutputCoverage[tmpFormula.output] ||
											tmpFormula.output == 'CUSTAGEALTER' || tmpFormula.output == 'CUSTAGEALTER01' || tmpFormula.output == 'CUSTAGEALTER02'){
										  mapOutputCoverage[tmpFormula.output] = value;
										}
										else if(tmpFormula.output == 'PDSACHARGE' || tmpFormula.output == 'TOTALMAINSA'){
											mapOutputCoverage[tmpFormula.output] = result;
										}else{
										  if(tmpFormula.output != 'SABASIC' && tmpFormula.output != 'SA_LINKTERM'){
											value = (value + result) ;		
										  }
										  else if(tmpFormula.output == 'SA_LINKTERM'){// && tmpFormula.output != 'SA_LINKTERM'){
											value = result;		
										  }

										  mapOutputCoverage[tmpFormula.output] = value;
										}
									}else{
										if(tmpFormula.formulaCd == 'FRMLALLOPREMI09' && tmpFormula.output == 'ALLOCATEDSAVER'){
											mapOutputCoverage[tmpFormula.output + '_CLIENT'] = result;
										}
										else if(tmpFormula.formulaCd == 'FRMLALLOPREMI08' && tmpFormula.output == 'ALLOCATEDSAVER'){
											//mapOutputCoverage[tmpFormula.output + '_ALT'] = result;
										}
										else if((tmpFormula.output != 'SABASIC' && formula.formulaTypeCd != 'FT_PRECALC')
												|| (tmpFormula.output == 'SABASIC' && mapOutputCoverage['SABASIC'] === undefined)){/*case kalo SABASICnya ga keisi*/
											mapOutputCoverage[tmpFormula.output] = result;
										}

									}

									if(tmpFormula.output == 'PREMIUMACCUMULATION'){
										mapOutputCoverage[tmpFormula.output] = result;	
									}

									if("TOTALDEATHBENEFITPGB" === tmpFormula.output){
										  mapOutputFund[tmpFormula.output] = result;
									}
									if("TOTALPREMIUMWITHACCPREMIUM" === tmpFormula.output){
										  mapOutputFund[tmpFormula.output] = result;
									}

									//ALTERNATIVE
									value = mapOutputCoverageAlt[tmpFormula.output];
									if(value){
										if("ADMINCHARGE" === mapOutputCoverageAlt[tmpFormula.output] ||
											tmpFormula.output == 'CUSTAGEALTER' || tmpFormula.output == 'CUSTAGEALTER01' || tmpFormula.output == 'CUSTAGEALTER02'){
										  mapOutputCoverageAlt[tmpFormula.output] = value;
										}else if(tmpFormula.output == 'PDSACHARGE' || tmpFormula.output == 'TOTALMAINSA'){
											mapOutputCoverageAlt[tmpFormula.output] = result;
										}else{
										  if(tmpFormula.output != 'SABASIC' && tmpFormula.output != 'SA_LINKTERM'){
											value = (value + resultAlternativeAsumtion) ;		
										  }
										  else if(tmpFormula.output == 'SA_LINKTERM'){// && tmpFormula.output != 'SA_LINKTERM'){
											value = result;		
										  }
										  mapOutputCoverageAlt[tmpFormula.output] = value;
										}
									}else{
										if(tmpFormula.formulaCd == 'FRMLALLOPREMI09' && tmpFormula.output == 'ALLOCATEDSAVER'){

										}
										else if(tmpFormula.formulaCd == 'FRMLALLOPREMI08' && tmpFormula.output == 'ALLOCATEDSAVER'){
											mapOutputCoverageAlt[tmpFormula.output + '_ALT'] = resultAlternativeAsumtion;
										}
										else if((tmpFormula.output != 'SABASIC' && formula.formulaTypeCd != 'FT_PRECALC')
												|| (tmpFormula.output == 'SABASIC' && mapOutputCoverageAlt['SABASIC'] === undefined)){/*case kalo SABASICnya ga keisi*/
											mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
										}
									}

									if(tmpFormula.output == 'PREMIUMACCUMULATION'){
										mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;	
									}
									
									if(tmpFormula.output == 'FRML_TOTAL_ANNUALIZED_PREMIUM_ROP' ||
											tmpFormula.output == 'FRML_ANNUAL_PREMIUM_ROP'){
										paramMap[tmpFormula.output] = result;
									}

									setParamMapByFormulaOutputAndFormulaTypeCd(tmpFormula, formula, paramMap, result, resultAlternativeAsumtion);

									if(tmpFormula.output == 'OF_TOTALANNUALIZEDPREMIUMROP' ||
											tmpFormula.output == 'OF_ANNUALPREMIUMROP'){
										paramMap[tmpFormula.output] = result;
										paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
									}
									
									if(tmpFormula.output == 'OF_TOTALANNUALIZEDCONTNONPAR' ||
											tmpFormula.output == 'OF_ANNUALCONTNONPAR'){
										paramMap[tmpFormula.output] = result;
										paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
									}

									if("TOTALCHARGECCB" === tmpFormula.output){
										  mapOutputCoverage[tmpFormula.output] = result;
										  mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
									}

									if("TOTALDEATHBENEFITPGB" === tmpFormula.output){
										  mapOutputFundAlt[tmpFormula.output] = resultAlternativeAsumtion;
									}

									//SET NEW KEY PDPREMI IF FORMULATYPE = 'RIDERPREMIUM' / BIAYA ASURANSI PERTAHUN
									if('RIDERPREMIUM' == formula.formulaTypeCd && tmpFormula.output == 'TOTALRIDERPREMIUM'){
										if(map["PREVIOUSRIDERCODE"] == itemSelected.code && map["PREVIOUSCUSTOMERKEY"] == itemSelected.tertanggungKey){
											map["PDPREMI"] = map["PDPREMI"] + result;
										}
										else{
											map["PDPREMI"] = result;
										}
										map["PREVIOUSRIDERCODE"] = itemSelected.code;
										map["PREVIOUSCUSTOMERKEY"] = itemSelected.tertanggungKey;
										mapResultFormula.riderPremium = result;
									}
									
									//alter simpen basicPremium
									if('FT_BASICPREMIUM' == formula.formulaTypeCd && 'TOTALBASICPREMI' == tmpFormula.output){
										mapResultFormula.basicPremium = result;
									}
									//end alter simpen basicPremium
									
									//alter simpen cumulativeCurrentResult
									if('FRML_CUMULATIVE_CURRENT_RESULT_CALCULATED' == formula.code && 'OF_CUMULATIVECURRENTRESULTCALCULATED' == tmpFormula.output){
										mapResultFormula.cumulativeCurrentResultCalculated = result;
									}
									//end alter simpen cumulativeCurrentResult

									if(isPIA || isFIA){
										// karena PIA tidak ada rider premium, maka PDPREMI ngambil dari SA
										map["PDPREMI"] = map['CUSTPREMI'];							        	
									}

									//CHARGE / BIAYA ANGSURAN BULANAN
									if('CHARGERIDER' == formula.formulaTypeCd || 'CHARGEINSURANCE' == formula.formulaTypeCd){
										  mapResultFormula[formula.formulaTypeCd] = (result/12);
									}

									if('CONSVAL' == formula.formulaTypeCd && tmpFormula.output == 'MAXLVPREMI'){
										mapResultFormula["MAXLVPREMI"] = result;
									}

									if(true == tmpFormula.forSpecificRider){
										mapOutputCoverage[tmpFormula.output + "_" + tmpFormula.coverage] = result;
										mapOutputCoverageAlt[tmpFormula.output + "_" + tmpFormula.coverage] = resultAlternativeAsumtion;
									}
									

								}else if('FUND' === tmpFormula.itemType.toUpperCase()){
									var itemCd = ITEM.code;

									value = mapOutputCoverage[formula.formulaTypeCd];
									if(value){
										value = (value + result) ;
										mapOutputCoverage[formula.formulaTypeCd] = value;
									}else{
										mapOutputCoverage[formula.formulaTypeCd] = result;
									}

									value = mapOutputCoverageAlt[formula.formulaTypeCd];
									if(value){
										value = (value + resultAlternativeAsumtion) ;
										mapOutputCoverageAlt[formula.formulaTypeCd] = value;
									}else{
										mapOutputCoverageAlt[formula.formulaTypeCd] = resultAlternativeAsumtion;
									}							        	

									//CLIENT PLANNING
									if(mapOutputFund[itemCd] == undefined){
										mapOutputFund[itemCd] =  {};
									}
									mapOutputFund[itemCd][tmpFormula.output] = result;
									
									//ALTERNATIVE
									if(mapOutputFundAlt[itemCd] == undefined){
										mapOutputFundAlt[itemCd] =  {};
									}
									mapOutputFundAlt[itemCd][tmpFormula.output] = resultAlternativeAsumtion;

									//ASUMSTION FUND
									if(tmpFormula.output == 'CVTOTALHIGHDISPLAY' || tmpFormula.output == 'CVTOTALMEDDISPLAY' || tmpFormula.output == 'CVTOTALLOWDISPLAY'){
										  mapResultPerYear[tmpFormula.output] = result;
										mapResultPerYear['ALT'+tmpFormula.output] = resultAlternativeAsumtion;
									  }

									  if(paramMap.year == '20'){
										  if("OFF_TOTALPRUBOOSTERLOW" === tmpFormula.output || "OFF_TOTALPRUBOOSTERMED" === tmpFormula.output || "OFF_TOTALPRUBOOSTERHIGH" === tmpFormula.output){
											paramMap[tmpFormula.output] = result;
										}	
									  }
							   }
							}
						}
					}
					checkingIfButtonHitung(buttonType, tmpFormula, formula, mapResultFormula, mapOutputCoverage, result, undefined, undefined, true, false);

					mapResultFormula['CHARGERIDER'] = mapChargeRider;
					mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
					mapResultFormula['MAPOUTPUTFUND'] = mapOutputFund;			      	
					mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;
					mapResultFormula['MAPOUTPUTFUNDALT'] = mapOutputFundAlt;
				}
			}

			// BASIC
			var tempMapFormulaListBasic = ITEM.FORMULA_BASIC;
			if(tempMapFormulaListBasic != undefined){
				for(var j = 0; j < tempMapFormulaListBasic.length; j++){
					  var tmpFormula = tempMapFormulaListBasic[j];
					  var stringFormula = '';
					  var stringFormulaAlt = '';
					  var stringFormulaOri = '';
					  var result = 0;
					  var resultAlternativeAsumtion = 0;
					  var value;

					  if(tmpFormula.itemType.toLowerCase() == 'fund' && tmpFormula.itemGroupProductCd.indexOf(map.mainCoverage) == -1){
						  continue;
					  }


					var formula = rootScope.FORMULA[tmpFormula.formulaCd];
					if(formula){
							var isProcess = false;
						  if(ITEM.flagDB == true && (formula.formulaTypeCd.indexOf('TOTALCVDB') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVTOPUPLOWDISPLAY') !== -1)){
							  isProcess = true;
						  }else if(ITEM.flagDB == false && (formula.formulaTypeCd.indexOf('TOTALCVDB') === -1 && formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVTOPUPLOWDISPLAY') === -1)){
							  isProcess = true;
						}else if(itemSelected.type === 'COVERAGE'){
							  isProcess = true;
						}

						if(isProcess){
							  var tempFormulaElementList = formula.FORMULA_ELEMENT;

							for(var k = 0; k < tempFormulaElementList.length; k++){
								var fe = tempFormulaElementList[k];
								fe.value = fe.value == "''" ? '' : fe.value.trim();
								stringFormulaOri += fe.value;

								if(fe.type.toLowerCase().trim() === "coverage"
									|| fe.type.toLowerCase().trim() === "customer"
									|| fe.type.toLowerCase().trim() === "rate"
									|| fe.type.toLowerCase().trim() === "fund"
									|| fe.type.toLowerCase().trim() === "product"
									|| fe.type.toLowerCase().trim() === "allocation"
									|| fe.type.toLowerCase().trim() === "predefined"){

									if(fe.value.toUpperCase() === 'CUSTINCOME'){
										  stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'PDPLAN'){
										  stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
										  stringFormulaAlt += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
									}else if(fe.value.toUpperCase() === 'PDALLO'){
										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}else if(fe.value.toUpperCase() == 'PDSA' && isPIA){
										stringFormula += sumAssuredPIA;
										 stringFormulaAlt += sumAssuredPIA;
									 }else if(fe.value.toUpperCase() == 'PDSA' && isFIA){
										stringFormula += sumAssuredFIA;
										 stringFormulaAlt += sumAssuredFIA;
									 }else if(fe.value.toUpperCase() == 'PDSA' && isPAA2 /*&& (ITEM.coverageCode == 'U10R' || ITEM.coverageCode == 'U11R')*/){
										 stringFormula += map['CUSTSA'];
										 stringFormulaAlt += map['CUSTSA'];
									}else if(fe.value.toUpperCase() === 'YEAR'){
										  stringFormula += paramMap.year;
										  stringFormulaAlt += paramMap.year;
									}else if(fe.value.toUpperCase() === 'RTSARANNUITY'){
										var factor = getFactorFromAnuityByMonth(map['CUSTAGEMONTH'], ITEM.ANNUITY);
										  stringFormula += factor;
										  stringFormulaAlt += factor;
									 }else if(tmpFormula.output == 'FUNDAVAL' && fe.value.toUpperCase() == 'TOTALCVLOW'){
										 stringFormula += TOTALCVLOWFUNDAVAL;
										 stringFormulaAlt += TOTALCVLOWFUNDAVAL;

									}else if(ITEM.flagDB == true && fe.value.indexOf('TOTALCV') !== -1){
										  stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}else{							          	 
										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "load"){
								  stringFormula += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								  stringFormulaAlt += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								}else if(fe.type.toLowerCase().trim() === "formula"){
									if(fe.value.toUpperCase() === 'MAXLVPREMI'){
										stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'DIFFLVPREMI'){
										stringFormula += "" + DIFFLVPREMI +"";
										  stringFormulaAlt += "" + DIFFLVPREMI +"";
									}else if(fe.value.toUpperCase() == 'ALLOCATEDSAVER'){
										stringFormula += mapOutputCoverage[fe.value.toUpperCase()+'_CLIENT'] ? mapOutputCoverage[fe.value.toUpperCase()+'_CLIENT'] : '0.0';
										stringFormulaAlt += mapOutputCoverageAlt[fe.value.toUpperCase()+'_ALT'] ? mapOutputCoverageAlt[fe.value.toUpperCase()+'_ALT'] : '0.0';
									}else{
										stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "formulafund"){
									var tempStringFormula = setStringFormulaForFormulaBasicByFormulaElementTypeIsFormulaFund(fe, stringFormula, stringFormulaAlt,
										paramMap, ITEM, mapOutputFund, mapOutputFundAlt);
									stringFormula = tempStringFormula.stringFormula;
									stringFormulaAlt = tempStringFormula.stringFormulaAlt;
								}else if(fe.type.toLowerCase().trim() === "string"){
								  stringFormula += "\'"+fe.value+"\'";
								  stringFormulaAlt += "\'"+fe.value+"\'";
								}else{
								  stringFormula += fe.value;
								  stringFormulaAlt += fe.value;
								}
							}

							if(isValidExpression(stringFormula)){

								var tempStringFormula = processPowAndMinusNegativeOnFormula(stringFormula, stringFormulaAlt);

								  result = getResultExpression(tempStringFormula.stringFormula);
								  resultAlternativeAsumtion = getResultExpression(tempStringFormula.stringFormulaAlt);

								  result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isPIA, paramMap, result);

								  if(isFIA){
									result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isFIA, paramMap, result);
								  }

								  if(tmpFormula.output == 'DIFFLVPREMI'){
									if(mapResultFormula['DIFFLVPREMI']){
										// result = map['DIFFLVPREMI'];
									}else{
										map['DIFFLVPREMI'] = result;
										mapResultFormula['DIFFLVPREMI'] = result;
									}
								}

								result = checkCovTermPpayorAndCovTermWaiver(tmpFormula, itemSelected, mapOutputCoverage, result);
								
									  if(tmpFormula.output == 'CVWITHDRAW'){
										  cvWithdrawValue = result;
									  }

									  if(tmpFormula.output === 'COVTERM_PPAYOR01' || tmpFormula.output === 'COVTERM_WAIVER02'
										  || tmpFormula.output === 'COVTERM_PPAYOR02' || tmpFormula.output === 'COVTERM_WAIVER01'){

										  if(mapOutputCoverage[tmpFormula.output]){
											  result = 0;
										  }

									  }

									  if(tmpFormula.output == 'SA_PIA' || tmpFormula.output == 'SA_PSIA'){
										  sumAssuredPIA += result;
									  }

									  if(isPIA){
										  if(tmpFormula.output == 'PIAGIOIDR' && result == '1'){
											  mapResult['isGio'] = '1';					  				
										  }else if(tmpFormula.output == 'PIAGIOUSD' && result == '1'){
											  mapResult['isGio'] = '1';					  				
										  }else if(tmpFormula.output == 'PSIAGIO' && result == '1'){
											  mapResult['isGio'] = '1';
										  }

										  if((tmpFormula.output == 'PIAGIOIDR' || tmpFormula.output == 'PIAGIOUSD' || tmpFormula.output == 'PSIAGIO') && paramMap.year == '1'){
											for(var pi = 0; pi < paramMap.manfaatList.length; pi++){
												if(itemSelected.code == paramMap.manfaatList[pi].code){
													paramMap.manfaatList[pi].showCode = result;
												}
											}
										  }
	  
									  }

									  if(isFIA){
										if(tmpFormula.output == 'FIAGIOIDR' && result == '1'){
											mapResult['isGio'] = '1';					  				
										}else if(tmpFormula.output == 'FIAGIOUSD' && result == '1'){
											mapResult['isGio'] = '1';					  				
										}else if(tmpFormula.output == 'FSIAGIO' && result == '1'){
											mapResult['isGio'] = '1';
										}

										if((tmpFormula.output == 'FIAGIOIDR' || tmpFormula.output == 'FIAGIOUSD' || tmpFormula.output == 'FSIAGIO') && paramMap.year == '1'){
										  for(var pi = 0; pi < paramMap.manfaatList.length; pi++){
											  if(itemSelected.code == paramMap.manfaatList[pi].code){
												  paramMap.manfaatList[pi].showCode = result;
											  }
										  }
										}
	
									}

									  if(tmpFormula.output == 'FUNDAVAL' && cvWithdrawValue > 1){
										  if(result == '1'){
											  mapOutputCoverage[tmpFormula.output] = result;
											  break;
										  }
									  }

									tempResult = applyRoundingToSomeCasesAll(tmpFormula, result, resultAlternativeAsumtion);
									result = tempResult.result;
									resultAlternativeAsumtion = tempResult.resultAlternativeAsumtion;
								  
									parseToLogFile(paramMap, ITEM, tmpFormula, stringFormulaOri, stringFormula, stringFormulaAlt, 
										'in function getResultFormula BASIC', result, resultAlternativeAsumtion, formula, 'nonPph');
								
									setParamMapByResultAndResultAltBasedOnFormulaTypeCd(formula, tmpFormula, paramMap, result, resultAlternativeAsumtion);

								if(tmpFormula.output){
									if('COVERAGE' === tmpFormula.itemType.toUpperCase()){
										//CLIENT_PLANNING
										value = mapOutputCoverage[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverage[tmpFormula.output]){
											  mapOutputCoverage[tmpFormula.output] = value;
											}else{
											  value = (value + result) ;
											  mapOutputCoverage[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverage[tmpFormula.output] = result;
										}

										if("TOTALPREMIUMWITHACCPREMIUM" === tmpFormula.output){
										  mapOutputFund[tmpFormula.output] = result;
										}
										//ALTERNATIVE
										value = mapOutputCoverageAlt[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverageAlt[tmpFormula.output]){
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}else{
											  value = (value + resultAlternativeAsumtion) ;
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
										}

										  //SET NEW KEY PDPREMI IF FORMULATYPE = 'RIDERPREMIUM' / BIAYA ASURANSI PERTAHUN
										if('RIDERPREMIUM' == formula.formulaTypeCd && tmpFormula.output == 'TOTALRIDERPREMIUM'){
											if(map["PREVIOUSRIDERCODE"] == itemSelected.code && map["PREVIOUSCUSTOMERKEY"] == itemSelected.tertanggungKey){
												map["PDPREMI"] = map["PDPREMI"] + result;
											}
											else{
												map["PDPREMI"] = result;
											}
											map["PREVIOUSRIDERCODE"] = itemSelected.code;
											map["PREVIOUSCUSTOMERKEY"] = itemSelected.tertanggungKey;
											mapResultFormula.riderPremium = result;	
										}

										if(isPIA || isFIA){
											// karena PIA tidak ada rider premium, maka PDPREMI ngambil dari SA
											  map["PDPREMI"] = map['CUSTPREMI'];							        	
										  }else if(isPAA2){
											  map["PDPREMI"] = map['CUSTSAVER'];
										  }

										//CHARGE / BIAYA ANGSURAN BULANAN
										if('CHARGERIDER' == formula.formulaTypeCd || 'CHARGEINSURANCE' == formula.formulaTypeCd){
											  mapResultFormula[formula.formulaTypeCd] = (result/12);
										}

										if('CONSVAL' == formula.formulaTypeCd && tmpFormula.output == 'MAXLVPREMI'){
											mapResultFormula["MAXLVPREMI"] = result;
										}

									}else if('FUND' === tmpFormula.itemType.toUpperCase()){
										var itemCd = ITEM.code;

										value = mapOutputCoverage[formula.formulaTypeCd];
										if(value){
											value = (value + result) ;
											mapOutputCoverage[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverage[formula.formulaTypeCd] = result;
										}

										value = mapOutputCoverageAlt[formula.formulaTypeCd];
										if(value){
											value = (value + resultAlternativeAsumtion) ;
											mapOutputCoverageAlt[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverageAlt[formula.formulaTypeCd] = resultAlternativeAsumtion;
										}

										//CLIENT PLANNING
										if(mapOutputFund[itemCd] == undefined){
											mapOutputFund[itemCd] =  {};
										}
										mapOutputFund[itemCd][tmpFormula.output] = result;
										
										//ALTERNATIVE
										if(mapOutputFundAlt[itemCd] == undefined){
											mapOutputFundAlt[itemCd] =  {};
										}
										mapOutputFundAlt[itemCd][tmpFormula.output] = resultAlternativeAsumtion;

										//ASUMSTION FUND
										if(tmpFormula.output == 'CVTOTALHIGHDISPLAY' || tmpFormula.output == 'CVTOTALMEDDISPLAY' || tmpFormula.output == 'CVTOTALLOWDISPLAY'){
											  mapResultPerYear[tmpFormula.output] = result;
											mapResultPerYear['ALT'+tmpFormula.output] = resultAlternativeAsumtion;
										  }

										  if(paramMap.year == '20'){
											  if("OFF_TOTALPRUBOOSTERLOW" === tmpFormula.output || "OFF_TOTALPRUBOOSTERMED" === tmpFormula.output || "OFF_TOTALPRUBOOSTERHIGH" === tmpFormula.output){
												paramMap[tmpFormula.output] = (paramMap[tmpFormula.output]==undefined?0:paramMap[tmpFormula.output])+result;
											}	
										  }
								   }
								}
							}
						}
						checkingIfButtonHitung(buttonType, tmpFormula, formula, mapResultFormula, mapOutputCoverage, result, undefined, undefined, false, false);

					mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
					mapResultFormula['MAPOUTPUTFUND'] = mapOutputFund;				      	
					mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;
					mapResultFormula['MAPOUTPUTFUNDALT'] = mapOutputFundAlt;				      	
					}
				}
			}

			// SAVER

			var tempMapFormulaListSaver = ITEM.FORMULA_SAVER;
			if(tempMapFormulaListSaver != undefined){
				for(var j = 0; j < tempMapFormulaListSaver.length; j++){
					  var tmpFormula = tempMapFormulaListSaver[j];
					  var stringFormula = '';
					  var stringFormulaAlt = '';
					  var stringFormulaOri = '';
					  var result = 0;
					  var resultAlternativeAsumtion = 0;
					  var value;

					  if(tmpFormula.itemType.toLowerCase() == 'fund' && tmpFormula.itemGroupProductCd.indexOf(map.mainCoverage) == -1){
						  continue;
					  }

					var formula = rootScope.FORMULA[tmpFormula.formulaCd];
					if(formula){
							var isProcess = false;
						  if(ITEM.flagDB == true && (formula.formulaTypeCd.indexOf('TOTALCVDB') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVTOPUPLOWDISPLAY') !== -1)){
							  isProcess = true;
						  }else if(ITEM.flagDB == false && (formula.formulaTypeCd.indexOf('TOTALCVDB') === -1 && formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVTOPUPLOWDISPLAY') === -1)){
							  isProcess = true;
						}else if(itemSelected.type === 'COVERAGE'){
							  isProcess = true;
						}

						if(isProcess){
							  var tempFormulaElementList = formula.FORMULA_ELEMENT;

							for(var k = 0; k < tempFormulaElementList.length; k++){
								var fe = tempFormulaElementList[k];
								fe.value = fe.value == "''" ? '' : fe.value.trim();
								stringFormulaOri += fe.value;

								if(fe.type.toLowerCase().trim() === "coverage"
									|| fe.type.toLowerCase().trim() === "customer"
									|| fe.type.toLowerCase().trim() === "rate"
									|| fe.type.toLowerCase().trim() === "fund"
									|| fe.type.toLowerCase().trim() === "product"
									|| fe.type.toLowerCase().trim() === "allocation"
									|| fe.type.toLowerCase().trim() === "predefined"){

									if(fe.value.toUpperCase() === 'CUSTINCOME'){
										  stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'PDPLAN'){
										  stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
										  stringFormulaAlt += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
									}else if(fe.value.toUpperCase() === 'PDALLO'){
										stringFormula += map['PDALLO_TOPUP'] ? map['PDALLO_TOPUP'] : '0.0';
										stringFormulaAlt += map['PDALLO_TOPUP'] ? map['PDALLO_TOPUP'] : '0.0';
									}else if(fe.value.toUpperCase() == 'PDSA' && isPIA){
										stringFormula += sumAssuredPIA;
										 stringFormulaAlt += sumAssuredPIA;
									 }else if(fe.value.toUpperCase() == 'PDSA' && isFIA){
										stringFormula += sumAssuredFIA;
										 stringFormulaAlt += sumAssuredFIA;
									 }else if(fe.value.toUpperCase() == 'PDSA' && isPAA2 /*&& (ITEM.coverageCode == 'U10R' || ITEM.coverageCode == 'U11R')*/){
										 stringFormula += map['CUSTSA'];
										 stringFormulaAlt += map['CUSTSA'];
									}else if(fe.value.toUpperCase() === 'YEAR'){
										  stringFormula += paramMap.year;
										  stringFormulaAlt += paramMap.year;
									}else if(fe.value.toUpperCase() === 'RTSARANNUITY'){
										var factor = getFactorFromAnuityByMonth(map['CUSTAGEMONTH'], ITEM.ANNUITY);
										  stringFormula += factor;
										  stringFormulaAlt += factor;
									 }else if(tmpFormula.output == 'FUNDAVAL' && fe.value.toUpperCase() == 'TOTALCVLOW'){
										 stringFormula += TOTALCVLOWFUNDAVAL;
										 stringFormulaAlt += TOTALCVLOWFUNDAVAL;

									}else if(ITEM.flagDB == true && fe.value.indexOf('TOTALCV') !== -1){
										  stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}else{
										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "load"){
								  stringFormula += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								  stringFormulaAlt += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								}else if(fe.type.toLowerCase().trim() === "formula"){
									if(fe.value.toUpperCase() === 'MAXLVPREMI'){
										stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'DIFFLVPREMI'){
										stringFormula += "" + DIFFLVPREMI +"";
										  stringFormulaAlt += "" + DIFFLVPREMI +"";
									}else if(fe.value.toUpperCase() == 'ALLOCATEDSAVER'){
										stringFormula += mapOutputCoverage[fe.value.toUpperCase()+'_CLIENT'] ? mapOutputCoverage[fe.value.toUpperCase()+'_CLIENT'] : '0.0';
										stringFormulaAlt += mapOutputCoverageAlt[fe.value.toUpperCase()+'_ALT'] ? mapOutputCoverageAlt[fe.value.toUpperCase()+'_ALT'] : '0.0'; 

									}else{
										stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "formulafund"){
									var tempStringFormula = setStringFormulaForFormulaSaverByFormulaElementTypeIsFormulaFund(fe, stringFormula, stringFormulaAlt, paramMap,
										tmpFormula, ITEM, mapOutputFund, mapOutputFundAlt, null, null, false);
									stringFormula = tempStringFormula.stringFormula;
									stringFormulaAlt = tempStringFormula.stringFormulaAlt;
								}else if(fe.type.toLowerCase().trim() === "string"){
								  stringFormula += "\'"+fe.value+"\'";
								  stringFormulaAlt += "\'"+fe.value+"\'";
								}else{
								  stringFormula += fe.value;
								  stringFormulaAlt += fe.value;
								}
							}
							
							if(isValidExpression(stringFormula)){
								
								var tempStringFormula = processPowAndMinusNegativeOnFormula(stringFormula, stringFormulaAlt);

								  result = getResultExpression(tempStringFormula.stringFormula);
								  resultAlternativeAsumtion = getResultExpression(tempStringFormula.stringFormulaAlt);

								  result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isPIA, paramMap, result);

								  if(isFIA){
									result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isFIA, paramMap, result);
								  } 	

								  if(tmpFormula.output == 'DIFFLVPREMI'){
									if(mapResultFormula['DIFFLVPREMI']){
										// result = map['DIFFLVPREMI'];
									}else{
										map['DIFFLVPREMI'] = result;
										mapResultFormula['DIFFLVPREMI'] = result;
									}
								}

								result = checkCovTermPpayorAndCovTermWaiver(tmpFormula, itemSelected, mapOutputCoverage, result);

									  if(tmpFormula.output == 'CVWITHDRAW'){
										  cvWithdrawValue = result;
									  }

									  if(tmpFormula.output === 'COVTERM_PPAYOR01' || tmpFormula.output === 'COVTERM_WAIVER02'
										  || tmpFormula.output === 'COVTERM_PPAYOR02' || tmpFormula.output === 'COVTERM_WAIVER01'){

										  if(mapOutputCoverage[tmpFormula.output]){
											  result = 0;
										  }

									  }

									  if(tmpFormula.output == 'SA_PIA' || tmpFormula.output == 'SA_PSIA'){
										  sumAssuredPIA += result;
									  }

									  if(isPIA){
										  if(tmpFormula.output == 'PIAGIOIDR' && result == '1'){
											  mapResult['isGio'] = '1';					  				
										  }else if(tmpFormula.output == 'PIAGIOUSD' && result == '1'){
											  mapResult['isGio'] = '1';					  				
										  }else if(tmpFormula.output == 'PSIAGIO' && result == '1'){
											  mapResult['isGio'] = '1';
										  }

										  if((tmpFormula.output == 'PIAGIOIDR' || tmpFormula.output == 'PIAGIOUSD' || tmpFormula.output == 'PSIAGIO') && paramMap.year == '1'){
											for(var pi = 0; pi < paramMap.manfaatList.length; pi++){
												if(itemSelected.code == paramMap.manfaatList[pi].code){
													paramMap.manfaatList[pi].showCode = result;
												}
											}
										  }
											  
									  }

									  if(isFIA){
										if(tmpFormula.output == 'FIAGIOIDR' && result == '1'){
											mapResult['isGio'] = '1';					  				
										}else if(tmpFormula.output == 'FIAGIOUSD' && result == '1'){
											mapResult['isGio'] = '1';					  				
										}else if(tmpFormula.output == 'FSIAGIO' && result == '1'){
											mapResult['isGio'] = '1';
										}

										if((tmpFormula.output == 'FIAGIOIDR' || tmpFormula.output == 'FIAGIOUSD' || tmpFormula.output == 'FSIAGIO') && paramMap.year == '1'){
										  for(var pi = 0; pi < paramMap.manfaatList.length; pi++){
											  if(itemSelected.code == paramMap.manfaatList[pi].code){
												  paramMap.manfaatList[pi].showCode = result;
											  }
										  }
										}
											
									}

									  if(tmpFormula.output == 'FUNDAVAL' && cvWithdrawValue > 1){
										  if(result == '1'){
											  mapOutputCoverage[tmpFormula.output] = result;
											  break;
										  }
									  }

									  if(tmpFormula.output == 'TOPUPDEDUCTIONLOW01'){
										  paramMap[tmpFormula.output+'CLIENT'] = result;
										  paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
									  }

									  if(tmpFormula.output == 'TOPUPDEDUCTIONMED01'){
										  paramMap[tmpFormula.output+'CLIENT'] = result;
										  paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
									  }

									  if(tmpFormula.output == 'TOPUPDEDUCTIONHIGH01'){
										  paramMap[tmpFormula.output+'CLIENT'] = result;
										  paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
									  }

									  if(tmpFormula.output == 'TOPUPDEDUCTIONLOW02'){
										  paramMap[tmpFormula.output+'CLIENT'] = result;
										  paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
									  }

									  if(tmpFormula.output == 'TOPUPDEDUCTIONMED02'){
										  paramMap[tmpFormula.output+'CLIENT'] = result;
										  paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
									  }

									  if(tmpFormula.output == 'TOPUPDEDUCTIONHIGH02'){
										  paramMap[tmpFormula.output+'CLIENT'] = result;
										  paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
									  }

									  setParamMapByResultAndResultAltBasedOnFormulaTypeCd(formula, tmpFormula, paramMap, result, resultAlternativeAsumtion);

									if(tmpFormula.output == 'CVTOPUPLOWTEMP' || tmpFormula.output == 'CVTOPUPMEDTEMP' || tmpFormula.output == 'CVTOPUPHIGHTEMP'){
										var hasil = result.toFixed();
										var hasilAlt = resultAlternativeAsumtion.toFixed();

										result = hasil;
										resultAlternativeAsumtion = hasilAlt;
									}
									
								parseToLogFile(paramMap, ITEM, tmpFormula, stringFormulaOri, stringFormula, stringFormulaAlt, 
										'in function getResultFormula SAVER', result, resultAlternativeAsumtion, formula, 'nonPph');
								  
								if(tmpFormula.output){
									if('COVERAGE' === tmpFormula.itemType.toUpperCase()){
										//CLIENT_PLANNING
										value = mapOutputCoverage[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverage[tmpFormula.output]){
											  mapOutputCoverage[tmpFormula.output] = value;
											}else{
											  value = (value + result) ;
											  mapOutputCoverage[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverage[tmpFormula.output] = result;
										}

										if("TOTALPREMIUMWITHACCPREMIUM" === tmpFormula.output){
										  mapOutputFund[tmpFormula.output] = result;
										}

										//ALTERNATIVE
										value = mapOutputCoverageAlt[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverageAlt[tmpFormula.output]){
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}else{
											  value = (value + resultAlternativeAsumtion) ;
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
										}

										  //SET NEW KEY PDPREMI IF FORMULATYPE = 'RIDERPREMIUM' / BIAYA ASURANSI PERTAHUN
										if('RIDERPREMIUM' == formula.formulaTypeCd && tmpFormula.output == 'TOTALRIDERPREMIUM'){
											if(map["PREVIOUSRIDERCODE"] == itemSelected.code && map["PREVIOUSCUSTOMERKEY"] == itemSelected.tertanggungKey){
												map["PDPREMI"] = map["PDPREMI"] + result;
											}
											else{
												map["PDPREMI"] = result;
											}
											map["PREVIOUSRIDERCODE"] = itemSelected.code;
											map["PREVIOUSCUSTOMERKEY"] = itemSelected.tertanggungKey;
											mapResultFormula.riderPremium = result;	
										}

										if(isPIA || isFIA){
											// karena PIA tidak ada rider premium, maka PDPREMI ngambil dari SA
											  map["PDPREMI"] = map['CUSTPREMI'];							        	
										  }else if(isPAA2){
											  map["PDPREMI"] = map['CUSTSAVER'];
										  }

										//CHARGE / BIAYA ANGSURAN BULANAN
										if('CHARGERIDER' == formula.formulaTypeCd || 'CHARGEINSURANCE' == formula.formulaTypeCd){
											  mapResultFormula[formula.formulaTypeCd] = (result/12);
										}

										if('CONSVAL' == formula.formulaTypeCd && tmpFormula.output == 'MAXLVPREMI'){
											mapResultFormula["MAXLVPREMI"] = result;
										}


									}else if('FUND' === tmpFormula.itemType.toUpperCase()){
										var itemCd = ITEM.code;

										value = mapOutputCoverage[formula.formulaTypeCd];
										if(value){
											value = (value + result) ;
											mapOutputCoverage[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverage[formula.formulaTypeCd] = result;
										}

										value = mapOutputCoverageAlt[formula.formulaTypeCd];
										if(value){
											value = (value + resultAlternativeAsumtion) ;
											mapOutputCoverageAlt[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverageAlt[formula.formulaTypeCd] = resultAlternativeAsumtion;
										}

										if((tmpFormula.output == 'CVTOPUPLOW' || tmpFormula.output == 'CVTOPUPMED' || tmpFormula.output == 'CVTOPUPHIGH') && isPAA2){
											mapOutputCoverage[tmpFormula.output] = Math.ceil(result);
											mapOutputCoverageAlt[tmpFormula.output] = Math.ceil(result);	
										}

										//CLIENT PLANNING
										if(mapOutputFund[itemCd] == undefined){
											mapOutputFund[itemCd] =  {};
										}
										mapOutputFund[itemCd][tmpFormula.output] = result;
										
										//ALTERNATIVE
										if(mapOutputFundAlt[itemCd] == undefined){
											mapOutputFundAlt[itemCd] =  {};
										}
										mapOutputFundAlt[itemCd][tmpFormula.output] = resultAlternativeAsumtion;

										//ASUMSTION FUND
										if(tmpFormula.output == 'CVTOTALHIGHDISPLAY' || tmpFormula.output == 'CVTOTALMEDDISPLAY' || tmpFormula.output == 'CVTOTALLOWDISPLAY'){
											  mapResultPerYear[tmpFormula.output] = result;
											mapResultPerYear['ALT'+tmpFormula.output] = resultAlternativeAsumtion;
										  }

										  if(paramMap.year == '20'){
											  if("OFF_TOTALPRUBOOSTERLOW" === tmpFormula.output || "OFF_TOTALPRUBOOSTERMED" === tmpFormula.output || "OFF_TOTALPRUBOOSTERHIGH" === tmpFormula.output){
												paramMap[tmpFormula.output] = result;
											}	
										  }
									}
								}
							}
						}
						checkingIfButtonHitung(buttonType, tmpFormula, formula, mapResultFormula, mapOutputCoverage, result, undefined, undefined, false, false);

						  mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
						  mapResultFormula['MAPOUTPUTFUND'] = mapOutputFund;				      	
						  mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;
						  mapResultFormula['MAPOUTPUTFUNDALT'] = mapOutputFundAlt;				      	
					}
				}
			}

			   // EMPTY

			var tempMapFormulaListEmpty = ITEM.FORMULA_EMPTY;
			if(tempMapFormulaListEmpty != undefined){
				for(var j = 0; j < tempMapFormulaListEmpty.length; j++){
					  var tmpFormula = tempMapFormulaListEmpty[j];
					  var stringFormula = '';
					  var stringFormulaAlt = '';
					  var stringFormulaOri = '';
					  var result = 0;
					  var resultAlternativeAsumtion = 0;
					  var value;

					  if(tmpFormula.itemType.toLowerCase() == 'fund' && tmpFormula.itemGroupProductCd.indexOf(map.mainCoverage) == -1){
						  continue;
					  }

					var formula = rootScope.FORMULA[tmpFormula.formulaCd];
					if(formula){
							var isProcess = false;
						  if(ITEM.flagDB == true && (formula.formulaTypeCd.indexOf('TOTALCVDB') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') !== -1)){
							  isProcess = true;
						  }else if(ITEM.flagDB == false && (formula.formulaTypeCd.indexOf('TOTALCVDB') === -1 && formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') === -1)){
							  isProcess = true;
						}else if(itemSelected.type === 'COVERAGE'){
							  isProcess = true;
						}

						if(isProcess){
							  var tempFormulaElementList = formula.FORMULA_ELEMENT;

							for(var k = 0; k < tempFormulaElementList.length; k++){
								var fe = tempFormulaElementList[k];
								fe.value = fe.value == "''" ? '' : fe.value.trim();
								stringFormulaOri += fe.value;

								if(fe.type.toLowerCase().trim() === "coverage"
									|| fe.type.toLowerCase().trim() === "customer"
									|| fe.type.toLowerCase().trim() === "rate"
									|| fe.type.toLowerCase().trim() === "fund"
									|| fe.type.toLowerCase().trim() === "product"
									|| fe.type.toLowerCase().trim() === "allocation"
									|| fe.type.toLowerCase().trim() === "predefined"){

									if(fe.value.toUpperCase() === 'CUSTINCOME'){
										  stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'PDPLAN'){
										  stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
										  stringFormulaAlt += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
									}else if(fe.value.toUpperCase() === 'PDALLO'){
										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}else if(fe.value.toUpperCase() == 'PDSA' && isPIA){
										stringFormula += sumAssuredPIA;
										 stringFormulaAlt += sumAssuredPIA;
									 }else if(fe.value.toUpperCase() == 'PDSA' && isFIA){
										stringFormula += sumAssuredFIA;
										 stringFormulaAlt += sumAssuredFIA;
									 }else if(fe.value.toUpperCase() == 'PDSA' && isPAA2 /*&& (ITEM.coverageCode == 'U10R' || ITEM.coverageCode == 'U11R' harusnya ga perlu ini)*/){
										 stringFormula += map['CUSTSA'];
										 stringFormulaAlt += map['CUSTSA'];
									}else if(fe.value.toUpperCase() === 'YEAR'){
										  stringFormula += paramMap.year;
										  stringFormulaAlt += paramMap.year;
									}else if(fe.value.toUpperCase() === 'RTSARANNUITY'){
										var factor = getFactorFromAnuityByMonth(map['CUSTAGEMONTH'], ITEM.ANNUITY);
										  stringFormula += factor;
										  stringFormulaAlt += factor;
									 }else if(tmpFormula.output == 'FUNDAVAL' && fe.value.toUpperCase() == 'TOTALCVLOW'){
										//  stringFormula += TOTALCVLOWFUNDAVAL;
										//  stringFormulaAlt += TOTALCVLOWFUNDAVAL;
										 stringFormula += mapOutputCoverage[fe.value];
                                         stringFormulaAlt += mapOutputCoverage[fe.value];
									 }else if(fe.value.toUpperCase() == 'TOTALCVPREMILOW'){
										 stringFormula += paramMap['TOTALCVPREMILOW'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVPREMILOWALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPLOW'){
										stringFormula += paramMap['TOTALCVTOPUPLOW'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPLOWALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALLBAVLOWRATE'){										
										stringFormula += paramMap['TOTALLBAVLOWRATE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALLBAVLOWRATE'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVLOWSURRVALUE'){
										stringFormula += paramMap['TOTALCVLOWSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVLOWSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPLOWSURRVALUE'){
										stringFormula += paramMap['TOTALCVTOPUPLOWSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPLOWSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVPREMIMED'){
										stringFormula += paramMap['TOTALCVPREMIMED'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVPREMIMEDALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPMED'){
										stringFormula += paramMap['TOTALCVTOPUPMED'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPMEDALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALLBAVMEDRATE'){
										stringFormula += paramMap['TOTALLBAVMEDRATE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALLBAVMEDRATE'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVMEDSURRVALUE'){
										stringFormula += paramMap['TOTALCVMEDSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVMEDSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPMEDSURRVALUE'){
										stringFormula += paramMap['TOTALCVTOPUPMEDSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPMEDSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVPREMIHIGH'){
										stringFormula += paramMap['TOTALCVPREMIHIGH'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVPREMIHIGHALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPHIGH'){
										stringFormula += paramMap['TOTALCVTOPUPHIGH'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPHIGHALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALLBAVHIGHRATE'){
										stringFormula += paramMap['TOTALLBAVHIGHRATE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALLBAVHIGHRATE'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVHIGHSURRVALUE'){
										stringFormula += paramMap['TOTALCVHIGHSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVHIGHSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPHIGHSURRVALUE'){
										stringFormula += paramMap['TOTALCVTOPUPHIGHSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPHIGHSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'CVLOWSURRVALUE'){
										stringFormula += paramMap['CVLOWSURRVALUE'+paramMap.year]!= undefined?paramMap['CVLOWSURRVALUE'+paramMap.year]:'0.0';
										stringFormulaAlt += paramMap['CVLOWSURRVALUE'+paramMap.year]!= undefined?paramMap['CVLOWSURRVALUE'+paramMap.year]:'0.0';
									} else if(fe.value.toUpperCase() == 'TOTALCVLOW' && isFIA){
										stringFormula += mapResultPerYear['CVTOTALLOWDISPLAY'] ? mapResultPerYear['CVTOTALLOWDISPLAY'] : '0.0';
										stringFormulaAlt += mapResultPerYear['CVTOTALLOWDISPLAY'] ? mapResultPerYear['CVTOTALLOWDISPLAY'] : '0.0';
									}else if(fe.value.toUpperCase() == 'TOTALCVMED' && isFIA){
										stringFormula += mapResultPerYear['CVTOTALMEDDISPLAY'] ? mapResultPerYear['CVTOTALMEDDISPLAY'] : '0.0';
										stringFormulaAlt += mapResultPerYear['CVTOTALMEDDISPLAY'] ? mapResultPerYear['CVTOTALMEDDISPLAY'] : '0.0';
									}else if(fe.value.toUpperCase() == 'TOTALCVHIGH' && isFIA){
										stringFormula += mapResultPerYear['CVTOTALHIGHDISPLAY'] ? mapResultPerYear['CVTOTALHIGHDISPLAY'] : '0.0';
										stringFormulaAlt += mapResultPerYear['CVTOTALHIGHDISPLAY'] ? mapResultPerYear['CVTOTALHIGHDISPLAY'] : '0.0';
                                    }else{

										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "load"){
								  stringFormula += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								  stringFormulaAlt += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								}else if(fe.type.toLowerCase().trim() === "formula"){
									if(fe.value.toUpperCase() === 'MAXLVPREMI'){
										stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'DIFFLVPREMI'){
										stringFormula += "" + DIFFLVPREMI +"";
										  stringFormulaAlt += "" + DIFFLVPREMI +"";
									}
									else{
										stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "formulafund"){
									if((fe.value.toUpperCase() == 'CVTOTALLOWSTDLASTYEAR')  && paramMap.year > 1){
										stringFormula += paramMap['CVTOTALLOWSTDLASTYEAR_CLIENT'+(paramMap.year-1)];
										stringFormulaAlt += paramMap['CVTOTALLOWSTDLASTYEAR_ALT'+(paramMap.year-1)];
									}else if((fe.value.toUpperCase() == 'CVTOTALLOWLASTYEAR' || fe.value.toUpperCase() == 'CVTOTALMEDLASTYEAR' || fe.value.toUpperCase() == 'CVTOTALHIGHLASTYEAR'
										|| fe.value.toUpperCase() == 'TOTALSURRVALUELOWLASTYEAR' || fe.value.toUpperCase() == 'TOTALSURRVALUEMEDLASTYEAR' || fe.value.toUpperCase() == 'TOTALSURRVALUEHIGHLASTYEAR')
										&& paramMap.year > 1){
									  stringFormula += paramMap[fe.value.toUpperCase()+'_CLIENT'+(paramMap.year-1)];
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()+'_ALT'+(paramMap.year-1)];
									}else if(fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICLOWLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICMEDLASTYEAR'
										|| fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICHIGHLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERLOWLASTYEAR'
										|| fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERMEDLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERHIGHLASTYEAR'){
									  stringFormula += paramMap[fe.value.toUpperCase()+'_CLIENT'+(paramMap.year-1)];
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()+'_ALT'+(paramMap.year-1)];
									}else if(fe.value.toUpperCase() == 'TOTALCVLOWLASTYEAR' || fe.value.toUpperCase() == 'TOTALCVMEDLASTYEAR'
									|| fe.value.toUpperCase() == 'TOTALCVHIGHLASTYEAR'){
										stringFormula += mapOutputCoverage[fe.value.toUpperCase()];
										stringFormulaAlt += mapOutputCoverage[fe.value.toUpperCase()];
									}else if(fe.value.toUpperCase() == 'TOTALCVDBLOWDISPLAY' || fe.value.toUpperCase() == 'TOTALCVDBMEDDISPLAY'
									|| fe.value.toUpperCase() == 'TOTALCVDBHIGHDISPLAY'){
										stringFormula += mapOutputCoverage[fe.value.toUpperCase()];
										stringFormulaAlt += mapOutputCoverage[fe.value.toUpperCase()];
									}else{
									  stringFormula += getValueFund(ITEM.code, fe.value, mapOutputFund);
									  stringFormulaAlt += getValueFund(ITEM.code, fe.value, mapOutputFundAlt);	
									}
								  
								}else if(fe.type.toLowerCase().trim() === "string"){
								  stringFormula += "\'"+fe.value+"\'";
								  stringFormulaAlt += "\'"+fe.value+"\'";
								}else{
								  stringFormula += fe.value;
								  stringFormulaAlt += fe.value;
								}
							}

							if(isValidExpression(stringFormula)){

								var tempStringFormula = processPowAndMinusNegativeOnFormula(stringFormula, stringFormulaAlt);
								
								  result = getResultExpression(tempStringFormula.stringFormula);
								  resultAlternativeAsumtion = getResultExpression(tempStringFormula.stringFormulaAlt);

								  result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isPIA, paramMap, result);

								  if(isFIA){
									result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isFIA, paramMap, result);
								  }

								  tempResult = applyRoundingToSomeCasesAll(tmpFormula, result, resultAlternativeAsumtion);
								  result = tempResult.result;
								  resultAlternativeAsumtion = tempResult.resultAlternativeAsumtion;
								  
								  if(tmpFormula.output == 'DIFFLVPREMI'){
									if(mapResultFormula['DIFFLVPREMI']){
										// result = map['DIFFLVPREMI'];
									}else{
										map['DIFFLVPREMI'] = result;
										mapResultFormula['DIFFLVPREMI'] = result;
									}
								}

								result = checkCovTermPpayorAndCovTermWaiver(tmpFormula, itemSelected, mapOutputCoverage, result);
								
									  if(tmpFormula.output == 'CVWITHDRAW'){
										  cvWithdrawValue = result;
									  }

									  if(tmpFormula.output === 'COVTERM_PPAYOR01' || tmpFormula.output === 'COVTERM_WAIVER02'
										  || tmpFormula.output === 'COVTERM_PPAYOR02' || tmpFormula.output === 'COVTERM_WAIVER01'){

										  if(mapOutputCoverage[tmpFormula.output]){
											  result = 0;
										  }

									  }

									  if(tmpFormula.output == 'SA_PIA' || tmpFormula.output == 'SA_PSIA'){
										  sumAssuredPIA += result;
									  }

									  if(isPIA){
										  if(tmpFormula.output == 'PIAGIOIDR' && result == '1'){
											  mapResult['isGio'] = '1';					  				
										  }else if(tmpFormula.output == 'PIAGIOUSD' && result == '1'){
											  mapResult['isGio'] = '1';					  				
										  }else if(tmpFormula.output == 'PSIAGIO' && result == '1'){
											  mapResult['isGio'] = '1';
										  }

										  if((tmpFormula.output == 'PIAGIOIDR' || tmpFormula.output == 'PIAGIOUSD' || tmpFormula.output == 'PSIAGIO') && paramMap.year == '1'){
											for(var pi = 0; pi < paramMap.manfaatList.length; pi++){
												if(itemSelected.code == paramMap.manfaatList[pi].code){
													paramMap.manfaatList[pi].showCode = result;
												}
											}
										  }
	  
									  }

									  if(isFIA){
										if(tmpFormula.output == 'FIAGIOIDR' && result == '1'){
											mapResult['isGio'] = '1';					  				
										}else if(tmpFormula.output == 'FIAGIOUSD' && result == '1'){
											mapResult['isGio'] = '1';					  				
										}else if(tmpFormula.output == 'FSIAGIO' && result == '1'){
											mapResult['isGio'] = '1';
										}

										if((tmpFormula.output == 'FIAGIOIDR' || tmpFormula.output == 'FIAGIOUSD' || tmpFormula.output == 'FSIAGIO') && paramMap.year == '1'){
										  for(var pi = 0; pi < paramMap.manfaatList.length; pi++){
											  if(itemSelected.code == paramMap.manfaatList[pi].code){
												  paramMap.manfaatList[pi].showCode = result;
											  }
										  }
										}
	
									}

									  if(tmpFormula.output == 'FUNDAVAL' && cvWithdrawValue > 1){
										  if(result == '1'){
											  mapOutputCoverage[tmpFormula.output] = result;
											  break;
										  }
									  }
									  
									  setParamMapByResultAndResultAltBasedOnFormulaTypeCd(formula, tmpFormula, paramMap, result, resultAlternativeAsumtion);

									if(tmpFormula.formulaCd == 'FRMLLOWSURRVALUE01'){
										if(paramMap.year > 1 && paramMap['FRMLLOWSURRVALUE01_ALT'+(paramMap.year-1)] == -1){
											resultAlternativeAsumtion = -1;
										}
										if(paramMap['FRMLLOWSURRVALUE01_ALT'+paramMap.year] != undefined || paramMap['FRMLLOWSURRVALUE01_ALT'+paramMap.year] != -1){
											paramMap['FRMLLOWSURRVALUE01_ALT'+paramMap.year] = resultAlternativeAsumtion;
										}
									}							
									else if(tmpFormula.formulaCd == 'FRMLMEDSURRVALUE01'){
										if(paramMap.year > 1 && paramMap['FRMLMEDSURRVALUE01_ALT'+(paramMap.year-1)] == -1){
											resultAlternativeAsumtion = -1;
										}
										if(paramMap['FRMLMEDSURRVALUE01_ALT'+paramMap.year] != undefined || paramMap['FRMLMEDSURRVALUE01_ALT'+paramMap.year] != -1){
											paramMap['FRMLMEDSURRVALUE01_ALT'+paramMap.year] = resultAlternativeAsumtion;
										}
									}									
									else if(tmpFormula.formulaCd == 'FRMLHIGHSURRVALUE01'){
										if(paramMap.year > 1 && paramMap['FRMLHIGHSURRVALUE01_ALT'+(paramMap.year-1)] == -1){
											resultAlternativeAsumtion = -1;
										}
										if(paramMap['FRMLHIGHSURRVALUE01_ALT'+paramMap.year] != undefined || paramMap['FRMLHIGHSURRVALUE01_ALT'+paramMap.year] != -1){
											paramMap['FRMLHIGHSURRVALUE01_ALT'+paramMap.year] = resultAlternativeAsumtion;
										}
									}
									
									parseToLogFile(paramMap, ITEM, tmpFormula, stringFormulaOri, stringFormula, stringFormulaAlt, 
											'in function getResultFormula EMPTY', result, resultAlternativeAsumtion, formula, 'nonPph');

								if(tmpFormula.output){
									if('COVERAGE' === tmpFormula.itemType.toUpperCase()){
										//CLIENT_PLANNING
										value = mapOutputCoverage[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverage[tmpFormula.output]){
											  mapOutputCoverage[tmpFormula.output] = value;
											}else{
											  value = (value + result) ;
											  mapOutputCoverage[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverage[tmpFormula.output] = result;
										}

										if("TOTALPREMIUMWITHACCPREMIUM" === tmpFormula.output){
												  mapOutputFund[tmpFormula.output] = result;
										}

										if("TOTALDEATHBENEFITPGB" === tmpFormula.output){
												  mapOutputFund[tmpFormula.output] = result;
										}
										
										//ALTERNATIVE
										value = mapOutputCoverageAlt[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverageAlt[tmpFormula.output]){
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}else{
											  value = (value + resultAlternativeAsumtion) ;
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
										}

										if("TOTALDEATHBENEFITPGB" === tmpFormula.output){
												mapOutputFundAlt[tmpFormula.output] = resultAlternativeAsumtion;
										}

										  //SET NEW KEY PDPREMI IF FORMULATYPE = 'RIDERPREMIUM' / BIAYA ASURANSI PERTAHUN
										if('RIDERPREMIUM' == formula.formulaTypeCd && tmpFormula.output == 'TOTALRIDERPREMIUM'){
											if(map["PREVIOUSRIDERCODE"] == itemSelected.code && map["PREVIOUSCUSTOMERKEY"] == itemSelected.tertanggungKey){
												map["PDPREMI"] = map["PDPREMI"] + result;
											}
											else{
												map["PDPREMI"] = result;
											}
											map["PREVIOUSRIDERCODE"] = itemSelected.code;
											map["PREVIOUSCUSTOMERKEY"] = itemSelected.tertanggungKey;
											mapResultFormula.riderPremium = result;	
										}

										if(isPIA || isFIA){
											// karena PIA tidak ada rider premium, maka PDPREMI ngambil dari SA
											  map["PDPREMI"] = map['CUSTPREMI'];							        	
										  }else if(isPAA2){
											  map["PDPREMI"] = map['CUSTSAVER'];
										  }

										//CHARGE / BIAYA ANGSURAN BULANAN
										if('CHARGERIDER' == formula.formulaTypeCd || 'CHARGEINSURANCE' == formula.formulaTypeCd){
											  mapResultFormula[formula.formulaTypeCd] = (result/12);
										}

										if('CONSVAL' == formula.formulaTypeCd && tmpFormula.output == 'MAXLVPREMI'){
											mapResultFormula["MAXLVPREMI"] = result;
										}

									}else if('FUND' === tmpFormula.itemType.toUpperCase()){
										var itemCd = ITEM.code;

										value = mapOutputCoverage[formula.formulaTypeCd];
										if(value && (formula.formulaTypeCd != 'TOTALCVLOWFUNDDSPLY'
												&& formula.formulaTypeCd != 'TOTALCVMEDFUNDDSPLY'
												&& formula.formulaTypeCd != 'TOTALCVHIGHFUNDDSPLY'
												&& formula.formulaTypeCd != 'FT_SURRENDERLOWVALUE'
												&& formula.formulaTypeCd != 'FT_SURRENDERMEDVALUE'
												&& formula.formulaTypeCd != 'FT_SURRENDERHIGHVALU'
												&& formula.formulaTypeCd != 'TOTALCVDBLOWDISPLAY'
												&& formula.formulaTypeCd != 'TOTALCVDBMEDDISPLAY'
												&& formula.formulaTypeCd != 'TOTALCVDBHIGHDISPLAY'
												&& formula.formulaTypeCd != 'FT_CVWITHDRAWAL')){
											value = (value + result) ;
											mapOutputCoverage[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverage[formula.formulaTypeCd] = result;
										}

										value = mapOutputCoverageAlt[formula.formulaTypeCd];
										if(value && (formula.formulaTypeCd != 'TOTALCVLOWFUNDDSPLY'
												&& formula.formulaTypeCd != 'TOTALCVMEDFUNDDSPLY'
												&& formula.formulaTypeCd != 'TOTALCVHIGHFUNDDSPLY'
												&& formula.formulaTypeCd != 'FT_SURRENDERLOWVALUE'
												&& formula.formulaTypeCd != 'FT_SURRENDERMEDVALUE'
												&& formula.formulaTypeCd != 'FT_SURRENDERHIGHVALU'
												&& formula.formulaTypeCd != 'TOTALCVDBLOWDISPLAY'
												&& formula.formulaTypeCd != 'TOTALCVDBMEDDISPLAY'
												&& formula.formulaTypeCd != 'TOTALCVDBHIGHDISPLAY'
												&& formula.formulaTypeCd != 'FT_CVWITHDRAWAL')){
											value = (value + resultAlternativeAsumtion) ;
											mapOutputCoverageAlt[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverageAlt[formula.formulaTypeCd] = resultAlternativeAsumtion;
										}

										//CLIENT PLANNING
										if(mapOutputFund[itemCd] == undefined){
											mapOutputFund[itemCd] =  {};
										}
										mapOutputFund[itemCd][tmpFormula.output] = result;
										
										//ALTERNATIVE
										if(mapOutputFundAlt[itemCd] == undefined){
											mapOutputFundAlt[itemCd] =  {};
										}
										mapOutputFundAlt[itemCd][tmpFormula.output] = resultAlternativeAsumtion;
										
										//ASUMSTION FUND
										if(tmpFormula.output == 'CVTOTALHIGHDISPLAY' || tmpFormula.output == 'CVTOTALMEDDISPLAY' || tmpFormula.output == 'CVTOTALLOWDISPLAY' || tmpFormula.output == 'TOTALSURRVALUELOWDISPLAY' || tmpFormula.output == 'TOTALSURRVALUEMEDDISPLAY' || tmpFormula.output == 'TOTALSURRVALUEHIGHDISPLAY'){
											  mapResultPerYear[tmpFormula.output] = result;
											mapResultPerYear['ALT'+tmpFormula.output] = resultAlternativeAsumtion;
										  }

										  if(tmpFormula.output == 'DEATHBENEFITLOW' || tmpFormula.output == 'DEATHBENEFITMED' || tmpFormula.output == 'DEATHBENEFITHIGH' ){
											mapResultPerYear[tmpFormula.output] = result;
										  }

										  if(paramMap.year == '20'){
											  if("OFF_TOTALPRUBOOSTERLOW" === tmpFormula.output || "OFF_TOTALPRUBOOSTERMED" === tmpFormula.output || "OFF_TOTALPRUBOOSTERHIGH" === tmpFormula.output){
												paramMap[tmpFormula.output] = result;
											}	
										  }
										
										if(tmpFormula.formulaCd == 'FRML_WITHDRAWALSAVERLOWLASTYEAR' || tmpFormula.formulaCd == 'FRML_WITHDRAWALSAVERMEDLASTYEAR'
												|| tmpFormula.formulaCd == 'FRML_WITHDRAWALSAVERHIGHLASTYEAR' || tmpFormula.formulaCd == 'FRML_WITHDRAWALBASICLOWLASTYEAR'
												|| tmpFormula.formulaCd == 'FRML_WITHDRAWALBASICMEDLASTYEAR' || tmpFormula.formulaCd == 'FRML_WITHDRAWALBASICHIGHLASTYEAR'){
											paramMap[tmpFormula.output+'_CLIENT'+paramMap.year] = result;
											paramMap[tmpFormula.output+'_ALT'+paramMap.year] = resultAlternativeAsumtion;
										}
									}
								}
							}
						}
						checkingIfButtonHitung(buttonType, tmpFormula, formula, mapResultFormula, mapOutputCoverage, result, undefined, undefined, false, false);

						  mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
						  mapResultFormula['MAPOUTPUTFUND'] = mapOutputFund;				      	
						  mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;
						  mapResultFormula['MAPOUTPUTFUNDALT'] = mapOutputFundAlt;				      	
					}
				}
			}

			mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
			mapResultFormula['MAPOUTPUTFUND'] = mapOutputFund;				      	
			mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;
			mapResultFormula['MAPOUTPUTFUNDALT'] = mapOutputFundAlt;	

			mapResultFormula['MAPOUTPUTFUNDPERTAHUN'] = mapResultPerYear;

			return mapResultFormula;
		}

		function generateOutputFIA(param, mapOutputMain){
			var mapOutput = mapOutputMain.mapOutputMainPAA;
			var newOutput = {};
			newOutput.FUNDMAP = {};

			var divider = 1000;

			if(param.currCd == 'USD'){
				divider = 1;
			}

			if(isPPHC === true){
				var outPutPPHC = generateOutputALT(param, mapOutputMain);
			}

			var tmpLowClient;
			var tmpMedClient;
			var tmpHighClient;

			 for(var year in mapOutput){
				 var mapItemCd = mapOutput[year];
				 var tmpListOutput = [];

				 for(var itemCd in mapItemCd.mapOutput){
					 var mapOut = mapItemCd.mapOutput[itemCd];
					//---------------------------------------------------------------------------------------------------------

					if(mapOut.ALLOCATION != '0'){
						//fund dihitung hanya yang ada alokasinya
						var tmpPremi = (((parseInt(mapOut.ALLOCATION) * param.manfaat.totalPremi)/100)/divider);

						tmpLowClient = mapOut['CVTOTALLOWDISPLAY'] ?  (mapOut['CVTOTALLOWDISPLAY']/divider) : 0;
						tmpMedClient = mapOut['CVTOTALMEDDISPLAY'] ? (mapOut['CVTOTALMEDDISPLAY']/divider)  : 0;
						tmpHighClient = mapOut['CVTOTALHIGHDISPLAY'] ? (mapOut['CVTOTALHIGHDISPLAY']/divider) : 0;

						tmpDBLowClient = mapOut['DEATHBENEFITLOW'] ?  (mapOut['DEATHBENEFITLOW']/divider) : 0;
						tmpDBMedClient = mapOut['DEATHBENEFITMED'] ? (mapOut['DEATHBENEFITMED']/divider)  : 0;
                        tmpDBHighClient = mapOut['DEATHBENEFITHIGH'] ? (mapOut['DEATHBENEFITHIGH']/divider) : 0;
                        
						if(param.currCd == 'IDR'){
							tmpLowClient = Math.round(tmpLowClient);
							tmpMedClient = Math.round(tmpMedClient);
							tmpHighClient = Math.round(tmpHighClient);
							tmpDBLowClient = Math.round(tmpDBLowClient);
							tmpDBMedClient = Math.round(tmpDBMedClient);
							tmpDBHighClient = Math.round(tmpDBHighClient);
						}

                        var tmpTopupList = 0;
                        var tmpWithdrawalList = 0;

                        for(var d = 0; d < param.topupList.length; d++){
                            var tmpTopup = param.topupList[d];
                            if(tmpTopup.year == year){
                                tmpTopupList = tmpTopup.amount;
                                break;
                            }
                        }

                        for(var d = 0; d < param.withdrawalList.length; d++){
                            var tmpWithdrawal = param.withdrawalList[d];
                            if(tmpWithdrawal.year == year){
                                tmpWithdrawalList = tmpWithdrawal.amount;
                                break;
                            }
                        }

						var objList = {
								 year : (year).toString(),
								 customerAge : (mapItemCd.ageCustomer).toString(),
								 cvLowClient : tmpLowClient,
								 cvMedClient : tmpMedClient,
								 cvHighClient : tmpHighClient,
								 dbLowClient : tmpDBLowClient,
								 dbMedClient : tmpDBMedClient, 
                                 dbHighClient : tmpDBHighClient,
                                 topup : tmpTopupList ? parseInt(tmpTopupList) : 0,
                                 withdrawal: tmpWithdrawalList ? parseInt(tmpWithdrawalList) : 0
							 };

						tmpListOutput = [];
						tmpListOutput = newOutput.FUNDMAP[itemCd];
						if(tmpListOutput){
							tmpListOutput.push(objList);
							 newOutput.FUNDMAP[itemCd] = tmpListOutput;
						}else{
							tmpListOutput = [];
							tmpListOutput.push(objList);
							newOutput.FUNDMAP[itemCd] = tmpListOutput;
						}
					}
				}

				var mapFundNLG = mapItemCd.mapFundNLG;

				 //ASUMTION CLIENT TOTAL FUND
				tmpCVLowClient = mapFundNLG['TOTALCVLOW']/divider;
				tmpCVMedClient = mapFundNLG['TOTALCVMED']/divider;
				tmpCVHighClient = mapFundNLG['TOTALCVHIGH']/divider

				 //ASUMTION CLIENT TOTAL DEATH BENEFIT
				tmpDBLowClient = mapFundNLG['TOTALCVDBLOW']/divider;
				tmpDBMedClient = mapFundNLG['TOTALCVDBMED']/divider;
				tmpDBHighClient = mapFundNLG['TOTALCVDBHIGH']/divider;

				if(param.currCd == 'IDR'){
					tmpCVLowClient = Math.round(tmpCVLowClient);
					tmpCVMedClient = Math.round(tmpCVMedClient);
					tmpCVHighClient = Math.round(tmpCVHighClient);
					tmpDBLowClient = Math.round(tmpDBLowClient);
					tmpDBMedClient = Math.round(tmpDBMedClient);
					tmpDBHighClient = Math.round(tmpDBHighClient);
				}

				 var objGabFundAndDeathBenefit = {
						year : (year).toString(),
                        customerAge : (mapItemCd.ageCustomer).toString(),
                        cvLowClient : tmpCVLowClient,
						cvMedClient : tmpCVMedClient,
						cvHighClient : tmpCVHighClient,
						dbLowClient : tmpDBLowClient,
						dbMedClient : tmpDBMedClient,
						dbHighClient : tmpDBHighClient, 
						topup : tmpTopupList ? parseInt(tmpTopupList) : 0,
						withdrawal: tmpWithdrawalList ? parseInt(tmpWithdrawalList) : 0
					};

				 tmpListOutput = [];
				 tmpListOutput = newOutput['CASHVALUE'];
				 if(tmpListOutput){
					 tmpListOutput.push(objGabFundAndDeathBenefit);
					newOutput['CASHVALUE'] = tmpListOutput;
				 }else{
					 tmpListOutput = [];
					 tmpListOutput.push(objGabFundAndDeathBenefit);
					 newOutput['CASHVALUE'] = tmpListOutput;
				 }
			}
			newOutput['SARIDER'] = param.SARIDER;
			newOutput['RULEFORFUND'] = param.RULEFORFUND;

			newOutput.paymentFrequency = param.paymentFrequency;
  			newOutput.premi = param.manfaat.premi;

			newOutput['outPutPPHALT'] = outPutPPHC;
			newOutput['isPPH'] = isPPHC;

			if(param.GIOCODE != undefined){
				newOutput['GIOCODE'] = 'U2L2';
			}

			return newOutput;
		}		

		function generateOutput(param, mapOutputMain){
			var mapOutput = mapOutputMain.mapOutputMainPAA;
			 var newOutput = {};
			 newOutput.FUNDMAP = {};

			 var divider = 1000;

			 if(param.currCd == 'USD'){
				 divider = 1;
			 }

			 if(isPPHC === true){
				 var outPutPPHC = generateOutputALT(param, mapOutputMain);
			 }

			 var tmpLowClient;
			var tmpMedClient;
			var tmpHighClient;
			var tmpLowAlt;
			var tmpMedAlt;
			var tmpHighAlt;

			var tmpBASICPREMIUM1C;
			var tmpBASICPREMIUM2C;
			var tmpTOPUPSAVER1C;
			var tmpTOPUPSAVER2C;

			var tmpBASICPREMIUM1A;
			var tmpBASICPREMIUM2A;
			var tmpTOPUPSAVER1A;
			var tmpTOPUPSAVER2A;

			 for(var year in mapOutput){
				 var mapItemCd = mapOutput[year];
				 var tmpListOutput = [];

				 for(var itemCd in mapItemCd.mapOutput){
					 var mapOut = mapItemCd.mapOutput[itemCd];
					//---------------------------------------------------------------------------------------------------------

					if(mapOut.ALLOCATION != '0'){
						//fund dihitung hanya yang ada alokasinya
						var tmpPremi = (((parseInt(mapOut.ALLOCATION) * param.manfaat.totalPremi)/100)/divider);


						tmpLowClient = mapOut['CVTOTALLOWDISPLAY'] ?  (mapOut['CVTOTALLOWDISPLAY']/divider) : 0;
						tmpMedClient = mapOut['CVTOTALMEDDISPLAY'] ? (mapOut['CVTOTALMEDDISPLAY']/divider)  : 0;
						tmpHighClient = mapOut['CVTOTALHIGHDISPLAY'] ? (mapOut['CVTOTALHIGHDISPLAY']/divider) : 0;
						tmpLowAlt = mapOut['ALTCVTOTALLOWDISPLAY'] ? (mapOut['ALTCVTOTALLOWDISPLAY']/divider) : 0;
						tmpMedAlt = mapOut['ALTCVTOTALMEDDISPLAY'] ? (mapOut['ALTCVTOTALMEDDISPLAY']/divider) : 0;
						tmpHighAlt = mapOut['ALTCVTOTALHIGHDISPLAY'] ? (mapOut['ALTCVTOTALHIGHDISPLAY']/divider) : 0;


						if(param.currCd == 'IDR'){
							tmpLowClient = Math.round(tmpLowClient);
							tmpMedClient = Math.round(tmpMedClient);
							tmpHighClient = Math.round(tmpHighClient);
							tmpLowAlt = Math.round(tmpLowAlt);
							tmpMedAlt = Math.round(tmpMedAlt);
							tmpHighAlt = Math.round(tmpHighAlt);

						}

						var objList = {
								 year : (year).toString(),
								 customerAge : (mapItemCd.ageCustomer).toString(),
								 premiClient : parseInt(year) <= parseInt(param.rencanaPembayaran) ? (tmpPremi).toString() : '',
								 lowClient : tmpLowClient,
								 medClient : tmpMedClient,
								 highClient : tmpHighClient,
								 premiAlt : (tmpPremi),
								 lowAlt : tmpLowAlt,
								 medAlt : tmpMedAlt,
								 highAlt : tmpHighAlt
							 };

						tmpListOutput = [];
						tmpListOutput = newOutput.FUNDMAP[itemCd];
						if(tmpListOutput){
							tmpListOutput.push(objList);
							 newOutput.FUNDMAP[itemCd] = tmpListOutput;
						}else{
							tmpListOutput = [];
							tmpListOutput.push(objList);
							newOutput.FUNDMAP[itemCd] = tmpListOutput;
						}
					}


				 }

				var mapFundNLG = mapItemCd.mapFundNLG;
				var mapFundNLGAlt = mapItemCd.mapFundNLGAlt;
				 //ASUMTION CLIENT TOTAL FUND
				 tmpLowClient = mapFundNLG['TOTALCVLOWDISPLAY']/divider;
				tmpMedClient = mapFundNLG['TOTALCVMEDDISPLAY']/divider;
				tmpHighClient = mapFundNLG['TOTALCVHIGHDISPLAY']/divider
				tmpLowAlt = mapFundNLGAlt['TOTALCVLOWDISPLAY']/divider;
				tmpMedAlt = mapFundNLGAlt['TOTALCVMEDDISPLAY']/divider;
				tmpHighAlt = mapFundNLGAlt['TOTALCVHIGHDISPLAY']/divider;

				if(param.currCd == 'IDR'){
					tmpLowClient = Math.round(tmpLowClient);
					tmpMedClient = Math.round(tmpMedClient);
					tmpHighClient = Math.round(tmpHighClient);
					tmpLowAlt = Math.round(tmpLowAlt);
					tmpMedAlt = Math.round(tmpMedAlt);
					tmpHighAlt = Math.round(tmpHighAlt);
				}

				 var objGabFund = {
						 year : (year).toString(),
						customerAge : (mapItemCd.ageCustomer).toString(),
						premiClient : parseInt(year) <= parseInt(param.rencanaPembayaran) ? ((param.manfaat.totalPremi)/divider).toString() : '',
						lowClient : tmpLowClient.toString(),
						medClient : tmpMedClient.toString(),
						highClient : tmpHighClient.toString(),
						premiAlt : ((param.manfaat.totalPremi)/divider).toString(),
						lowAlt : tmpLowAlt.toString(),
						medAlt : tmpMedAlt.toString(),
						highAlt : tmpHighAlt.toString()
					 };

				 tmpListOutput = [];
				 tmpListOutput = newOutput['FUNDBENEFIT'];
				 if(tmpListOutput){
					 tmpListOutput.push(objGabFund);
					newOutput['FUNDBENEFIT'] = tmpListOutput;
				 }else{
					 tmpListOutput = [];
					 tmpListOutput.push(objGabFund);
					 newOutput['FUNDBENEFIT'] = tmpListOutput;
				 }

				 //ASUMTION CLIENT TOTAL DEATH BENEFIT
				 tmpLowClient = mapFundNLG['TOTALCVDBLOWDISPLAY']/divider;
				tmpMedClient = mapFundNLG['TOTALCVDBMEDDISPLAY']/divider;
				tmpHighClient = mapFundNLG['TOTALCVDBHIGHDISPLAY']/divider;
				tmpLowAlt = mapFundNLGAlt['TOTALCVDBLOWDISPLAY']/divider;
				tmpMedAlt = mapFundNLGAlt['TOTALCVDBMEDDISPLAY']/divider;
				tmpHighAlt = mapFundNLGAlt['TOTALCVDBHIGHDISPLAY']/divider;

				tmpBASICPREMIUM1C = mapFundNLG['TOTALPREMIUMWITHACCPREMIUM']/1000;
				tmpBASICPREMIUM2C = mapFundNLG['BASICPREMIUM2']/1000;
				tmpTOPUPSAVER1C = mapFundNLG['TOPUPSAVER1']/1000;
				tmpTOPUPSAVER2C = mapFundNLG['TOPUPSAVER2']/1000;

				tmpBASICPREMIUM1A = mapFundNLGAlt['BASICPREMIUM1']/1000;
				tmpBASICPREMIUM2A = mapFundNLGAlt['BASICPREMIUM2']/1000;
				tmpTOPUPSAVER1A = mapFundNLGAlt['TOPUPSAVER1']/1000;
				tmpTOPUPSAVER2A = mapFundNLGAlt['TOPUPSAVER2']/1000;

				if(param.currCd == 'IDR'){
					tmpLowClient = Math.round(tmpLowClient);
					tmpMedClient = Math.round(tmpMedClient);
					tmpHighClient = Math.round(tmpHighClient);
					tmpLowAlt = Math.round(tmpLowAlt);
					tmpMedAlt = Math.round(tmpMedAlt);
					tmpHighAlt = Math.round(tmpHighAlt);
					tmpBASICPREMIUM1C = Math.round(tmpBASICPREMIUM1C);
					tmpBASICPREMIUM2C = Math.round(tmpBASICPREMIUM2C);
					tmpTOPUPSAVER1C = Math.round(tmpTOPUPSAVER1C);
					tmpTOPUPSAVER2C = Math.round(tmpTOPUPSAVER2C);
					tmpBASICPREMIUM1A = Math.round(tmpBASICPREMIUM1A);
					tmpBASICPREMIUM2A = Math.round(tmpBASICPREMIUM2A);
					tmpTOPUPSAVER1A = Math.round(tmpTOPUPSAVER1A);
					tmpTOPUPSAVER2A = Math.round(tmpTOPUPSAVER2A);
				}
				 var objGabDeath = {
						 year : (year).toString(),
						customerAge : (mapItemCd.ageCustomer).toString(),
						premiClient : parseInt(year) <= parseInt(param.rencanaPembayaran) ? ((param.manfaat.totalPremi)/divider).toString() : '',
						lowClient : tmpLowClient.toString(),
						medClient : tmpMedClient.toString(),
						highClient : tmpHighClient.toString(),
						premiAlt : ((param.manfaat.totalPremi)/divider).toString(),
						lowAlt : tmpLowAlt.toString(),
						medAlt : tmpMedAlt.toString(),
						highAlt : tmpHighAlt.toString(),
						BASICPREMIUM1C : tmpBASICPREMIUM1C,
						BASICPREMIUM2C : tmpBASICPREMIUM2C,
						TOPUPSAVER1C : tmpTOPUPSAVER1C,
						TOPUPSAVER2C : tmpTOPUPSAVER2C,
						BASICPREMIUM1A : tmpBASICPREMIUM1A,
						BASICPREMIUM2A : tmpBASICPREMIUM2A,
						TOPUPSAVER1A : tmpTOPUPSAVER1A,
						TOPUPSAVER2A : tmpTOPUPSAVER2A
					 };
				 tmpListOutput = [];
				 tmpListOutput = newOutput['DEATHBENEFIT'];
				 if(tmpListOutput){
					 tmpListOutput.push(objGabDeath);
					newOutput['DEATHBENEFIT'] = tmpListOutput;
				 }else{
					 tmpListOutput = [];
					 tmpListOutput.push(objGabDeath);
					 newOutput['DEATHBENEFIT'] = tmpListOutput;
				 }
			 }
			 newOutput['SARIDER'] = param.SARIDER;
			 newOutput['RULEFORFUND'] = param.RULEFORFUND;

			newOutput.paymentFrequency = param.paymentFrequency;
  			newOutput.premi = param.manfaat.premi;

			 newOutput['outPutPPHALT'] = outPutPPHC;
			 newOutput['isPPH'] = isPPHC;

			 if(param.GIOCODE != undefined){
				 if(param.currCd == 'IDR'){
					 if(param.mainCoverage == 'U1LR'){
						 newOutput['GIOCODE'] = 'U1L1';			
					 }else if(param.mainCoverage == 'U1MR'){
						 newOutput['GIOCODE'] = 'U1M1';
					 }else if(param.mainCoverage == 'U2LR'){
						newOutput['GIOCODE'] = 'U2L2';
					}
				 }else{
					 newOutput['GIOCODE'] = 'U1L2';
				 }
			 }

			 return newOutput;
		 }

		 function generateOutputALT(param, mapOutputALT){
			 var mapOutput = mapOutputALT.mapOutputPAAPPHALT;
			 var newOutput = {};
			 newOutput.FUNDMAP = {};

			 var divider = 1000;

			 if(param.currCd == 'USD'){
				 divider = 1;
			 }

			 var tmpLowClient;
			var tmpMedClient;
			var tmpHighClient;
			var tmpLowAlt;
			var tmpMedAlt;
			var tmpHighAlt;
			
			var tmpBASICPREMIUM1C;
			var tmpBASICPREMIUM2C;
			var tmpTOPUPSAVER1C;
			var tmpTOPUPSAVER2C;

			var tmpBASICPREMIUM1A;
			var tmpBASICPREMIUM2A;
			var tmpTOPUPSAVER1A;
			var tmpTOPUPSAVER2A;

			 for(var year in mapOutput){
				 var mapItemCd = mapOutput[year];
				 var tmpListOutput = [];

				 for(var itemCd in mapItemCd.mapOutput){
					 var mapOut = mapItemCd.mapOutput[itemCd];
					//---------------------------------------------------------------------------------------------------------

					if(mapOut.ALLOCATION != '0'){
						//fund dihitung hanya yang ada alokasinya
						var tmpPremi = (((parseInt(mapOut.ALLOCATION) * param.manfaat.totalPremi)/100)/divider);


						tmpLowClient = mapOut['CVTOTALLOWDISPLAY'] ?  (mapOut['CVTOTALLOWDISPLAY']/divider) : 0;
						tmpMedClient = mapOut['CVTOTALMEDDISPLAY'] ? (mapOut['CVTOTALMEDDISPLAY']/divider)  : 0;
						tmpHighClient = mapOut['CVTOTALHIGHDISPLAY'] ? (mapOut['CVTOTALHIGHDISPLAY']/divider) : 0;
						tmpLowAlt = mapOut['ALTCVTOTALLOWDISPLAY'] ? (mapOut['ALTCVTOTALLOWDISPLAY']/divider) : 0;
						tmpMedAlt = mapOut['ALTCVTOTALMEDDISPLAY'] ? (mapOut['ALTCVTOTALMEDDISPLAY']/divider) : 0;
						tmpHighAlt = mapOut['ALTCVTOTALHIGHDISPLAY'] ? (mapOut['ALTCVTOTALHIGHDISPLAY']/divider) : 0;


						if(param.currCd == 'IDR'){
							tmpLowClient = Math.round(tmpLowClient);
							tmpMedClient = Math.round(tmpMedClient);
							tmpHighClient = Math.round(tmpHighClient);
							tmpLowAlt = Math.round(tmpLowAlt);
							tmpMedAlt = Math.round(tmpMedAlt);
							tmpHighAlt = Math.round(tmpHighAlt);

						}

						var objList = {
								 year : (year).toString(),
								 customerAge : (mapItemCd.ageCustomer).toString(),
								 premiClient : parseInt(year) <= parseInt(param.rencanaPembayaran) ? (tmpPremi).toString() : '',
								 lowClient : tmpLowClient,
								 medClient : tmpMedClient,
								 highClient : tmpHighClient,
								 premiAlt : (tmpPremi),
								 lowAlt : tmpLowAlt,
								 medAlt : tmpMedAlt,
								 highAlt : tmpHighAlt
							 };

						tmpListOutput = [];
						tmpListOutput = newOutput.FUNDMAP[itemCd];
						if(tmpListOutput){
							tmpListOutput.push(objList);
							 newOutput.FUNDMAP[itemCd] = tmpListOutput;
						}else{
							tmpListOutput = [];
							tmpListOutput.push(objList);
							newOutput.FUNDMAP[itemCd] = tmpListOutput;
						}
					}


				 }

				var mapFundNLG = mapItemCd.mapFundNLG;
				var mapFundNLGAlt = mapItemCd.mapFundNLGAlt;
				 //ASUMTION CLIENT TOTAL FUND
				 tmpLowClient = mapFundNLG['TOTALCVLOWDISPLAY']/divider;
				tmpMedClient = mapFundNLG['TOTALCVMEDDISPLAY']/divider;
				tmpHighClient = mapFundNLG['TOTALCVHIGHDISPLAY']/divider
				tmpLowAlt = mapFundNLGAlt['TOTALCVLOWDISPLAY']/divider;
				tmpMedAlt = mapFundNLGAlt['TOTALCVMEDDISPLAY']/divider;
				tmpHighAlt = mapFundNLGAlt['TOTALCVHIGHDISPLAY']/divider;

				if(param.currCd == 'IDR'){
					tmpLowClient = Math.round(tmpLowClient);
					tmpMedClient = Math.round(tmpMedClient);
					tmpHighClient = Math.round(tmpHighClient);
					tmpLowAlt = Math.round(tmpLowAlt);
					tmpMedAlt = Math.round(tmpMedAlt);
					tmpHighAlt = Math.round(tmpHighAlt);
				}

				 var objGabFund = {
						 year : (year).toString(),
						customerAge : (mapItemCd.ageCustomer).toString(),
						premiClient : parseInt(year) <= parseInt(param.rencanaPembayaran) ? ((param.manfaat.totalPremi)/divider).toString() : '',
						lowClient : tmpLowClient.toString(),
						medClient : tmpMedClient.toString(),
						highClient : tmpHighClient.toString(),
						premiAlt : ((param.manfaat.totalPremi)/divider).toString(),
						lowAlt : tmpLowAlt.toString(),
						medAlt : tmpMedAlt.toString(),
						highAlt : tmpHighAlt.toString()
					 };

				 tmpListOutput = [];
				 tmpListOutput = newOutput['FUNDBENEFIT'];
				 if(tmpListOutput){
					 tmpListOutput.push(objGabFund);
					newOutput['FUNDBENEFIT'] = tmpListOutput;
				 }else{
					 tmpListOutput = [];
					 tmpListOutput.push(objGabFund);
					 newOutput['FUNDBENEFIT'] = tmpListOutput;
				 }

				 //ASUMTION CLIENT TOTAL DEATH BENEFIT
				 tmpLowClient = mapFundNLG['TOTALCVDBLOWDISPLAY']/divider;
				tmpMedClient = mapFundNLG['TOTALCVDBMEDDISPLAY']/divider;
				tmpHighClient = mapFundNLG['TOTALCVDBHIGHDISPLAY']/divider;
				tmpLowAlt = mapFundNLGAlt['TOTALCVDBLOWDISPLAY']/divider;
				tmpMedAlt = mapFundNLGAlt['TOTALCVDBMEDDISPLAY']/divider;
				tmpHighAlt = mapFundNLGAlt['TOTALCVDBHIGHDISPLAY']/divider;

				tmpBASICPREMIUM1C = mapFundNLG['TOTALPREMIUMWITHACCPREMIUM']/1000;
				tmpBASICPREMIUM2C = mapFundNLG['BASICPREMIUM2']/divider;
				tmpTOPUPSAVER1C = mapFundNLG['TOPUPSAVER1']/divider;
				tmpTOPUPSAVER2C = mapFundNLG['TOPUPSAVER2']/divider;

				tmpBASICPREMIUM1A = mapFundNLGAlt['BASICPREMIUM1']/divider;
				tmpBASICPREMIUM2A = mapFundNLGAlt['BASICPREMIUM2']/divider;
				tmpTOPUPSAVER1A = mapFundNLGAlt['TOPUPSAVER1']/divider;
				tmpTOPUPSAVER2A = mapFundNLGAlt['TOPUPSAVER2']/divider;

				if(param.currCd == 'IDR'){
					tmpLowClient = Math.round(tmpLowClient);
					tmpMedClient = Math.round(tmpMedClient);
					tmpHighClient = Math.round(tmpHighClient);
					tmpLowAlt = Math.round(tmpLowAlt);
					tmpMedAlt = Math.round(tmpMedAlt);
					tmpHighAlt = Math.round(tmpHighAlt);

					tmpBASICPREMIUM1C = Math.round(tmpBASICPREMIUM1C);
					tmpBASICPREMIUM2C = Math.round(tmpBASICPREMIUM2C);
					tmpTOPUPSAVER1C = Math.round(tmpTOPUPSAVER1C);
					tmpTOPUPSAVER2C = Math.round(tmpTOPUPSAVER2C);

					tmpBASICPREMIUM1A = Math.round(tmpBASICPREMIUM1A);
					tmpBASICPREMIUM2A = Math.round(tmpBASICPREMIUM2A);
					tmpTOPUPSAVER1A = Math.round(tmpTOPUPSAVER1A);
					tmpTOPUPSAVER2A = Math.round(tmpTOPUPSAVER2A);
				}
				 var objGabDeath = {
						 year : (year).toString(),
						customerAge : (mapItemCd.ageCustomer).toString(),
						premiClient : parseInt(year) <= parseInt(param.rencanaPembayaran) ? ((param.manfaat.totalPremi)/divider).toString() : '',
						lowClient : tmpLowClient.toString(),
						medClient : tmpMedClient.toString(),
						highClient : tmpHighClient.toString(),
						premiAlt : ((param.manfaat.totalPremi)/divider).toString(),
						lowAlt : tmpLowAlt.toString(),
						medAlt : tmpMedAlt.toString(),
						highAlt : tmpHighAlt.toString(),

						BASICPREMIUM1C : tmpBASICPREMIUM1C,
						BASICPREMIUM2C : tmpBASICPREMIUM2C,
						TOPUPSAVER1C : tmpTOPUPSAVER1C,
						TOPUPSAVER2C : tmpTOPUPSAVER2C,

						BASICPREMIUM1A : tmpBASICPREMIUM1A,
						BASICPREMIUM2A : tmpBASICPREMIUM2A,
						TOPUPSAVER1A : tmpTOPUPSAVER1A,
						TOPUPSAVER2A : tmpTOPUPSAVER2A
					 };
				 tmpListOutput = [];
				 tmpListOutput = newOutput['DEATHBENEFIT'];
				 if(tmpListOutput){
					 tmpListOutput.push(objGabDeath);
					newOutput['DEATHBENEFIT'] = tmpListOutput;
				 }else{
					 tmpListOutput = [];
					 tmpListOutput.push(objGabDeath);
					 newOutput['DEATHBENEFIT'] = tmpListOutput;
				 }
			 }
			 newOutput['SARIDER'] = param.SARIDER;
			 newOutput['RULEFORFUND'] = param.RULEFORFUND;

			newOutput.paymentFrequency = param.paymentFrequency;
  			newOutput.premi = param.manfaat.premi;

			 writeToConsole('newOutputALT == ',newOutput);

			 return newOutput;
		 }
		 		 
		function generateOutputROP(param, mapOutputMain){
			var mapOutput = mapOutputMain.mapOutputMainPAA;
			var newOutput = {};
			newOutput.FUNDMAP = {};

			var divider = 1000;

			for(var year in mapOutput){
				var mapItemCd = mapOutput[year];
				if(mapItemCd.ageCustomer > '88')
					continue;

				var mapFundNLG = mapItemCd.mapFundNLG;
				//ASUMTION CLIENT TOTAL FUND
				
				var objGabFund = {
					year : (year).toString(),
					customerAge : mapItemCd.ageCustomer.toString(),
					premiClient : parseInt(year) <= parseInt(param.rencanaPembayaran) ? ((param.manfaat.totalPremi)/divider).toString() : '',
					totalPremium : Math.round(mapFundNLG['FT_TOTAL_PREMIUM_ROP']/divider).toString(),
					standardPremium : Math.round(mapFundNLG['FT_PREMIUM_ROP']/divider).toString(),
					surrenderValue : Math.round(mapFundNLG['FT_SV_ROP']/divider).toString(),
					deathBenefit : Math.round(mapFundNLG['FT_DEATH_BENEFIT_ROP']/divider).toString(),
					deathBenefitUponAccident : Math.round(mapFundNLG['FT_DEATH_BENEFIT_ACCIDENT_ROP']/divider).toString(),
					angioplastyBenefit : Math.round(mapFundNLG['FT_ANGIOPLASTY_BENEFIT_ROP']/divider).toString(),
					maturity : Math.round(mapFundNLG['FT_ANGIOPLASTY_BENEFIT_ROP']/divider).toString(),
					accumulationPremium : Math.round(mapFundNLG['TOTALCVLOW']/divider).toString(),
					accumulationPremiumStd : Math.round(mapFundNLG['TOTALCVLOWSTD']/divider).toString()
				};

				tmpListOutput = [];
				tmpListOutput = newOutput['FUNDBENEFIT'];
				if(tmpListOutput){
					tmpListOutput.push(objGabFund);
					newOutput['FUNDBENEFIT'] = tmpListOutput;
				}else{
					tmpListOutput = [];
					tmpListOutput.push(objGabFund);
					newOutput['FUNDBENEFIT'] = tmpListOutput;
				}
			}
			newOutput['SARIDER'] = param.SARIDER;
			newOutput['RULEFORFUND'] = param.RULEFORFUND;

			newOutput.paymentFrequency = param.paymentFrequency;
  			newOutput.premi = param.manfaat.premi;
  			newOutput.SABASIC = mapOutput['1'].mapFundNLG['SABASIC']/divider.toString();

			return newOutput;
		}
	 
		function generateOutputNonPAR(param, mapOutputMain){
			var mapOutput = mapOutputMain.mapOutputMainPAA;
			var newOutput = {};
			newOutput.FUNDMAP = {};

			var divider = 1000;

			for(var year in mapOutput){
				var mapItemCd = mapOutput[year];
				if(mapItemCd.ageCustomer > '88')
					continue;

				var mapFundNLG = mapItemCd.mapFundNLG;
				//ASUMTION CLIENT TOTAL FUND
				
				var objGabFund = {
					year : (year).toString(),
					customerAge : mapItemCd.ageCustomer.toString(),
					premiClient : parseInt(year) <= parseInt(param.rencanaPembayaran) ? ((param.manfaat.totalPremi)/divider).toString() : '',
					totalPremium : Math.round(mapFundNLG['FT_TOTAL_CONT_NONPAR']/divider).toString(),
					standardPremium : Math.round(mapFundNLG['FT_CONT_NONPAR']/divider).toString(),
					surrenderValue : Math.round(mapFundNLG['FT_SV_NONPAR']/divider).toString(),
					deathBenefit : Math.round(mapFundNLG['FT_DEATH_BENEFIT_NONPAR']/divider).toString(),
					deathBenefitUponAccident : Math.round(mapFundNLG['FT_DEATH_BENEFIT_ACCIDENT_NONPAR']/divider).toString(),
					angioplastyBenefit : Math.round(mapFundNLG['FT_DEATH_BENEFIT_RAMADHAN_NONPAR']/divider).toString(),
					maturity : Math.round(mapFundNLG['FT_MATURITY_NONPAR']/divider).toString(),
					accumulationPremium : Math.round(mapFundNLG['TOTALCVLOW']/divider).toString(),
					accumulationPremiumStd : Math.round(mapFundNLG['TOTALCVLOWSTD']/divider).toString()
				};

				tmpListOutput = [];
				tmpListOutput = newOutput['FUNDBENEFIT'];
				if(tmpListOutput){
					tmpListOutput.push(objGabFund);
					newOutput['FUNDBENEFIT'] = tmpListOutput;
				}else{
					tmpListOutput = [];
					tmpListOutput.push(objGabFund);
					newOutput['FUNDBENEFIT'] = tmpListOutput;
				}
			}
			newOutput['SARIDER'] = param.SARIDER;
			newOutput['RULEFORFUND'] = param.RULEFORFUND;

			newOutput.paymentFrequency = param.paymentFrequency;
  			newOutput.premi = param.manfaat.premi;
  			newOutput.SABASIC = mapOutput['1'].mapFundNLG['SABASIC']/divider.toString();

			return newOutput;
		}

		 function generateOutputPAA2(param, mapOutputMain){
			var mapOutput = mapOutputMain.mapOutputMainPAA;
			 var newOutput = {};
			 newOutput.FUNDMAP = {};

			 var divider = 1;

			 if(param.currCd == 'USD'){
				 divider = 1;
			 }

			 if(isPPHC === true){
				 var outPutPPHC = generateOutputPAA2ALT(param, mapOutputMain);
			 }

			 var tmpLowClient;
			 var tmpLowClientSurr;

			var tmpDeathClient;
			var tmpDeathAlt;  

			var tmpMedClient;
			var tmpMedClientSurr;

			var tmpHighClient;
			var tmpHighClientSurr;

			var tmpLowAlt;
			var tmpLowAltSurr;

			var tmpMedAlt;
			var tmpMedAltSurr;

			var tmpHighAlt;
			var tmpHighAltSurr;

			var tmpBASICPREMIUM1C;
			var tmpBASICPREMIUM2C;
			var tmpTOPUPSAVER1C;
			var tmpTOPUPSAVER2C;

			var tmpBASICPREMIUM1A;
			var tmpBASICPREMIUM2A;
			var tmpTOPUPSAVER1A;
			var tmpTOPUPSAVER2A;

			 for(var year in mapOutput){
				 var mapItemCd = mapOutput[year];
				 var tmpListOutput = [];

				 var tmpListOutput = [];

				 var totalPremiumWithAccPremium = mapItemCd.mapFundNLG.BASICPREMIUM2 != undefined ? mapItemCd.mapFundNLG.BASICPREMIUM2 : 0;
				 var lowClientBoosterTemp = param.OFF_TOTALPRUBOOSTERLOW != undefined ? param.OFF_TOTALPRUBOOSTERLOW : 0;
				 var lowAltBoosterTemp = param.OFF_TOTALPRUBOOSTERLOW != undefined ? param.OFF_TOTALPRUBOOSTERLOW : 0;
				 var medClientBoosterTemp = param.OFF_TOTALPRUBOOSTERMED != undefined ? param.OFF_TOTALPRUBOOSTERMED : 0;
				 var medAltBoosterTemp = param.OFF_TOTALPRUBOOSTERMED != undefined ? param.OFF_TOTALPRUBOOSTERMED : 0;
				 var highClientBoosterTemp = param.OFF_TOTALPRUBOOSTERHIGH != undefined ? param.OFF_TOTALPRUBOOSTERHIGH : 0;
				 var highAltBoosterTemp = param.OFF_TOTALPRUBOOSTERHIGH != undefined ? param.OFF_TOTALPRUBOOSTERHIGH : 0;

				 for(var itemCd in mapItemCd.mapOutput){
					 var mapOut = mapItemCd.mapOutput[itemCd];
					//---------------------------------------------------------------------------------------------------------

					if(mapOut.ALLOCATION != '0'){
						//fund dihitung hanya yang ada alokasinya
						var tmpPremi = (((parseInt(mapOut.ALLOCATION) * totalPremiumWithAccPremium)/100)/1000);


						tmpLowClient = mapOut['CVTOTALLOWDISPLAY'] ?  (mapOut['CVTOTALLOWDISPLAY']/divider) : 0;
						tmpLowClientSurr = mapOut['TOTALSURRVALUELOWDISPLAY'] ?  (mapOut['TOTALSURRVALUELOWDISPLAY']/divider) : 0;

						tmpMedClient = mapOut['CVTOTALMEDDISPLAY'] ? (mapOut['CVTOTALMEDDISPLAY']/divider)  : 0;
						tmpMedClientSurr = mapOut['TOTALSURRVALUEMEDDISPLAY'] ? (mapOut['TOTALSURRVALUEMEDDISPLAY']/divider)  : 0;

						tmpHighClient = mapOut['CVTOTALHIGHDISPLAY'] ? (mapOut['CVTOTALHIGHDISPLAY']/divider) : 0;
						tmpHighClientSurr = mapOut['TOTALSURRVALUEHIGHDISPLAY'] ? (mapOut['TOTALSURRVALUEHIGHDISPLAY']/divider) : 0;

						tmpLowAlt = mapOut['ALTCVTOTALLOWDISPLAY'] ? (mapOut['ALTCVTOTALLOWDISPLAY']/divider) : 0;
						tmpLowAltSurr = mapOut['ALTTOTALSURRVALUELOWDISPLAY'] ? (mapOut['ALTTOTALSURRVALUELOWDISPLAY']/divider) : 0;

						tmpMedAlt = mapOut['ALTCVTOTALMEDDISPLAY'] ? (mapOut['ALTCVTOTALMEDDISPLAY']/divider) : 0;
						tmpMedAltSurr = mapOut['ALTTOTALSURRVALUEMEDDISPLAY'] ? (mapOut['ALTTOTALSURRVALUEMEDDISPLAY']/divider) : 0;

						tmpHighAlt = mapOut['ALTCVTOTALHIGHDISPLAY'] ? (mapOut['ALTCVTOTALHIGHDISPLAY']/divider) : 0;
						tmpHighAltSurr = mapOut['ALTTOTALSURRVALUEHIGHDISPLAY'] ? (mapOut['ALTTOTALSURRVALUEHIGHDISPLAY']/divider) : 0;


						if(param.currCd == 'IDR'){
							tmpLowClient = Math.round(tmpLowClient);
							tmpLowClientSurr = Math.round(tmpLowClientSurr);

							tmpMedClient = Math.round(tmpMedClient);
							tmpMedClientSurr = Math.round(tmpMedClientSurr);

							tmpHighClient = Math.round(tmpHighClient);
							tmpHighClientSurr = Math.round(tmpHighClientSurr);

							tmpLowAlt = Math.round(tmpLowAlt);
							tmpLowAltSurr = Math.round(tmpLowAltSurr);

							tmpMedAlt = Math.round(tmpMedAlt);
							tmpMedAltSurr = Math.round(tmpMedAltSurr);

							tmpHighAlt = Math.round(tmpHighAlt);
							tmpHighAltSurr = Math.round(tmpHighAltSurr);

						}

						var objList = {
								 year : (year).toString(),
								 customerAge : (mapItemCd.ageCustomer).toString(),
								 premiClient : parseInt(year) <= parseInt(param.rencanaPembayaran) ? (tmpPremi).toString() : '',
								 lowClient : tmpLowClient,
								 lowClientSurr : tmpLowClientSurr,
								 medClient : tmpMedClient,
								 MedClientSurr : tmpMedClientSurr,
								 highClient : tmpHighClient,
								 highClientSurr : tmpHighClientSurr,
								 premiAlt : (tmpPremi),
								 lowAlt : tmpLowAlt,
								 lowAltSurr : tmpLowAltSurr,
								 medAlt : tmpMedAlt,
								 medAltSurr : tmpMedAltSurr,
								 highAlt : tmpHighAlt,
								 highAltSurr : tmpHighAltSurr
							 };

						tmpListOutput = [];
						tmpListOutput = newOutput.FUNDMAP[itemCd];
						if(tmpListOutput){
							tmpListOutput.push(objList);
							 newOutput.FUNDMAP[itemCd] = tmpListOutput;
						}else{
							tmpListOutput = [];
							tmpListOutput.push(objList);
							newOutput.FUNDMAP[itemCd] = tmpListOutput;
						}
					}


				 }

				var mapFundNLG = mapItemCd.mapFundNLG;
				var mapFundNLGAlt = mapItemCd.mapFundNLGAlt;
				 //ASUMTION CLIENT TOTAL FUND
				 tmpLowClient = mapFundNLG['TOTALCVLOWFUNDDSPLY']/divider;
				 tmpLowClientSurr = mapFundNLG['FT_SURRENDERLOWVALUE']/divider;
				tmpMedClient = mapFundNLG['TOTALCVMEDFUNDDSPLY']/divider;
				tmpMedClientSurr = mapFundNLG['FT_SURRENDERMEDVALUE']/divider;
				tmpHighClient = mapFundNLG['TOTALCVHIGHFUNDDSPLY']/divider;
				tmpHighClientSurr = mapFundNLG['FT_SURRENDERHIGHVALU']/divider;
				tmpLowAlt = mapFundNLGAlt['TOTALCVLOWFUNDDSPLY']/divider;
				tmpLowAltSurr = mapFundNLGAlt['FT_SURRENDERLOWVALUE']/divider;
				tmpMedAlt = mapFundNLGAlt['TOTALCVMEDFUNDDSPLY']/divider;
				tmpMedAltSurr = mapFundNLGAlt['FT_SURRENDERMEDVALUE']/divider;
				tmpHighAlt = mapFundNLGAlt['TOTALCVHIGHFUNDDSPLY']/divider;
				tmpHighAltSurr = mapFundNLGAlt['FT_SURRENDERHIGHVALU']/divider;

				if(param.currCd == 'IDR'){
					tmpLowClient = Math.round(tmpLowClient);
					tmpLowClientSurr = Math.round(tmpLowClientSurr);
					tmpMedClient = Math.round(tmpMedClient);
					tmpMedClientSurr = Math.round(tmpMedClientSurr);
					tmpHighClient = Math.round(tmpHighClient);
					tmpHighClientSurr = Math.round(tmpHighClientSurr);
					tmpLowAlt = Math.round(tmpLowAlt);
					tmpLowAltSurr = Math.round(tmpLowAltSurr);
					tmpMedAlt = Math.round(tmpMedAlt);
					tmpMedAltSurr = Math.round(tmpMedAltSurr);
					tmpHighAlt = Math.round(tmpHighAlt);
					tmpHighAltSurr = Math.round(tmpHighAltSurr);
				}

				 var objGabFund = {
						 year : (year).toString(),
						customerAge : (mapItemCd.ageCustomer).toString(),
						premiClient : parseInt(year) <= parseInt(param.rencanaPembayaran) ? (isPPHC == false)?(Math.round((mapItemCd.mapFundNLG.BASICPREMIUM1)/1000)).toString():(Math.round((totalPremiumWithAccPremium)/1000)).toString() : '',
						lowClient : tmpLowClient.toString(),
						lowClientSurr : tmpLowClientSurr.toString(),
						medClient : tmpMedClient.toString(),
						medClientSurr : tmpMedClientSurr.toString(),
						highClient : tmpHighClient.toString(),
						highClientSurr : tmpHighClientSurr.toString(),
						premiAlt : (isPPHC == false)?(Math.round((mapItemCd.mapFundNLGAlt.BASICPREMIUM1)/1000)).toString():(Math.round((mapItemCd.mapFundNLGAlt.BASICPREMIUM2)/1000)).toString(),
						lowAlt : tmpLowAlt.toString(),
						lowAltSurr : tmpLowAltSurr.toString(),
						medAlt : tmpMedAlt.toString(),
						medAltSurr : tmpMedAltSurr.toString(),
						highAlt : tmpHighAlt.toString(),
						highAltSurr : tmpHighAltSurr.toString(),
						lowClientBooster : Math.round(lowClientBoosterTemp/1000).toString(),
						lowAltBooster : Math.round(lowAltBoosterTemp/1000).toString(),
						medClientBooster : Math.round(medClientBoosterTemp/1000).toString(),
						medAltBooster : Math.round(medAltBoosterTemp/1000).toString(),
						highClientBooster : Math.round(highClientBoosterTemp/1000).toString(),
						highAltBooster : Math.round(highAltBoosterTemp/1000).toString()
					 };

				 tmpListOutput = [];
				 tmpListOutput = newOutput['FUNDBENEFIT'];
				 if(tmpListOutput){
					 tmpListOutput.push(objGabFund);
					newOutput['FUNDBENEFIT'] = tmpListOutput;
				 }else{
					 tmpListOutput = [];
					 tmpListOutput.push(objGabFund);
					 newOutput['FUNDBENEFIT'] = tmpListOutput;
				 }

				 //ASUMTION CLIENT TOTAL DEATH BENEFIT
				 tmpLowClient = mapFundNLG['TOTALCVDBLOWDISPLAY']/divider;
				 tmpLowClientSurr = mapFundNLG['TOTALCVDBLOWDISPLAY']/divider;
				tmpMedClient = mapFundNLG['TOTALCVDBMEDDISPLAY']/divider;
				tmpMedClientSurr = mapFundNLG['TOTALCVDBMEDDISPLAY']/divider;
				tmpHighClient = mapFundNLG['TOTALCVDBHIGHDISPLAY']/divider;
				tmpHighClientSurr = mapFundNLG['TOTALCVDBHIGHDISPLAY']/divider;
				tmpLowAlt = mapFundNLGAlt['TOTALCVDBLOWDISPLAY']/divider;
				tmpLowAltSurr = mapFundNLGAlt['TOTALCVDBLOWDISPLAY']/divider;
				tmpMedAlt = mapFundNLGAlt['TOTALCVDBMEDDISPLAY']/divider;
				tmpMedAltSurr = mapFundNLGAlt['TOTALCVDBMEDDISPLAY']/divider;
				tmpHighAlt = mapFundNLGAlt['TOTALCVDBHIGHDISPLAY']/divider;
				tmpHighAltSurr = mapFundNLGAlt['TOTALCVDBHIGHDISPLAY']/divider;

				tmpBASICPREMIUM1C = mapFundNLG['BASICPREMIUM2CLIENT']/divider;
				tmpBASICPREMIUM2C = mapFundNLG['BASICPREMIUM2CLIENT']/divider;
				tmpTOPUPSAVER1C = mapFundNLG['TOPUPSAVER2']/1000;
				tmpTOPUPSAVER2C = mapFundNLG['TOPUPSAVER2']/1000;

				tmpBASICPREMIUM1A = mapFundNLGAlt['BASICPREMIUM2']/1000;
				tmpBASICPREMIUM2A = mapFundNLGAlt['BASICPREMIUM2']/1000;
				tmpTOPUPSAVER1A = mapFundNLGAlt['TOPUPSAVER2']/1000;
				tmpTOPUPSAVER2A = mapFundNLGAlt['TOPUPSAVER2']/1000;

				tmpDeathClient = mapFundNLG['TOTALDEATHBENEFITPGB']; 
				tmpDeathAlt = mapFundNLGAlt['TOTALDEATHBENEFITPGB'];

				if(param.currCd == 'IDR'){
					tmpLowClient = Math.round(tmpLowClient);
					tmpLowClientSurr = Math.round(tmpLowClientSurr);
					tmpMedClient = Math.round(tmpMedClient);
					tmpMedClientSurr = Math.round(tmpMedClientSurr);
					tmpHighClient = Math.round(tmpHighClient);
					tmpHighClientSurr = Math.round(tmpHighClientSurr);
					tmpLowAlt = Math.round(tmpLowAlt);
					tmpLowAltSurr = Math.round(tmpLowAltSurr);
					tmpMedAlt = Math.round(tmpMedAlt);
					tmpMedAltSurr = Math.round(tmpMedAltSurr);
					tmpHighAlt = Math.round(tmpHighAlt);
					tmpHighAltSurr = Math.round(tmpHighAltSurr);
					tmpBASICPREMIUM1C = Math.round(tmpBASICPREMIUM1C);
					tmpBASICPREMIUM2C = Math.round(tmpBASICPREMIUM2C);
					tmpTOPUPSAVER1C = Math.round(tmpTOPUPSAVER1C);
					tmpTOPUPSAVER2C = Math.round(tmpTOPUPSAVER2C);
					tmpBASICPREMIUM1A = Math.round(tmpBASICPREMIUM1A);
					tmpBASICPREMIUM2A = Math.round(tmpBASICPREMIUM2A);
					tmpTOPUPSAVER1A = Math.round(tmpTOPUPSAVER1A);
					tmpTOPUPSAVER2A = Math.round(tmpTOPUPSAVER2A);
					tmpDeathClient = Math.round(tmpDeathClient);
					tmpDeathAlt = Math.round(tmpDeathAlt);
				}
				 var objGabDeath = {
						 year : (year).toString(),
						customerAge : (mapItemCd.ageCustomer).toString(),
						premiClient : parseInt(year) <= parseInt(param.rencanaPembayaran) ? (isPPHC == false)?(Math.round((mapItemCd.mapFundNLG.BASICPREMIUM1)/1000)).toString():(Math.round((totalPremiumWithAccPremium)/1000)).toString() : '',
						lowClient : tmpLowClient.toString(),
						lowClientSurr : tmpLowClientSurr.toString(),
						medClient : tmpMedClient.toString(),
						medClientSurr : tmpMedClientSurr.toString(),
						highClient : tmpHighClient.toString(),
						highClientSurr : tmpHighClientSurr.toString(),
						premiAlt : (isPPHC == false)?(Math.round((mapItemCd.mapFundNLGAlt.BASICPREMIUM1)/1000)).toString():(Math.round((mapItemCd.mapFundNLGAlt.BASICPREMIUM2)/1000)).toString(),
						lowAlt : tmpLowAlt.toString(),
						lowAltSurr : tmpLowAltSurr.toString(),
						medAlt : tmpMedAlt.toString(),
						medAltSurr : tmpMedAltSurr.toString(),
						highAlt : tmpHighAlt.toString(),
						highAltSurr : tmpHighAltSurr.toString(),
						lowClientBooster : Math.round(lowClientBoosterTemp/1000).toString(),
						lowAltBooster : Math.round(lowAltBoosterTemp/1000).toString(),
						medClientBooster : Math.round(medClientBoosterTemp/1000).toString(),
						medAltBooster : Math.round(medAltBoosterTemp/1000).toString(),
						highClientBooster : Math.round(highClientBoosterTemp/1000).toString(),
						highAltBooster : Math.round(highAltBoosterTemp/1000).toString(),
						BASICPREMIUM1C : tmpBASICPREMIUM1C,
						BASICPREMIUM2C : tmpBASICPREMIUM2C,
						TOPUPSAVER1C : tmpTOPUPSAVER1C,
						TOPUPSAVER2C : tmpTOPUPSAVER2C,
						BASICPREMIUM1A : tmpBASICPREMIUM1A,
						BASICPREMIUM2A : tmpBASICPREMIUM2A,
						TOPUPSAVER1A : tmpTOPUPSAVER1A,
						TOPUPSAVER2A : tmpTOPUPSAVER2A,
						premiDeathClient : tmpDeathClient/1000,
						premiDeathAlt : tmpDeathAlt/1000
					 };
				 tmpListOutput = [];
				 tmpListOutput = newOutput['DEATHBENEFIT'];
				 if(tmpListOutput){
					 tmpListOutput.push(objGabDeath);
					newOutput['DEATHBENEFIT'] = tmpListOutput;
				 }else{
					 tmpListOutput = [];
					 tmpListOutput.push(objGabDeath);
					 newOutput['DEATHBENEFIT'] = tmpListOutput;
				 }
			 }
			 newOutput['SARIDER'] = param.SARIDER;
			 newOutput['RULEFORFUND'] = param.RULEFORFUND;
			 newOutput['CHARGERIDER'] = mapOutput[1].mapChargeRider;

			 newOutput['outPutPPHALT'] = outPutPPHC;
			 newOutput['isPPH'] = isPPHC;
			newOutput.paymentFrequency = param.paymentFrequency;
  			newOutput.premi = param.manfaat.premi;
			
			 if(param.GIOCODE != undefined){
				 if(param.currCd == 'IDR'){
					 if(param.mainCoverage == 'U1LR'){
						 newOutput['GIOCODE'] = 'U1L1';			
					 }else if(param.mainCoverage == 'U1MR'){
						 newOutput['GIOCODE'] = 'U1M1';
					 }
				 }else{
					 newOutput['GIOCODE'] = 'U1L2';
				 }
			 }

			rootScope.newOutput = newOutput;
			 return newOutput;
		 }

		function getRuleValidation(mainCoverage, mapOutputCoverage, itemList, manfaatList, isAlterProcess, manfaatListObsolete){
			var itemCategory = (isAlterProcess != undefined && isAlterProcess == 'ALTER' ? 'Alter' : 'New Business');
			var objRMINPLAN = {"1000000":"FRML_MAX_PLAN_01", "1500000":"FRML_MAX_PLAN_02", "2000000":"FRML_MAX_PLAN_03", "4000000":"FRML_MAX_PLAN_04", "6000000":"FRML_MAX_PLAN_05", "8000000":"FRML_MAX_PLAN_06"};
			  var ruleList = [];		 	
			  var keyTertanggungAge;
			  var isCoverageGroup = false;
			  for(var i = 0; i < itemList.length; i++){
				  var itemRuleList = [];
				  //alter part if there are several 
				  var latestManfaat = true;
				  if(itemList[i+1] != undefined && itemList[i].itemCd == itemList[i+1].itemCd
						  && itemList[i].keyTertanggungAge == itemList[i+1].keyTertanggungAge){
					  latestManfaat = false;
				  }
				  //end alter part
				//   if(itemList[i].itemCd == 'P1IR'){
				// 	  var xxx =0
				//   }
				  if(itemList[i].itemType === 'COVERAGE_GROUP' ||
					 itemList[i].itemType === 'Coverage Group' ||
					 itemList[i].itemType === 'Coverage_Group'){
					  itemRuleList = rootScope.COVERAGE_GROUP[itemList[i].itemCd].RULE;
					  itemRuleList = itemRuleList.filter( function(item){return (item.category == itemCategory || item.category == 'Both');} );
					  isCoverageGroup = true;
				  }else{
					  /*if(itemCategory == 'Alter' && !itemList[i].isNeedToBeCalculated){
						continue;
					  }*/
					  itemRuleList = rootScope.COVERAGE[itemList[i].itemCd].RULE;
					  itemRuleList = itemRuleList.filter( function(item){return (item.category == itemCategory || item.category == 'Both');} );
					  isCoverageGroup = false;
				  }
				  
					//alter to get alter_process_status
					if(itemList[i].isNeedToBeCalculated != undefined &&
							itemCategory == 'Alter'){
						if(!itemList[i].isNeedToBeCalculated){//None
							itemRuleList = itemRuleList.filter( function(item){return (item.alterProcessStatus != undefined ? item.alterProcessStatus.indexOf('None') != -1 : true);} );
						}
						else if(itemList[i].isNeedToBeCalculated && !latestManfaat){//Partial
							itemRuleList = itemRuleList.filter( function(item){return (item.alterProcessStatus != undefined ? item.alterProcessStatus.indexOf('Partial') != -1 : true);} );
						}
						else{//full
							itemRuleList = itemRuleList.filter( function(item){return (item.alterProcessStatus != undefined ? item.alterProcessStatus.indexOf('Full') != -1 : true);} );
						}
					}
					//end alter to get alter_process_status
				  var negateNextRulePerSequence = false;
					itemRuleList.sort(function(a,b) {return a.sequence - b.sequence;} );
				  for(var j = 0; j < itemRuleList.length; j++){
					  var itemRule = itemRuleList[j];
   					  var exec = false;
					  var cov;
					  var mainCov;

					  mainCov = itemRule.mainCoverage;
					  cov = itemRule.itemCd;

					  var arrMainCov = [];
					  var toSplitMainCov = itemRule.mainCoverage ? itemRule.mainCoverage : "";
					  arrMainCov = toSplitMainCov.split(',');

					  //trim string array
					  arrMainCov = arrMainCov.map(function (el) {
					  return el.trim();
					});
					
					  var mainCovSplit;

					  if(itemRule != undefined && itemRule.ruleCd == 'MAXMINLIFE_GIO'){
						itemRule.errorType = 'WARNING';
					  }

					  if(arrMainCov.length != 0){
						  for(var mc in arrMainCov){
							  if(arrMainCov[mc] == mainCoverage){
								  mainCovSplit = arrMainCov[mc];
								  break;
							  }
						  }
					  }

					  if( mainCovSplit == mainCoverage){
					  }

					  if(isCoverageGroup){
						  if(itemRule.mainCoverage){
							  if((itemRule.mainCoverage == '' && itemRule.itemCd == mainCoverage) || itemRule.mainCoverage.indexOf(mainCoverage) !== -1){
								  exec = true;
							  }
						  }else{
							  if(itemRule.itemCd == mainCoverage){
								  exec = true;
							  }

						  }
						  mainCovSplit = null;
						  arrMainCov = null;
					  }else{
						  if(itemRule.mainCoverage){
							  if((mainCov == '' && cov == mainCoverage) || mainCovSplit == mainCoverage){
								  exec = true;
							  }
						  }else{
							  if(itemRule.itemCd == mainCoverage){
								  exec = true;
							  }

						  }
						  mainCovSplit = null;
						  arrMainCov = null;
					  }

					  if(exec){
						  var isCusAge = false;
						  //writeToConsole('___________________________RULE PROCESS______________________________________');
						  keyTertanggungAge = itemList[i].keyTertanggungAge;
						  var tmpRule = rootScope.RULE[itemRule.ruleCd+'|'+cov];
						  if(tmpRule){
							  var mapProperties = itemList[i].properties;
							  var keyValue = tmpRule.keyType.toLowerCase().trim();
							  var key = tmpRule.key;//+'0'+keyTertanggung;
							  var inputValue = 0;
							  var custKey;
							  var valueRMinPlan = 0;
							  var frmlRMinPlan;

							if(keyValue === "customer" || keyValue === "coverage"){
								if(key == 'CUSTAGE'){
									inputValue = mapProperties[keyTertanggungAge] ? mapProperties[keyTertanggungAge] : 0;
									isCusAge = true;
								}else{
									if(itemRule.itemCd.match(/H1X.*/) && itemRule.ruleCd.match(/R_MIN_PLAN.*/)){
										valueRMinPlan = Number(mapProperties[key]).toFixed(0);
										frmlRMinPlan = valueRMinPlan ? objRMINPLAN[valueRMinPlan] : 0;
										if(itemRule.value != frmlRMinPlan){
											continue;
										}
									}
									if(key === 'PDSA' || key === 'PDSASUM'){
										if(!mapProperties[key+'_'+itemList[i].itemCd]){
											inputValue = mapProperties[key] ? mapProperties[key] : 0; 
										}else{
											inputValue = mapProperties[key+'_'+itemList[i].itemCd] ? mapProperties[key+'_'+itemList[i].itemCd] : 0; 
										}
										
									}else if(key === 'PDPREMI'){
										if(!mapProperties[key+'_'+itemList[i].itemCd]){
											// key = 'CUSTSAVER';
											inputValue = mapProperties[key] ? mapProperties[key] : 0; 
										}else{
											inputValue = mapProperties[key+'_'+itemList[i].itemCd] ? mapProperties[key+'_'+itemList[i].itemCd] : 0; 
										}
									}else if(key === 'CUSTTOPUP'){
                                        inputValue = mapProperties['CUSTTOPUP_MIN'];
                                    }else if(key === 'CUSTWITHDRAW'){
                                        inputValue = mapProperties['CUSTWITHDRAW_MIN'];
                                    }else{

										inputValue = mapProperties[key] ? mapProperties[key] : 0; 
									}
								}

							}else if(keyValue === "formula"){
								  if(key == 'COVTERM_WAIVER01' || key == 'COVTERM_PPAYOR01' ||
									key == 'COVTERM_WAIVER02' || key == 'COVTERM_PPAYOR02'){
									
									inputValue = (mapOutputCoverage[key] <= 0 || mapOutputCoverage[key] >= 0) ? mapOutputCoverage[key] : 50;
								}else if(mapOutputCoverage[key + "_" + itemList[i].itemCd] != undefined){
									inputValue= mapOutputCoverage[key + "_" + itemList[i].itemCd] ? mapOutputCoverage[key + "_" + itemList[i].itemCd] : 0;
								}else{
									inputValue= mapOutputCoverage[key] ? mapOutputCoverage[key] : 0;
								}
							}

							  var value2;
							  if(itemRule.type.toLowerCase() === 'logic'){
								value2 = formulaRule(itemList[i].itemCd, itemRule.value, mapProperties, mapOutputCoverage);
							  }else if(itemRule.type.toLowerCase() === 'obsolete'){
								
									if(manfaatListObsolete.length > 0){
										for(var obs=0; obs < manfaatListObsolete.length; obs++){
											if(itemRule.value.indexOf(manfaatListObsolete[obs].code) !== -1){
												value2 = 1;
												break;
											} else {
												value2 = 0;
											}	
										}
									} else {
										value2 = 0;
									}

									inputValue = 1;

							  }else{
								value2 = itemRule.value;  
							  }

							  var ruleValue;
							  //alter minta dirounding down katanya
							  if((itemRule.itemCd == 'H1VR' || itemRule.itemCd == 'H1WR') && itemCategory != undefined && itemCategory == 'Alter'){
								  ruleValue =Math.floor(value2);
							  } else if(itemRule.itemCd == 'H1VR'){
								  ruleValue =Math.round(value2);
						      } else if(itemRule.itemCd.match(/H1X.*/) && itemRule.ruleCd.match(/R_MIN_PLAN.*/)){
									if(Math.floor(value2) <= 0 ){
										continue;
									}
							  } else{
								ruleValue = value2;
							  }
							  var roundFixInput = Number(inputValue).toFixed(2);
							  var inputValue2 = tmpCurr == "IDR" ? Math.round(roundFixInput) : parseFloat(roundFixInput);
							  ruleValue = tmpCurr == "IDR" ? Math.round(Number(ruleValue).toFixed(2)) : parseFloat(Number(ruleValue).toFixed(2));
							  var comparisson = getComparissonValue(inputValue2, tmpRule.operator, ruleValue);

							  //harus diperbaiki rule nya
							  if(inputValue >= 10 && itemRule.ruleCd == 'R_PLAN'){
								  comparisson = false;
							  }
							  
							  var comparisson = getComparissonValue(inputValue2, tmpRule.operator, ruleValue);
							  
							  if((tmpRule.ruleTypeCd == 'ADDLIFE1AGE' && keyTertanggungAge == 'CUSTAGE03') || 
								  (tmpRule.ruleTypeCd == 'ADDLIFE2AGE' && keyTertanggungAge == 'CUSTAGE02') || 
								  (key == 'COVTERM_WAIVER01' && tmpRule.keyTertanggungAge == 'CUSTAGE03') || 
								  (key == 'COVTERM_WAIVER02' && tmpRule.keyTertanggungAge == 'CUSTAGE02')){

							  }else{

								  if(comparisson == true){
									  var resultMap = {
											  coverageCd: itemRule.itemCd,
											ruleCd : tmpRule.code,
											ruleTypeCd : tmpRule.ruleTypeCd,
											key : tmpRule.key,
											keyType : tmpRule.keyType,
											operator : tmpRule.operator,
											type : itemRule.type,
											value : ruleValue,
											isCoverageGroup: isCoverageGroup,
											sequence: parseInt(itemRule.sequence),
											errorType : itemRule.errorType,
											errorMessageInd : itemRule.errorMessageInd,
											errorMessageEng : itemRule.errorMessageEng,
											sumAssured : itemList[i].properties['PDSA'],
											comparisson : comparisson,
											ruleShowType : tmpRule.ruleShowType
										  };
									  ruleList.push(resultMap);
								  }
							  }
						  }
						  tmpRule = null;
					  }
					  keyTertanggungAge = null;
					  if(itemRule.negateNextRule != undefined && itemRule.negateNextRule && comparisson){
						  if(itemRuleList[j+1] != undefined && itemRuleList[j+1].sequence == itemRule.sequence){
							negateNextRulePerSequence = true;
						  }
						  else{
							break;
						  }
					  }
					  else if(negateNextRulePerSequence && itemRuleList[j+1] != undefined && itemRuleList[j+1].sequence != itemRule.sequence){
						  break;
					  }
				  }
			  }
			  return ruleList.filter(function (a) {
				var key = a.ruleCd;
				var cvrgCd = a.coverageCd;
				var type = a.type;
				if (!this[key+cvrgCd+type]) {
					this[key+cvrgCd+type] = true;
					return true;
				}
			  }, Object.create(null));
		}

		function formulaRule(itemCd, formulaCd, map, mapOutputCoverage, mapOutputFund){
			var frml = rootScope.FORMULA[formulaCd];
			 var stringFormula = '';
			 var stringFormulaOri = '';
			var itemType = '';
			 var result = 0;

			if(frml){
				 var forElmList = frml.FORMULA_ELEMENT;

				//  if(itemCd === 'H1WR' && formulaCd === 'FRML_MAXUNIT_ALTER08'){
				// 	var xxx = 0;
				//  }

				 for(var i= 0; i < forElmList.length; i++){
					 var fe = forElmList[i];
					stringFormulaOri += fe.value;
					if(fe.type.toLowerCase().trim() === "customer"
						|| fe.type.toLowerCase().trim() === "coverage"
						|| fe.type.toLowerCase().trim() === "rate"
						|| fe.type.toLowerCase().trim() === "load"
						|| fe.type.toLowerCase().trim() === "fund"
						|| fe.type.toLowerCase().trim() === "product"
						|| fe.type.toLowerCase().trim() === "allocation"){

					  if(fe.value.toUpperCase() === 'CUSTINCOME'){
						stringFormula += "\'" + map[fe.value] +"\'";
					  }else if(fe.value.toUpperCase() === 'PDPLAN'){
						  stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
					  }else if(fe.value.toUpperCase() === 'PDALLO'){
						  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
					  }else if(fe.value.toUpperCase() === 'CUSTTOPUP'){
                        stringFormula += map['CUSTTOPUP_MIN'] ? map['CUSTTOPUP_MIN'] : '0.0';
                      }else if(fe.value.toUpperCase() === 'CUSTWITHDRAW'){
                        stringFormula += map['CUSTWITHDRAW_MIN'] ? map['CUSTWITHDRAW_MIN'] : '0.0';
                      }else{
						  stringFormula += map[fe.value] ? (isNaN(map[fe.value]) ? (map[fe.value].charAt(0) == "'" ? map[fe.value] : "\'" + map[fe.value] +"\'") : map[fe.value]) : '0.0';
					  }

					}else if(fe.type.toLowerCase().trim() === "formula"){
					  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
					}else if(fe.type.toLowerCase().trim() === "string"){
					  stringFormula += "\'"+fe.value+"\'";
					}else{
					  stringFormula += fe.value;
					}
				 }

				 if(isValidExpression(stringFormula)){
					result = getResultExpression(stringFormula);

				}
			}

			return result;

		}

		function formulaPrecalculate(obj, param, map, mapOutputCoverage){
			var frml = rootScope.FORMULA[obj.formulaCd];
			 var stringFormula = '';
			 var stringFormulaAlt = '';
			 var stringFormulaOri = '';
			var itemType = '';
			 var result = 0;
			 var resultAlternativeAsumtion = 0;
			 var value;

			// if(obj.formulaCd == 'FRMLRIDERPREMITY09_PRECALCULATED'){
			// 	var xxx = 0;
			// }

			if(frml){
				 var forElmList = frml.FORMULA_ELEMENT;
				
				 for(var i= 0; i < forElmList.length; i++){
					 var fe = forElmList[i];
					stringFormulaOri += fe.value;
					if(fe.type.toLowerCase().trim() === "customer"
						|| fe.type.toLowerCase().trim() === "coverage"
						|| fe.type.toLowerCase().trim() === "rate"
						|| fe.type.toLowerCase().trim() === "load"
						|| fe.type.toLowerCase().trim() === "fund"
						|| fe.type.toLowerCase().trim() === "product"
						|| fe.type.toLowerCase().trim() === "allocation"){

					  if(fe.value.toUpperCase() === 'CUSTINCOME'){
						stringFormula += "\'" + map[fe.value] +"\'";
						stringFormulaAlt += "\'" + map[fe.value] +"\'";
					  }else if(fe.value.toUpperCase() === 'PDPLAN'){
						  stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
						  stringFormulaAlt += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
					  }else if(fe.value.toUpperCase() === 'PDALLO'){
							  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
							  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
					  }else if(fe.value.toUpperCase() === 'YEAR'){
							  stringFormula += param.year;
							  stringFormulaAlt += param.year;		
					  }else{
							  stringFormula += map[fe.value] && map[fe.value].toString().trim() != '' ? (isNaN(map[fe.value]) ? (map[fe.value].charAt(0) == "'" ? map[fe.value] : "\'" + map[fe.value] +"\'") : map[fe.value]) : '0.0';
							  stringFormulaAlt += map[fe.value] && map[fe.value].toString().trim() != '' ? (isNaN(map[fe.value]) ? (map[fe.value].charAt(0) == "'" ? map[fe.value] : "\'" + map[fe.value] +"\'") : map[fe.value]) : '0.0';
					  }

					}else if(fe.type.toLowerCase().trim() === "formula"){
					  if(fe.value.toUpperCase() === 'MAXLVPREMI'){
							stringFormula += "\'" + map[fe.value] +"\'";
							  stringFormulaAlt += "\'" + map[fe.value] +"\'";
					  }else if(fe.value.toUpperCase() === 'DIFFLVPREMI'){
							stringFormula += '0.0';
							  stringFormulaAlt += '0.0';	
					  }else if(fe.value.toUpperCase() == 'SA_LINKTERM' || fe.value.toUpperCase() == 'OF_CUSTAGEPOLICY'){
							  stringFormula += map[fe.value] ? map[fe.value]: '0.0';
							  stringFormulaAlt += map[fe.value] ? map[fe.value]: '0.0';
					  }else if(fe.value.toUpperCase() == 'SABASIC'){
							  stringFormula += map['SA_BASIC'] ? map['SA_BASIC']: '0.0';
							  stringFormulaAlt += map['SA_BASIC'] ? map['SA_BASIC']: '0.0';
					  }else if(fe.value.toUpperCase() == 'TOTALPREMIUMWITHACCPREMIUMLBDB' && (obj.formulaCd == 'FRML_TOT_PREMIUM_LB_CLIENT_PRECALCULATED' || obj.formulaCd == 'FRML_TOT_PREMIUM_PRECALCULATED')){
							stringFormula += param[fe.value.toUpperCase()+'CLIENT'] ? param[fe.value.toUpperCase()+'CLIENT'] : '0.0';
							stringFormulaAlt += param[fe.value.toUpperCase()+'CLIENT'] ? param[fe.value.toUpperCase()+'CLIENT'] : '0.0';
					  }else if(fe.value.toUpperCase() == 'TOTALPREMIUMWITHACCPREMIUMLBDB' && (obj.formulaCd == 'FRML_TOT_PREMIUM_LB_ALT_PRECALCULATED' || obj.formulaCd == 'FRML_TOT_PREMIUM_PRECALCULATED')){
							stringFormula += param[fe.value.toUpperCase()+'ALT'] ? param[fe.value.toUpperCase()+'ALT'] : '0.0';
							stringFormulaAlt += param[fe.value.toUpperCase()+'ALT'] ? param[fe.value.toUpperCase()+'ALT'] : '0.0';
					  }else if(fe.value.toUpperCase() == 'PREMIUMINCREASEBEFOREROUNDING' && obj.formulaCd == 'FRML_INC_PREMIUM_CLIENT_PRECALCULATED'){
							stringFormula += param[fe.value.toUpperCase()+'CLIENT'] ? param[fe.value.toUpperCase()+'CLIENT'] : '0.0';
							stringFormulaAlt += param[fe.value.toUpperCase()+'CLIENT'] ? param[fe.value.toUpperCase()+'CLIENT'] : '0.0';
					  }else if(fe.value.toUpperCase() == 'PREMIUMINCREASEBEFOREROUNDING' && obj.formulaCd == 'FRML_INC_PREMIUM_WITH_ROUNDING_PRECALCULATED'){
							stringFormula += param[fe.value.toUpperCase()+'ALT'] ? param[fe.value.toUpperCase()+'ALT'] : '0.0';
							stringFormulaAlt += param[fe.value.toUpperCase()+'ALT'] ? param[fe.value.toUpperCase()+'ALT'] : '0.0';            
					  }else{
							  stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
							  stringFormulaAlt += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';	
					  }	
					  
					}else if(fe.type.toLowerCase().trim() === "string"){
					  stringFormula += "\'"+fe.value+"\'";
					  stringFormulaAlt += "\'"+fe.value+"\'";
					}else{
					  stringFormula += fe.value;
					  stringFormulaAlt += fe.value;
					}
				 }

				 if(isValidExpression(stringFormula)){
					result = getResultExpression(stringFormula);
					resultAlternativeAsumtion = getResultExpression(stringFormulaAlt);

					if(obj.formulaCd == 'FRML_INCOME_CUST'){
						result = "'" + result + "'";
						resultAlternativeAsumtion = "'" + resultAlternativeAsumtion + "'";
					}

					if(obj.output == 'MAXLVPREMI'){
						map['MAXLVPREMI'] = result;
					}
					
					if(obj.output == 'DIFFLVPREMI'){
						map['DIFFLVPREMI'] = result;
					}

					parseToLogFile(param, obj, obj, stringFormulaOri, stringFormula, stringFormulaAlt, 
							'in function FORMULA PRECALCULATE', result, resultAlternativeAsumtion, obj, 'nonPph');

					if(obj.output == 'TOTALPREMIUMWITHACCPREMIUMLBDB' && (obj.formulaCd == 'FRML_TOT_PREMIUM_LB_CLIENT_PRECALCULATED' || obj.formulaCd == 'FRML_TOT_PREMIUM_PRECALCULATED')){
						param[obj.output+'CLIENT'] = result;
					}

					if(obj.output == 'TOTALPREMIUMWITHACCPREMIUMLBDB' && (obj.formulaCd == 'FRML_TOT_PREMIUM_LB_ALT_PRECALCULATED' || obj.formulaCd == 'FRML_TOT_PREMIUM_PRECALCULATED')){
						param[obj.output+'ALT'] = result;

					}

					if(obj.output == 'PREMIUMINCREASEBEFOREROUNDING' && obj.formulaCd == 'FRML_INC_PREMIUM_CLIENT_PRECALCULATED'){
						param[obj.output+'CLIENT'] = Math.ceil(result);
					}

					if(obj.output == 'PREMIUMINCREASEBEFOREROUNDING' && obj.formulaCd == 'FRML_INC_PREMIUM_ALT_PRECALCULATED'){
						param[obj.output+'ALT'] = Math.ceil(result);
					}

					if(obj.output == 'SA_AMOUNT_PRUMED'){
						map['SA_AMOUNT_PRUMED'] = result;
					}

					if(obj.output){						
						value = mapOutputCoverage[obj.output];
						if(value){
							value = (value + result) ;
							mapOutputCoverage[obj.output] = value;
						}else{
							mapOutputCoverage[obj.output] = result;
						}	
					}
					
				}
			}
			
		}

		function formulaPrecalculateALT(obj, param, map, mapOutputCoverage){
			var frml = rootScope.FORMULA[obj.formulaCd];
			 var stringFormula = '';
			 var stringFormulaAlt = '';
			 var stringFormulaOri = '';
			var itemType = '';
			 var result = 0;
			 var resultAlternativeAsumtion = 0;
			 var value;
			if(frml){
				 var forElmList = frml.FORMULA_ELEMENT;

				 for(var i= 0; i < forElmList.length; i++){
					 var fe = forElmList[i];
					stringFormulaOri += fe.value;
					if(fe.type.toLowerCase().trim() === "customer"
						|| fe.type.toLowerCase().trim() === "coverage"
						|| fe.type.toLowerCase().trim() === "rate"
						|| fe.type.toLowerCase().trim() === "load"
						|| fe.type.toLowerCase().trim() === "fund"
						|| fe.type.toLowerCase().trim() === "product"
						|| fe.type.toLowerCase().trim() === "allocation"){

					  if(fe.value.toUpperCase() === 'CUSTINCOME'){
						stringFormula += "\'" + map[fe.value] +"\'";
						stringFormulaAlt += "\'" + map[fe.value] +"\'";
					  }else if(fe.value.toUpperCase() === 'PDPLAN'){
						  stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
						  stringFormulaAlt += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
					  }else if(fe.value.toUpperCase() === 'PDALLO'){
							  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
							  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
					  }else if(fe.value.toUpperCase() === 'YEAR'){
							  stringFormula += param.year;
							  stringFormulaAlt += param.year;		
					  }else{
							  stringFormula += map[fe.value] && map[fe.value].toString().trim() != '' ? (isNaN(map[fe.value]) ? (map[fe.value].charAt(0) == "'" ? map[fe.value] : "\'" + map[fe.value] +"\'") : map[fe.value]) : '0.0';
							  stringFormulaAlt += map[fe.value] && map[fe.value].toString().trim() != '' ? (isNaN(map[fe.value]) ? (map[fe.value].charAt(0) == "'" ? map[fe.value] : "\'" + map[fe.value] +"\'") : map[fe.value]) : '0.0';
					  }

					}else if(fe.type.toLowerCase().trim() === "formula"){
					  if(fe.value.toUpperCase() === 'MAXLVPREMI'){
							stringFormula += "\'" + map[fe.value] +"\'";
							  stringFormulaAlt += "\'" + map[fe.value] +"\'";
					  }else if(fe.value.toUpperCase() === 'PPHRIDERPREMIUM'){
							  stringFormula = map[fe.value+obj.coverage]?map[fe.value+obj.coverage]:'0.0'
							  stringFormulaAlt += map[fe.value+obj.coverage] ? map[fe.value+obj.coverage]: '0.0';
					  }
					  else if(fe.value.toUpperCase() === 'DIFFLVPREMI'){
							stringFormula += param['DIFFLVPREMI_O'] ? param['DIFFLVPREMI_O']: '0.0';
							  stringFormulaAlt += param['DIFFLVPREMI_O'] ? param['DIFFLVPREMI_O']: '0.0';
					  }else if(fe.value.toUpperCase() == 'SA_LINKTERM' || fe.value.toUpperCase() == 'OF_CUSTAGEPOLICY'){
							  stringFormula += map[fe.value] ? map[fe.value]: '0.0';
							  stringFormulaAlt += map[fe.value] ? map[fe.value]: '0.0';
					  }else if(fe.value.toUpperCase() == 'SABASIC'){
							  stringFormula += map['SA_BASIC'] ? map['SA_BASIC']: '0.0';
							  stringFormulaAlt += map['SA_BASIC'] ? map['SA_BASIC']: '0.0';
					  }else if(fe.value.toUpperCase() == 'TOTALPREMIUMWITHACCPREMIUMLBDB' && (obj.formulaCd == 'FRML_TOT_PREMIUM_LB_CLIENT_PRECALCULATED' || obj.formulaCd == 'FRML_TOT_PREMIUM_PRECALCULATED')){
							stringFormula += param[fe.value.toUpperCase()+'CLIENT'] ? param[fe.value.toUpperCase()+'CLIENT'] : '0.0';
							stringFormulaAlt += param[fe.value.toUpperCase()+'CLIENT'] ? param[fe.value.toUpperCase()+'CLIENT'] : '0.0';
					  }else if(fe.value.toUpperCase() == 'TOTALPREMIUMWITHACCPREMIUMLBDB' && (obj.formulaCd == 'FRML_TOT_PREMIUM_LB_ALT_PRECALCULATED' || obj.formulaCd == 'FRML_TOT_PREMIUM_PRECALCULATED')){
							stringFormula += param[fe.value.toUpperCase()+'ALT'] ? param[fe.value.toUpperCase()+'ALT'] : '0.0';
							stringFormulaAlt += param[fe.value.toUpperCase()+'ALT'] ? param[fe.value.toUpperCase()+'ALT'] : '0.0';
					  }else if(fe.value.toUpperCase() == 'PREMIUMINCREASEBEFOREROUNDING' && obj.formulaCd == 'FRML_INC_PREMIUM_CLIENT_PRECALCULATED'){
							stringFormula += param[fe.value.toUpperCase()+'CLIENT'] ? param[fe.value.toUpperCase()+'CLIENT'] : '0.0';
							stringFormulaAlt += param[fe.value.toUpperCase()+'CLIENT'] ? param[fe.value.toUpperCase()+'CLIENT'] : '0.0';
					  }else if(fe.value.toUpperCase() == 'PREMIUMINCREASEBEFOREROUNDING' && obj.formulaCd == 'FRML_INC_PREMIUM_WITH_ROUNDING_PRECALCULATED'){
							stringFormula += param[fe.value.toUpperCase()+'ALT'] ? param[fe.value.toUpperCase()+'ALT'] : '0.0';
							stringFormulaAlt += param[fe.value.toUpperCase()+'ALT'] ? param[fe.value.toUpperCase()+'ALT'] : '0.0';            
					  }else{
							  stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
							  stringFormulaAlt += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';	
					  }	
					  
					}else if(fe.type.toLowerCase().trim() === "string"){
					  stringFormula += "\'"+fe.value+"\'";
					  stringFormulaAlt += "\'"+fe.value+"\'";
					}else{
					  stringFormula += fe.value;
					  stringFormulaAlt += fe.value;
					}
				 }

				 if(isValidExpression(stringFormula)){
					result = getResultExpression(stringFormula);
					resultAlternativeAsumtion = getResultExpression(stringFormulaAlt);

					if(obj.output == 'MAXLVPREMI'){
						map['MAXLVPREMI'] = result;
					}
					// if(obj.output == 'DIFFLVPREMI'){
					// 	var xxx = 0;
					// }

					if(obj.output == 'PPHRIDERPREMIUM'){
						map['PPHRIDERPREMIUM'+obj.coverage] = result;
					}

					parseToLogFile(param, obj, obj, stringFormulaOri, stringFormula, stringFormulaAlt, 
							'in function FORMULA formulaPrecalculateALT', result, resultAlternativeAsumtion, obj, 'nonPph');

					if(obj.output == 'TOTALPREMIUMWITHACCPREMIUMLBDB' && (obj.formulaCd == 'FRML_TOT_PREMIUM_LB_CLIENT_PRECALCULATED' || obj.formulaCd == 'FRML_TOT_PREMIUM_PRECALCULATED')){
						param[obj.output+'CLIENT'] = result;
					}

					if(obj.output == 'TOTALPREMIUMWITHACCPREMIUMLBDB' && (obj.formulaCd == 'FRML_TOT_PREMIUM_LB_ALT_PRECALCULATED' || obj.formulaCd == 'FRML_TOT_PREMIUM_PRECALCULATED')){
						param[obj.output+'ALT'] = result;

					}

					if(obj.output == 'PREMIUMINCREASEBEFOREROUNDING' && obj.formulaCd == 'FRML_INC_PREMIUM_CLIENT_PRECALCULATED'){
						param[obj.output+'CLIENT'] = Math.ceil(result);
					}

					if(obj.output == 'PREMIUMINCREASEBEFOREROUNDING' && obj.formulaCd == 'FRML_INC_PREMIUM_ALT_PRECALCULATED'){
						param[obj.output+'ALT'] = Math.ceil(result);
					}

					if(obj.output){						
						value = mapOutputCoverage[obj.output];
						if(value){
							value = (value + result) ;
							mapOutputCoverage[obj.output] = value;
						}else{
							mapOutputCoverage[obj.output] = result;
						}	
					}
					
				}
			}
			
		}



		function getRateValue(rateCd, age, gender, smokerStatus, clazz, term, plan){
			var listRate = getRate(rateCd);
			if(listRate){
			  for(var i = 0; i < listRate.length; i++){
				var r = listRate[i];

				  if((r.ageLife1 == null || r.ageLife1.trim() == '' || age == null || r.ageLife1 == age )
						  &&(r.gender == null || r.gender.trim() == '' || gender == null || r.gender == gender )
							  &&(r.smokerStatus == null || r.smokerStatus.trim() == '' || smokerStatus == null || r.smokerStatus == smokerStatus )
								  &&(r.term == null || r.term.trim() == '' || term == null || r.term == term )
									  && (r.plan == null || r.plan.trim() == '' || plan == null || r.plan == plan)
										  && (r.clazz == null || r.clazz.trim() == '' || clazz == null || r.clazz == clazz)){

					return r.value ? r.value : 0;
					   break;
				  }
			    }
			}
			return 0;
		}


		function generateCoverageGroup(coverageList){
			  var coverageGroupList = [];
			  var coverageCount = 0;
			  var cacheCov;
			  var mapTemp = [];
			  for(var i = 0; i < coverageList.length; i++){
					//it will be skipped if its not latest manfaat
					var latestManfaat = true;
					if(coverageList[i+1] != undefined && coverageList[i].coverageCd == coverageList[i+1].coverageCd
							&& coverageList[i].keyTertanggungAge == coverageList[i+1].keyTertanggungAge){
						continue;
					}
					//end it will be skipped if its not latest manfaat
				  for(var j = 0; j < coverageList[i].coverageGroupCdList.length; j++){
					  var tmpCovGroup = coverageList[i].coverageGroupCdList[j];
					  var idx = -1;
					for(var k = 0; k < coverageGroupList.length; k++){
						if(tmpCovGroup === coverageGroupList[k].itemCd){
							idx = k;
							coverageCount++;
							break;
						}
					}

					var newProp = {};
					for(var k in coverageList[i].properties){
						newProp[k] = coverageList[i].properties[k];
					}

					if(idx < 0){
						  newProp['PDSELECTEDMLCOMBINE'] = newProp['PDSELECTEDML'];						  
						  var map = {
								  itemCd : tmpCovGroup,
								  itemType : 'COVERAGE_GROUP',
								  coverageCode : coverageList[i].coverageCd,
								  keyTertanggungAge : coverageList[i].keyTertanggungAge,
								  properties : newProp,
								  mapOutputCoverage : coverageList[i].mapOutputCoverage,
								  mapOutputFund : coverageList[i].mapOutputFund
							  };

						  coverageGroupList.push(map);
						cacheCov = coverageList[i].coverageCd;
					  }else{
						var maps = coverageGroupList[idx];
						maps.properties['PDSA'] =  parseInt(maps.properties['PDSA']) + parseInt(newProp['PDSA']);
						if(coverageCount > 0){
							if((maps.coverageCode != coverageList[i].coverageCd) && (maps.keyTertanggungAge == coverageList[i].keyTertanggungAge)
								|| (maps.coverageCode == coverageList[i].coverageCd) && (maps.keyTertanggungAge == coverageList[i].keyTertanggungAge)){
								maps.properties['PDSELECTEDML'] = parseInt(maps.properties['PDSELECTEDML']) + parseInt(newProp['PDSELECTEDML']);
								maps.properties['PDSELECTEDAL2'] = parseInt(maps.properties['PDSELECTEDAL2']) + parseInt(newProp['PDSELECTEDAL2']);
								maps.properties['PDSELECTEDAL3'] = parseInt(maps.properties['PDSELECTEDAL3']) + parseInt(newProp['PDSELECTEDAL3']);
								maps.properties['PDSELECTEDAL4'] = parseInt(maps.properties['PDSELECTEDAL4']) + parseInt(newProp['PDSELECTEDAL4']);
								maps.properties['PDSELECTEDAL5'] = parseInt(maps.properties['PDSELECTEDAL5']) + parseInt(newProp['PDSELECTEDAL5']);
								// if(maps.properties['PDSELECTEDMLCOMBINE'] != undefined && maps.coverageCode != coverageList[i].coverageCd){
								// 	maps.properties['PDSELECTEDMLCOMBINE'] = parseInt(maps.properties['PDSELECTEDMLCOMBINE']) + parseInt(newProp['PDSELECTEDML']);
								// }
							}else{
								maps.properties['PDSELECTEDML'] = parseInt(newProp['PDSELECTEDML']);
								maps.properties['PDSELECTEDAL2'] = parseInt(newProp['PDSELECTEDAL2']);
								maps.properties['PDSELECTEDAL3'] = parseInt(newProp['PDSELECTEDAL3']);
								maps.properties['PDSELECTEDAL4'] = parseInt(newProp['PDSELECTEDAL4']);
								maps.properties['PDSELECTEDAL5'] = parseInt(newProp['PDSELECTEDAL5']);
								if(maps.coverageCode != coverageList[i].coverageCd){
									maps.properties['PDSELECTEDMLCOMBINE'] = parseInt(maps.properties['PDSELECTEDMLCOMBINE']) + parseInt(newProp['PDSELECTEDML']);
								}
							}
						}else{
							maps.properties['PDSELECTEDML'] = parseInt(newProp['PDSELECTEDML']);
							maps.properties['PDSELECTEDAL2'] = parseInt(newProp['PDSELECTEDAL2']);
							maps.properties['PDSELECTEDAL3'] = parseInt(newProp['PDSELECTEDAL3']);
							maps.properties['PDSELECTEDAL4'] = parseInt(newProp['PDSELECTEDAL4']);
							maps.properties['PDSELECTEDAL5'] = parseInt(newProp['PDSELECTEDAL5']);
						}

						maps.properties['PDPREMI'] = parseInt(maps.properties['PDPREMI']) + parseInt(newProp['PDPREMI']);
					  }
				  }
				  coverageCount++;
			  }
			  return coverageGroupList;
		}

		function getValueFund(code, output, mapOutputFund){
			var res = '0.0';

			if(mapOutputFund[code]){
				var fundCd = mapOutputFund[code];
				if(fundCd[output]){
					res = fundCd[output];
				}
			}
			return res;
		}
		
		function sortingRiderTopupMain(tempManfaatList, age){
			  var manfaatList = [];
			  for(var i = 0; i < tempManfaatList.length; i++){
				  var tmpManfaat = tempManfaatList[i];
				  for(var j = 0; j < tmpManfaat.custList.length; j++){
					  var tmpCustList = tmpManfaat.custList[j];
					  var manfaat = {};
					  var isInsert = true;

					  tmpManfaat.showCode = tmpManfaat.code;
					  manfaat.code = tmpManfaat.code;
					  manfaat.name = tmpManfaat.name;
					  manfaat.disabled = tmpManfaat.disabled;
					  manfaat.coverageType = tmpManfaat.coverageType;
					  manfaat.type = tmpManfaat.type;
					  manfaat.lifeAssureCd = tmpManfaat.lifeAssureCd;

					  manfaat.tertanggungName = tmpCustList.name;
					  manfaat.tertanggungAge = tmpCustList.anb;
					  manfaat.tertanggungAgeNew = tmpCustList.anbNew;
					 manfaat.tertanggungKey = tmpCustList.key;
					 if(tmpCustList.customerId != undefined){
						 manfaat.tertanggungCustomerId = tmpCustList.customerId;
					 } else{
						manfaat.tertanggungCustomerId = tmpCustList.key;
					 }
					  manfaat.itemInput = tmpCustList.itemInput;
					  manfaat.smokerStatus = tmpCustList.smokerStatus;
					  manfaat.loadMap = getLoadMapFromCustomer(tmpCustList.loadList);
					  manfaat.previousPremi = tmpManfaat.previousPremi;
					  manfaat.previousAccm = tmpManfaat.previousAccm;
					  manfaat.previousSA = tmpManfaat.previousSA;
					  manfaat.previousSaver = tmpManfaat.previousSaver;
					  manfaat.isNeedToBeCalculated = tmpManfaat.isNeedToBeCalculated;
					  manfaat.alterationDate = tmpManfaat.alterationDate;
					  manfaat.clazz = tmpCustList.clazz;
					  manfaat.oldCode = tmpManfaat.oldCode;
					  manfaat.newRider = tmpManfaat.newRider;
					  manfaat.planAlreadyProcessed = tmpManfaat.planAlreadyProcessed;
					  manfaat.riderStatus = tmpManfaat.riderStatus;
					  manfaat.saOriginal = tmpManfaat.saOriginal;
					  manfaat.isGIO = tmpManfaat.isGIO;
					  manfaat.isFUW = tmpManfaat.isFUW;
					  manfaat.approvalTypeConversion = tmpManfaat.approvalTypeConversion;
					  manfaat.planAlreadyProcessed = tmpManfaat.planAlreadyProcessed;

					  if(tmpManfaat.coverageType.toLowerCase() == 'main'){
						manfaat.cumulativeCalculateUsingNewRate = tmpManfaat.cumulativeCalculateUsingNewRate;
						manfaat.cumulativeRemainingSA = tmpManfaat.cumulativeRemainingSA;
						manfaat.cumulativePreviousSA = tmpManfaat.cumulativePreviousSA;
						manfaat.cumulativeCurrentResult = tmpManfaat.cumulativeCurrentResult;
						manfaat.cumulativePreviousSumResult = tmpManfaat.cumulativePreviousSumResult;
					  }

					  if(tmpManfaat.histValue != undefined){
						  manfaat.histValuePlan = tmpManfaat.histValue.PLAN;
						  manfaat.histValueSA = tmpManfaat.histValue.SA;
						  manfaat.histValueUnit = tmpManfaat.histValue.UNIT;
						  manfaat.histValueTerm = tmpManfaat.histValue.TERM;
						  manfaat.histValueAccm = tmpManfaat.histValue.ACCM;
						}
						
					  if(tmpManfaat.currValue != undefined){
						  manfaat.currValueSA = tmpManfaat.currValue.SA;
						  manfaat.currValueAccm = tmpManfaat.currValue.ACCM;
					  	}		  

					  if(tmpCustList.age == undefined){
						manfaat.age = age;
					  }
					  else{
					  	manfaat.age = tmpCustList.age;
					  }

					  if(tmpCustList.ageNew != undefined){
						manfaat.ageNew = tmpCustList.ageNew;
					  }

					  if(tmpManfaat.code.match(/H1X.*/) || tmpManfaat.code.match(/H1Y.*/)){
						  manfaat.isPPH = 'O';
						  //set value, inputAdvance, inputNested for PPH
						
						  for(var k = 0; k < manfaat.itemInput.length; k++){
							if(manfaat.itemInput[k].key == 'PDPLAN'){
							  //value
							  manfaat.itemInput[k].value = 'PHC1, 1000000|PHC2, 1500000|PHC3, 2000000|PHC4, 4000000|PHC5, 6000000|PHC6, 8000000';
							  //inputNested
							  var splitValue = manfaat.itemInput[k].value.split('|');
							  for(var kk=0; kk<splitValue.length; kk++){
								if(splitValue[kk].indexOf(manfaat.itemInput[k].inputValue) != 0){
								  manfaat.itemInput[k].inputNested = splitValue[kk];
								  break;
								}
							  }
							  //inputAdvance
							  var asChrgCd = manfaat.itemInput[k].inputNested.substring(0, 4);
							  splitValue = rootScope.INPUT[asChrgCd].value.split("|");
							  for(var kk=0; kk<splitValue.length; kk++){
								if(splitValue[kk].indexOf(tmpManfaat.code) != -1){
								  manfaat.itemInput[k].inputAdvance = splitValue[kk];
								  break;
								}
							  }
							}
						  }
						  //end set value, inputAdvance, inputNested for PPH
						} else if(tmpManfaat.code.match(/H1Z.*/)){
							manfaat.isPPH = 'O';
							var coverageItemInput = rootScope.COVERAGE[tmpManfaat.code].ITEM_INPUT;
							var rootItemInput = rootScope.INPUT[coverageItemInput];
							var mapManfaatItemInput = {};
							for(var k = 0; k < manfaat.itemInput.length; k++){
								mapManfaatItemInput[manfaat.itemInput[k].key] = manfaat.itemInput[k].inputValue;
							}
							var itemInputCode = coverageItemInput;
							if(manfaat.planAlreadyProcessed == undefined || !manfaat.planAlreadyProcessed){
								for(var tempCount = 0; tempCount <= 3; tempCount++){
									var itemInput = rootScope.INPUT[itemInputCode];
									if(itemInput == undefined){
										break;
									}
									var splitValue = itemInput.value.split('|');
									var splitValue2;
									for(var kk=0; kk<splitValue.length; kk++){
										if(splitValue[kk].split(',')[1].indexOf(mapManfaatItemInput[itemInput.key]) != -1){
											splitValue2 = splitValue[kk].split(',');
											itemInputCode = splitValue2[0];
											break;
										}
									}
									if(itemInput.type == 'advancedoption'){
										for(var k = 0; k < manfaat.itemInput.length; k++){
											if(manfaat.itemInput[k].key == rootItemInput.key){
												tempManfaatList[i].planAlreadyProcessed = true;
												manfaat.itemInput[k].inputValue = splitValue2[1].trim();
												manfaat.itemInput[k].inputValueForRate = splitValue2[0];
												manfaat.itemInput[k].inputAdvance = splitValue[kk];
												manfaat.itemInput[k].inputAdvanceFull = itemInput.value;
												break;
											}
										}
										break;
									}
								}
							}
					  } else {
						  manfaat.isPPH = 'D';
					  }
					  
					  for(var k = 0; k < manfaat.itemInput.length; k++){
						  if(manfaat.itemInput[k].key == 'PDPLAN' && (manfaat.itemInput[k].inputValue == 'N')){// || !manfaat.itemInput[k].inputValue || manfaat.itemInput[k].inputValue == '')){
							  isInsert = false;
						  } else if(manfaat.itemInput[k].key == 'PDTERM' && (manfaat.itemInput[k].inputValue == 'N')){// || !manfaat.itemInput[k].inputValue || manfaat.itemInput[k].inputValue == '')){
							  isInsert = false;
						  }
					  }

					  if(isInsert){
						  manfaatList.push(manfaat);
					  }

				  }
			  }

			  var tempList_topup = [];
			  var tempList_main = [];
			  var tempList_h1tr = [];
			  var tempList_no_h1tr = [];
			  var tempList_phc = [];
			  var tempList_phc_max = [];
			  var tempValuePHC = [];
			  var mapAllManfaat = {};
			for(var i = 0; i < manfaatList.length; i++){
				 var coverage = rootScope.COVERAGE[manfaatList[i].code];
				 if(coverage.type.toLowerCase().trim() === 'rider'){
					if(manfaatList[i].code.toUpperCase().trim() == 'H1TR'){
						tempList_h1tr.push(manfaatList[i]);
					} else if ((manfaatList[i].code.toUpperCase().trim() == 'H1X1' || manfaatList[i].code.toUpperCase().trim() == 'H1X3' || manfaatList[i].code.toUpperCase().trim() == 'H1X5') || 
						(manfaatList[i].code.toUpperCase().trim() == 'H1Y1' || manfaatList[i].code.toUpperCase().trim() == 'H1Y3' || manfaatList[i].code.toUpperCase().trim() == 'H1Y5')){
						//tambah flag sorting
						var tempPPH = JSON.stringify(manfaatList[i]);
						var jj;
						for(jj = 0; jj < manfaatList[i].itemInput.length; jj++){
							if(manfaatList[i].itemInput[jj].key == 'PDPLAN'){
								break;
							}
						}
						mapAllManfaat.CURRSVROPT = manfaatList[i].itemInput[jj].inputAdvance.split(',')[1].trim();
						tempList_phc.push(manfaatList[i]);

						var asChrgCd = manfaatList[i].itemInput[jj].inputNested.substring(0, 4);
						var tempAsChrgSaver = rootScope.INPUT[asChrgCd].value;
						var splitValue = tempAsChrgSaver.split('|');
						for(var j=0; j<splitValue.length; j++){
							var value = splitValue[j];
							var valuePlan = parseInt(value.substring(value.indexOf(',')+1,value.length).trim());
							tempValuePHC.push(valuePlan);
						}

						//filter nan or null
						function bouncer(arr) {
							return arr.filter(Boolean);
						}

						var largestPlan = Math.max.apply(null, bouncer(tempValuePHC));
						if(manfaatList[i].code.toUpperCase().trim().match(/H1X.*/)){
							var largestPlanCode = 'H1X5';
						}else if(manfaatList[i].code.toUpperCase().trim().match(/H1Y.*/)){
							var largestPlanCode = 'H1Y5';
						}
						
						var maxPlanPHC = setMaxPlanValue(largestPlan, largestPlanCode, tempPPH);
						mapAllManfaat.MAXSVROPT = maxPlanPHC.itemInput[jj].inputAdvance.split(',')[1].trim();

						tempList_phc_max.push(maxPlanPHC);

					} else if (manfaatList[i].code.toUpperCase().trim() == 'H1Z1' || manfaatList[i].code.toUpperCase().trim() == 'H1Z5'){
						//tambah flag sorting
						var tempPPH = JSON.stringify(manfaatList[i]);
						var jj;
						for(jj = 0; jj < manfaatList[i].itemInput.length; jj++){
							if(manfaatList[i].itemInput[jj].key == 'PDPLAN'){
								break;
							}
						}
						mapAllManfaat.CURRSVROPT = manfaatList[i].itemInput[jj].inputAdvance.split(',')[1].trim();
						tempList_phc.push(manfaatList[i]);
						
						var maxPlanPHCP = setMaxPlanPHCPValue(tempPPH);
						mapAllManfaat.MAXSVROPT = maxPlanPHCP.itemInput[jj].inputAdvance.split(',')[1].trim();

						tempList_phc_max.push(maxPlanPHCP);
					} else {
						tempList_no_h1tr.push(manfaatList[i]);
					}
				  }

				  if(coverage.type.toLowerCase().trim() === 'topup'){
					tempList_topup.push(manfaatList[i]);
				  }

				  if(coverage.type.toLowerCase().trim() === 'main'){
					tempList_main.push(manfaatList[i]);
				  }
			}

			mapAllManfaat.PHC = tempList_topup.concat(tempList_phc_max).concat(tempList_phc).concat(tempList_h1tr).concat(tempList_no_h1tr).concat(tempList_main);
			mapAllManfaat.isPHCExists = tempList_topup.concat(tempList_phc).concat(tempList_h1tr).concat(tempList_no_h1tr).concat(tempList_main);

			return mapAllManfaat;
		}

		function setMaxPlanValue(valuePlan, code, strPlan){
			var tempPlan = {};
			var temp = {};
			var choosedPlan = JSON.parse(strPlan);
			for(var key in choosedPlan){
				tempPlan[key] = choosedPlan[key];
				tempPlan.code = code;
				tempPlan.isPPH = 'M';
				if(tempPlan.itemInput){
					for(var i=0; i < tempPlan.itemInput.length; i++){
						temp = tempPlan.itemInput[i];
						temp.inputAdvance = code+", "+valuePlan;
						break;
					}
				}
			}
			return tempPlan;
		}

		function setMaxPlanPHCPValue(strPlan){
			var tempPlan = {};
			var temp = {};
			var choosedPlan = JSON.parse(strPlan);
			var itemInputProcessed = false;
			for(var key in choosedPlan){
				tempPlan[key] = choosedPlan[key];
				tempPlan.isPPH = 'M';
				if(tempPlan.itemInput && !itemInputProcessed){
					outer:
					for(var i=0; i < tempPlan.itemInput.length; i++){
						if(tempPlan.itemInput[i].key == 'PDPLAN'){
							var splitValue = tempPlan.itemInput[i].inputAdvanceFull.split('|');
							for(var ii = 0; ii < splitValue.length; ii++){
								if(splitValue[ii].indexOf(tempPlan.itemInput[i].inputValue) == -1){
									var splitValue2 = splitValue[ii].split(',');
									tempPlan.itemInput[i].inputValue = splitValue2[1].trim();
									tempPlan.itemInput[i].inputValueForRate = splitValue2[0];
									tempPlan.itemInput[i].inputAdvance = splitValue[ii];
									break outer;
								}
							}
						}
					}
					itemInputProcessed = true;
				}
			}
			return tempPlan;
		}		
		
		function setMaxPlanPHCPValue(strPlan){
			var tempPlan = {};
			var temp = {};
			var choosedPlan = JSON.parse(strPlan);
			var itemInputProcessed = false;
			for(var key in choosedPlan){
				tempPlan[key] = choosedPlan[key];
				tempPlan.isPPH = 'M';
				if(tempPlan.itemInput && !itemInputProcessed){
					outer:
					for(var i=0; i < tempPlan.itemInput.length; i++){
						if(tempPlan.itemInput[i].key == 'PDPLAN'){
							var splitValue = tempPlan.itemInput[i].inputAdvanceFull.split('|');
							for(var ii = 0; ii < splitValue.length; ii++){
								if(splitValue[ii].indexOf(tempPlan.itemInput[i].inputValue) == -1){
									var splitValue2 = splitValue[ii].split(',');
									tempPlan.itemInput[i].inputValue = splitValue2[1].trim();
									tempPlan.itemInput[i].inputValueForRate = splitValue2[0];
									tempPlan.itemInput[i].inputAdvance = splitValue[ii];
									break outer;
								}
							}
						}
					}
					itemInputProcessed = true;
				}
			}
			return tempPlan;
		}

		function getLoadMapFromCustomer(loadList){
			var tmpLoadList = {};
			if(loadList){
				for(var v = 0; v < loadList.length; v++){
					var tmpLod = loadList[v];
					if(tmpLod.selectedValue){
						tmpLoadList[tmpLod.code] = tmpLod.selectedValue;
						var div = tmpLod.divider;
						tmpLoadList[tmpLod.code] = getResultExpression(tmpLod.selectedValue/div);
					}
				}
			}
			return tmpLoadList;
		}

		function getRate(rateCd){
			var tmpListRateDate = rootScope.RATE[rateCd].RATE_VALUE;
			if(tmpListRateDate){
			  for(var j = 0; j < tmpListRateDate.length; j++){
				var rateByDate = tmpListRateDate[j];
				  return tmpListRateDate[j].rateValue;
				  break;
			  }
			}


		}

		function getFundListByFundMap(fundMap){
			var tempFund = [];
			for(x in fundMap){

				var tmp = {
					code : x,
					key : fundMap[x].key ,
					value : fundMap[x].value,
					type : fundMap[x].type
				};
				tempFund.push(tmp);
			}
			return tempFund;
		}

		function toDate(strDate){
			var from = strDate.split("/");
			var f = new Date(from[2], from[1] - 1, from[0]);
			return f;
		}

		function getComparissonValue(value1, operator, value2){
			var isValidation = false;

			switch(operator){

				case "<" :
				isValidation = value1 < value2;
				break;

				case ">" :
				isValidation = value1 > value2;
				break;

				case "==" :
				isValidation = value1 == value2;
				break;

				case "!=" :
				isValidation = value1 != value2;
				break;

				case "<=" :
				isValidation : value1 <= value2;
				break;

				case ">=" :
				isValidation = value1 >= value2;
				break;

				case "=" :
				isValidation = value1 == value2;
				break;

				default :
				isValidation = false;
				break;

			}

			return isValidation;
		}

		function getPremi(freq, premi){
		   if(freq === '00'){
			 return premi*1;
		   }else if(freq === '01'){
			 return premi*1;
		   }else if(freq === '03'){
			 return premi*4;
		   }else if(freq === '06'){
			 return premi*2;
		   }else if(freq === '12'){
			 return premi*12;
		   }
		}

		function getResultFormulaCVPPHClient(itemSelected, ITEM, map, mapResult, mapFundPerYear, mapOutputCoverage, mapOutputCoverageAlt, mapOutputFund, mapOutputFundAlt, paramMap, flag, buttonType, DIFFLVPREMI, bufferArr, pdAlloArr, latestManfaat){
			var mapResultFormula = mapResult;
			var tempMapFormulaList = ITEM.FORMULA_BOTH;		

			/* sorting sequence */
			tempMapFormulaList.sort(function(a,b) {return a.sequence - b.sequence;} );
			
			paramMap['OF_CUSTAGEPOLICY'] = map['CUSTAGE'];
			
			var mapResultPerYear = {};
			var TOTALCVLOWFUNDAVAL = 0;
			var cvWithdrawValue = 0;
			var sumAssuredPIA = 0;
			var isPIA = (map.mainCoverage == 'U1L' || map.mainCoverage == 'U1M');
			var isPAA2 = (map.mainCoverage == 'U10' || map.mainCoverage == 'U11');
			var PDALLO = '';
			
			var isGio = false;
			var covTermP = 0;
			if(ITEM.flagDB == true){
				mapResultPerYear = mapFundPerYear;
			}
			
			// Both
			for(var j = 0; j < tempMapFormulaList.length; j++){
				  var tmpFormula = tempMapFormulaList[j];
				  var stringFormula = '';
				  var stringFormulaAlt = '';
				  var stringFormulaOri = '';
				  var result = 0;
				  var resultAlternativeAsumtion = 0;
				var value;

				  if(tmpFormula.itemType.toLowerCase() == 'fund' && tmpFormula.itemGroupProductCd.indexOf(map.mainCoverage) == -1){
					  continue;
				  }

				var formula = rootScope.FORMULA[tmpFormula.formulaCd];
				if(formula){
						var isProcess = false;
					  if(ITEM.flagDB == true && (formula.formulaTypeCd.indexOf('TOTALCVDB') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') !== -1)){
						  isProcess = true;
					  }else if(ITEM.flagDB == false && (formula.formulaTypeCd.indexOf('TOTALCVDB') === -1 && formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') === -1)){
						  isProcess = true;
					}else if(itemSelected.type === 'COVERAGE'){
						  isProcess = true;
					}

					if(isProcess){
						  var tempFormulaElementList = formula.FORMULA_ELEMENT;

						for(var k = 0; k < tempFormulaElementList.length; k++){
							var fe = tempFormulaElementList[k];
							fe.value = fe.value == "''" ? '' : fe.value.trim();
							stringFormulaOri += fe.value;

							if(fe.type.toLowerCase().trim() === "coverage"
								|| fe.type.toLowerCase().trim() === "customer"
								|| fe.type.toLowerCase().trim() === "rate"
								|| fe.type.toLowerCase().trim() === "fund"
								|| fe.type.toLowerCase().trim() === "product"
								|| fe.type.toLowerCase().trim() === "allocation"
								|| fe.type.toLowerCase().trim() === "predefined"){
								
								if(fe.value.toUpperCase() === 'CUSTINCOME'){
									stringFormula += "\'" + map[fe.value] +"\'";
									stringFormulaAlt += "\'" + map[fe.value] +"\'";
								}else if(ITEM.flagDB == true && fe.value.indexOf('TOTALCV') !== -1){
									  stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
									  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
								}else if(fe.value.toUpperCase() === 'ALLOVALUE' && isPAA2){
									//for PAA2
									stringFormula += map[fe.value] ? map[fe.value] : '0.0';
									  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';

									  PDALLO = map[fe.value] ? map[fe.value]: '0.0';  	
								}else if(fe.value.toUpperCase() === 'PDPLAN'){
									  stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
									  stringFormulaAlt += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
								}else{
									  stringFormula += map[fe.value] ? (isNaN(map[fe.value]) ? (map[fe.value].charAt(0) == "'" ? map[fe.value] : "\'" + map[fe.value] +"\'") : map[fe.value]) : '0.0';
									  stringFormulaAlt += map[fe.value] ? (isNaN(map[fe.value]) ? (map[fe.value].charAt(0) == "'" ? map[fe.value] : "\'" + map[fe.value] +"\'") : map[fe.value]) : '0.0';
								}

							}else if(fe.type.toLowerCase().trim() === "load"){
							  stringFormula += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
							  stringFormulaAlt += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
							}else if(fe.type.toLowerCase().trim() === "formula"){
								if(fe.value.toUpperCase() === 'MAXLVPREMI'){
									stringFormula += "\'" + map[fe.value] +"\'";
									  stringFormulaAlt += "\'" + map[fe.value] +"\'";
								}else if(fe.value.toUpperCase() === 'DIFFLVPREMI'){
									stringFormula += '0.0';
									stringFormulaAlt += '0.0';
								}else if(fe.value.toUpperCase() == 'TOTALSAWITHACCSA'){
									stringFormula += paramMap[fe.value.toUpperCase()+'CLIENT'] ? paramMap[fe.value.toUpperCase()+'CLIENT'] : '0.0';
									stringFormulaAlt += paramMap[fe.value.toUpperCase()+'ALT'] ? paramMap[fe.value.toUpperCase()+'ALT'] : '0.0';
								}else if(fe.value.toUpperCase() == 'TOTALPREMIUMWITHACCPREMIUMLBDB'){
									stringFormula += paramMap[fe.value.toUpperCase()+'CLIENT'] ? paramMap[fe.value.toUpperCase()+'CLIENT'] : '0.0';
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()+'ALT'] ? paramMap[fe.value.toUpperCase()+'ALT'] : '0.0';	
								  }else if(fe.value.toUpperCase() == 'TOTALSAWITHACCSALINKTERM'){
									  stringFormula += paramMap[fe.value.toUpperCase()+'CLIENT'] ? paramMap[fe.value.toUpperCase()+'CLIENT'] : '0.0';					          		
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()+'ALT'] ? paramMap[fe.value.toUpperCase()+'ALT'] : '0.0';
								  }else if(fe.value.toUpperCase() == 'PREMIUMINCREASEBEFOREROUNDING'){
									  stringFormula += paramMap[fe.value.toUpperCase()+'CLIENT'] ? paramMap[fe.value.toUpperCase()+'CLIENT'] : '0.0';					          		
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()+'ALT'] ? paramMap[fe.value.toUpperCase()+'ALT'] : '0.0';

								  }else if(fe.value.toUpperCase() == 'OF_CUSTAGEPOLICY'){
									stringFormula += paramMap[fe.value.toUpperCase()] ? paramMap[fe.value.toUpperCase()] : '0.0';
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()] ? paramMap[fe.value.toUpperCase()] : '0.0';  	
								}else if(fe.value.toUpperCase() == 'ALLOCATEDSAVER'){
									stringFormula += mapOutputCoverage[fe.value.toUpperCase()+'_CLIENT'] ? mapOutputCoverage[fe.value.toUpperCase()+'_CLIENT'] : '0.0';
									  stringFormulaAlt += mapOutputCoverageAlt[fe.value.toUpperCase()+'_CLIENT'] ? mapOutputCoverageAlt[fe.value.toUpperCase()+'_CLIENT'] : '0.0';  
								}else if(fe.value.toUpperCase() === 'SA_AMOUNT_PRUMED'){
									stringFormula += map[fe.value] ? map[fe.value] : '0.0';
									  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
								}else{
									stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
									  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
								}
							}else if(fe.type.toLowerCase().trim() === "formulafund"){
							  stringFormula += getValueFund(ITEM.code, fe.value, mapOutputFund);
							  stringFormulaAlt += getValueFund(ITEM.code, fe.value, mapOutputFundAlt);
							}else if(fe.type.toLowerCase().trim() === "string"){
							  stringFormula += "\'"+fe.value+"\'";
							  stringFormulaAlt += "\'"+fe.value+"\'";
							}else{
							  stringFormula += fe.value;
							  stringFormulaAlt += fe.value;
							}
						}

						if(isValidExpression(stringFormula)){

							var tempStringFormula = processPowAndMinusNegativeOnFormula(stringFormula, stringFormulaAlt);
							  result = getResultExpression(tempStringFormula.stringFormula);
							  resultAlternativeAsumtion = getResultExpression(tempStringFormula.stringFormulaAlt);
							
							  var yearC = paramMap.year;
							  if((formula.formulaTypeCd === 'CHARGERIDER' || formula.formulaTypeCd === 'CHARGEINSURANCE') && yearC == 1){
							  	if(!mapChargeRider[ITEM.coverageCode+itemSelected.tertanggungKey]){
								  		if(formula.formulaTypeCd === 'CHARGERIDER'){
							  				mapChargeRider[ITEM.coverageCode+itemSelected.tertanggungKey] = result/12;
							  			}else{
							  				mapChargeRider[ITEM.coverageCode+itemSelected.tertanggungKey] = result;
							  			}
								}
							  }
							  
							  result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isPIA, paramMap, result);     	

							  if(mapOutputCoverage[tmpFormula.output] && tmpFormula.output === 'COVTERM_PPAYOR01'){
								  result = 0;
							  }

							result = checkCovTermPpayorAndCovTermWaiver(tmpFormula, itemSelected, mapOutputCoverage, result);

							  if(formula.formulaTypeCd == 'BUFFER' && buttonType != 'hitung'){
								bufferArr.push(resultAlternativeAsumtion);					  									  				
							}

							if(formula.formulaTypeCd.toUpperCase() == 'SUMMPREM' && isPAA2 && buttonType != 'hitung' && PDALLO != ''){
								pdAlloArr.push(PDALLO);
							}

							if(tmpFormula.output == 'PREMIUMACCUMULATION' && buttonType != 'hitung'){

								var temp = 0;
								var len = bufferArr.length;
								var min = 1;
								
								for(var i = 0; i < bufferArr.length; i++){
								   temp = getResultExpression(bufferArr[i]*pdAlloArr[len-min]+temp);									   
								   min++;									   
								}
								
								result = temp;
								resultAlternativeAsumtion = temp;

							}
								  
							if(tmpFormula.output == 'TOTALSAWITHACCSALINKTERM' && paramMap.year == '1'){
								/*result = getResultExpression((mapOutputCoverage['SA_LINKTERM'] ? mapOutputCoverage['SA_LINKTERM'] : 0.0)
									+(mapOutputCoverage['SAINCREASELINKTERM'] ? mapOutputCoverage['SAINCREASELINKTERM'] : 0.0));*/
								resultAlternativeAsumtion = result;
							}
							
							  tempResult = applyRoundingToSomeCasesAll(tmpFormula, result, resultAlternativeAsumtion);
							  result = tempResult.result;
							  resultAlternativeAsumtion = tempResult.resultAlternativeAsumtion;
							  
							  if(tmpFormula.formulaCd == 'FRML_INCOME_CUST'){
								  result = "'" + result + "'";
								  resultAlternativeAsumtion = "'" + resultAlternativeAsumtion + "'";
							  }

							parseToLogFile(paramMap, ITEM, tmpFormula, stringFormulaOri, stringFormula, stringFormulaAlt,
									'in function getResultFormulaCVPPHClient BOTH', result, resultAlternativeAsumtion, formula, 'pphClient');

							if(tmpFormula.output){
								if('COVERAGE' === tmpFormula.itemType.toUpperCase()){
									//CLIENT_PLANNING
									value = mapOutputCoverage[tmpFormula.output];
									if(value){
										if("ADMINCHARGE" === mapOutputCoverage[tmpFormula.output] || "COVTERM_WAIVER01" === tmpFormula.output ||
											"COVTERM_WAIVER02" === tmpFormula.output || "COVTERM_PPAYOR01" === tmpFormula.output || 
											"COVTERM_PPAYOR02" === tmpFormula.output || tmpFormula.output == 'CUSTAGEALTER' || tmpFormula.output == 'CUSTAGEALTER01' || 
											tmpFormula.output == 'CUSTAGEALTER02'){
										  mapOutputCoverage[tmpFormula.output] = value;
										}else if(tmpFormula.output == 'PDSACHARGE' || tmpFormula.output == 'TOTALMAINSA'){
											mapOutputCoverage[tmpFormula.output] = result;
										}else{
											if(tmpFormula.output != 'SABASIC' && tmpFormula.output != 'SA_LINKTERM'){
												  value = (value + result) ;		
											  }
											  else if(tmpFormula.output == 'SA_LINKTERM'){// && tmpFormula.output != 'SA_LINKTERM'){
												value = result;		
											  }
										  
											if(tmpFormula.formulaTypeCd == 'ALLOCATEDPREMIUM_ALT'){
												//jadi kalo formulaTypeCd nya ALLOCATEDPREMIUM_ALT ga bakal dimasukin ke map
											}
											else{
												  mapOutputCoverage[tmpFormula.output] = value;
											}
										}
									}else{
										if(tmpFormula.output === 'SABASIC'){
											if(!mapOutputCoverage['SABASIC']){
												mapOutputCoverage[tmpFormula.output] = result;
											}
										}
										else if(tmpFormula.formulaCd == 'FRMLALLOPREMI09' && tmpFormula.output == 'ALLOCATEDSAVER'){
											mapOutputCoverage[tmpFormula.output + '_CLIENT'] = result;
										}
										else if(tmpFormula.formulaCd == 'FRMLALLOPREMI08' && tmpFormula.output == 'ALLOCATEDSAVER'){
											//mapOutputCoverage[tmpFormula.output + '_ALT'] = result;
										}
										else{
											mapOutputCoverage[tmpFormula.output] = result;
										}
									}


									if("TOTALCHARGECCB" === tmpFormula.output){
										  mapOutputCoverage[tmpFormula.output] = result;
										  mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
									}

									if("TOTALDEATHBENEFITPGB" === tmpFormula.output){
										  mapOutputFund[tmpFormula.output] = result;
									}

									if("TOTALPREMIUMWITHACCPREMIUM" === tmpFormula.output){
										  mapOutputFund[tmpFormula.output] = result;
									}
									
									if(tmpFormula.output == 'DIFFLVPREMI'){
										map['DIFFLVPREMI'] = result;
									}
									
									if(tmpFormula.output == 'DIFFLVPREMI' && itemSelected.isPPH == 'O' && paramMap.year == '1'){
										paramMap['DIFFLVPREMI_'+itemSelected.isPPH] = result;
									}

									//ALTERNATIVE
									value = mapOutputCoverageAlt[tmpFormula.output];
									if(value){
										if("ADMINCHARGE" === mapOutputCoverageAlt[tmpFormula.output] ||
											tmpFormula.output == 'CUSTAGEALTER' || tmpFormula.output == 'CUSTAGEALTER01' || tmpFormula.output == 'CUSTAGEALTER02'){
										  mapOutputCoverageAlt[tmpFormula.output] = value;
										}else if(tmpFormula.output == 'PDSACHARGE' || tmpFormula.output == 'TOTALMAINSA'){
											mapOutputCoverageAlt[tmpFormula.output] = result;
										}else{
										  value = (value + resultAlternativeAsumtion) ;
										  mapOutputCoverageAlt[tmpFormula.output] = value;
										}
									}else{
										if(tmpFormula.formulaCd == 'FRMLALLOPREMI09' && tmpFormula.output == 'ALLOCATEDSAVER'){
											mapOutputCoverageAlt[tmpFormula.output + '_CLIENT'] = resultAlternativeAsumtion;
										}
										else if(tmpFormula.formulaCd == 'FRMLALLOPREMI08' && tmpFormula.output == 'ALLOCATEDSAVER'){
											//mapOutputCoverage[tmpFormula.output + '_ALT'] = result;
										}
										else{
											mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
										}
									}

									if("TOTALDEATHBENEFITPGB" === tmpFormula.output){
										  mapOutputFundAlt[tmpFormula.output] = resultAlternativeAsumtion;
									}

									  //SET NEW KEY PDPREMI IF FORMULATYPE = 'RIDERPREMIUM' / BIAYA ASURANSI PERTAHUN
									if('RIDERPREMIUM' == formula.formulaTypeCd && tmpFormula.output == 'TOTALRIDERPREMIUM'){
										if(map["PREVIOUSRIDERCODE"] == itemSelected.code && map["PREVIOUSCUSTOMERKEY"] == itemSelected.tertanggungKey){
											map["PDPREMI"] = map["PDPREMI"] + result;
										}
										else{
											map["PDPREMI"] = result;
										}
										map["PREVIOUSRIDERCODE"] = itemSelected.code;
										map["PREVIOUSCUSTOMERKEY"] = itemSelected.tertanggungKey;
										mapResultFormula.riderPremium = result;
									}
									
									//alter simpen basicPremium
									if('FT_BASICPREMIUM' == formula.formulaTypeCd && 'TOTALBASICPREMI' == tmpFormula.output){
										mapResultFormula.basicPremium = result;
									}
									//end alter simpen basicPremium
									
									//alter simpen cumulativeCurrentResult
									if('FRML_CUMULATIVE_CURRENT_RESULT_CALCULATED' == formula.code && 'OF_CUMULATIVECURRENTRESULTCALCULATED' == tmpFormula.output){
										mapResultFormula.cumulativeCurrentResultCalculated = result;
									}
									//end alter simpen cumulativeCurrentResult

									//CHARGE / BIAYA ANGSURAN BULANAN
									if('CHARGERIDER' == formula.formulaTypeCd || 'CHARGEINSURANCE' == formula.formulaTypeCd){
										  mapResultFormula[formula.formulaTypeCd] = (result/12);
									}

									if(true == tmpFormula.forSpecificRider){
										mapOutputCoverage[tmpFormula.output + "_" + tmpFormula.coverage] = result;
										mapOutputCoverageAlt[tmpFormula.output + "_" + tmpFormula.coverage] = resultAlternativeAsumtion;
									}

									//PCB tapi kyk ga guna
									/*if(tmpFormula.output == 'CVTOTALLOWSTD'){
										paramMap['CVTOTALLOWSTDLASTYEAR_CLIENT'+paramMap.year] = (paramMap['CVTOTALLOWSTDLASTYEAR_CLIENT'+paramMap.year]==undefined?0:result);
										paramMap['CVTOTALLOWSTDLASTYEAR_ALT'+paramMap.year] = (paramMap['CVTOTALLOWSTDLASTYEAR_ALT'+paramMap.year]==undefined?0:resultAlternativeAsumtion);
									}*/
									setParamMapByFormulaOutputAndFormulaTypeCd(tmpFormula, formula, paramMap, result, resultAlternativeAsumtion);
								}else if('FUND' === tmpFormula.itemType.toUpperCase()){
									var itemCd = ITEM.code;

									value = mapOutputCoverage[formula.formulaTypeCd];
									if(value){
										value = (value + result) ;
										mapOutputCoverage[formula.formulaTypeCd] = value;
									}else{
										mapOutputCoverage[formula.formulaTypeCd] = result;
									}

									value = mapOutputCoverageAlt[formula.formulaTypeCd];
									if(value){
										value = (value + resultAlternativeAsumtion) ;
										mapOutputCoverageAlt[formula.formulaTypeCd] = value;
									}else{
										mapOutputCoverageAlt[formula.formulaTypeCd] = resultAlternativeAsumtion;
									}

									//CLIENT PLANNING
									if(mapOutputFund[itemCd] == undefined){
										mapOutputFund[itemCd] =  {};
									}									
									mapOutputFund[itemCd][tmpFormula.output] = result;
									
									//ALTERNATIVE
									if(mapOutputFundAlt[itemCd] == undefined){
										mapOutputFundAlt[itemCd] =  {};
									}									
									mapOutputFundAlt[itemCd][tmpFormula.output] = resultAlternativeAsumtion;
									
									if(paramMap.year == '20'){
										if("OFF_TOTALPRUBOOSTERLOW" === tmpFormula.output || "OFF_TOTALPRUBOOSTERMED" === tmpFormula.output || "OFF_TOTALPRUBOOSTERHIGH" === tmpFormula.output){
											paramMap[tmpFormula.output] = result;
										}	
									}
								}
							}
						}
					}
					checkingIfButtonHitung(buttonType, tmpFormula, formula, mapResultFormula, mapOutputCoverage, result, undefined, undefined, true, false);

					  mapResultFormula['CHARGERIDER'] = mapChargeRider;
					  mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
					  mapResultFormula['MAPOUTPUTFUND'] = mapOutputFund;
					  mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;
					  mapResultFormula['MAPOUTPUTFUNDALT'] = mapOutputFundAlt;
				}
			}

			// Basic
			var tempMapFormulaListBasic = ITEM.FORMULA_BASIC;
			if(tempMapFormulaListBasic != undefined){
				for(var j = 0; j < tempMapFormulaListBasic.length; j++){
					  var tmpFormula = tempMapFormulaListBasic[j];
					  var stringFormula = '';
					  var stringFormulaAlt = '';
					  var stringFormulaOri = '';
					  var result = 0;
					  var resultAlternativeAsumtion = 0;
					  var value;

					  if(tmpFormula.itemType.toLowerCase() == 'fund' && tmpFormula.itemGroupProductCd.indexOf(map.mainCoverage) == -1){
						  continue;
					  }

					var formula = rootScope.FORMULA[tmpFormula.formulaCd];
					if(formula){
							var isProcess = false;
						  if(ITEM.flagDB == true && (formula.formulaTypeCd.indexOf('TOTALCVDB') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') !== -1)){
							  isProcess = true;
						  }else if(ITEM.flagDB == false && (formula.formulaTypeCd.indexOf('TOTALCVDB') === -1 && formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') === -1)){
							  isProcess = true;
						}else if(itemSelected.type === 'COVERAGE'){
							  isProcess = true;
						}

						if(isProcess){
							  var tempFormulaElementList = formula.FORMULA_ELEMENT;

							for(var k = 0; k < tempFormulaElementList.length; k++){
								var fe = tempFormulaElementList[k];
								fe.value = fe.value == "''" ? '' : fe.value.trim();
								stringFormulaOri += fe.value;

								if(fe.type.toLowerCase().trim() === "coverage"
									|| fe.type.toLowerCase().trim() === "customer"
									|| fe.type.toLowerCase().trim() === "rate"
									|| fe.type.toLowerCase().trim() === "fund"
									|| fe.type.toLowerCase().trim() === "product"
									|| fe.type.toLowerCase().trim() === "allocation"
									|| fe.type.toLowerCase().trim() === "predefined"){

									if(fe.value.toUpperCase() === 'CUSTINCOME'){
										  stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'PDPLAN'){
										  stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
										  stringFormulaAlt += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
									}else if(fe.value.toUpperCase() === 'PDALLO'){
										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}else if(fe.value.toUpperCase() === 'YEAR'){
										  stringFormula += paramMap.year;
										  stringFormulaAlt += paramMap.year;
									}else if(fe.value.toUpperCase() === 'RTSARANNUITY'){
										var factor = getFactorFromAnuityByMonth(map['CUSTAGEMONTH'], ITEM.ANNUITY);
										  stringFormula += factor;
										  stringFormulaAlt += factor;
									}else if(ITEM.flagDB == true && fe.value.indexOf('TOTALCV') !== -1){
										  stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}else if(fe.value.toUpperCase() === 'ALLOVALUE' && isPAA2){
										//for PAA2
										stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';

										  PDALLO = map[fe.value] ? map[fe.value]: '0.0';  	
									}else{
										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "load"){
								  stringFormula += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								  stringFormulaAlt += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								}else if(fe.type.toLowerCase().trim() === "formula"){
									if(fe.value.toUpperCase() === 'MAXLVPREMI'){
										stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'DIFFLVPREMI'){
										stringFormula += "" + DIFFLVPREMI +"";
										  stringFormulaAlt += "" + DIFFLVPREMI +"";						        
									}else if(fe.value.toUpperCase() == 'ALLOCATEDSAVER'){
										stringFormula += mapOutputCoverage[fe.value.toUpperCase()+'_CLIENT'] ? mapOutputCoverage[fe.value.toUpperCase()+'_CLIENT'] : '0.0';
										stringFormulaAlt += mapOutputCoverageAlt[fe.value.toUpperCase()+'_CLIENT'] ? mapOutputCoverageAlt[fe.value.toUpperCase()+'_CLIENT'] : '0.0';  
									}else{
										stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "formulafund"){
									var tempStringFormula = setStringFormulaForFormulaBasicByFormulaElementTypeIsFormulaFund(fe, stringFormula, stringFormulaAlt,
										paramMap, ITEM, mapOutputFund, mapOutputFundAlt);
									stringFormula = tempStringFormula.stringFormula;
									stringFormulaAlt = tempStringFormula.stringFormulaAlt;
								}else if(fe.type.toLowerCase().trim() === "string"){
								  stringFormula += "\'"+fe.value+"\'";
								  stringFormulaAlt += "\'"+fe.value+"\'";
								}else{
								  stringFormula += fe.value;
								  stringFormulaAlt += fe.value;
								}
							}

							if(isValidExpression(stringFormula)){

								var tempStringFormula = processPowAndMinusNegativeOnFormula(stringFormula, stringFormulaAlt);

								  result = getResultExpression(tempStringFormula.stringFormula);
								  resultAlternativeAsumtion = getResultExpression(tempStringFormula.stringFormulaAlt);

								 result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isPIA, paramMap, result);		      	

								  if(mapOutputCoverage[tmpFormula.output] && tmpFormula.output === 'COVTERM_PPAYOR01'){
									  result = 0;
								  }

								result = checkCovTermPpayorAndCovTermWaiver(tmpFormula, itemSelected, mapOutputCoverage, result);			  		

								tempResult = applyRoundingToSomeCasesAll(tmpFormula, result, resultAlternativeAsumtion);
								result = tempResult.result;
								resultAlternativeAsumtion = tempResult.resultAlternativeAsumtion;
								  
								parseToLogFile(paramMap, ITEM, tmpFormula, stringFormulaOri, stringFormula, stringFormulaAlt, 
									'in function getResultFormulaCVPPHClient BASIC', result, resultAlternativeAsumtion, formula, 'pphClient');

								setParamMapByResultAndResultAltBasedOnFormulaTypeCd(formula, tmpFormula, paramMap, result, resultAlternativeAsumtion);

								if(tmpFormula.output){
									if('COVERAGE' === tmpFormula.itemType.toUpperCase()){
										//CLIENT_PLANNING
										value = mapOutputCoverage[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverage[tmpFormula.output] || "COVTERM_WAIVER01" === tmpFormula.output ||
												"COVTERM_WAIVER02" === tmpFormula.output || "COVTERM_PPAYOR01" === tmpFormula.output || 
												"COVTERM_PPAYOR02" === tmpFormula.output){
											  mapOutputCoverage[tmpFormula.output] = value;
											}else{
											  value = (value + result) ;
											  mapOutputCoverage[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverage[tmpFormula.output] = result;
										}

										if("TOTALPREMIUMWITHACCPREMIUM" === tmpFormula.output){
											  mapOutputFund[tmpFormula.output] = result;
										}

										//ALTERNATIVE
										value = mapOutputCoverageAlt[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverageAlt[tmpFormula.output]){
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}else{
											  value = (value + resultAlternativeAsumtion) ;
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
										}

										  //SET NEW KEY PDPREMI IF FORMULATYPE = 'RIDERPREMIUM' / BIAYA ASURANSI PERTAHUN
										if('RIDERPREMIUM' == formula.formulaTypeCd && tmpFormula.output == 'TOTALRIDERPREMIUM'){
											if(map["PREVIOUSRIDERCODE"] == itemSelected.code && map["PREVIOUSCUSTOMERKEY"] == itemSelected.tertanggungKey){
												map["PDPREMI"] = map["PDPREMI"] + result;
											}
											else{
												map["PDPREMI"] = result;
											}
											map["PREVIOUSRIDERCODE"] = itemSelected.code;
											map["PREVIOUSCUSTOMERKEY"] = itemSelected.tertanggungKey;
											mapResultFormula.riderPremium = result;
										}

										//CHARGE / BIAYA ANGSURAN BULANAN
										if('CHARGERIDER' == formula.formulaTypeCd || 'CHARGEINSURANCE' == formula.formulaTypeCd){
											  mapResultFormula[formula.formulaTypeCd] = (result/12);
										}

										setParamMapByFormulaOutputAndFormulaTypeCd(tmpFormula, formula, paramMap, result, resultAlternativeAsumtion);
									}else if('FUND' === tmpFormula.itemType.toUpperCase()){
										var itemCd = ITEM.code;

										value = mapOutputCoverage[formula.formulaTypeCd];
										if(value){
											value = (value + result) ;
											mapOutputCoverage[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverage[formula.formulaTypeCd] = result;
										}

										value = mapOutputCoverageAlt[formula.formulaTypeCd];
										if(value){
											value = (value + resultAlternativeAsumtion) ;
											mapOutputCoverageAlt[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverageAlt[formula.formulaTypeCd] = resultAlternativeAsumtion;
										}

										//CLIENT PLANNING
										if(mapOutputFund[itemCd] == undefined){
											mapOutputFund[itemCd] =  {};
										}
										mapOutputFund[itemCd][tmpFormula.output] = result;
										
										//ALTERNATIVE
										if(mapOutputFundAlt[itemCd] == undefined){
											mapOutputFundAlt[itemCd] =  {};
										}
										mapOutputFundAlt[itemCd][tmpFormula.output] = resultAlternativeAsumtion;

										//ASUMSTION FUND

										if(paramMap.year == '20'){
											if("OFF_TOTALPRUBOOSTERLOW" === tmpFormula.output || "OFF_TOTALPRUBOOSTERMED" === tmpFormula.output || "OFF_TOTALPRUBOOSTERHIGH" === tmpFormula.output){
												paramMap[tmpFormula.output] = (paramMap[tmpFormula.output]==undefined?0:paramMap[tmpFormula.output])+result;
											}	
										}
									}
								}
							}
						}
						checkingIfButtonHitung(buttonType, tmpFormula, formula, mapResultFormula, mapOutputCoverage, result, undefined, undefined, false, false);

						  mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
						  mapResultFormula['MAPOUTPUTFUND'] = mapOutputFund;
						  mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;
						  mapResultFormula['MAPOUTPUTFUNDALT'] = mapOutputFundAlt;
					}
				}	
			}
			
			// Saver
			var tempMapFormulaListSaver = ITEM.FORMULA_SAVER;
			if(tempMapFormulaListSaver != undefined){
				for(var j = 0; j < tempMapFormulaListSaver.length; j++){
					  var tmpFormula = tempMapFormulaListSaver[j];
					  var stringFormula = '';
					  var stringFormulaAlt = '';
					  var stringFormulaOri = '';
					  var result = 0;
					  var resultAlternativeAsumtion = 0;
					  var value;

					  if(tmpFormula.itemType.toLowerCase() == 'fund' && tmpFormula.itemGroupProductCd.indexOf(map.mainCoverage) == -1){
						  continue;
					  }

					var formula = rootScope.FORMULA[tmpFormula.formulaCd];
					if(formula){
							var isProcess = false;
						  if(ITEM.flagDB == true && (formula.formulaTypeCd.indexOf('TOTALCVDB') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') !== -1)){
							  isProcess = true;
						  }else if(ITEM.flagDB == false && (formula.formulaTypeCd.indexOf('TOTALCVDB') === -1 && formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') === -1)){
							  isProcess = true;
						}else if(itemSelected.type === 'COVERAGE'){
							  isProcess = true;
						}

						if(isProcess){
							  var tempFormulaElementList = formula.FORMULA_ELEMENT;

							for(var k = 0; k < tempFormulaElementList.length; k++){
								var fe = tempFormulaElementList[k];
								fe.value = fe.value == "''" ? '' : fe.value.trim();
								stringFormulaOri += fe.value;

								if(fe.type.toLowerCase().trim() === "coverage"
									|| fe.type.toLowerCase().trim() === "customer"
									|| fe.type.toLowerCase().trim() === "rate"
									|| fe.type.toLowerCase().trim() === "fund"
									|| fe.type.toLowerCase().trim() === "product"
									|| fe.type.toLowerCase().trim() === "allocation"
									|| fe.type.toLowerCase().trim() === "predefined"){

									if(fe.value.toUpperCase() === 'CUSTINCOME'){
										  stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'PDPLAN'){
										  stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
										  stringFormulaAlt += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
									}else if(fe.value.toUpperCase() === 'PDALLO'){
										  stringFormula += map['PDALLO_TOPUP'] ? map['PDALLO_TOPUP'] : '0.0';
										  stringFormulaAlt += map['PDALLO_TOPUP'] ? map['PDALLO_TOPUP'] : '0.0';
									}else if(fe.value.toUpperCase() === 'YEAR'){
										  stringFormula += paramMap.year;
										  stringFormulaAlt += paramMap.year;
									}else if(fe.value.toUpperCase() === 'RTSARANNUITY'){
										var factor = getFactorFromAnuityByMonth(map['CUSTAGEMONTH'], ITEM.ANNUITY);
										  stringFormula += factor;
										  stringFormulaAlt += factor;
									}else if(ITEM.flagDB == true && fe.value.indexOf('TOTALCV') !== -1){
										  stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}else if(fe.value.toUpperCase() === 'ALLOVALUE' && isPAA2){
										//for PAA2
										stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';

										  PDALLO = map[fe.value] ? map[fe.value]: '0.0';  	
									}else{
										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "load"){
								  stringFormula += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								  stringFormulaAlt += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								}else if(fe.type.toLowerCase().trim() === "formula"){
									if(fe.value.toUpperCase() === 'MAXLVPREMI'){
										stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'DIFFLVPREMI'){
										stringFormula += "" + DIFFLVPREMI +"";
										  stringFormulaAlt += "" + DIFFLVPREMI +"";						        
									}else if(fe.value.toUpperCase() == 'ALLOCATEDSAVER'){
										stringFormula += mapOutputCoverage[fe.value.toUpperCase()+'_CLIENT'] ? mapOutputCoverage[fe.value.toUpperCase()+'_CLIENT'] : '0.0';
										stringFormulaAlt += mapOutputCoverageAlt[fe.value.toUpperCase()+'_CLIENT'] ? mapOutputCoverageAlt[fe.value.toUpperCase()+'_CLIENT'] : '0.0';  
									}else{
										stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "formulafund"){
									var tempStringFormula = setStringFormulaForFormulaSaverByFormulaElementTypeIsFormulaFund(fe, stringFormula, stringFormulaAlt, paramMap,
										tmpFormula, ITEM, mapOutputFund, mapOutputFundAlt, null, null, false);
									stringFormula = tempStringFormula.stringFormula;
									stringFormulaAlt = tempStringFormula.stringFormulaAlt;
								}else if(fe.type.toLowerCase().trim() === "string"){
								  stringFormula += "\'"+fe.value+"\'";
								  stringFormulaAlt += "\'"+fe.value+"\'";
								}else{
								  stringFormula += fe.value;
								  stringFormulaAlt += fe.value;
								}
							}

							if(isValidExpression(stringFormula)){

								var tempStringFormula = processPowAndMinusNegativeOnFormula(stringFormula, stringFormulaAlt);

								  result = getResultExpression(tempStringFormula.stringFormula);
								  resultAlternativeAsumtion = getResultExpression(tempStringFormula.stringFormulaAlt);

								  result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isPIA, paramMap, result);			      	

								  if(mapOutputCoverage[tmpFormula.output] && tmpFormula.output === 'COVTERM_PPAYOR01'){
									  result = 0;
								  }

								result = checkCovTermPpayorAndCovTermWaiver(tmpFormula, itemSelected, mapOutputCoverage, result);	

								if(tmpFormula.output == 'TOPUPDEDUCTIONLOW01'){
									  paramMap[tmpFormula.output+'CLIENT'] = result;
									  paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
								  }

								  if(tmpFormula.output == 'TOPUPDEDUCTIONMED01'){
									  paramMap[tmpFormula.output+'CLIENT'] = result;
									  paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
								  }

								  if(tmpFormula.output == 'TOPUPDEDUCTIONHIGH01'){
									  paramMap[tmpFormula.output+'CLIENT'] = result;
									  paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
								  }

								  if(tmpFormula.output == 'TOPUPDEDUCTIONLOW02'){
									  paramMap[tmpFormula.output+'CLIENT'] = result;
									  paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
								  }

								  if(tmpFormula.output == 'TOPUPDEDUCTIONMED02'){
									  paramMap[tmpFormula.output+'CLIENT'] = result;
									  paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
								  }

								  if(tmpFormula.output == 'TOPUPDEDUCTIONHIGH02'){
									  paramMap[tmpFormula.output+'CLIENT'] = result;
									  paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
								  }

								  setParamMapByResultAndResultAltBasedOnFormulaTypeCd(formula, tmpFormula, paramMap, result, resultAlternativeAsumtion);

								if(tmpFormula.output == 'CVTOPUPLOWTEMP' || tmpFormula.output == 'CVTOPUPMEDTEMP' || tmpFormula.output == 'CVTOPUPHIGHTEMP'){
									var hasil = result.toFixed();
									var hasilAlt = resultAlternativeAsumtion.toFixed();

									result = hasil;
									resultAlternativeAsumtion = hasilAlt;
								}

								parseToLogFile(paramMap, ITEM, tmpFormula, stringFormulaOri, stringFormula, stringFormulaAlt, 
									'in function getResultFormulaCVPPHClient SAVER', result, resultAlternativeAsumtion, formula, 'pphClient');							

								if(tmpFormula.output){
									if('COVERAGE' === tmpFormula.itemType.toUpperCase()){
										//CLIENT_PLANNING
										value = mapOutputCoverage[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverage[tmpFormula.output] || "COVTERM_WAIVER01" === tmpFormula.output ||
												"COVTERM_WAIVER02" === tmpFormula.output || "COVTERM_PPAYOR01" === tmpFormula.output || 
												"COVTERM_PPAYOR02" === tmpFormula.output){
											  mapOutputCoverage[tmpFormula.output] = value;
											}else{
											  value = (value + result) ;
											  mapOutputCoverage[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverage[tmpFormula.output] = result;
										}

										if("TOTALPREMIUMWITHACCPREMIUM" === tmpFormula.output){
										  mapOutputFund[tmpFormula.output] = result;
										}

										//ALTERNATIVE
										value = mapOutputCoverageAlt[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverageAlt[tmpFormula.output]){
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}else{
											  value = (value + resultAlternativeAsumtion) ;
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
										}

										  //SET NEW KEY PDPREMI IF FORMULATYPE = 'RIDERPREMIUM' / BIAYA ASURANSI PERTAHUN
										if('RIDERPREMIUM' == formula.formulaTypeCd && tmpFormula.output == 'TOTALRIDERPREMIUM'){
											if(map["PREVIOUSRIDERCODE"] == itemSelected.code && map["PREVIOUSCUSTOMERKEY"] == itemSelected.tertanggungKey){
												map["PDPREMI"] = map["PDPREMI"] + result;
											}
											else{
												map["PDPREMI"] = result;
											}
											map["PREVIOUSRIDERCODE"] = itemSelected.code;
											map["PREVIOUSCUSTOMERKEY"] = itemSelected.tertanggungKey;
											mapResultFormula.riderPremium = result;
	
										}

										//CHARGE / BIAYA ANGSURAN BULANAN
										if('CHARGERIDER' == formula.formulaTypeCd || 'CHARGEINSURANCE' == formula.formulaTypeCd){
											  mapResultFormula[formula.formulaTypeCd] = (result/12);
										}							        


									}else if('FUND' === tmpFormula.itemType.toUpperCase()){
										var itemCd = ITEM.code;

										value = mapOutputCoverage[formula.formulaTypeCd];
										if(value){
											value = (value + result) ;
											mapOutputCoverage[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverage[formula.formulaTypeCd] = result;
										}

										value = mapOutputCoverageAlt[formula.formulaTypeCd];
										if(value){
											value = (value + resultAlternativeAsumtion) ;
											mapOutputCoverageAlt[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverageAlt[formula.formulaTypeCd] = resultAlternativeAsumtion;
										}

										if((tmpFormula.output == 'CVTOPUPLOW' || tmpFormula.output == 'CVTOPUPMED' || tmpFormula.output == 'CVTOPUPHIGH') && isPAA2){
											mapOutputCoverage[tmpFormula.output] = Math.ceil(result);
											mapOutputCoverageAlt[tmpFormula.output] = Math.ceil(result);	
										}

										//CLIENT PLANNING
										if(mapOutputFund[itemCd] == undefined){
											mapOutputFund[itemCd] =  {};
										}
										mapOutputFund[itemCd][tmpFormula.output] = result;
										
										//ALTERNATIVE
										if(mapOutputFundAlt[itemCd] == undefined){
											mapOutputFundAlt[itemCd] =  {};
										}
										mapOutputFundAlt[itemCd][tmpFormula.output] = resultAlternativeAsumtion;

										  if(paramMap.year == '20'){
											  if("OFF_TOTALPRUBOOSTERLOW" === tmpFormula.output || "OFF_TOTALPRUBOOSTERMED" === tmpFormula.output || "OFF_TOTALPRUBOOSTERHIGH" === tmpFormula.output){
												paramMap[tmpFormula.output] = result;
											}	
										  }
									}
								}
							}
						}
						checkingIfButtonHitung(buttonType, tmpFormula, formula, mapResultFormula, mapOutputCoverage, result, undefined, undefined, false, false);

						  mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
						  mapResultFormula['MAPOUTPUTFUND'] = mapOutputFund;
						  mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;
						  mapResultFormula['MAPOUTPUTFUNDALT'] = mapOutputFundAlt;
					}
				}
			}		    

			// Empty
			var tempMapFormulaListEmpty = ITEM.FORMULA_EMPTY;
			if(tempMapFormulaListEmpty != undefined){
				for(var j = 0; j < tempMapFormulaListEmpty.length; j++){
					  var tmpFormula = tempMapFormulaListEmpty[j];
					  var stringFormula = '';
					  var stringFormulaAlt = '';
					  var stringFormulaOri = '';
					  var result = 0;
					  var resultAlternativeAsumtion = 0;
					  var value;

					  if(tmpFormula.itemType.toLowerCase() == 'fund' && tmpFormula.itemGroupProductCd.indexOf(map.mainCoverage) == -1){
						  continue;
					  }

					var formula = rootScope.FORMULA[tmpFormula.formulaCd];
					if(formula){
							var isProcess = false;
						  if(ITEM.flagDB == true && (formula.formulaTypeCd.indexOf('TOTALCVDB') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') !== -1)){
							  isProcess = true;
						  }else if(ITEM.flagDB == false && (formula.formulaTypeCd.indexOf('TOTALCVDB') === -1 && formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') === -1)){
							  isProcess = true;
						}else if(itemSelected.type === 'COVERAGE'){
							  isProcess = true;
						}

						if(isProcess){
							  var tempFormulaElementList = formula.FORMULA_ELEMENT;

							for(var k = 0; k < tempFormulaElementList.length; k++){
								var fe = tempFormulaElementList[k];
								fe.value = fe.value == "''" ? '' : fe.value.trim();
								stringFormulaOri += fe.value;

								if(fe.type.toLowerCase().trim() === "coverage"
									|| fe.type.toLowerCase().trim() === "customer"
									|| fe.type.toLowerCase().trim() === "rate"
									|| fe.type.toLowerCase().trim() === "fund"
									|| fe.type.toLowerCase().trim() === "product"
									|| fe.type.toLowerCase().trim() === "allocation"
									|| fe.type.toLowerCase().trim() === "predefined"){

									if(fe.value.toUpperCase() === 'CUSTINCOME'){
										  stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'PDPLAN'){
										  stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
										  stringFormulaAlt += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
									}else if(fe.value.toUpperCase() === 'PDALLO'){
										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}else if(fe.value.toUpperCase() === 'YEAR'){
										  stringFormula += paramMap.year;
										  stringFormulaAlt += paramMap.year;
									}else if(fe.value.toUpperCase() === 'RTSARANNUITY'){
										var factor = getFactorFromAnuityByMonth(map['CUSTAGEMONTH'], ITEM.ANNUITY);
										  stringFormula += factor;
										  stringFormulaAlt += factor;
									}else if(ITEM.flagDB == true && fe.value.indexOf('TOTALCV') !== -1){
										  stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}else if(fe.value.toUpperCase() === 'ALLOVALUE' && isPAA2){
										//for PAA2
										stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';

										  PDALLO = map[fe.value] ? map[fe.value]: '0.0';
									}else if(fe.value.toUpperCase() == 'TOTALCVPREMILOW'){
										 stringFormula += paramMap['TOTALCVPREMILOW'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVPREMILOWALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPLOW'){
										stringFormula += paramMap['TOTALCVTOPUPLOW'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPLOWALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALLBAVLOWRATE'){										
										stringFormula += paramMap['TOTALLBAVLOWRATE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALLBAVLOWRATE'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVLOWSURRVALUE'){
										stringFormula += paramMap['TOTALCVLOWSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVLOWSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPLOWSURRVALUE'){
										stringFormula += paramMap['TOTALCVTOPUPLOWSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPLOWSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVPREMIMED'){
										 stringFormula += paramMap['TOTALCVPREMIMED'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVPREMIMEDALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPMED'){
										stringFormula += paramMap['TOTALCVTOPUPMED'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPMEDALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALLBAVMEDRATE'){										
										stringFormula += paramMap['TOTALLBAVMEDRATE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALLBAVMEDRATE'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVMEDSURRVALUE'){
										stringFormula += paramMap['TOTALCVMEDSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVMEDSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPMEDSURRVALUE'){
										stringFormula += paramMap['TOTALCVTOPUPMEDSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPMEDSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVPREMIHIGH'){
										 stringFormula += paramMap['TOTALCVPREMIHIGH'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVPREMIHIGHALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPHIGH'){
										stringFormula += paramMap['TOTALCVTOPUPHIGH'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPHIGHALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALLBAVHIGHRATE'){										
										stringFormula += paramMap['TOTALLBAVHIGHRATE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALLBAVHIGHRATE'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVHIGHSURRVALUE'){
										stringFormula += paramMap['TOTALCVHIGHSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVHIGHSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPHIGHSURRVALUE'){
										stringFormula += paramMap['TOTALCVTOPUPHIGHSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPHIGHSURRVALUEALT'+paramMap.year];		  	  	
									}else{
										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "load"){
								  stringFormula += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								  stringFormulaAlt += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								}else if(fe.type.toLowerCase().trim() === "formula"){
									if(fe.value.toUpperCase() === 'MAXLVPREMI'){
										stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'DIFFLVPREMI'){
										stringFormula += "" + DIFFLVPREMI +"";
										  stringFormulaAlt += "" + DIFFLVPREMI +"";						        
									}else{
										stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "formulafund"){					          	
								  if(fe.value.toUpperCase() == 'CVTOTALLOWLASTYEARSTD' && paramMap.year > 1){
									  stringFormula += paramMap[fe.value.toUpperCase()+'_CLIENT'+(paramMap.year-1)];
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()+'_ALT'+(paramMap.year-1)];
								  }else if((fe.value.toUpperCase() == 'CVTOTALLOWLASTYEAR' || fe.value.toUpperCase() == 'CVTOTALMEDLASTYEAR' || fe.value.toUpperCase() == 'CVTOTALHIGHLASTYEAR'
										|| fe.value.toUpperCase() == 'TOTALSURRVALUELOWLASTYEAR' || fe.value.toUpperCase() == 'TOTALSURRVALUEMEDLASTYEAR' || fe.value.toUpperCase() == 'TOTALSURRVALUEHIGHLASTYEAR')
										&& paramMap.year > 1){
									  stringFormula += paramMap[fe.value.toUpperCase()+'_CLIENT'+(paramMap.year-1)];
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()+'_ALT'+(paramMap.year-1)];
								  }else if(fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICLOWLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICMEDLASTYEAR'
										|| fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICHIGHLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERLOWLASTYEAR'
										|| fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERMEDLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERHIGHLASTYEAR'){
									  stringFormula += paramMap[fe.value.toUpperCase()+'_CLIENT'+(paramMap.year-1)];
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()+'_ALT'+(paramMap.year-1)];
								  }else if(fe.value.toUpperCase() == 'TOTALCVLOWLASTYEAR' || fe.value.toUpperCase() == 'TOTALCVMEDLASTYEAR'
								  || fe.value.toUpperCase() == 'TOTALCVHIGHLASTYEAR'){
									  stringFormula += mapOutputCoverage[fe.value.toUpperCase()];
									  stringFormulaAlt += mapOutputCoverage[fe.value.toUpperCase()];
								  }else if(fe.value.toUpperCase() == 'TOTALCVDBLOWDISPLAY' || fe.value.toUpperCase() == 'TOTALCVDBMEDDISPLAY'
								  || fe.value.toUpperCase() == 'TOTALCVDBHIGHDISPLAY'){
									  stringFormula += mapOutputCoverage[fe.value.toUpperCase()];
									  stringFormulaAlt += mapOutputCoverage[fe.value.toUpperCase()];
								  }else{
								  	  stringFormula += getValueFund(ITEM.code, fe.value, mapOutputFund);
								  	  stringFormulaAlt += getValueFund(ITEM.code, fe.value, mapOutputFundAlt);	
								  }							          										          
								}else if(fe.type.toLowerCase().trim() === "string"){
								  stringFormula += "\'"+fe.value+"\'";
								  stringFormulaAlt += "\'"+fe.value+"\'";
								}else{
								  stringFormula += fe.value;
								  stringFormulaAlt += fe.value;
								}
							}
							
							if(isValidExpression(stringFormula)){

								var tempStringFormula = processPowAndMinusNegativeOnFormula(stringFormula, stringFormulaAlt);

								  result = getResultExpression(tempStringFormula.stringFormula);
								  resultAlternativeAsumtion = getResultExpression(tempStringFormula.stringFormulaAlt);

								  result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isPIA, paramMap, result);  
								  tempResult = applyRoundingToSomeCasesAll(tmpFormula, result, resultAlternativeAsumtion);
								  result = tempResult.result;
								  resultAlternativeAsumtion = tempResult.resultAlternativeAsumtion; 	

								  if(mapOutputCoverage[tmpFormula.output] && tmpFormula.output === 'COVTERM_PPAYOR01'){
									  result = 0;
								  }

								result = checkCovTermPpayorAndCovTermWaiver(tmpFormula, itemSelected, mapOutputCoverage, result);
								
								setParamMapByResultAndResultAltBasedOnFormulaTypeCd(formula, tmpFormula, paramMap, result, resultAlternativeAsumtion);

								if(tmpFormula.formulaCd == 'FRMLLOWSURRVALUE01'){
									if(paramMap.year > 1 && paramMap['FRMLLOWSURRVALUE01_CLIENT'+(paramMap.year-1)] == -1){
										resultAlternativeAsumtion = -1;
									}
									if(paramMap['FRMLLOWSURRVALUE01_CLIENT'+paramMap.year] != undefined || paramMap['FRMLLOWSURRVALUE01_CLIENT'+paramMap.year] != -1){
										paramMap['FRMLLOWSURRVALUE01_CLIENT'+paramMap.year] = resultAlternativeAsumtion;
									}
								}							
								else if(tmpFormula.formulaCd == 'FRMLMEDSURRVALUE01'){
									if(paramMap.year > 1 && paramMap['FRMLMEDSURRVALUE01_CLIENT'+(paramMap.year-1)] == -1){
										resultAlternativeAsumtion = -1;
									}
									if(paramMap['FRMLMEDSURRVALUE01_CLIENT'+paramMap.year] != undefined || paramMap['FRMLMEDSURRVALUE01_CLIENT'+paramMap.year] != -1){
										paramMap['FRMLMEDSURRVALUE01_CLIENT'+paramMap.year] = resultAlternativeAsumtion;
									}
								}									
								else if(tmpFormula.formulaCd == 'FRMLHIGHSURRVALUE01'){
									if(paramMap.year > 1 && paramMap['FRMLHIGHSURRVALUE01_CLIENT'+(paramMap.year-1)] == -1){
										resultAlternativeAsumtion = -1;
									}
									if(paramMap['FRMLHIGHSURRVALUE01_CLIENT'+paramMap.year] != undefined || paramMap['FRMLHIGHSURRVALUE01_CLIENT'+paramMap.year] != -1){
										paramMap['FRMLHIGHSURRVALUE01_CLIENT'+paramMap.year] = resultAlternativeAsumtion;
									}
								}
								
								if(formula.formulaTypeCd == 'CVTOTALLOWLASTYEARSTD'){
									paramMap[formula.formulaTypeCd+'_CLIENT'+paramMap.year] = (paramMap[formula.formulaTypeCd+'_CLIENT'+paramMap.year]==undefined?0:result);
									paramMap[formula.formulaTypeCd+'_ALT'+paramMap.year] = (paramMap[formula.formulaTypeCd+'_ALT'+paramMap.year]==undefined?0:resultAlternativeAsumtion);
								}

								parseToLogFile(paramMap, ITEM, tmpFormula, stringFormulaOri, stringFormula, stringFormulaAlt, 
									'in function getResultFormulaCVPPHClient EMPTY', result, resultAlternativeAsumtion, formula, 'pphClient');							

								if(tmpFormula.output){
									if('COVERAGE' === tmpFormula.itemType.toUpperCase()){
										//CLIENT_PLANNING
										value = mapOutputCoverage[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverage[tmpFormula.output] || "COVTERM_WAIVER01" === tmpFormula.output ||
												"COVTERM_WAIVER02" === tmpFormula.output || "COVTERM_PPAYOR01" === tmpFormula.output || 
												"COVTERM_PPAYOR02" === tmpFormula.output){
											  mapOutputCoverage[tmpFormula.output] = value;
											}else{
											  value = (value + result) ;
											  mapOutputCoverage[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverage[tmpFormula.output] = result;
										}

										if("TOTALPREMIUMWITHACCPREMIUM" === tmpFormula.output){
											  mapOutputFund[tmpFormula.output] = result;
										}

										//ALTERNATIVE
										value = mapOutputCoverageAlt[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverageAlt[tmpFormula.output]){
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}else{
											  value = (value + resultAlternativeAsumtion) ;
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
										}

										  //SET NEW KEY PDPREMI IF FORMULATYPE = 'RIDERPREMIUM' / BIAYA ASURANSI PERTAHUN
										if('RIDERPREMIUM' == formula.formulaTypeCd && tmpFormula.output == 'TOTALRIDERPREMIUM'){
											if(map["PREVIOUSRIDERCODE"] == itemSelected.code && map["PREVIOUSCUSTOMERKEY"] == itemSelected.tertanggungKey){
												map["PDPREMI"] = map["PDPREMI"] + result;
											}
											else{
												map["PDPREMI"] = result;
											}
											map["PREVIOUSRIDERCODE"] = itemSelected.code;
											map["PREVIOUSCUSTOMERKEY"] = itemSelected.tertanggungKey;
											mapResultFormula.riderPremium = result;	
										}

										//CHARGE / BIAYA ANGSURAN BULANAN
										if('CHARGERIDER' == formula.formulaTypeCd || 'CHARGEINSURANCE' == formula.formulaTypeCd){
											  mapResultFormula[formula.formulaTypeCd] = (result/12);
										}							        


									}else if('FUND' === tmpFormula.itemType.toUpperCase()){
										var itemCd = ITEM.code;

										value = mapOutputCoverage[formula.formulaTypeCd];
										if(value && formula.formulaTypeCd != 'FT_CVWITHDRAWAL'){
											value = (value + result) ;
											mapOutputCoverage[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverage[formula.formulaTypeCd] = result;
										}

										if(formula.formulaTypeCd == 'TOTALCVLOWFUNDDSPLY' || formula.formulaTypeCd == 'TOTALCVMEDFUNDDSPLY' || formula.formulaTypeCd == 'TOTALCVHIGHFUNDDSPLY' || formula.formulaTypeCd == 'FT_SURRENDERLOWVALUE' || formula.formulaTypeCd == 'FT_SURRENDERMEDVALUE' || formula.formulaTypeCd == 'FT_SURRENDERHIGHVALU' || formula.formulaTypeCd == 'TOTALCVDBLOWDISPLAY' || formula.formulaTypeCd == 'TOTALCVDBMEDDISPLAY' || formula.formulaTypeCd == 'TOTALCVDBHIGHDISPLAY'){
											mapOutputCoverage[formula.formulaTypeCd] = result;	
										}

										value = mapOutputCoverageAlt[formula.formulaTypeCd];
										if(value && formula.formulaTypeCd != 'FT_CVWITHDRAWAL'){
											value = (value + resultAlternativeAsumtion) ;
											mapOutputCoverageAlt[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverageAlt[formula.formulaTypeCd] = resultAlternativeAsumtion;
										}

										if(formula.formulaTypeCd == 'TOTALCVLOWFUNDDSPLY' || formula.formulaTypeCd == 'TOTALCVMEDFUNDDSPLY' || formula.formulaTypeCd == 'TOTALCVHIGHFUNDDSPLY' || formula.formulaTypeCd == 'FT_SURRENDERLOWVALUE' || formula.formulaTypeCd == 'FT_SURRENDERMEDVALUE' || formula.formulaTypeCd == 'FT_SURRENDERHIGHVALU' || formula.formulaTypeCd == 'TOTALCVDBLOWDISPLAY' || formula.formulaTypeCd == 'TOTALCVDBMEDDISPLAY' || formula.formulaTypeCd == 'TOTALCVDBHIGHDISPLAY'){
											mapOutputCoverageAlt[formula.formulaTypeCd] = resultAlternativeAsumtion;	
										}

										if((tmpFormula.output == 'CVTOPUPLOW' || tmpFormula.output == 'CVTOPUPMED' || tmpFormula.output == 'CVTOPUPHIGH') && isPAA2){
											mapOutputCoverage[tmpFormula.output] = Math.ceil(result);
											mapOutputCoverageAlt[tmpFormula.output] = Math.ceil(result);	
										}

										//CLIENT PLANNING
										if(mapOutputFund[itemCd] == undefined){
											mapOutputFund[itemCd] =  {};
										}
										mapOutputFund[itemCd][tmpFormula.output] = result;
										
										//ALTERNATIVE
										if(mapOutputFundAlt[itemCd] == undefined){
											mapOutputFundAlt[itemCd] =  {};
										}
										mapOutputFundAlt[itemCd][tmpFormula.output] = resultAlternativeAsumtion;

										//ASUMSTION FUND
										if(tmpFormula.output == 'CVTOTALHIGHDISPLAY' || tmpFormula.output == 'CVTOTALMEDDISPLAY' || tmpFormula.output == 'CVTOTALLOWDISPLAY' || tmpFormula.output == 'TOTALSURRVALUELOWDISPLAY' || tmpFormula.output == 'TOTALSURRVALUEMEDDISPLAY' || tmpFormula.output == 'TOTALSURRVALUEHIGHDISPLAY'){
											  mapResultPerYear[tmpFormula.output] = result;
											mapResultPerYear['ALT'+tmpFormula.output] = resultAlternativeAsumtion;
										  }

										  if(paramMap.year == '20'){
											  if("OFF_TOTALPRUBOOSTERLOW" === tmpFormula.output || "OFF_TOTALPRUBOOSTERMED" === tmpFormula.output || "OFF_TOTALPRUBOOSTERHIGH" === tmpFormula.output){
												paramMap[tmpFormula.output] = result;
											}	
										  }
										
										if(tmpFormula.formulaCd == 'FRML_WITHDRAWALSAVERLOWLASTYEAR' || tmpFormula.formulaCd == 'FRML_WITHDRAWALSAVERMEDLASTYEAR'
												|| tmpFormula.formulaCd == 'FRML_WITHDRAWALSAVERHIGHLASTYEAR' || tmpFormula.formulaCd == 'FRML_WITHDRAWALBASICLOWLASTYEAR'
												|| tmpFormula.formulaCd == 'FRML_WITHDRAWALBASICMEDLASTYEAR' || tmpFormula.formulaCd == 'FRML_WITHDRAWALBASICHIGHLASTYEAR'){
											paramMap[tmpFormula.output+'_CLIENT'+paramMap.year] = result;
											paramMap[tmpFormula.output+'_ALT'+paramMap.year] = resultAlternativeAsumtion;
										}
									}
								}
							}
						}
						checkingIfButtonHitung(buttonType, tmpFormula, formula, mapResultFormula, mapOutputCoverage, result, undefined, undefined, false, false);

						  mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
						  mapResultFormula['MAPOUTPUTFUND'] = mapOutputFund;
						  mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;
						  mapResultFormula['MAPOUTPUTFUNDALT'] = mapOutputFundAlt;
					}
				}
			}

			mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
			mapResultFormula['MAPOUTPUTFUND'] = mapOutputFund;				      	
			mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;
			mapResultFormula['MAPOUTPUTFUNDALT'] = mapOutputFundAlt;	
			
			mapResultFormula['MAPOUTPUTFUNDPERTAHUN'] = mapResultPerYear;
			return mapResultFormula;
		}

		function getResultFormulaCVPPHAlternatif(itemSelected, ITEM, map, mapResult, mapFundPerYear, mapOutputCoverage, mapOutputCoverageAlt, mapOutputFundAltLimited, mapOutputFundAltWhole, paramMap, flag, buttonType, DIFFLVPREMI, bufferArr, pdAlloArr, latestManfaat){
			var mapResultFormula = mapResult;
			var tempMapFormulaList = ITEM.FORMULA_BOTH;	
			
			/* sorting sequence */
			tempMapFormulaList.sort(function(a,b) {return a.sequence - b.sequence;} );
			
			paramMap['OF_CUSTAGEPOLICY'] = map['CUSTAGE'];
			
			var mapResultPerYear = {};
			var TOTALCVLOWFUNDAVAL = 0;
			var cvWithdrawValue = 0;
			var sumAssuredPIA = 0;
			var isPIA = (map.mainCoverage == 'U1L' || map.mainCoverage == 'U1M');
			var isPAA2 = (map.mainCoverage == 'U10' || map.mainCoverage == 'U11');
			var PDALLO = '';
			
			var isGio = false;
			var covTermP = 0;
			if(ITEM.flagDB == true){
				mapResultPerYear = mapFundPerYear;
			}
			
			// Both		    

			for(var j = 0; j < tempMapFormulaList.length; j++){
				  var tmpFormula = tempMapFormulaList[j];
				  var stringFormula = '';
				  var stringFormulaAlt = '';
				  var stringFormulaOri = '';
				  var result = 0;
				  var resultAlternativeAsumtion = 0;
				  var value;

				  if(tmpFormula.itemType.toLowerCase() == 'fund' && tmpFormula.itemGroupProductCd.indexOf(map.mainCoverage) == -1){
					  continue;
				  }

				var formula = rootScope.FORMULA[tmpFormula.formulaCd];
				if(formula){
						var isProcess = false;
					  if(ITEM.flagDB == true && (formula.formulaTypeCd.indexOf('TOTALCVDB') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') !== -1)){
						  isProcess = true;
					  }else if(ITEM.flagDB == false && (formula.formulaTypeCd.indexOf('TOTALCVDB') === -1 && formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') === -1)){
						  isProcess = true;
					}else if(itemSelected.type === 'COVERAGE'){
						  isProcess = true;
					}

					if(isProcess){
						  var tempFormulaElementList = formula.FORMULA_ELEMENT;

						// if(tmpFormula.formulaCd == 'FRML_DIFFLVPREMI'){
						// 	var xxx = 0;
						// }

						for(var k = 0; k < tempFormulaElementList.length; k++){
							var fe = tempFormulaElementList[k];
							fe.value = fe.value == "''" ? '' : fe.value.trim();
							stringFormulaOri += fe.value;

							if(fe.type.toLowerCase().trim() === "coverage"
								|| fe.type.toLowerCase().trim() === "customer"
								|| fe.type.toLowerCase().trim() === "rate"
								|| fe.type.toLowerCase().trim() === "fund"
								|| fe.type.toLowerCase().trim() === "product"
								|| fe.type.toLowerCase().trim() === "allocation"
								|| fe.type.toLowerCase().trim() === "predefined"){

								if(fe.value.toUpperCase() === 'CUSTINCOME'){
									stringFormula += "\'" + map[fe.value] +"\'";
									stringFormulaAlt += "\'" + map[fe.value] +"\'";
								}else if(ITEM.flagDB == true && fe.value.indexOf('TOTALCV') !== -1){
									  stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
									  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
								}else if(fe.value.toUpperCase() === 'MAXLVPREMI'){
									stringFormula += "\'" + map[fe.value] +"\'";
									  stringFormulaAlt += "\'" + map[fe.value] +"\'";
								}else if(fe.value.toUpperCase() === 'CURRSVROPT'){
									stringFormula += "\'" + map.mapXLimit[fe.value] +"\'";
									  stringFormulaAlt += "\'" + map.mapXWhole[fe.value] +"\'";
								}else if(fe.value.toUpperCase() === 'MAXSVROPT'){
									stringFormula += "\'" + map.mapXLimit[fe.value] +"\'";
									  stringFormulaAlt += "\'" + map.mapXWhole[fe.value] +"\'";
								}else if(fe.value.toUpperCase() === 'ALLOVALUE' && isPAA2){
									//for PAA2
									stringFormula += map[fe.value] ? map[fe.value] : '0.0';
									stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';

									PDALLO = map[fe.value] ? map[fe.value]: '0.0';
								}else if(fe.value.toUpperCase() == 'PDPREMI' && tmpFormula.output == 'ALLOCATEDSAVER' && tmpFormula.formulaCd == 'FRMLALLOPREMI08'
										&& (map[fe.value] == undefined || map[fe.value] == 0)){
									stringFormula += ""+0+"";
									stringFormulaAlt += ""+0+"";
								}else if(fe.value.toUpperCase() == 'PDPREMI' && tmpFormula.output == 'ALLOCATEDSAVER' && tmpFormula.formulaCd == 'FRMLALLOPREMI09'
										&& (map[fe.value] == undefined || map[fe.value] == 0)){
									stringFormula += paramMap['DIFFLVPREMI_O'] ? paramMap['DIFFLVPREMI_O'] : '0.0';
									stringFormulaAlt += paramMap['DIFFLVPREMI_O'] ? paramMap['DIFFLVPREMI_O'] : '0.0';
								}else if(fe.value.toUpperCase() == 'CUSTPREMI' && tmpFormula.output == 'TOTALPREMIUMWITHACCPREMIUMLBDB'){
									  var tempClient = map['CUSTPREMI']+'-'+(DIFFLVPREMI == undefined?0:DIFFLVPREMI);
									  var temp = map['CUSTPREMI'];
									  var hasilClient = getResultExpression(tempClient);
									  var hasilAlt = getResultExpression(temp);

									  stringFormula += "" + hasilClient +"";
									stringFormulaAlt += "" + hasilAlt +"";	  	  	
								}else if(fe.value.toUpperCase() === 'PDPLAN'){
									  stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
									  stringFormulaAlt += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
								}else{
									  stringFormula += map[fe.value] ? (isNaN(map[fe.value]) ? (map[fe.value].charAt(0) == "'" ? map[fe.value] : "\'" + map[fe.value] +"\'") : map[fe.value]) : '0.0';
									  stringFormulaAlt += map[fe.value] ? (isNaN(map[fe.value]) ? (map[fe.value].charAt(0) == "'" ? map[fe.value] : "\'" + map[fe.value] +"\'") : map[fe.value]) : '0.0';							          	
								}

							}else if(fe.type.toLowerCase().trim() === "load"){
							  stringFormula += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
							  stringFormulaAlt += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
							}else if(fe.type.toLowerCase().trim() === "formula"){
								if(fe.value.toUpperCase() === 'MAXLVPREMI'){
									stringFormula += "\'" + map[fe.value] +"\'";
									  stringFormulaAlt += "\'" + map[fe.value] +"\'";
								}else if(fe.value.toUpperCase() === 'DIFFLVPREMI'){
									stringFormula += paramMap['DIFFLVPREMI_O'] ? paramMap['DIFFLVPREMI_O'] : '0.0';
									stringFormulaAlt += paramMap['DIFFLVPREMI_O'] ? paramMap['DIFFLVPREMI_O'] : '0.0';
								}else if(fe.value.toUpperCase() == 'TOTALSAWITHACCSA'){
									stringFormula += paramMap[fe.value.toUpperCase()+'CLIENT'] ? paramMap[fe.value.toUpperCase()+'CLIENT'] : '0.0';
									stringFormulaAlt += paramMap[fe.value.toUpperCase()+'ALT'] ? paramMap[fe.value.toUpperCase()+'ALT'] : '0.0';
								}else if(fe.value.toUpperCase() == 'TOTALPREMIUMWITHACCPREMIUMLBDB'){
									stringFormula += paramMap[fe.value.toUpperCase()+'CLIENT'] ? paramMap[fe.value.toUpperCase()+'CLIENT'] : '0.0';
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()+'ALT'] ? paramMap[fe.value.toUpperCase()+'ALT'] : '0.0';	
								  }else if(fe.value.toUpperCase() == 'TOTALSAWITHACCSALINKTERM'){
									  stringFormula += paramMap[fe.value.toUpperCase()+'CLIENT'] ? paramMap[fe.value.toUpperCase()+'CLIENT'] : '0.0';					          		
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()+'ALT'] ? paramMap[fe.value.toUpperCase()+'ALT'] : '0.0';
								  }else if(fe.value.toUpperCase() == 'PREMIUMINCREASEBEFOREROUNDING'){
									  stringFormula += paramMap[fe.value.toUpperCase()+'CLIENT'] ? paramMap[fe.value.toUpperCase()+'CLIENT'] : '0.0';					          		
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()+'ALT'] ? paramMap[fe.value.toUpperCase()+'ALT'] : '0.0';
								  }else if(fe.value.toUpperCase() == 'OF_CUSTAGEPOLICY'){
									stringFormula += paramMap[fe.value.toUpperCase()] ? paramMap[fe.value.toUpperCase()] : '0.0';
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()] ? paramMap[fe.value.toUpperCase()] : '0.0';
								}else if(fe.value.toUpperCase() == 'ALLOCATEDSAVER'){
									stringFormula += mapOutputCoverage[fe.value.toUpperCase()+'_ALT'] ? mapOutputCoverage[fe.value.toUpperCase()+'_ALT'] : '0.0';
									  stringFormulaAlt += mapOutputCoverageAlt[fe.value.toUpperCase()+'_ALT'] ? mapOutputCoverageAlt[fe.value.toUpperCase()+'_ALT'] : '0.0';  
								}else if(fe.value.toUpperCase() === 'SA_AMOUNT_PRUMED'){
									stringFormula += map[fe.value] ? map[fe.value] : '0.0';
									  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
								}else{
									stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
									  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
								}
							}else if(fe.type.toLowerCase().trim() === "formulafund"){
							  stringFormula += getValueFund(ITEM.code, fe.value, mapOutputFundAltLimited);
							  stringFormulaAlt += getValueFund(ITEM.code, fe.value, mapOutputFundAltWhole);
							}else if(fe.type.toLowerCase().trim() === "string"){
							  stringFormula += "\'"+fe.value+"\'";
							  stringFormulaAlt += "\'"+fe.value+"\'";
							}else{
							  stringFormula += fe.value;
							  stringFormulaAlt += fe.value;
							}
						}

						if(isValidExpression(stringFormula)){

							var tempStringFormula = processPowAndMinusNegativeOnFormula(stringFormula, stringFormulaAlt);

							  result = getResultExpression(tempStringFormula.stringFormula);
							  resultAlternativeAsumtion = getResultExpression(tempStringFormula.stringFormulaAlt);

							result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isPIA, paramMap, result);

							  if(mapOutputCoverage[tmpFormula.output] && tmpFormula.output === 'COVTERM_PPAYOR01'){
								  result = 0;
							  }		
							  
							  if(formula.formulaTypeCd == 'BUFFER' && buttonType != 'hitung'){
								bufferArr.push(resultAlternativeAsumtion);					  									  				
							}

							if(formula.formulaTypeCd.toUpperCase() == 'SUMMPREM' && isPAA2 && buttonType != 'hitung' && PDALLO != ''){
								pdAlloArr.push(PDALLO);
							}

							if(tmpFormula.output == 'PREMIUMACCUMULATION' && buttonType != 'hitung'){

								var temp = 0;
								var len = bufferArr.length;
								var min = 1;
								
								for(var i = 0; i < bufferArr.length; i++){
								   temp = getResultExpression(bufferArr[i]*pdAlloArr[len-min]+temp);									   
								   min++;									   
								}
								
								result = temp;
								resultAlternativeAsumtion = temp;

							}

							if(tmpFormula.output == 'TOTALSAWITHACCSALINKTERM' && paramMap.year == '1'){
								/*result = getResultExpression((mapOutputCoverage['SA_LINKTERM'] ? mapOutputCoverage['SA_LINKTERM'] : 0.0)
									+(mapOutputCoverage['SAINCREASELINKTERM'] ? mapOutputCoverage['SAINCREASELINKTERM'] : 0.0));*/
								resultAlternativeAsumtion = result;
							}
							
							tempResult = applyRoundingToSomeCasesAll(tmpFormula, result, resultAlternativeAsumtion);
							result = tempResult.result;
							resultAlternativeAsumtion = tempResult.resultAlternativeAsumtion;
								
							  if(tmpFormula.formulaCd == 'FRML_INCOME_CUST'){
								  result = "'" + result + "'";
								  resultAlternativeAsumtion = "'" + resultAlternativeAsumtion + "'";
							  }

							parseToLogFile(paramMap, ITEM, tmpFormula, stringFormulaOri, stringFormula, stringFormulaAlt, 
									'in function getResultFormulaCVPPHAlternatif BOTH', result, resultAlternativeAsumtion, formula, 'pphAlt');
							  
							if(tmpFormula.output){
								if('COVERAGE' === tmpFormula.itemType.toUpperCase()){
									//CLIENT_PLANNING
									value = mapOutputCoverage[tmpFormula.output];
								   if(value){
										if("ADMINCHARGE" === mapOutputCoverage[tmpFormula.output] || tmpFormula.output == 'CUSTAGEALTER' || tmpFormula.output == 'CUSTAGEALTER01' || tmpFormula.output == 'CUSTAGEALTER02'){
										  mapOutputCoverage[tmpFormula.output] = value;	
										}else if(tmpFormula.output == 'PDSACHARGE' || tmpFormula.output == 'TOTALMAINSA'){
											mapOutputCoverage[tmpFormula.output] = result;
										}else{
										  if(tmpFormula.output != 'SABASIC' && tmpFormula.output != 'SA_LINKTERM'){
												  value = (value + result) ;		
										  }	
										  else if(tmpFormula.output == 'SA_LINKTERM'){// && tmpFormula.output != 'SA_LINKTERM'){
											value = result;		
										  }
										  
										  mapOutputCoverage[tmpFormula.output] = value;							              							              
										}
									}else{
										if(tmpFormula.formulaCd == 'FRMLALLOPREMI09'){
											//jadi kalo formulaTypeCd nya ALLOCATEDPREMIUM_CLIENT ga bakal dimasukin ke map
										}
										else if(tmpFormula.formulaCd == 'FRMLALLOPREMI08' && tmpFormula.output == 'ALLOCATEDSAVER'){
											mapOutputCoverage[tmpFormula.output + '_ALT'] = result;
										}
										else if((tmpFormula.output != 'SABASIC' && formula.formulaTypeCd != 'FT_PRECALC')
												|| (tmpFormula.output == 'SABASIC' && mapOutputCoverage['SABASIC'] === undefined)){/*case kalo SABASICnya ga keisi*/
											mapOutputCoverage[tmpFormula.output] = result;
										}
									}
									
									setParamMapByFormulaOutputAndFormulaTypeCd(tmpFormula, formula, paramMap, result, resultAlternativeAsumtion);

									if("TOTALCHARGECCB" === tmpFormula.output){
										  mapOutputCoverage[tmpFormula.output] = result;
										  mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
									}

									if("TOTALDEATHBENEFITPGB" === tmpFormula.output){
										  mapOutputFundAltLimited[tmpFormula.output] = result;
									}

									if("TOTALPREMIUMWITHACCPREMIUM" === tmpFormula.output){
										  mapOutputFundAltLimited[tmpFormula.output] = result;
									}

									//ALTERNATIVE
									value = mapOutputCoverageAlt[tmpFormula.output];
									if(value){
										if("ADMINCHARGE" === mapOutputCoverageAlt[tmpFormula.output] || tmpFormula.output == 'CUSTAGEALTER' || tmpFormula.output == 'CUSTAGEALTER01' || tmpFormula.output == 'CUSTAGEALTER02'){
										  mapOutputCoverageAlt[tmpFormula.output] = value;
										}else if(tmpFormula.output == 'PDSACHARGE' || tmpFormula.output == 'TOTALMAINSA'){
											mapOutputCoverageAlt[tmpFormula.output] = result;
										}else{
										  if(tmpFormula.output != 'SABASIC' && tmpFormula.output != 'SA_LINKTERM'){
											value = (value + resultAlternativeAsumtion) ;
										  }
										  else if(tmpFormula.output == 'SA_LINKTERM'){// && tmpFormula.output != 'SA_LINKTERM'){
											value = result;		
										  }
										  mapOutputCoverageAlt[tmpFormula.output] = value;
										}
									}else{

										if(tmpFormula.formulaCd == 'FRMLALLOPREMI09'){
											//jadi kalo formulaTypeCd nya ALLOCATEDPREMIUM_CLIENT ga bakal dimasukin ke map
										}
										else if(tmpFormula.formulaCd == 'FRMLALLOPREMI08' && tmpFormula.output == 'ALLOCATEDSAVER'){
											mapOutputCoverageAlt[tmpFormula.output + '_ALT'] = resultAlternativeAsumtion;
										}
										else{
											mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
										}
									}

									if(tmpFormula.output == 'PREMIUMACCUMULATION'){
										mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;	
									}

									if("TOTALDEATHBENEFITPGB" === tmpFormula.output){
										  mapOutputFundAltWhole[tmpFormula.output] = resultAlternativeAsumtion;
									}
									
									  //SET NEW KEY PDPREMI IF FORMULATYPE = 'RIDERPREMIUM' / BIAYA ASURANSI PERTAHUN
									if('RIDERPREMIUM' == formula.formulaTypeCd && tmpFormula.output == 'TOTALRIDERPREMIUM'){
										if(map["PREVIOUSRIDERCODE"] == itemSelected.code && map["PREVIOUSCUSTOMERKEY"] == itemSelected.tertanggungKey){
											map["PDPREMI"] = map["PDPREMI"] + result;
										}
										else{
											map["PDPREMI"] = result;
										}
										map["PREVIOUSRIDERCODE"] = itemSelected.code;
										map["PREVIOUSCUSTOMERKEY"] = itemSelected.tertanggungKey;
										mapResultFormula.riderPremium = result;
									}
									
									//alter simpen basicPremium
									if('FT_BASICPREMIUM' == formula.formulaTypeCd && 'TOTALBASICPREMI' == tmpFormula.output){
										mapResultFormula.basicPremium = result;
									}
									//end alter simpen basicPremium
									
									//alter simpen cumulativeCurrentResult
									if('FRML_CUMULATIVE_CURRENT_RESULT_CALCULATED' == formula.code && 'OF_CUMULATIVECURRENTRESULTCALCULATED' == tmpFormula.output){
										mapResultFormula.cumulativeCurrentResultCalculated = result;
									}
									//end alter simpen cumulativeCurrentResult

									//CHARGE / BIAYA ANGSURAN BULANAN
									if('CHARGERIDER' == formula.formulaTypeCd || 'CHARGEINSURANCE' == formula.formulaTypeCd){
										  mapResultFormula[formula.formulaTypeCd] = (result/12);
									}

									if("TOTALSAWITHACCSA" === tmpFormula.output){
										  mapOutputCoverage[tmpFormula.output+'CLIENT'] = result;
										  mapOutputCoverage[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
									}

									if("TOTALSAWITHACCSALINKTERM" === tmpFormula.output){
										  mapOutputCoverage[tmpFormula.output+'CLIENT'] = result;
										  mapOutputCoverage[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
									}

									if("TOTALCHARGECCB" === tmpFormula.output){
										  mapOutputCoverage[tmpFormula.output+'CLIENT'] = result;
										  mapOutputCoverage[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
									}

									if(true == tmpFormula.forSpecificRider){
										mapOutputCoverage[tmpFormula.output + "_" + tmpFormula.coverage] = result;
										mapOutputCoverageAlt[tmpFormula.output + "_" + tmpFormula.coverage] = resultAlternativeAsumtion;
									}

								}else if('FUND' === tmpFormula.itemType.toUpperCase()){
									var itemCd = ITEM.code;

									value = mapOutputCoverage[formula.formulaTypeCd];
									if(value){
										value = (value + result) ;
										mapOutputCoverage[formula.formulaTypeCd] = value;
									}else{
										mapOutputCoverage[formula.formulaTypeCd] = result;
									}

									value = mapOutputCoverageAlt[formula.formulaTypeCd];
									if(value){
										value = (value + resultAlternativeAsumtion) ;
										mapOutputCoverageAlt[formula.formulaTypeCd] = value;
									}else{
										mapOutputCoverageAlt[formula.formulaTypeCd] = resultAlternativeAsumtion;
									}

									//CLIENT PLANNING
									if(mapOutputFundAltLimited[itemCd] == undefined){
										mapOutputFundAltLimited[itemCd] =  {};
									}									
									mapOutputFundAltLimited[itemCd][tmpFormula.output] = result;
									
									//ALTERNATIVE
									if(mapOutputFundAltWhole[itemCd] == undefined){
										mapOutputFundAltWhole[itemCd] =  {};
									}
									mapOutputFundAltWhole[itemCd][tmpFormula.output] = resultAlternativeAsumtion;
									
									  if(paramMap.year == '20'){
										  if("OFF_TOTALPRUBOOSTERLOW" === tmpFormula.output || "OFF_TOTALPRUBOOSTERMED" === tmpFormula.output || "OFF_TOTALPRUBOOSTERHIGH" === tmpFormula.output){
											paramMap[tmpFormula.output] = result;
										}	
									  }
								}
							}
						}
					}
					
					checkingIfButtonHitung(buttonType, tmpFormula, formula, mapResultFormula, mapOutputCoverage, result, mapOutputFundAltLimited, mapOutputFundAltWhole, true, true);

					  mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
					  mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;

					  // disini buat keperluar as charges
					  mapResultFormula['MAPOUTPUTFUNDALT_LIMITED'] = mapOutputFundAltLimited;
					  mapResultFormula['MAPOUTPUTFUNDALT_WHOLE'] = mapOutputFundAltWhole;
				}
			}

			//BASIC
			var tempMapFormulaListBasic = ITEM.FORMULA_BASIC;
			if(tempMapFormulaListBasic != undefined){
				for(var j = 0; j < tempMapFormulaListBasic.length; j++){
					  var tmpFormula = tempMapFormulaListBasic[j];
					  var stringFormula = '';
					  var stringFormulaAlt = '';
					  var stringFormulaOri = '';
					  var result = 0;
					  var resultAlternativeAsumtion = 0;
					  var value;

					  if(tmpFormula.itemType.toLowerCase() == 'fund' && tmpFormula.itemGroupProductCd.indexOf(map.mainCoverage) == -1){
						  continue;
					  }

					var formula = rootScope.FORMULA[tmpFormula.formulaCd];
					if(formula){
							var isProcess = false;
						  if(ITEM.flagDB == true && (formula.formulaTypeCd.indexOf('TOTALCVDB') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') !== -1)){
							  isProcess = true;
						  }else if(ITEM.flagDB == false && (formula.formulaTypeCd.indexOf('TOTALCVDB') === -1 && formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') === -1)){
							  isProcess = true;
						}else if(itemSelected.type === 'COVERAGE'){
							  isProcess = true;
						}

						if(isProcess){
							  var tempFormulaElementList = formula.FORMULA_ELEMENT;

							for(var k = 0; k < tempFormulaElementList.length; k++){
								var fe = tempFormulaElementList[k];
								fe.value = fe.value == "''" ? '' : fe.value.trim();
								stringFormulaOri += fe.value;

								if(fe.type.toLowerCase().trim() === "coverage"
									|| fe.type.toLowerCase().trim() === "customer"
									|| fe.type.toLowerCase().trim() === "rate"
									|| fe.type.toLowerCase().trim() === "fund"
									|| fe.type.toLowerCase().trim() === "product"
									|| fe.type.toLowerCase().trim() === "allocation"
									|| fe.type.toLowerCase().trim() === "predefined"){

									if(fe.value.toUpperCase() === 'CUSTINCOME'){
										  stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'PDPLAN'){
										  stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
										  stringFormulaAlt += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
									}else if(fe.value.toUpperCase() === 'PDALLO'){
										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}else if(fe.value.toUpperCase() === 'YEAR'){
										  stringFormula += paramMap.year;
										  stringFormulaAlt += paramMap.year;
									}else if(fe.value.toUpperCase() === 'RTSARANNUITY'){
										var factor = getFactorFromAnuityByMonth(map['CUSTAGEMONTH'], ITEM.ANNUITY);
										  stringFormula += factor;
										  stringFormulaAlt += factor;
									}else if(ITEM.flagDB == true && fe.value.indexOf('TOTALCV') !== -1){
										  stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}else if(fe.value.toUpperCase() === 'MAXLVPREMI'){
										stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'CURRSVROPT'){
										stringFormula += "\'" + map.mapXLimit[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map.mapXWhole[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'MAXSVROPT'){
										stringFormula += "\'" + map.mapXLimit[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map.mapXWhole[fe.value] +"\'";
									}
									else if(fe.value.toUpperCase() === 'ALLOVALUE' && isPAA2){
										//for PAA2
										stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';

										  PDALLO = map[fe.value] ? map[fe.value]: '0.0';
									}else{
										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "load"){
								  stringFormula += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								  stringFormulaAlt += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								}else if(fe.type.toLowerCase().trim() === "formula"){
									if(fe.value.toUpperCase() === 'MAXLVPREMI'){
										stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'DIFFLVPREMI'){
										stringFormula += "" + DIFFLVPREMI +"";
										  stringFormulaAlt += "" + DIFFLVPREMI +"";						        	
									}else if(fe.value.toUpperCase() == 'ALLOCATEDSAVER'){
										stringFormula += mapOutputCoverage[fe.value.toUpperCase()+'_ALT'] ? mapOutputCoverage[fe.value.toUpperCase()+'_ALT'] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value.toUpperCase()+'_ALT'] ? mapOutputCoverageAlt[fe.value.toUpperCase()+'_ALT'] : '0.0';  
									}else{
										stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "formulafund"){
									var tempStringFormula = setStringFormulaForFormulaBasicByFormulaElementTypeIsFormulaFund(fe, stringFormula, stringFormulaAlt,
										paramMap, ITEM, mapOutputFundAltLimited, mapOutputFundAltWhole);
									stringFormula = tempStringFormula.stringFormula;
									stringFormulaAlt = tempStringFormula.stringFormulaAlt;
								}else if(fe.type.toLowerCase().trim() === "string"){
								  stringFormula += "\'"+fe.value+"\'";
								  stringFormulaAlt += "\'"+fe.value+"\'";
								}else{
								  stringFormula += fe.value;
								  stringFormulaAlt += fe.value;
								}
							}
							
							if(isValidExpression(stringFormula)){

								var tempStringFormula = processPowAndMinusNegativeOnFormula(stringFormula, stringFormulaAlt);								
								
								  result = getResultExpression(tempStringFormula.stringFormula);
								  resultAlternativeAsumtion = getResultExpression(tempStringFormula.stringFormulaAlt);

								  result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isPIA, paramMap, result);

								  if(mapOutputCoverage[tmpFormula.output] && tmpFormula.output === 'COVTERM_PPAYOR01'){
									  result = 0;
								  }

								tempResult = applyRoundingToSomeCasesAll(tmpFormula, result, resultAlternativeAsumtion);
								result = tempResult.result;
								resultAlternativeAsumtion = tempResult.resultAlternativeAsumtion;
								
								parseToLogFile(paramMap, ITEM, tmpFormula, stringFormulaOri, stringFormula, stringFormulaAlt, 
										'in function getResultFormulaCVPPHAlternatif BASIC', result, resultAlternativeAsumtion, formula, 'pphAlt');

								setParamMapByResultAndResultAltBasedOnFormulaTypeCd(formula, tmpFormula, paramMap, result, resultAlternativeAsumtion);

								if(tmpFormula.output){
									if('COVERAGE' === tmpFormula.itemType.toUpperCase()){
										//CLIENT_PLANNING
										value = mapOutputCoverage[tmpFormula.output];
									   if(value){
											if("ADMINCHARGE" === mapOutputCoverage[tmpFormula.output]){
											  mapOutputCoverage[tmpFormula.output] = value;
											}else{
											  value = (value + result) ;
											  mapOutputCoverage[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverage[tmpFormula.output] = result;
										}


										if("TOTALPREMIUMWITHACCPREMIUM" === tmpFormula.output){
										  mapOutputFundAltLimited[tmpFormula.output] = result;
										}

										//ALTERNATIVE
										value = mapOutputCoverageAlt[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverageAlt[tmpFormula.output]){
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}else{
											  value = (value + resultAlternativeAsumtion) ;
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
										}
										
										  //SET NEW KEY PDPREMI IF FORMULATYPE = 'RIDERPREMIUM' / BIAYA ASURANSI PERTAHUN
										if('RIDERPREMIUM' == formula.formulaTypeCd && tmpFormula.output == 'TOTALRIDERPREMIUM'){
											if(map["PREVIOUSRIDERCODE"] == itemSelected.code && map["PREVIOUSCUSTOMERKEY"] == itemSelected.tertanggungKey){
												map["PDPREMI"] = map["PDPREMI"] + result;
											}
											else{
												map["PDPREMI"] = result;
											}
											map["PREVIOUSRIDERCODE"] = itemSelected.code;
											map["PREVIOUSCUSTOMERKEY"] = itemSelected.tertanggungKey;
											mapResultFormula.riderPremium = result;	
										}

										//CHARGE / BIAYA ANGSURAN BULANAN
										if('CHARGERIDER' == formula.formulaTypeCd || 'CHARGEINSURANCE' == formula.formulaTypeCd){
											  mapResultFormula[formula.formulaTypeCd] = (result/12);
										}

										setParamMapByFormulaOutputAndFormulaTypeCd(tmpFormula, formula, paramMap, result, resultAlternativeAsumtion);
									}else if('FUND' === tmpFormula.itemType.toUpperCase()){
										var itemCd = ITEM.code;

										value = mapOutputCoverage[formula.formulaTypeCd];
										if(value){
											value = (value + result) ;
											mapOutputCoverage[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverage[formula.formulaTypeCd] = result;
										}

										value = mapOutputCoverageAlt[formula.formulaTypeCd];
										if(value){
											value = (value + resultAlternativeAsumtion) ;
											mapOutputCoverageAlt[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverageAlt[formula.formulaTypeCd] = resultAlternativeAsumtion;
										}

										//CLIENT PLANNING
										if(mapOutputFundAltLimited[itemCd] == undefined){
											mapOutputFundAltLimited[itemCd] =  {};
										}									
										mapOutputFundAltLimited[itemCd][tmpFormula.output] = result;
										
										//ALTERNATIVE
										if(mapOutputFundAltWhole[itemCd] == undefined){
											mapOutputFundAltWhole[itemCd] =  {};
										}
										mapOutputFundAltWhole[itemCd][tmpFormula.output] = resultAlternativeAsumtion;

										if(paramMap.year == '20'){
											if("OFF_TOTALPRUBOOSTERLOW" === tmpFormula.output || "OFF_TOTALPRUBOOSTERMED" === tmpFormula.output || "OFF_TOTALPRUBOOSTERHIGH" === tmpFormula.output){
												paramMap[tmpFormula.output+'_ALT'] = (paramMap[tmpFormula.output+'_ALT']==undefined?0:paramMap[tmpFormula.output+'_ALT'])+result;
											}	
										}
									}
								}
							}
						}
						checkingIfButtonHitung(buttonType, tmpFormula, formula, mapResultFormula, mapOutputCoverage, result, mapOutputFundAltLimited, mapOutputFundAltWhole, false, true);

						  mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
						  mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;

						  // disini buat keperluar as charges
						  mapResultFormula['MAPOUTPUTFUNDALT_LIMITED'] = mapOutputFundAltLimited;
						  mapResultFormula['MAPOUTPUTFUNDALT_WHOLE'] = mapOutputFundAltWhole;
					}
				}
			}

			//SAVER
			var tempMapFormulaListSaver = ITEM.FORMULA_SAVER;
			if(tempMapFormulaListSaver != undefined){
				for(var j = 0; j < tempMapFormulaListSaver.length; j++){
					  var tmpFormula = tempMapFormulaListSaver[j];
					  var stringFormula = '';
					  var stringFormulaAlt = '';
					  var stringFormulaOri = '';
					  var result = 0;
					  var resultAlternativeAsumtion = 0;
					  var value;

					  if(tmpFormula.itemType.toLowerCase() == 'fund' && tmpFormula.itemGroupProductCd.indexOf(map.mainCoverage) == -1){
						  continue;
					  }

					var formula = rootScope.FORMULA[tmpFormula.formulaCd];
					if(formula){
							var isProcess = false;
						  if(ITEM.flagDB == true && (formula.formulaTypeCd.indexOf('TOTALCVDB') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') !== -1)){
							  isProcess = true;
						  }else if(ITEM.flagDB == false && (formula.formulaTypeCd.indexOf('TOTALCVDB') === -1 && formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') === -1)){
							  isProcess = true;
						}else if(itemSelected.type === 'COVERAGE'){
							  isProcess = true;
						}

						if(isProcess){
							  var tempFormulaElementList = formula.FORMULA_ELEMENT;

							for(var k = 0; k < tempFormulaElementList.length; k++){
								var fe = tempFormulaElementList[k];
								fe.value = fe.value == "''" ? '' : fe.value.trim();
								stringFormulaOri += fe.value;

								if(fe.type.toLowerCase().trim() === "coverage"
									|| fe.type.toLowerCase().trim() === "customer"
									|| fe.type.toLowerCase().trim() === "rate"
									|| fe.type.toLowerCase().trim() === "fund"
									|| fe.type.toLowerCase().trim() === "product"
									|| fe.type.toLowerCase().trim() === "allocation"
									|| fe.type.toLowerCase().trim() === "predefined"){

									if(fe.value.toUpperCase() === 'CUSTINCOME'){
										  stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'PDPLAN'){
										  stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
										  stringFormulaAlt += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
									}else if(fe.value.toUpperCase() === 'PDALLO'){
										  stringFormula += map['PDALLO_TOPUP'] ? map['PDALLO_TOPUP'] : '0.0';
										  stringFormulaAlt += map['PDALLO_TOPUP'] ? map['PDALLO_TOPUP'] : '0.0';
									}else if(fe.value.toUpperCase() === 'YEAR'){
										  stringFormula += paramMap.year;
										  stringFormulaAlt += paramMap.year;
									}else if(fe.value.toUpperCase() === 'RTSARANNUITY'){
										var factor = getFactorFromAnuityByMonth(map['CUSTAGEMONTH'], ITEM.ANNUITY);
										  stringFormula += factor;
										  stringFormulaAlt += factor;
									}else if(ITEM.flagDB == true && fe.value.indexOf('TOTALCV') !== -1){
										  stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}else if(fe.value.toUpperCase() === 'MAXLVPREMI'){
										stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'CURRSVROPT'){
										stringFormula += "\'" + map.mapXLimit[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map.mapXWhole[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'MAXSVROPT'){
										stringFormula += "\'" + map.mapXLimit[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map.mapXWhole[fe.value] +"\'";
									}
									else if(fe.value.toUpperCase() === 'ALLOVALUE' && isPAA2){
										//for PAA2
										stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';

										  PDALLO = map[fe.value] ? map[fe.value]: '0.0';
									}else{
										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "load"){
								  stringFormula += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								  stringFormulaAlt += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								}else if(fe.type.toLowerCase().trim() === "formula"){
									if(fe.value.toUpperCase() === 'MAXLVPREMI'){
										stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'DIFFLVPREMI'){
										stringFormula += "" + DIFFLVPREMI +"";
										  stringFormulaAlt += "" + DIFFLVPREMI +"";						        	
									}else if(fe.value.toUpperCase() == 'ALLOCATEDSAVER'){
										stringFormula += mapOutputCoverage[fe.value.toUpperCase()+'_ALT'] ? mapOutputCoverage[fe.value.toUpperCase()+'_ALT'] : '0.0';
										stringFormulaAlt += mapOutputCoverageAlt[fe.value.toUpperCase()+'_ALT'] ? mapOutputCoverageAlt[fe.value.toUpperCase()+'_ALT'] : '0.0';  
									}else{
										stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "formulafund"){
									var tempStringFormula = setStringFormulaForFormulaSaverByFormulaElementTypeIsFormulaFund(fe, stringFormula, stringFormulaAlt, paramMap,
										tmpFormula, ITEM, null, null, mapOutputFundAltLimited, mapOutputFundAltWhole, true);
									stringFormula = tempStringFormula.stringFormula;
									stringFormulaAlt = tempStringFormula.stringFormulaAlt;
								}else if(fe.type.toLowerCase().trim() === "string"){
								  stringFormula += "\'"+fe.value+"\'";
								  stringFormulaAlt += "\'"+fe.value+"\'";
								}else{
								  stringFormula += fe.value;
								  stringFormulaAlt += fe.value;
								}
							}
							
							if(isValidExpression(stringFormula)){

								var tempStringFormula = processPowAndMinusNegativeOnFormula(stringFormula, stringFormulaAlt);

								  result = getResultExpression(tempStringFormula.stringFormula);
								  resultAlternativeAsumtion = getResultExpression(tempStringFormula.stringFormulaAlt);

								  result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isPIA, paramMap, result);
								
								tempResult = applyRoundingToSomeCasesAll(tmpFormula, result, resultAlternativeAsumtion);
								result = tempResult.result;
								resultAlternativeAsumtion = tempResult.resultAlternativeAsumtion;
								
								  if(mapOutputCoverage[tmpFormula.output] && tmpFormula.output === 'COVTERM_PPAYOR01'){
									  result = 0;
								  }

								if(tmpFormula.output == 'TOPUPDEDUCTIONLOW01' || tmpFormula.output == 'TOPUPDEDUCTIONMED01' || tmpFormula.output == 'TOPUPDEDUCTIONHIGH01'){
									  paramMap[tmpFormula.output+'CLIENT'] = result;
									  paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
								  }

								  if(tmpFormula.output == 'TOPUPDEDUCTIONLOW02' || tmpFormula.output == 'TOPUPDEDUCTIONMED02' || tmpFormula.output == 'TOPUPDEDUCTIONHIGH02'){
									  paramMap[tmpFormula.output+'CLIENT'] = result;
									  paramMap[tmpFormula.output+'ALT'] = resultAlternativeAsumtion;
								  }

								  setParamMapByResultAndResultAltBasedOnFormulaTypeCd(formula, tmpFormula, paramMap, result, resultAlternativeAsumtion);

								if(tmpFormula.output == 'CVTOPUPLOWTEMP' || tmpFormula.output == 'CVTOPUPMEDTEMP' || tmpFormula.output == 'CVTOPUPHIGHTEMP'){
									var hasil = result.toFixed();
									var hasilAlt = resultAlternativeAsumtion.toFixed();

									result = hasil;
									resultAlternativeAsumtion = hasilAlt;
								}

								parseToLogFile(paramMap, ITEM, tmpFormula, stringFormulaOri, stringFormula, stringFormulaAlt, 
										'in function getResultFormulaCVPPHAlternatif SAVER', result, resultAlternativeAsumtion, formula, 'pphAlt');								
									
								if(tmpFormula.output){
									if('COVERAGE' === tmpFormula.itemType.toUpperCase()){
										//CLIENT_PLANNING
										value = mapOutputCoverage[tmpFormula.output];
									   if(value){
											if("ADMINCHARGE" === mapOutputCoverage[tmpFormula.output]){
											  mapOutputCoverage[tmpFormula.output] = value;
											}else{
											  value = (value + result) ;
											  mapOutputCoverage[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverage[tmpFormula.output] = result;
										}

										if("TOTALPREMIUMWITHACCPREMIUM" === tmpFormula.output){
											  mapOutputFundAltLimited[tmpFormula.output] = result;
										}

										//ALTERNATIVE
										value = mapOutputCoverageAlt[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverageAlt[tmpFormula.output]){
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}else{
											  value = (value + resultAlternativeAsumtion) ;
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
										}

										if(tmpFormula.output == 'PREMIUMACCUMULATION'){
											mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;	
										}

										  //SET NEW KEY PDPREMI IF FORMULATYPE = 'RIDERPREMIUM' / BIAYA ASURANSI PERTAHUN
										if('RIDERPREMIUM' == formula.formulaTypeCd && tmpFormula.output == 'TOTALRIDERPREMIUM'){
											if(map["PREVIOUSRIDERCODE"] == itemSelected.code && map["PREVIOUSCUSTOMERKEY"] == itemSelected.tertanggungKey){
												map["PDPREMI"] = map["PDPREMI"] + result;
											}
											else{
												map["PDPREMI"] = result;
											}
											map["PREVIOUSRIDERCODE"] = itemSelected.code;
											map["PREVIOUSCUSTOMERKEY"] = itemSelected.tertanggungKey;
											mapResultFormula.riderPremium = result;	
										}

										//CHARGE / BIAYA ANGSURAN BULANAN
										if('CHARGERIDER' == formula.formulaTypeCd || 'CHARGEINSURANCE' == formula.formulaTypeCd){
											  mapResultFormula[formula.formulaTypeCd] = (result/12);
										}
									}else if('FUND' === tmpFormula.itemType.toUpperCase()){
										var itemCd = ITEM.code;

										value = mapOutputCoverage[formula.formulaTypeCd];
										if(value){
											value = (value + result) ;
											mapOutputCoverage[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverage[formula.formulaTypeCd] = result;
										}

										value = mapOutputCoverageAlt[formula.formulaTypeCd];
										if(value){
											value = (value + resultAlternativeAsumtion) ;
											mapOutputCoverageAlt[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverageAlt[formula.formulaTypeCd] = resultAlternativeAsumtion;
										}

										//CLIENT PLANNING
										if(mapOutputFundAltLimited[itemCd] == undefined){
											mapOutputFundAltLimited[itemCd] =  {};
										}									
										mapOutputFundAltLimited[itemCd][tmpFormula.output] = result;
										
										//ALTERNATIVE
										if(mapOutputFundAltWhole[itemCd] == undefined){
											mapOutputFundAltWhole[itemCd] =  {};
										}
										mapOutputFundAltWhole[itemCd][tmpFormula.output] = resultAlternativeAsumtion;
										
										  if(paramMap.year == '20'){
											  if("OFF_TOTALPRUBOOSTERLOW" === tmpFormula.output || "OFF_TOTALPRUBOOSTERMED" === tmpFormula.output || "OFF_TOTALPRUBOOSTERHIGH" === tmpFormula.output){
												paramMap[tmpFormula.output] = result;
											}	
										  }

									}
								}
							}
						}
						checkingIfButtonHitung(buttonType, tmpFormula, formula, mapResultFormula, mapOutputCoverage, result, mapOutputFundAltLimited, mapOutputFundAltWhole, false, true);

						  mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
						  mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;

						  // disini buat keperluar as charges
						  mapResultFormula['MAPOUTPUTFUNDALT_LIMITED'] = mapOutputFundAltLimited;
						  mapResultFormula['MAPOUTPUTFUNDALT_WHOLE'] = mapOutputFundAltWhole;
					}
				}
			}

			//EMPTY
			var tempMapFormulaListEmpty = ITEM.FORMULA_EMPTY;
			if(tempMapFormulaListEmpty != undefined){
				for(var j = 0; j < tempMapFormulaListEmpty.length; j++){
					  var tmpFormula = tempMapFormulaListEmpty[j];
					  var stringFormula = '';
					  var stringFormulaAlt = '';
					  var stringFormulaOri = '';
					  var result = 0;
					  var resultAlternativeAsumtion = 0;
					  var value;

					  if(tmpFormula.itemType.toLowerCase() == 'fund' && tmpFormula.itemGroupProductCd.indexOf(map.mainCoverage) == -1){
						  continue;
					  }

					var formula = rootScope.FORMULA[tmpFormula.formulaCd];
					if(formula){
							var isProcess = false;
						  if(ITEM.flagDB == true && (formula.formulaTypeCd.indexOf('TOTALCVDB') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') !== -1 || formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') !== -1)){
							  isProcess = true;
						  }else if(ITEM.flagDB == false && (formula.formulaTypeCd.indexOf('TOTALCVDB') === -1 && formula.formulaTypeCd.indexOf('TOTALCVLOWDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVMEDDISPLAY') === -1 && formula.formulaTypeCd.indexOf('TOTALCVHIGHDISPLAY') === -1)){
							  isProcess = true;
						}else if(itemSelected.type === 'COVERAGE'){
							  isProcess = true;
						}

						if(isProcess){
							  var tempFormulaElementList = formula.FORMULA_ELEMENT;

							for(var k = 0; k < tempFormulaElementList.length; k++){
								var fe = tempFormulaElementList[k];
								fe.value = fe.value == "''" ? '' : fe.value.trim();
								stringFormulaOri += fe.value;

								if(fe.type.toLowerCase().trim() === "coverage"
									|| fe.type.toLowerCase().trim() === "customer"
									|| fe.type.toLowerCase().trim() === "rate"
									|| fe.type.toLowerCase().trim() === "fund"
									|| fe.type.toLowerCase().trim() === "product"
									|| fe.type.toLowerCase().trim() === "allocation"
									|| fe.type.toLowerCase().trim() === "predefined"){

									if(fe.value.toUpperCase() === 'CUSTINCOME'){
										  stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'PDPLAN'){
										  stringFormula += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
										  stringFormulaAlt += map[fe.value] ? "\'" + map[fe.value] +"\'" : '0.0';
									}else if(fe.value.toUpperCase() === 'PDALLO'){
										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}else if(fe.value.toUpperCase() === 'YEAR'){
										  stringFormula += paramMap.year;
										  stringFormulaAlt += paramMap.year;
									}else if(fe.value.toUpperCase() === 'RTSARANNUITY'){
										var factor = getFactorFromAnuityByMonth(map['CUSTAGEMONTH'], ITEM.ANNUITY);
										  stringFormula += factor;
										  stringFormulaAlt += factor;
									}else if(ITEM.flagDB == true && fe.value.indexOf('TOTALCV') !== -1){
										  stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}else if(fe.value.toUpperCase() === 'MAXLVPREMI'){
										stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'CURRSVROPT'){
										stringFormula += "\'" + map.mapXLimit[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map.mapXWhole[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'MAXSVROPT'){
										stringFormula += "\'" + map.mapXLimit[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map.mapXWhole[fe.value] +"\'";
									}
									else if(fe.value.toUpperCase() === 'ALLOVALUE' && isPAA2){
										//for PAA2
										stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';

										  PDALLO = map[fe.value] ? map[fe.value]: '0.0';
									}else if(fe.value.toUpperCase() == 'TOTALCVPREMILOW'){
										 stringFormula += paramMap['TOTALCVPREMILOW'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVPREMILOWALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPLOW'){
										stringFormula += paramMap['TOTALCVTOPUPLOW'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPLOWALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALLBAVLOWRATE'){										
										stringFormula += paramMap['TOTALLBAVLOWRATE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALLBAVLOWRATE'+paramMap.year];										
									}else if(fe.value.toUpperCase() == 'TOTALCVLOWSURRVALUE'){
										stringFormula += paramMap['TOTALCVLOWSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVLOWSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPLOWSURRVALUE'){
										stringFormula += paramMap['TOTALCVTOPUPLOWSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPLOWSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVPREMIMED'){
										 stringFormula += paramMap['TOTALCVPREMIMED'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVPREMIMEDALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPMED'){
										stringFormula += paramMap['TOTALCVTOPUPMED'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPMEDALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALLBAVMEDRATE'){										
										stringFormula += paramMap['TOTALLBAVMEDRATE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALLBAVMEDRATE'+paramMap.year];										
									}else if(fe.value.toUpperCase() == 'TOTALCVMEDSURRVALUE'){
										stringFormula += paramMap['TOTALCVMEDSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVMEDSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPMEDSURRVALUE'){
										stringFormula += paramMap['TOTALCVTOPUPMEDSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPMEDSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVPREMIHIGH'){
										 stringFormula += paramMap['TOTALCVPREMIHIGH'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVPREMIHIGHALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPHIGH'){
										stringFormula += paramMap['TOTALCVTOPUPHIGH'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPHIGHALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALLBAVHIGHRATE'){										
										stringFormula += paramMap['TOTALLBAVHIGHRATE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALLBAVHIGHRATE'+paramMap.year];										
									}else if(fe.value.toUpperCase() == 'TOTALCVHIGHSURRVALUE'){
										stringFormula += paramMap['TOTALCVHIGHSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVHIGHSURRVALUEALT'+paramMap.year];
									}else if(fe.value.toUpperCase() == 'TOTALCVTOPUPHIGHSURRVALUE'){
										stringFormula += paramMap['TOTALCVTOPUPHIGHSURRVALUE'+paramMap.year];
										stringFormulaAlt += paramMap['TOTALCVTOPUPHIGHSURRVALUEALT'+paramMap.year];	
									}else{
										  stringFormula += map[fe.value] ? map[fe.value] : '0.0';
										  stringFormulaAlt += map[fe.value] ? map[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "load"){
								  stringFormula += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								  stringFormulaAlt += itemSelected.loadMap[fe.value] ? itemSelected.loadMap[fe.value] : '0.0';
								}else if(fe.type.toLowerCase().trim() === "formula"){
									if(fe.value.toUpperCase() === 'MAXLVPREMI'){
										stringFormula += "\'" + map[fe.value] +"\'";
										  stringFormulaAlt += "\'" + map[fe.value] +"\'";
									}else if(fe.value.toUpperCase() === 'DIFFLVPREMI'){
										stringFormula += "" + DIFFLVPREMI +"";
										  stringFormulaAlt += "" + DIFFLVPREMI +"";						        	
									}else{
										stringFormula += mapOutputCoverage[fe.value] ? mapOutputCoverage[fe.value] : '0.0';
										  stringFormulaAlt += mapOutputCoverageAlt[fe.value] ? mapOutputCoverageAlt[fe.value] : '0.0';
									}

								}else if(fe.type.toLowerCase().trim() === "formulafund"){
								  if(fe.value.toUpperCase() == 'CVTOTALLOWLASTYEARSTD' && paramMap.year > 1){
									  stringFormula += paramMap[fe.value.toUpperCase()+'_CLIENT'+(paramMap.year-1)];
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()+'_ALT'+(paramMap.year-1)];
								  }else if((fe.value.toUpperCase() == 'CVTOTALLOWLASTYEAR' || fe.value.toUpperCase() == 'CVTOTALMEDLASTYEAR' || fe.value.toUpperCase() == 'CVTOTALHIGHLASTYEAR'
										|| fe.value.toUpperCase() == 'TOTALSURRVALUELOWLASTYEAR' || fe.value.toUpperCase() == 'TOTALSURRVALUEMEDLASTYEAR' || fe.value.toUpperCase() == 'TOTALSURRVALUEHIGHLASTYEAR')
										&& paramMap.year > 1){
									  stringFormula += paramMap[fe.value.toUpperCase()+'_CLIENT'+(paramMap.year-1)];
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()+'_ALT'+(paramMap.year-1)];
								  }else if(fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICLOWLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICMEDLASTYEAR'
										|| fe.value.toUpperCase() == 'OFF_WITHDRAWALBASICHIGHLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERLOWLASTYEAR'
										|| fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERMEDLASTYEAR' || fe.value.toUpperCase() == 'OFF_WITHDRAWALSAVERHIGHLASTYEAR'){
									  stringFormula += paramMap[fe.value.toUpperCase()+'_CLIENT'+(paramMap.year-1)];
									  stringFormulaAlt += paramMap[fe.value.toUpperCase()+'_ALT'+(paramMap.year-1)];
								  }else{
								  	  stringFormula += getValueFund(ITEM.code, fe.value, mapOutputFundAltLimited);
									  stringFormulaAlt += getValueFund(ITEM.code, fe.value, mapOutputFundAltWhole);	
								  }						          							          	
									  								          			
								  
								}else if(fe.type.toLowerCase().trim() === "string"){
								  stringFormula += "\'"+fe.value+"\'";
								  stringFormulaAlt += "\'"+fe.value+"\'";
								}else{
								  stringFormula += fe.value;
								  stringFormulaAlt += fe.value;
								}
							}

							if(isValidExpression(stringFormula)){

								var tempStringFormula = processPowAndMinusNegativeOnFormula(stringFormula, stringFormulaAlt);

								  result = getResultExpression(tempStringFormula.stringFormula);
								  resultAlternativeAsumtion = getResultExpression(tempStringFormula.stringFormulaAlt);

								  result = setResultToZeroBySomeCases(flag, tmpFormula, formula, isPIA, paramMap, result);

								tempResult = applyRoundingToSomeCasesAll(tmpFormula, result, resultAlternativeAsumtion);
								result = tempResult.result;
								resultAlternativeAsumtion = tempResult.resultAlternativeAsumtion;
								
								  if(mapOutputCoverage[tmpFormula.output] && tmpFormula.output === 'COVTERM_PPAYOR01'){
									  result = 0;
								  }

								setParamMapByResultAndResultAltBasedOnFormulaTypeCd(formula, tmpFormula, paramMap, result, resultAlternativeAsumtion);
								
								if(tmpFormula.formulaCd == 'FRMLLOWSURRVALUE01'){
									if(paramMap.year > 1 && paramMap['FRMLLOWSURRVALUE01_ALT'+(paramMap.year-1)] == -1){
										resultAlternativeAsumtion = -1;
									}
									if(paramMap['FRMLLOWSURRVALUE01_ALT'+paramMap.year] != undefined || paramMap['FRMLLOWSURRVALUE01_ALT'+paramMap.year] != -1){
										paramMap['FRMLLOWSURRVALUE01_ALT'+paramMap.year] = resultAlternativeAsumtion;
									}
								}							
								else if(tmpFormula.formulaCd == 'FRMLMEDSURRVALUE01'){
									if(paramMap.year > 1 && paramMap['FRMLMEDSURRVALUE01_ALT'+(paramMap.year-1)] == -1){
										resultAlternativeAsumtion = -1;
									}
									if(paramMap['FRMLMEDSURRVALUE01_ALT'+paramMap.year] != undefined || paramMap['FRMLMEDSURRVALUE01_ALT'+paramMap.year] != -1){
										paramMap['FRMLMEDSURRVALUE01_ALT'+paramMap.year] = resultAlternativeAsumtion;
									}
								}									
								else if(tmpFormula.formulaCd == 'FRMLHIGHSURRVALUE01'){
									if(paramMap.year > 1 && paramMap['FRMLHIGHSURRVALUE01_ALT'+(paramMap.year-1)] == -1){
										resultAlternativeAsumtion = -1;
									}
									if(paramMap['FRMLHIGHSURRVALUE01_ALT'+paramMap.year] != undefined || paramMap['FRMLHIGHSURRVALUE01_ALT'+paramMap.year] != -1){
										paramMap['FRMLHIGHSURRVALUE01_ALT'+paramMap.year] = resultAlternativeAsumtion;
									}
								}
								
								if(formula.formulaTypeCd == 'CVTOTALLOWLASTYEARSTD'){
									paramMap[formula.formulaTypeCd+'_CLIENT'+paramMap.year] = (paramMap[formula.formulaTypeCd+'_CLIENT'+paramMap.year]==undefined?0:result);
									paramMap[formula.formulaTypeCd+'_ALT'+paramMap.year] = (paramMap[formula.formulaTypeCd+'_ALT'+paramMap.year]==undefined?0:resultAlternativeAsumtion);
								}

								parseToLogFile(paramMap, ITEM, tmpFormula, stringFormulaOri, stringFormula, stringFormulaAlt, 
										'in function getResultFormulaCVPPHAlternatif EMPTY', result, resultAlternativeAsumtion, formula, 'pphAlt');							
									
								if(tmpFormula.output){
									if('COVERAGE' === tmpFormula.itemType.toUpperCase()){
										//CLIENT_PLANNING
										value = mapOutputCoverage[tmpFormula.output];
									   if(value){
											if("ADMINCHARGE" === mapOutputCoverage[tmpFormula.output]){
											  mapOutputCoverage[tmpFormula.output] = value;
											}else{
											  value = (value + result) ;
											  mapOutputCoverage[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverage[tmpFormula.output] = result;
										}

										if("TOTALPREMIUMWITHACCPREMIUM" === tmpFormula.output){
											  mapOutputFundAltLimited[tmpFormula.output] = result;
										}

										//ALTERNATIVE
										value = mapOutputCoverageAlt[tmpFormula.output];
										if(value){
											if("ADMINCHARGE" === mapOutputCoverageAlt[tmpFormula.output]){
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}else{
											  value = (value + resultAlternativeAsumtion) ;
											  mapOutputCoverageAlt[tmpFormula.output] = value;
											}
										}else{
											mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;
										}

										if(tmpFormula.output == 'PREMIUMACCUMULATION'){
											mapOutputCoverageAlt[tmpFormula.output] = resultAlternativeAsumtion;	
										}

										  //SET NEW KEY PDPREMI IF FORMULATYPE = 'RIDERPREMIUM' / BIAYA ASURANSI PERTAHUN
										if('RIDERPREMIUM' == formula.formulaTypeCd && tmpFormula.output == 'TOTALRIDERPREMIUM'){
											if(map["PREVIOUSRIDERCODE"] == itemSelected.code && map["PREVIOUSCUSTOMERKEY"] == itemSelected.tertanggungKey){
												map["PDPREMI"] = map["PDPREMI"] + result;
											}
											else{
												map["PDPREMI"] = result;
											}
											map["PREVIOUSRIDERCODE"] = itemSelected.code;
											map["PREVIOUSCUSTOMERKEY"] = itemSelected.tertanggungKey;
											mapResultFormula.riderPremium = result;	
										}

										//CHARGE / BIAYA ANGSURAN BULANAN
										if('CHARGERIDER' == formula.formulaTypeCd || 'CHARGEINSURANCE' == formula.formulaTypeCd){
											  mapResultFormula[formula.formulaTypeCd] = (result/12);
										}

										setParamMapByFormulaOutputAndFormulaTypeCd(tmpFormula, formula, paramMap, result, resultAlternativeAsumtion);
									}else if('FUND' === tmpFormula.itemType.toUpperCase()){
										var itemCd = ITEM.code;

										value = mapOutputCoverage[formula.formulaTypeCd];
										if(value && formula.formulaTypeCd != 'FT_CVWITHDRAWAL'){
											value = (value + result) ;
											mapOutputCoverage[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverage[formula.formulaTypeCd] = result;
										}

										if(formula.formulaTypeCd == 'TOTALCVLOWFUNDDSPLY' || formula.formulaTypeCd == 'TOTALCVMEDFUNDDSPLY' || formula.formulaTypeCd == 'TOTALCVHIGHFUNDDSPLY' || formula.formulaTypeCd == 'FT_SURRENDERLOWVALUE' || formula.formulaTypeCd == 'FT_SURRENDERMEDVALUE' || formula.formulaTypeCd == 'FT_SURRENDERHIGHVALU' || formula.formulaTypeCd == 'TOTALCVDBLOWDISPLAY' || formula.formulaTypeCd == 'TOTALCVDBMEDDISPLAY' || formula.formulaTypeCd == 'TOTALCVDBHIGHDISPLAY'){
											mapOutputCoverage[formula.formulaTypeCd] = result;	
										}

										value = mapOutputCoverageAlt[formula.formulaTypeCd];
										if(value && formula.formulaTypeCd != 'FT_CVWITHDRAWAL'){
											value = (value + resultAlternativeAsumtion) ;
											mapOutputCoverageAlt[formula.formulaTypeCd] = value;
										}else{
											mapOutputCoverageAlt[formula.formulaTypeCd] = resultAlternativeAsumtion;
										}

										if(formula.formulaTypeCd == 'TOTALCVLOWFUNDDSPLY' || formula.formulaTypeCd == 'TOTALCVMEDFUNDDSPLY' || formula.formulaTypeCd == 'TOTALCVHIGHFUNDDSPLY' || formula.formulaTypeCd == 'FT_SURRENDERLOWVALUE' || formula.formulaTypeCd == 'FT_SURRENDERMEDVALUE' || formula.formulaTypeCd == 'FT_SURRENDERHIGHVALU' || formula.formulaTypeCd == 'TOTALCVDBLOWDISPLAY' || formula.formulaTypeCd == 'TOTALCVDBMEDDISPLAY' || formula.formulaTypeCd == 'TOTALCVDBHIGHDISPLAY'){
											mapOutputCoverageAlt[formula.formulaTypeCd] = resultAlternativeAsumtion;	
										}

										//CLIENT PLANNING
										if(mapOutputFundAltLimited[itemCd] == undefined){
											mapOutputFundAltLimited[itemCd] =  {};
										}									
										mapOutputFundAltLimited[itemCd][tmpFormula.output] = result;
										
										//ALTERNATIVE
										if(mapOutputFundAltWhole[itemCd] == undefined){
											mapOutputFundAltWhole[itemCd] =  {};
										}
										mapOutputFundAltWhole[itemCd][tmpFormula.output] = resultAlternativeAsumtion;

										//ASUMSTION FUND
										if(tmpFormula.output == 'CVTOTALHIGHDISPLAY' || tmpFormula.output == 'CVTOTALMEDDISPLAY' || tmpFormula.output == 'CVTOTALLOWDISPLAY' || tmpFormula.output == 'TOTALSURRVALUELOWDISPLAY' || tmpFormula.output == 'TOTALSURRVALUEMEDDISPLAY' || tmpFormula.output == 'TOTALSURRVALUEHIGHDISPLAY'){
											  mapResultPerYear[tmpFormula.output] = result;
											mapResultPerYear['ALT'+tmpFormula.output] = resultAlternativeAsumtion;
										  }

										  if(paramMap.year == '20'){
											  if("OFF_TOTALPRUBOOSTERLOW" === tmpFormula.output || "OFF_TOTALPRUBOOSTERMED" === tmpFormula.output || "OFF_TOTALPRUBOOSTERHIGH" === tmpFormula.output){
												paramMap[tmpFormula.output] = result;
											}	
										  }
										
										if(tmpFormula.formulaCd == 'FRML_WITHDRAWALSAVERLOWLASTYEAR' || tmpFormula.formulaCd == 'FRML_WITHDRAWALSAVERMEDLASTYEAR'
												|| tmpFormula.formulaCd == 'FRML_WITHDRAWALSAVERHIGHLASTYEAR' || tmpFormula.formulaCd == 'FRML_WITHDRAWALBASICLOWLASTYEAR'
												|| tmpFormula.formulaCd == 'FRML_WITHDRAWALBASICMEDLASTYEAR' || tmpFormula.formulaCd == 'FRML_WITHDRAWALBASICHIGHLASTYEAR'){
											paramMap[tmpFormula.output+'_CLIENT'+paramMap.year] = result;
											paramMap[tmpFormula.output+'_ALT'+paramMap.year] = resultAlternativeAsumtion;
										}
									}
								}
							}
						}
						checkingIfButtonHitung(buttonType, tmpFormula, formula, mapResultFormula, mapOutputCoverage, result, mapOutputFundAltLimited, mapOutputFundAltWhole, false, true);

						  mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
						  mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;

						  // disini buat keperluar as charges
						  mapResultFormula['MAPOUTPUTFUNDALT_LIMITED'] = mapOutputFundAltLimited;
						  mapResultFormula['MAPOUTPUTFUNDALT_WHOLE'] = mapOutputFundAltWhole;
					}
				}
			}	

			mapResultFormula['MAPOUTPUTCOVERAGE'] = mapOutputCoverage;
			mapResultFormula['MAPOUTPUTCOVERAGEALT'] = mapOutputCoverageAlt;
			mapResultFormula['MAPOUTPUTFUNDALT_LIMITED'] = mapOutputFundAltLimited;
			mapResultFormula['MAPOUTPUTFUNDALT_WHOLE'] = mapOutputFundAltWhole;

			mapResultFormula['MAPOUTPUTFUNDPERTAHUN'] = mapResultPerYear;
			return mapResultFormula;
		}

		function processIlustrationClient(ageCustomer, param, year, mapOutputFund, mapOutputFundAlt, mapFundNLG, mapFundNLGAlt, mapOutput, mapOutputFundList, type, DIFFLVPREMI,mapOutputMainPAA){
			var response = {};
			tmpCurr = param.currCd;
			var bufferArr = [];
			var pdAlloArr = [];
			param['TOTALCVPREMILOWLASTYEAR'] = 0;

			 while(ageCustomer <= param.alternatifRencanaPembayaran){
				 param.year = year;
				 param.age = ageCustomer;

				 //proses hitung untuk cash value
				 var result;

				result = preparedParameterClient('proses', param, mapOutputFund, mapOutputFundAlt, type, DIFFLVPREMI, bufferArr, pdAlloArr);

				 //UNTUK STOP PERHITUNGAN JIKA SISA PREMI TIDAK MENCUKUPI UNTUK WITHDRAWAL(sesuai rumus dibawah)
				 //BLOK JIKA SISA (PREMI - WITHDRAWAL) < (1000000/250)
				 for(var d = 0; d < param.withdrawalList.length; d++){
					 var tmpWithdrawal = param.withdrawalList[d];
					 if(tmpWithdrawal.year == year){
						 var tmpValue;
						 if(param.currCd == 'IDR'){
							 if(param.prodCd == 'U1Z'){
								 tmpValue = 1000000;
							 }else if(param.prodCd == 'U1S'){
								 tmpValue = 3000000;
							 }else if(param.prodCd == 'U1Z-HEBAT'){
								 tmpValue = 1000000;
							 }else if(param.prodCd == 'U1S-HEBAT'){
								 tmpValue = 3000000;
							 }else if(param.prodCd == 'U1L'){
								 tmpValue = 12000000;
							 }else if(param.prodCd == 'U2L'){
								tmpValue = 12000000;
							}else if(param.prodCd == 'U1M'){
								 tmpValue = 12000000;
							 }
						 }else if(param.currCd == 'USD'){
							 if(param.prodCd == 'U1Z'){
								 tmpValue = 250;
							 }else if(param.prodCd == 'U1S'){
								 tmpValue = 250;
							 }else if(param.prodCd == 'U1Z-HEBAT'){
								 tmpValue = 250;
							 }else if(param.prodCd == 'U1S-HEBAT'){
								 tmpValue = 250;
							 }else if(param.prodCd == 'U1L'){
								 tmpValue = 1500;
							 }else if(param.prodCd == 'U2L'){
								tmpValue = 1500;
							}else if(param.prodCd == 'U1M'){
								 tmpValue = 1500;
							 }
						 }

						 if(result.MAPCOV2.TOTALCVLOWDISPLAY < tmpValue){
							 response.status = '2';
							response.content = null;
							response.productCode = param.prodCd;
							response.currCd = param.currCd;
							response.minValue = tmpValue;
							 return response;
						 }
						 break;
					 }
				 }

				 //JIKA TERJADI ERROR DALAM PROSES PERHITUNGNGAN
				 if(param.prodCd != 'U2L'){
				 if(result.MAPCOVALT2.TOTALCVLOWDISPLAY < 0 && year <= 20){
					 response.status = '1';
					response.content = null;
					 return response;
				 }
				 
				 if(result.rule != undefined && result.rule.length > 0){
				 	result.status = '1';
				 	result.content = null;
				 	return result;
				 }
				}
				 mapOutputFund = result.MAPOUTPUTFUND;
				 mapOutputFundAlt = result.MAPOUTPUTFUNDALT;
				var mapFundNLG = result.MAPCOV2;
				var mapFundNLGAlt = result.MAPCOVALT2;
				 var mapOutput = result.MAPOUTPUTFUNDPERTAHUN; 
				 
				 mapOutputMainPAA[year] = {year : year, ageCustomer : ageCustomer, mapOutput : mapOutput, mapFundNLG : mapFundNLG, mapFundNLGAlt : mapFundNLGAlt, mapChargeRider : result.CHARGERIDER};
				 year++;
				 ageCustomer++;
			 }

		}

		function preparedParameterClient(type, param, mapOutputFund, mapOutputFundAlt, flagProcess, DIFFLVPREMI, bufferArr, pdAlloArr){
			var mapResult = {};
			var mapProperties = {};

			//CLIENT_PLANNING
			var mapOutputCoverage = {};
			var mapOutputCoveragePrecalculated = {};

			//COVERAGE_GROUP
			var coverageList = [];
			var coverageGroupList = [];
			var tmpCoverageGroupList = [];

			var xTerm;

			var manfaatListCodeSelected = [];

			var manfaatList = [];
			var totalLowRate = 0, totalMedRate = 0, totalHighRate = 0;

			manfaatList = param.ManfaatListCVCalc;

			var newManfaatList = [];

			var tempFundCode = {}
			var newFundList = [];
			var tempData;
			for(var x = 0; x < manfaatList.length; x++){
				var data = manfaatList[x];
				if(data.isPPH == 'M'){
					tempData = data;
					continue;
				}
				newManfaatList.push(data);
				//Artha : get unique funds 
				if(data.type == 'FUND'){
					if(!(data.code in tempFundCode)){
						tempFundCode[data.code] = 1;
						newFundList.push(data);
					}
				}
			}

			for(var i = 0;i < newFundList.length; i++){
				var _fund = newFundList[i];
				var _fundDetail = rootScope.FUND[_fund.code];
				var _fundAlloc = _fund.itemInput[0].inputValue;
				totalLowRate += (_fundDetail.lowRate*_fundAlloc)/10000;
				totalMedRate += (_fundDetail.mediumRate*_fundAlloc)/10000;
				totalHighRate += (_fundDetail.highRate*_fundAlloc)/10000;
			}

			setMapPropertiesOnPreparedParameter(mapProperties, param);

			predefinedCalculation(tempData, newManfaatList, mapProperties, param, mapOutputCoveragePrecalculated, i, false, flagProcess);

			processOnPreparedParameter(newManfaatList, mapProperties, manfaatListCodeSelected, param, flagProcess,
				mapResult, mapOutputFund, mapOutputFundAlt, type, tmpCoverageGroupList, coverageList, mapOutputCoverage,
				totalLowRate, totalMedRate, totalHighRate, null, null, DIFFLVPREMI, bufferArr, pdAlloArr);
				
			if(type === 'proses'){ //awalnya hitung
				//GET RULE VALIDATION COVERAGE_GROUP
				mapResult.rule = getRuleValidationFundAvailable(param.mainCoverage, mapOutputCoverage, coverageList, mymanfaatlist);
			}

			if(type != 'proses'){
				mapResult.manfaatList = manfaatListCodeSelected;
			}

			param.RULEFORFUND = mapResult.rule;

			if(mapResult.isGio != undefined){
				param.GIOCODE = mapResult.isGio;	
			}
			
			return mapResult;
		}

		function preparedParameterALT(type, param, paramMapOutputFundAltLimited, paramMapOutputFundAltWhole, flagProcess, DIFFLVPREMI, bufferArr, pdAlloArr){
			var divlevTemp = '0.0';

			var mapXLimit = {};
			var mapXWhole = {};
			var mapResult = {};
			var mapProperties = {};

			//CLIENT_PLANNING
			var mapOutputCoverage = {};
			var mapOutputFund = paramMapOutputFundAltLimited;//paramMapOutputFund;
			var mapOutputCoveragePrecalculated = {};
			var mapOutputFundAltLimited = paramMapOutputFundAltLimited;

			//ALTERNATIVE
			var mapOutputFundAlt = paramMapOutputFundAltWhole;//paramMapOutputFundAlt;
			var mapOutputFundAltWhole = paramMapOutputFundAltWhole;

			//COVERAGE_GROUP
			var coverageList = [];
			var coverageGroupList = [];
			var tmpCoverageGroupList = [];



			var xTerm;


			var manfaatListCodeSelected = [];

			var manfaatList = [];
			var totalLowRate = 0, totalMedRate = 0, totalHighRate = 0;

			//jika button hitung diklik proses perhitungan sesuai dengan manfaat" yg telah dipilih
			//jika proses ilustrasi diklik proses perhitungan sesuai dengan manfaat" dan fund yg telah dipilih
			manfaatList = param.ManfaatListCVCalc;

			var newManfaatList = [];

			var tempFundCode = {}
			var newFundList = [];
			var tempData;
			for(var x = 0; x < manfaatList.length; x++){
				var data = manfaatList[x];
				if(data.isPPH == 'O'){
					tempData = data;
					continue;
				}

				//Artha : get unique funds 
				if(data.type == 'FUND'){
					if(!(data.code in tempFundCode)){
						tempFundCode[data.code] = 1;
						newFundList.push(data);
					}
				}
				newManfaatList.push(data);
			}

			for(var i = 0;i < newFundList.length; i++){
				var _fund = newFundList[i];
				var _fundDetail = rootScope.FUND[_fund.code];
				var _fundAlloc = _fund.itemInput[0].inputValue;
				totalLowRate += (_fundDetail.lowRate*_fundAlloc)/10000;
				totalMedRate += (_fundDetail.mediumRate*_fundAlloc)/10000;
				totalHighRate += (_fundDetail.highRate*_fundAlloc)/10000;
			}

			setMapPropertiesOnPreparedParameter(mapProperties, param);
			
			predefinedCalculation(tempData, newManfaatList, mapProperties, param, mapOutputCoveragePrecalculated, i, true, flagProcess);
				
			//disamain kyk client ga ada ini
			//mapProperties = {};
			//setMapPropertiesOnPreparedParameter(mapProperties, param);
				
			processOnPreparedParameter(newManfaatList, mapProperties, manfaatListCodeSelected, param, flagProcess,
				mapResult, mapOutputFund, mapOutputFundAlt, type, tmpCoverageGroupList, coverageList, mapOutputCoverage,
				totalLowRate, totalMedRate, totalHighRate, mapXLimit, mapXWhole, DIFFLVPREMI, bufferArr, pdAlloArr);

			if(type === 'hitung'){
				//GENERATE MAP COVERAGE -> COVERAGE_GROUP
				coverageGroupList = generateCoverageGroup(tmpCoverageGroupList);

				//GET RULE VALIDATION COVERAGE_GROUP
				mapResult.rule = getRuleValidation(param.mainCoverage, mapOutputCoverage, coverageList.concat(coverageGroupList), mymanfaatlist, param.process, param.manfaatListObsolete);
			}

			if(type != 'proses'){
				mapResult.manfaatList = manfaatListCodeSelected;
			}

			return mapResult;
		}

		function getMaxLvlPremiPPH(param, mapProperties, ITEM, itemSelected){
			//FROM RATE
			var tempListRateCd = ITEM.CHANNEL[param.channelCode];
			setMapCustAgeWhenNotAdditionalLife(mapProperties, itemSelected);
			ITEM.keyTertanggungAge = 'CUSTAGE'+'0'+(itemSelected.tertanggungKey-1);
			inquireRateValByParameter(tempListRateCd, itemSelected, param, mapProperties, false, true);
		}

		function processIlustrationAlt(ageCustomer, param, year, mapOutputFundAltLimited, mapOutputFundAltWhole, mapFundNLG, mapFundNLGAlt, mapOutput, mapOutputFundList, type, DIFFLVPREMI, mapOutputPAAPPHALT){
			var response = {};
			tmpCurr = param.currCd;
			var bufferArr = [];
			var pdAlloArr = [];
			param['TOTALPREMIUMWITHACCPREMIUMLBDBCLIENT'] = 0;
			 param['TOTALPREMIUMWITHACCPREMIUMLBDBALT'] = 0;
			 param['TOTALSAWITHACCSACLIENT'] = 0;
			 param['TOTALSAWITHACCSAALT'] = 0;

			 while(ageCustomer <= param.alternatifRencanaPembayaran){
				 param.year = year;
				 param.age = ageCustomer;
				 
				 //proses hitung untuk cash value

				 param['TOTALCVPREMILOW'+param.year] = undefined;
				 param['TOTALCVPREMILOWALT'+param.year] = undefined;

				 param['TOTALCVPREMIMED'+param.year] = undefined;
				 param['TOTALCVPREMIMEDALT'+param.year] = undefined;

				 param['TOTALCVPREMIHIGH'+param.year] = undefined;
				 param['TOTALCVPREMIHIGHALT'+param.year] = undefined;

				 param['TOTALCVTOPUPLOW'+param.year] = undefined;
				 param['TOTALCVTOPUPLOWALT'+param.year] = undefined;

				 param['TOTALCVTOPUPMED'+param.year] = undefined;
				 param['TOTALCVTOPUPMEDALT'+param.year] = undefined;

				 param['TOTALCVTOPUPHIGH'+param.year] = undefined;
				 param['TOTALCVTOPUPHIGHALT'+param.year] = undefined;

				 param['TOTALCVTOPUPLOWLASTYEAR'+param.year] = undefined;
				 param['TOTALCVTOPUPLOWLASTYEARALT'+param.year] = undefined;

				 param['TOTALCVTOPUPMEDLASTYEAR'+param.year] = undefined;
				 param['TOTALCVTOPUPMEDLASTYEARALT'+param.year] = undefined;

				 param['TOTALCVTOPUPHIGHLASTYEAR'+param.year] = undefined;
				 param['TOTALCVTOPUPHIGHLASTYEARALT'+param.year] = undefined;

				 param['TOTALCVLOWSURRVALUE'+param.year] = undefined;
				 param['TOTALCVLOWSURRVALUEALT'+param.year] = undefined;

				 param['TOTALCVMEDSURRVALUE'+param.year] = undefined;
				 param['TOTALCVMEDSURRVALUEALT'+param.year] = undefined;

				 param['TOTALCVHIGHSURRVALUE'+param.year] = undefined;
				 param['TOTALCVHIGHSURRVALUEALT'+param.year] = undefined;

				 param['TOTALCVTOPUPLOWSURRVALUE'+param.year] = undefined;
				 param['TOTALCVTOPUPLOWSURRVALUEALT'+param.year] = undefined;

				 param['TOTALCVTOPUPMEDSURRVALUE'+param.year] = undefined;
				 param['TOTALCVTOPUPMEDSURRVALUEALT'+param.year] = undefined;

				 param['TOTALCVTOPUPHIGHSURRVALUE'+param.year] = undefined;
				 param['TOTALCVTOPUPHIGHSURRVALUEALT'+param.year] = undefined;

				 param['TOTALLBAVLOWRATE'+param.year] = undefined;
				 param['TOTALLBAVMEDRATE'+param.year] = undefined;
				 param['TOTALLBAVHIGHRATE'+param.year] = undefined;
				 
				 param['TOTALCVPREMILOWLASTYEAR'+param.year] = undefined;
				 param['TOTALCVPREMILOWLASTYEARALT'+param.year] = undefined;

				 param['TOTALCVPREMIMEDLASTYEAR'+param.year] = undefined;
				 param['TOTALCVPREMIMEDLASTYEARALT'+param.year] = undefined;

				 param['TOTALCVPREMIHIGHLASTYEAR'+param.year] = undefined;
				 param['TOTALCVPREMIHIGHLASTYEARALT'+param.year] = undefined;
				 
				 param['CVTOTALLOWLASTYEARSTD_CLIENT'+param.year] = undefined;
				 param['CVTOTALLOWLASTYEARSTD_ALT'+param.year] = undefined;
				 
				 param['CVTOTALLOWLASTYEAR_CLIENT'+param.year] = undefined;
				 param['CVTOTALLOWLASTYEAR_ALT'+param.year] = undefined;

				 param['CVTOTALMEDLASTYEAR_CLIENT'+param.year] = undefined;
				 param['CVTOTALMEDLASTYEAR_ALT'+param.year] = undefined;

				 param['CVTOTALHIGHLASTYEAR_CLIENT'+param.year] = undefined;
				 param['CVTOTALHIGHLASTYEAR_ALT'+param.year] = undefined;
				 
				 param['TOTALSURRVALUELOWLASTYEAR_CLIENT'+param.year] = undefined;
				 param['TOTALSURRVALUELOWLASTYEAR_ALT'+param.year] = undefined;

				 param['TOTALSURRVALUEMEDLASTYEAR_CLIENT'+param.year] = undefined;
				 param['TOTALSURRVALUEMEDLASTYEAR_ALT'+param.year] = undefined;

				 param['TOTALSURRVALUEHIGHLASTYEAR_CLIENT'+param.year] = undefined;
				 param['TOTALSURRVALUEHIGHLASTYEAR_ALT'+param.year] = undefined;
				 
				 var result;
				 result = preparedParameterALT('proses', param, mapOutputFundAltLimited, mapOutputFundAltWhole, type, DIFFLVPREMI, bufferArr, pdAlloArr);

				 //UNTUK STOP PERHITUNGAN JIKA SISA PREMI TIDAK MENCUKUPI UNTUK WITHDRAWAL(sesuai rumus dibawah)
				 //BLOK JIKA SISA (PREMI - WITHDRAWAL) < (1000000/250)
				 for(var d = 0; d < param.withdrawalList.length; d++){
					 var tmpWithdrawal = param.withdrawalList[d];
					 if(tmpWithdrawal.year == year){
						 var tmpValue;
						 if(param.currCd == 'IDR'){
							 if(param.prodCd == 'U1Z'){
								 tmpValue = 1000000;
							 }else if(param.prodCd == 'U1S'){
								 tmpValue = 3000000;
							 }else if(param.prodCd == 'U1Z-HEBAT'){
								 tmpValue = 1000000;
							 }else if(param.prodCd == 'U1S-HEBAT'){
								 tmpValue = 3000000;
							 }
						 }else if(param.currCd == 'USD'){
							 tmpValue = 250;
						 }
						 if(result.MAPCOV2.TOTALCVLOWDISPLAY < tmpValue){
							 response.status = '2';
							response.content = null;
							response.productCode = param.prodCd;
							response.currCd = param.currCd;
							response.minValue = tmpValue;
							 return response;
						 }
						 break;
					 }
				 }

				 mapOutputFund = result.MAPOUTPUTFUND;
				 mapOutputFundAlt = result.MAPOUTPUTFUNDALT;
				var mapFundNLG = result.MAPCOV2;
				var mapFundNLGAlt = result.MAPCOVALT2;
				 var mapOutput = result.MAPOUTPUTFUNDPERTAHUN;
				 mapOutputPAAPPHALT[year] = {year : year, ageCustomer : ageCustomer, mapOutput : mapOutput, mapFundNLG : mapFundNLG, mapFundNLGAlt : mapFundNLGAlt};
				 //keperluan ascharges
				 mapOutputFundAltLimited = result.MAPOUTPUTFUNDALT_LIMITED;
				 mapOutputFundAltWhole = result.MAPOUTPUTFUNDALT_WHOLE;

				 year++;
				 ageCustomer++;
			 }
		}

		function getRuleValidationFundAvailable(mainCoverage, mapOutputCoverage,itemList, manfaatList){
			  var ruleList = [];
			  var keyTertanggungAge;

			  itemList = itemList.filter( function(item){return (item.itemCd != undefined);} );

			  for(var i = 0; i < itemList.length; i++){
				  var itemRuleList = [];

				  itemRuleList = rootScope.COVERAGE[mainCoverage].RULE;

				  for(var j = 0; j < itemRuleList.length; j++){
					  var itemRule = itemRuleList[j];
					  var exec = false;

					  if(itemRule.mainCoverage){
						  if((itemRule.mainCoverage == '' && itemRule.itemCd == mainCoverage) || itemRule.mainCoverage.indexOf(mainCoverage) !== -1){
							  exec = true;
						  }
					  }else{
						  if(itemRule.itemCd == mainCoverage){
							  exec = true;
						  }

					  }

					  if(exec){
						  keyTertanggungAge = itemList[i].keyTertanggungAge;
						  var tmpRule = rootScope.RULE[itemRule.ruleCd+'|'+itemRule.itemCd];
						  if(tmpRule.key == 'FUNDAVAL' || tmpRule.key == 'FT_CVWITHDRAWAL'){

							  tmpRule.keyTertanggungAge = keyTertanggungAge;
							  var mapProperties = itemList[i].properties;
							  var keyValue = tmpRule.keyType.toLowerCase().trim();
							  var key = tmpRule.key;//+'0'+keyTertanggung;
							  var inputValue = 0;
							  var custKey;
							if(keyValue === "customer" || keyValue === "coverage"){
								if(key == 'CUSTAGE'){
									inputValue = mapProperties[keyTertanggungAge] ? mapProperties[keyTertanggungAge] : 0;
								}else{
									inputValue = mapProperties[key] ? mapProperties[key] : 0;
								}

							}else if(keyValue === "formula"){
								  inputValue= mapOutputCoverage[key] ? mapOutputCoverage[key] : 0;
							}else if(keyValue === "formulafund"){
								inputValue= mapOutputCoverage[key] ? mapOutputCoverage[key] : 0;
							}

							  var value2 = itemRule.type.toLowerCase() === 'logic' ? formulaRule(itemList[i].itemCd, itemRule.value, mapProperties, mapOutputCoverage) : itemRule.value;
							  var ruleValue;
							  if(itemRule.itemCd == 'H1VR'){
								  ruleValue =Math.floor(value2);
							  }else{
								  ruleValue = value2;
							  }
							  var roundFixInput = Number(inputValue).toFixed(2);
							  var inputValue2 = Math.round(roundFixInput);
							  ruleValue = Math.round(Number(ruleValue).toFixed(2));
							  var comparisson = getComparissonValue(inputValue2, tmpRule.operator, ruleValue);
							  if(comparisson == true){
								  var resultMap = {
										  ruleCd : tmpRule.code,
										  ruleTypeCd : tmpRule.ruleTypeCd,
										  key : tmpRule.key,
										  keyType : tmpRule.keyType,
										  operator : tmpRule.operator,
										  type : itemRule.type,
										  value : ruleValue,
										  errorType : itemRule.errorType,
										  errorMessageInd : itemRule.errorMessageInd,
										  errorMessageEng : itemRule.errorMessageEng,
										  sumAssured : itemList[i].properties['PDSA'],
										  comparisson : comparisson
									  };

								  ruleList.push(resultMap);
							  }
						  }
					  }
				  }
			  }
			  return ruleList;
		}

		function generateOutputPAA2ALT(param, mapOutputALT){
			 var mapOutput = mapOutputALT.mapOutputPAAPPHALT;
			 var mapOutputC = mapOutputALT.mapOutputMainPAA;
			 var newOutput = {};
			 newOutput.FUNDMAP = {};

			 var divider = 1;

			 if(param.currCd == 'USD'){
				 divider = 1;
			 }

			 var tmpLowClient;
			 var tmpLowClientSurr;
			var tmpMedClient;
			var tmpMedClientSurr;
			var tmpHighClient;
			var tmpHighClientSurr;
			var tmpLowAlt;
			var tmpLowAltSurr;
			var tmpMedAlt;
			var tmpMedAltSurr;
			var tmpHighAlt;
			var tmpHighAltSurr;

			var tmpDeathClient;
			var tmpDeathAlt;
			
			var tmpBASICPREMIUM1C;
			var tmpBASICPREMIUM2C;
			var tmpTOPUPSAVER1C;
			var tmpTOPUPSAVER2C;

			var tmpBASICPREMIUM1A;
			var tmpBASICPREMIUM2A;
			var tmpTOPUPSAVER1A;
			var tmpTOPUPSAVER2A;

			 for(var year in mapOutput){
				 var mapItemCd = mapOutput[year];
				 var mapItemCdC = mapOutputC[year];
				 var tmpListOutput = [];

				 var totalPremiumWithAccPremium = mapItemCd.mapFundNLG.BASICPREMIUM2 != undefined ? mapItemCd.mapFundNLG.BASICPREMIUM2 : 0;
				var lowClientBoosterTemp = param.OFF_TOTALPRUBOOSTERLOW_ALT != undefined ? param.OFF_TOTALPRUBOOSTERLOW_ALT : 0;
				var lowAltBoosterTemp = param.OFF_TOTALPRUBOOSTERLOW_ALT != undefined ? param.OFF_TOTALPRUBOOSTERLOW_ALT : 0;
				var medClientBoosterTemp = param.OFF_TOTALPRUBOOSTERMED_ALT != undefined ? param.OFF_TOTALPRUBOOSTERMED_ALT : 0;
				var medAltBoosterTemp = param.OFF_TOTALPRUBOOSTERMED_ALT != undefined ? param.OFF_TOTALPRUBOOSTERMED_ALT : 0;
				var highClientBoosterTemp = param.OFF_TOTALPRUBOOSTERHIGH_ALT != undefined ? param.OFF_TOTALPRUBOOSTERHIGH_ALT : 0;
				var highAltBoosterTemp = param.OFF_TOTALPRUBOOSTERHIGH_ALT != undefined ? param.OFF_TOTALPRUBOOSTERHIGH_ALT : 0;

				 for(var itemCd in mapItemCd.mapOutput){
					 var mapOut = mapItemCd.mapOutput[itemCd];
					//---------------------------------------------------------------------------------------------------------

					if(mapOut.ALLOCATION != '0'){
						//fund dihitung hanya yang ada alokasinya
						var tmpPremi = (((parseInt(mapOut.ALLOCATION) * param.manfaat.totalPremi)/100)/divider);


						tmpLowClient = mapOut['CVTOTALLOWDISPLAY'] ?  (mapOut['CVTOTALLOWDISPLAY']/divider) : 0;
						tmpLowClientSurr = mapOut['TOTALSURRVALUELOWDISPLAY'] ?  (mapOut['TOTALSURRVALUELOWDISPLAY']/divider) : 0;
						tmpMedClient = mapOut['CVTOTALMEDDISPLAY'] ? (mapOut['CVTOTALMEDDISPLAY']/divider)  : 0;
						tmpMedClientSurr = mapOut['TOTALSURRVALUEMEDDISPLAY'] ? (mapOut['TOTALSURRVALUEMEDDISPLAY']/divider)  : 0;
						tmpHighClient = mapOut['CVTOTALHIGHDISPLAY'] ? (mapOut['CVTOTALHIGHDISPLAY']/divider) : 0;
						tmpHighClientSurr = mapOut['TOTALSURRVALUEHIGHDISPLAY'] ? (mapOut['TOTALSURRVALUEHIGHDISPLAY']/divider) : 0;
						tmpLowAlt = mapOut['ALTCVTOTALLOWDISPLAY'] ? (mapOut['ALTCVTOTALLOWDISPLAY']/divider) : 0;
						tmpLowAltSurr = mapOut['ALTTOTALSURRVALUELOWDISPLAY'] ? (mapOut['ALTTOTALSURRVALUELOWDISPLAY']/divider) : 0;
						tmpMedAlt = mapOut['ALTCVTOTALMEDDISPLAY'] ? (mapOut['ALTCVTOTALMEDDISPLAY']/divider) : 0;
						tmpMedAltSurr = mapOut['ALTTOTALSURRVALUEMEDDISPLAY'] ? (mapOut['ALTTOTALSURRVALUEMEDDISPLAY']/divider) : 0;
						tmpHighAlt = mapOut['ALTCVTOTALHIGHDISPLAY'] ? (mapOut['ALTCVTOTALHIGHDISPLAY']/divider) : 0;
						tmpHighAltSurr = mapOut['ALTTOTALSURRVALUEHIGHDISPLAY'] ? (mapOut['ALTTOTALSURRVALUEHIGHDISPLAY']/divider) : 0;


						if(param.currCd == 'IDR'){
							tmpLowClient = Math.round(tmpLowClient);
							tmpLowClientSurr = Math.round(tmpLowClientSurr);
							tmpMedClient = Math.round(tmpMedClient);
							tmpMedClientSurr = Math.round(tmpMedClientSurr);
							tmpHighClient = Math.round(tmpHighClient);
							tmpHighClientSurr = Math.round(tmpHighClientSurr);
							tmpLowAlt = Math.round(tmpLowAlt);
							tmpLowAltSurr = Math.round(tmpLowAltSurr);
							tmpMedAlt = Math.round(tmpMedAlt);
							tmpMedAltSurr = Math.round(tmpMedAltSurr);
							tmpHighAlt = Math.round(tmpHighAlt);
							tmpHighAltSurr = Math.round(tmpHighAltSurr);

						}

						var objList = {
								 year : (year).toString(),
								 customerAge : (mapItemCd.ageCustomer).toString(),
								 premiClient : parseInt(year) <= parseInt(param.rencanaPembayaran) ? (tmpPremi).toString() : '',
								 lowClient : tmpLowClient,
								 lowClientSurr : tmpLowClientSurr,
								 medClient : tmpMedClient,
								 medClientSurr : tmpMedClientSurr,
								 highClient : tmpHighClient,
								 highClientSurr : tmpHighClientSurr,
								 premiAlt : (tmpPremi),
								 lowAlt : tmpLowAlt,
								 lowAltSurr : tmpLowAltSurr,
								 medAlt : tmpMedAlt,
								 medAltSurr : tmpMedAltSurr,
								 highAlt : tmpHighAlt,
								 highAltSurr : tmpHighAltSurr
							 };

						tmpListOutput = [];
						tmpListOutput = newOutput.FUNDMAP[itemCd];
						if(tmpListOutput){
							tmpListOutput.push(objList);
							 newOutput.FUNDMAP[itemCd] = tmpListOutput;
						}else{
							tmpListOutput = [];
							tmpListOutput.push(objList);
							newOutput.FUNDMAP[itemCd] = tmpListOutput;
						}
					}
				 }

				var mapFundNLG = mapItemCd.mapFundNLG;
				var mapFundNLGAlt = mapItemCd.mapFundNLGAlt;
				var mapFundNLGC = mapItemCdC.mapFundNLG;
				var mapFundNLGAltC = mapItemCdC.mapFundNLGAlt;
				 //ASUMTION CLIENT TOTAL FUND
				 tmpLowClient = mapFundNLG['TOTALCVLOWFUNDDSPLY']/divider;
				 tmpLowClientSurr = mapFundNLG['FT_SURRENDERLOWVALUE']/divider;
				tmpMedClient = mapFundNLG['TOTALCVMEDFUNDDSPLY']/divider;
				tmpMedClientSurr = mapFundNLG['FT_SURRENDERMEDVALUE']/divider;
				tmpHighClient = mapFundNLG['TOTALCVHIGHFUNDDSPLY']/divider
				tmpHighClientSurr = mapFundNLG['FT_SURRENDERHIGHVALU']/divider;
				tmpLowAlt = mapFundNLGAlt['TOTALCVLOWFUNDDSPLY']/divider;
				tmpLowAltSurr = mapFundNLGAlt['FT_SURRENDERLOWVALUE']/divider;
				tmpMedAlt = mapFundNLGAlt['TOTALCVMEDFUNDDSPLY']/divider;
				tmpMedAltSurr = mapFundNLGAlt['FT_SURRENDERMEDVALUE']/divider;
				tmpHighAlt = mapFundNLGAlt['TOTALCVHIGHFUNDDSPLY']/divider;
				tmpHighAltSurr = mapFundNLGAlt['FT_SURRENDERHIGHVALU']/divider;

				if(param.currCd == 'IDR'){
					tmpLowClient = Math.round(tmpLowClient);
					tmpLowClientSurr = Math.round(tmpLowClientSurr);
					tmpMedClient = Math.round(tmpMedClient);
					tmpMedClientSurr = Math.round(tmpMedClientSurr);
					tmpHighClient = Math.round(tmpHighClient);
					tmpHighClientSurr = Math.round(tmpHighClientSurr);
					tmpLowAlt = Math.round(tmpLowAlt);
					tmpLowAltSurr = Math.round(tmpLowAltSurr);
					tmpMedAlt = Math.round(tmpMedAlt);
					tmpMedAltSurr = Math.round(tmpMedAltSurr);
					tmpHighAlt = Math.round(tmpHighAlt);
					tmpHighAltSurr = Math.round(tmpHighAltSurr);
				}

				 var objGabFund = {
						 year : (year).toString(),
						customerAge : (mapItemCd.ageCustomer).toString(),
						premiClient : parseInt(year) <= parseInt(param.rencanaPembayaran)?(Math.round((totalPremiumWithAccPremium)/1000)).toString() : '',
						lowClient : tmpLowClient.toString(),
						lowClientSurr : tmpLowClientSurr.toString(),
						medClient : tmpMedClient.toString(),
						medClientSurr : tmpMedClientSurr.toString(),
						highClient : tmpHighClient.toString(),
						highClientSurr : tmpHighClientSurr.toString(),
						premiAlt : (Math.round((totalPremiumWithAccPremium)/1000)).toString(),
						lowAlt : tmpLowAlt.toString(),
						lowAltSurr : tmpLowAltSurr.toString(),
						medAlt : tmpMedAlt.toString(),
						medAltSurr : tmpMedAltSurr.toString(),
						highAlt : tmpHighAlt.toString(),
						highAltSurr : tmpHighAltSurr.toString(),
						lowClientBooster : Math.round(lowClientBoosterTemp/1000).toString(),
						lowAltBooster : Math.round(lowAltBoosterTemp/1000).toString(),
						medClientBooster : Math.round(medClientBoosterTemp/1000).toString(),
						medAltBooster : Math.round(medAltBoosterTemp/1000).toString(),
						highClientBooster : Math.round(highClientBoosterTemp/1000).toString(),
						highAltBooster : Math.round(highAltBoosterTemp/1000).toString()
					 };

				 tmpListOutput = [];
				 tmpListOutput = newOutput['FUNDBENEFIT'];
				 if(tmpListOutput){
					 tmpListOutput.push(objGabFund);
					newOutput['FUNDBENEFIT'] = tmpListOutput;
				 }else{
					 tmpListOutput = [];
					 tmpListOutput.push(objGabFund);
					 newOutput['FUNDBENEFIT'] = tmpListOutput;
				 }

				 //ASUMTION CLIENT TOTAL DEATH BENEFIT
				 tmpLowClient = mapFundNLG['TOTALCVDBLOWDISPLAY']/divider;
				 tmpLowClientSurr = mapFundNLG['TOTALCVDBLOWDISPLAY']/divider;
				tmpMedClient = mapFundNLG['TOTALCVDBMEDDISPLAY']/divider;
				tmpMedClientSurr = mapFundNLG['TOTALCVDBMEDDISPLAY']/divider;
				tmpHighClient = mapFundNLG['TOTALCVDBHIGHDISPLAY']/divider;
				tmpHighClientSurr = mapFundNLG['TOTALCVDBHIGHDISPLAY']/divider;
				tmpLowAlt = mapFundNLGAlt['TOTALCVDBLOWDISPLAY']/divider;
				tmpLowAltSurr = mapFundNLGAlt['TOTALCVDBLOWDISPLAY']/divider;
				tmpMedAlt = mapFundNLGAlt['TOTALCVDBMEDDISPLAY']/divider;
				tmpMedAltSurr = mapFundNLGAlt['TOTALCVDBMEDDISPLAY']/divider;
				tmpHighAlt = mapFundNLGAlt['TOTALCVDBHIGHDISPLAY']/divider;
				tmpHighAltSurr = mapFundNLGAlt['TOTALCVDBHIGHDISPLAY']/divider;

				if(parseInt(year) <= parseInt(param.rencanaPembayaran)){
					tmpBASICPREMIUM1C = mapFundNLGC['BASICPREMIUM2']/1000;
					tmpBASICPREMIUM2C = mapFundNLG['BASICPREMIUM2']/1000;
					tmpTOPUPSAVER1C = mapFundNLGC['TOPUPSAVER2']/1000;
					tmpTOPUPSAVER2C = mapFundNLG['TOPUPSAVER2']/1000;
				}
				else{
					tmpBASICPREMIUM1C = '';
					tmpBASICPREMIUM2C = '';
					tmpTOPUPSAVER1C = '';
					tmpTOPUPSAVER2C = '';
				}

				tmpBASICPREMIUM1A = mapFundNLGAlt['BASICPREMIUM2']/1000;
				tmpBASICPREMIUM2A = mapFundNLGAlt['BASICPREMIUM2']/1000;
				tmpTOPUPSAVER1A = mapFundNLGAltC['TOPUPSAVER2']/1000;
				tmpTOPUPSAVER2A = mapFundNLGAlt['TOPUPSAVER2']/1000;

				tmpDeathClient = mapFundNLG['TOTALDEATHBENEFITPGB']; 
				tmpDeathAlt = mapFundNLGAlt['TOTALDEATHBENEFITPGB'];

				if(param.currCd == 'IDR'){
					tmpLowClient = Math.round(tmpLowClient);
					tmpLowClientSurr = Math.round(tmpLowClientSurr);
					tmpMedClient = Math.round(tmpMedClient);
					tmpMedClientSurr = Math.round(tmpMedClientSurr);
					tmpHighClient = Math.round(tmpHighClient);
					tmpHighClientSurr = Math.round(tmpHighClientSurr);
					tmpLowAlt = Math.round(tmpLowAlt);
					tmpLowAltSurr = Math.round(tmpLowAltSurr);
					tmpMedAlt = Math.round(tmpMedAlt);
					tmpMedAltSurr = Math.round(tmpMedAltSurr);
					tmpHighAlt = Math.round(tmpHighAlt);
					tmpHighAltSurr = Math.round(tmpHighAltSurr);

					tmpBASICPREMIUM1C = Math.round(tmpBASICPREMIUM1C);
					tmpBASICPREMIUM2C = Math.round(tmpBASICPREMIUM2C);
					tmpTOPUPSAVER1C = Math.round(tmpTOPUPSAVER1C);
					tmpTOPUPSAVER2C = Math.round(tmpTOPUPSAVER2C);

					tmpBASICPREMIUM1A = Math.round(tmpBASICPREMIUM1A);
					tmpBASICPREMIUM2A = Math.round(tmpBASICPREMIUM2A);
					tmpTOPUPSAVER1A = Math.round(tmpTOPUPSAVER1A);
					tmpTOPUPSAVER2A = Math.round(tmpTOPUPSAVER2A);

					tmpDeathClient = Math.round(tmpDeathClient);
					tmpDeathAlt = Math.round(tmpDeathAlt);
				}
				 var objGabDeath = {
						 year : (year).toString(),
						customerAge : (mapItemCd.ageCustomer).toString(),
						premiClient : parseInt(year) <= parseInt(param.rencanaPembayaran) ? (Math.round((totalPremiumWithAccPremium)/1000)).toString() : '',
						lowClient : tmpLowClient.toString(),
						lowClientSurr : tmpLowClientSurr.toString(),
						medClient : tmpMedClient.toString(),
						medClientSurr : tmpMedClientSurr.toString(),
						highClient : tmpHighClient.toString(),
						highClientSurr : tmpHighClientSurr.toString(),
						premiAlt : (Math.round((totalPremiumWithAccPremium)/1000)).toString(),
						lowAlt : tmpLowAlt.toString(),
						lowAltSurr : tmpLowAltSurr.toString(),
						medAlt : tmpMedAlt.toString(),
						medAltSurr : tmpMedAltSurr.toString(),
						highAlt : tmpHighAlt.toString(),
						highAltSurr : tmpHighAltSurr.toString(),

						lowClientBooster : Math.round(lowClientBoosterTemp/1000).toString(),
						lowAltBooster : Math.round(lowAltBoosterTemp/1000).toString(),
						medClientBooster : Math.round(medClientBoosterTemp/1000).toString(),
						medAltBooster : Math.round(medAltBoosterTemp/1000).toString(),
						highClientBooster : Math.round(highClientBoosterTemp/1000).toString(),
						highAltBooster : Math.round(highAltBoosterTemp/1000).toString(),

						BASICPREMIUM1C : tmpBASICPREMIUM1C,
						BASICPREMIUM2C : tmpBASICPREMIUM2C,
						TOPUPSAVER1C : tmpTOPUPSAVER1C,
						TOPUPSAVER2C : tmpTOPUPSAVER2C,

						BASICPREMIUM1A : tmpBASICPREMIUM1A,
						BASICPREMIUM2A : tmpBASICPREMIUM2A,
						TOPUPSAVER1A : tmpTOPUPSAVER1A,
						TOPUPSAVER2A : tmpTOPUPSAVER2A,

						premiDeathClient : tmpDeathClient/1000,
						premiDeathAlt : tmpDeathAlt/1000

					 };
				 tmpListOutput = [];
				 tmpListOutput = newOutput['DEATHBENEFIT'];
				 if(tmpListOutput){
					 tmpListOutput.push(objGabDeath);
					newOutput['DEATHBENEFIT'] = tmpListOutput;
				 }else{
					 tmpListOutput = [];
					 tmpListOutput.push(objGabDeath);
					 newOutput['DEATHBENEFIT'] = tmpListOutput;
				 }
			 }
			 newOutput['SARIDER'] = param.SARIDER;
			 newOutput['RULEFORFUND'] = param.RULEFORFUND;

			newOutput.paymentFrequency = param.paymentFrequency;
  			newOutput.premi = param.manfaat.premi;

			 writeToConsole('outputPAA2ALT == ', newOutput);

			 return newOutput;
		 }
		 
		

