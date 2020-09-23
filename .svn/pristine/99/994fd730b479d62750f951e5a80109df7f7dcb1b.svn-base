const express = require('express');
const bodyParser = require('body-parser');
const tableify = require('html-tableify');
const app = express();
var fs = require('fs');
var rootScopeModule = require('./rootScope');
var rootScope = rootScopeModule.rootScope;

var planAlphabeth = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
"J", "K", "L", "M", "N", "O", "P", "Q","R", "S", "T", "U", "V", "W",
"X", "Y", "Z"];

var planCode = ["H1X5", "H1X3", "H1X1", "H1Y5", "H1Y3", "H1Y1"];

var pruLinkTerm = ["T1JR", "T1KR"];

var hsObsoleteList = ["H1GR", "H1JR", "H1G1", "H1J1", "H1QR", "H1RR"];

class Stack { 
  
    constructor() { 
        this.items = []; 
    } 
  
    push(element) { 
		this.items.push(element); 
	} 

    pop() { 
		if (this.items.length == 0) 
			return "empty"; 
		return this.items.pop(); 
	}
	
	isEmpty() { 
		return this.items.length == 0; 
	}  
} 

function getAlterationRule(paramAlter) {
	var rulePreparation = prepareAlterationData(paramAlter);
	paramAlter.manfaatList = rulePreparation;
	return paramAlter;
}

exports.prepareAlterationData = function prepareAlterationData(paramAlter) {
	//initial data
	var alterationHist = paramAlter.alterationDataHist;
	var age = paramAlter.age;
	//tmp variable
	var lastAlterData = {};
	var tmpManfaatList = paramAlter.manfaatList;
	var tmpManfaat = {};

	var tmpNewAlterDataManfaat = [];

	if(alterationHist != undefined){
		//process
		//sorting history alteration //desc
		alterationHist.sort(function compare(a, b) {
			var dateA = new Date(a.alterationDate);
			var dateB = new Date(b.alterationDate);
			return dateB - dateA;
		});
	}else{
		alterationHist = [];
	}


	var newData = {};
	for (var index = 0; index < tmpManfaatList.length; index++) {
		tmpManfaat = tmpManfaatList[index];
		newData = convertParamManfaat(tmpManfaat);

		for (var i = 0; i < newData.length; i++) {
			tmpNewAlterDataManfaat.push(newData[i]);
		}
	}

	//validate data history against request alteration
	//to define alteration rule to be used in calculation
	var listHistory = [];
	var rule = {};
	var loadList = [];
	for (var index = 0; index < tmpNewAlterDataManfaat.length; index++) {
		newData = tmpNewAlterDataManfaat[index];
		listHistory = prepareHistoryData(newData, alterationHist);
		tmpNewAlterDataManfaat[index].alterationHist = listHistory;

		//prepare loadList
		loadList = prepareLoadList(newData, listHistory);
		tmpNewAlterDataManfaat[index].loadList = loadList;
		
		//check is need to be calculated
		tmpNewAlterDataManfaat[index].isNeedToBeCalculated = checkIsNeedToBeCalculated(newData, listHistory, alterationHist);

		//set prev premi from hist if premi not exist in current manfaat
		if(!tmpNewAlterDataManfaat[index].isNeedToBeCalculated){
			if(tmpNewAlterDataManfaat[index].PREMI == undefined || tmpNewAlterDataManfaat[index].PREMI == 0){
				if(listHistory[0] != undefined){
					if(listHistory[0].PREMI != undefined){
						tmpNewAlterDataManfaat[index].PREMI = listHistory[0].PREMI;
					}
				}
			}
		}

		rule = prepareRuleAlteration(tmpNewAlterDataManfaat[index], alterationHist, paramAlter.campaignType, paramAlter);
		tmpNewAlterDataManfaat[index].rule = rule;
	}

	var manfaatList = [];
	var tmpList = [];
	for (var index = 0; index < tmpNewAlterDataManfaat.length; index++) {
		tmpList = convertToManfaatList(tmpNewAlterDataManfaat[index]);

		for (var i = 0; i < tmpList.length; i++) {
			manfaatList.push(tmpList[i]);
		}
	} 

	return manfaatList;
}

// function processCumulativeSA(manfaat, alterationHist, currentGender){
// 	if(manfaat.coverageType.toLowerCase() == 'main'){
// 		stack = new Stack();
// 		var maxSA = 0;
// 		var currentSA = 0;
// 		var currentSmokerStatus;

// 		//get current SA
// 		for(var i = 0; i < manfaat.itemInput.length; i++){
// 			if(manfaat.itemInput[i].key == 'PDSA'){
// 				currentSA = manfaat.itemInput[i].inputValue;
// 				currentSmokerStatus = manfaat.smokerStatus;
// 			}
// 		}
// 		//get current SA end

// 		for(var i = alterationHist.length - 1; i >= 0; i--){
// 			for(var j = 0; j < alterationHist[i].itemInput.length; j++){
// 				if(alterationHist[i].itemInput[j].key == 'PDSA'){
// 					if(maxSA < alterationHist[i].itemInput[j].inputValue){
// 						alterationHist[i].PDSA = alterationHist[i].itemInput[j].inputValue;
// 						maxSA = alterationHist[i].itemInput[j].inputValue;
// 						stack.push(alterationHist[i]);
// 					}
// 					break;
// 				}
// 			}
// 			if(+maxSA >= +currentSA){
// 				break;
// 			}
// 		}

// 		manfaat.cumulativePreviousResult = 0;
// 		if(+maxSA >= +currentSA){
// 			manfaat.cumulativeCalculateUsingNewRate = false;
// 			var history = stack.pop();
// 			if(!stack.isEmpty()){
// 				var history2 = stack.pop();
// 				manfaat.cumulativeRemainingSA = currentSA - history2.PDSA;
// 				manfaat.cumulativePreviousSA = maxSA - history2.PDSA;
// 				manfaat.cumulativePreviousSumResult = constructEvalFormula(history2.PDSA, currentSmokerStatus, history2.age, currentGender, manfaat.code);
// 			}
// 			else{
// 				manfaat.cumulativeRemainingSA = currentSA;
// 				manfaat.cumulativePreviousSA = maxSA;
// 				manfaat.cumulativePreviousSumResult = 0;
// 			}
// 			manfaat.cumulativeCurrentResult = constructEvalFormula(history.PDSA, currentSmokerStatus, history.age, currentGender, manfaat.code);
// 		}
// 		else{
// 			manfaat.cumulativeCalculateUsingNewRate = true; //bisa dipake buat cumulativeShouldBeStored
// 			manfaat.cumulativeRemainingSA = currentSA - maxSA;
// 			manfaat.cumulativePreviousSA = maxSA;
// 			if(!stack.isEmpty()){
// 	 			var history = stack.pop();
// 				manfaat.cumulativeCurrentResult = constructEvalFormula(history.PDSA, currentSmokerStatus, history.age, currentGender, manfaat.code);
// 				manfaat.cumulativePreviousSumResult = constructEvalFormula(history.PDSA, currentSmokerStatus, history.age, currentGender, manfaat.code);
// 			}
// 			else{
// 				manfaat.cumulativeCurrentResult = 0;
// 			}
// 		}

// 		while(!stack.isEmpty()){
// 			var history = stack.pop();
// 			manfaat.cumulativePreviousSumResult += +constructEvalFormula(history.PDSA, currentSmokerStatus, history.age, currentGender, manfaat.code);
// 		}
// 	}
// }

// function constructEvalFormula(sa, smokerStatus, age, gender, code) {
// 	var rate_cd;
// 	if(code.match(/U1BR.*/) || code.match(/U1HR.*/)){
// 		rate_cd = 'RTMAXSA2';
// 	}
// 	else{
// 		rate_cd = 'RTMAXSA';
// 	}
// 	var tmpRate = getRateValPreparation(rate_cd, smokerStatus, age, gender);
// 	var formula = sa + '/' + tmpRate.value;
// 	return eval(formula);
// }

// function getRateValPreparation(rate_cd, smokerStatus, age, genderAtt){
// 	var obj;
// 	var age_life_1 = age;
// 	var gender = genderAtt;
// 	var smoker_status = smokerStatus;

// 	var rate = {};
// 	rate = rootScope.RATE;
// 	currentRate = rate[rate_cd];

// 	if(currentRate){
// 		obj = {};
// 		var rate_detail_component = currentRate.rateDetailComponent.split('|');
// 		var j = 0;
// 		var component = '';
// 		if(rate_detail_component[j] == 'age_life1'){
// 			component += age_life_1 + '|';
// 			j++;
// 		}
// 		if(rate_detail_component[j] == 'gender'){
// 			component += gender + '|';
// 			j++;
// 		}
// 		if(rate_detail_component[j] == 'smoker_status'){
// 			component += smoker_status + '|';
// 			j++;
// 		}
// 		component = component.substring(0, component.length-1);
// 		obj.rate_type_cd = currentRate.rateTypeCd;
// 		if(typeof currentRate.rateDetail === 'string'){
// 			currentRate.rateDetail = JSON.parse(currentRate.rateDetail);
// 		}
// 		obj.value = currentRate.rateDetail[component];
// 		return obj;
// 	}

// 	return obj;
// }

exports.conversionProcess = function conversionProcess(manfaat, manfaatHist, campaignType, isConversion, isGIO, isFUW, approvalTypeConversion){
	var code = manfaat.code;
	var dataCoverage = null;
	var rootScopeCoverage = rootScope.COVERAGE;
	
	if(campaignType == "" || campaignType == null || campaignType == undefined){
		dataCoverage = rootScopeCoverage[code] == undefined ? undefined : rootScopeCoverage[code].COVERAGE_CONVERSION.BAU;
	} else{
		dataCoverage = rootScopeCoverage[code] == undefined ? undefined : rootScopeCoverage[code].COVERAGE_CONVERSION.CAMPAIGN;
	}

	if(dataCoverage != undefined && dataCoverage.length > 0){
		var indexCoverageFrom =null;
		var manfaatFrom = null;

		// check if coverage from found in alterationDataHist then is need to convert
		for(var i = 0; i < dataCoverage.length; i++){
			for(var j = 0; j < manfaatHist.length; j++){
				if(dataCoverage[i].coverageCdFrom == manfaatHist[j].code){
					isConversion = true;
					manfaatFrom = manfaatHist[j];
					indexCoverageFrom = i;
				}
			}
		}

		if(isConversion){
			// split componentFrom and componentTo into array
			var componentFrom = dataCoverage[indexCoverageFrom].componentFrom.split('|');
			var componentTo = dataCoverage[indexCoverageFrom].componentTo.split('|');
			var orderTemp = "";

			// for component from
			for(var i = 0; i < manfaatFrom.custList[0].itemInput.length; i++){
				if(manfaatFrom.custList[0].itemInput[i].key == "PDSA"){
					var pdsa_from = manfaatFrom.custList[0].itemInput[i].inputValue;
				}
				else if(manfaatFrom.custList[0].itemInput[i].key == "PDPLAN"){
					var pdplan_from = manfaatFrom.custList[0].itemInput[i].inputValue;
				}
				else if(manfaatFrom.custList[0].itemInput[i].key == "PDPLAN2"){
					var pdplan2_from = manfaatFrom.custList[0].itemInput[i].inputValue;
				}
				else if(manfaatFrom.custList[0].itemInput[i].key == "PDPREMI"){
					var pdpremi_from = manfaatFrom.custList[0].itemInput[i].inputValue;
				}
				else if(manfaatFrom.custList[0].itemInput[i].key == "PDTERM"){
					var pdterm_from = manfaatFrom.custList[0].itemInput[i].inputValue;
				}
				else if(manfaatFrom.custList[0].itemInput[i].key == "PDSAVER"){
					var pdsaver_from = manfaatFrom.custList[0].itemInput[i].inputValue;
				}
			}

			// for component to
			for(var i = 0; i < manfaat.itemInput.length; i++){
				if(manfaat.itemInput[i].key == "PDSA"){
					var pdsa_to = manfaat.itemInput[i].inputValue;
				}
				else if(manfaat.itemInput[i].key == "PDPLAN"){
					var pdplan_to = manfaat.itemInput[i].inputValue;
				}
				else if(manfaat.itemInput[i].key == "PDPLAN2"){
					var pdplan2_to = manfaat.itemInput[i].inputValue;
				}
				else if(manfaat.itemInput[i].key == "PDPREMI"){
					var pdpremi_to = manfaat.itemInput[i].inputValue;
				}
				else if(manfaat.itemInput[i].key == "PDTERM"){
					var pdterm_to = manfaat.itemInput[i].inputValue;
				}
				else if(manfaat.itemInput[i].key == "PDSAVER"){
					var pdsaver_to = manfaat.itemInput[i].inputValue;
				}
			}

			// concat all from componentFrom and componentTo
			for(var i = 0; i < componentFrom.length; i++){
				if(componentFrom[i] == "pdsa_from"){
					orderTemp += pdsa_from + "|";
				}
				else if(componentFrom[i] == "pdplan_from"){
					orderTemp += pdplan_from + "|";
				}
				else if(componentFrom[i] == "pdplan2_from"){
					orderTemp += pdplan2_from + "|";
				}
				else if(componentFrom[i] == "pdpremi_from"){
					orderTemp += pdpremi_from + "|";
				}
				else if(componentFrom[i] == "pdsaver_from"){
					orderTemp += pdsaver_from + "|";
				}
			}

			for(var i = 0; i < componentTo.length; i++){
				if(componentTo[i] == "pdsa_to"){
					orderTemp += pdsa_to + "|";
				}
				if(componentTo[i] == "pdplan_to"){
					orderTemp += pdplan_to + "|";
				}
				if(componentTo[i] == "pdplan2_to"){
					orderTemp += pdplan2_to + "|";
				}
				if(componentTo[i] == "pdpremi_to"){
					orderTemp += pdpremi_to + "|";
				}
				if(componentTo[i] == "pdsaver_to"){
					orderTemp += pdsaver_to + "|";
				}
			}

			// remove last pipe in the end of string
			orderTemp = orderTemp.substring(0, orderTemp.length -1);

			// check order
			var detailString = dataCoverage[indexCoverageFrom].detail;
			var detailJson = JSON.parse(detailString); 

			if(orderTemp in detailJson){
				approvalTypeConversion = detailJson[orderTemp];
				
				if(dataCoverage[indexCoverageFrom].approvalTypeUsedForCalculation == true){
					if(detailJson[orderTemp] == "GIO"){
						isGIO = true;
					}
					else if(detailJson[orderTemp] == "FUW"){
						isFUW = true;
					}
				}
			}
		}
	}
	return {
		isGIO: isGIO,
		isFUW: isFUW,
		isConversion: isConversion,
		approvalTypeConversion : approvalTypeConversion,
		manfaatFrom : manfaatFrom
	};
}

function prepareRuleAlteration(manfaat, alterationDataHist, campaignType, paramAlter) {
	var result = {};
	var newRule = {};
	var isSavePrev = true;
	var isOnlyTermChanged = true;

	var prevRule = [];
	var tmpPrevRule = {};

	var newPremi = 0;
	for(var i = 0; i < manfaat.itemInput.length; i++){
		if(manfaat.itemInput[i].code == "INPUTPREMI"){
			newPremi = manfaat.itemInput[i].inputValue;
		}
	}

	var newSA = manfaat.SA;
	var newAge = manfaat.age;
	var newAnb = manfaat.tertanggungAge;
	var newTERM = manfaat.TERM;
	var newPLAN = manfaat.PLAN;
	var newPLAN2 = manfaat.PLAN2;
	var newUNIT = manfaat.UNIT;
	var newSAVER = manfaat.SAVER;
	var newACCM = manfaat.cumulativeCurrentResult;

	var newSmokerStatus = manfaat.smokerStatus;
	var newClazz = manfaat.clazz == undefined ? undefined : isNaN(manfaat.clazz) ? manfaat.clazz.trim() : manfaat.clazz;
	var newInputAdvance = manfaat.inputAdvance;

	var isTermChanged = false;
	var rule = undefined;
	var saBalance = manfaat.SA;

	var prevClazz;
	var previousPremi = 0;
	var previousAnb = undefined;
	var previousAge = undefined;
	var previousSA = undefined;
	var previousAccm = 0;
	
	var prevSA = 0;
	var previousSmokerStatus = undefined;
	var previousAlterationDate = undefined;
	var previousInputAdvance = undefined;

	var currHist;
	var prevHist;
	var currIndex;
	var prevIndex;
	var newRider = true;
	var isGIO = false;
	var isFUW = false;
	var approvalTypeConversion = "";
	var isConversion = null;
	
	var histValue = {};
	var currValue = {};

	var flagFUGIO = undefined;
	var manfaatAlterHist= [];
	if(alterationDataHist != undefined && alterationDataHist.length > 0){
		manfaatAlterHist = alterationDataHist[0].manfaatList;
		// Start Conversion HS Obsolete 
		if(hsObsoleteList.indexOf(manfaat.code) != -1){
			for(var hsObs = 0; hsObs < manfaatAlterHist.length; hsObs++){
				if(manfaatAlterHist[hsObs].code == manfaat.code){
					for(var i = 0; i < manfaatAlterHist[hsObs].custList[0].itemInput.length; i++){
						if(manfaatAlterHist[hsObs].custList[0].itemInput[i].key == "PDPLAN"){
							var pdplanHist = manfaatAlterHist[hsObs].custList[0].itemInput[i].inputValue;
							if(pdplanHist != newPLAN){
								flagFUGIO = paramAlter.flagFUGIO;
							}
						}
					}
				}
			}			
		}
		// End Conversion HS Obsolete
	}

	// ===========================Checking conversion rider===========================
	var resultConversionProcess = exports.conversionProcess(manfaat, manfaatAlterHist, campaignType, isConversion, isGIO, isFUW, approvalTypeConversion);
	isConversion = resultConversionProcess.isConversion;
	isGIO = resultConversionProcess.isGIO;
	isFUW = resultConversionProcess.isFUW;
	approvalTypeConversion = resultConversionProcess.approvalTypeConversion;
	manfaatFrom = resultConversionProcess.manfaatFrom;
	// ========================End of Checking conversion rider========================

	newRule.ageNew = newAge;
	newRule.anbNew = newAnb;

	currValue.PREMI = newPremi == undefined ? 0 : newPremi;
	currValue.SA = newSA == undefined ? 0 : newSA;
	currValue.PLAN = newPLAN == undefined ? "" : newPLAN;
	currValue.TERM = newTERM == undefined ? 0 : newTERM;
	currValue.UNIT = newUNIT == undefined ? 0 : newUNIT;
	currValue.ACCM = newACCM == undefined ? 0 : newACCM;
	
	// processCumulativeSA(manfaat, manfaat.alterationHist, paramAlter.gender);

	if (manfaat.alterationHist == undefined) {
		//rule new bussiness
		rule = "NB";
	} else {
		if (manfaat.alterationHist.length == 0) {
			//rule new bussiness
			rule = "NB";
		} else {
			newRider = false;
			
			var hist = manfaat.alterationHist[0];

			prevClazz = hist.clazz;

			if(hist != undefined){
				histValue.PREMI = hist.PREMI == undefined ? 0 : hist.PREMI;
				histValue.SA = hist.SA == undefined ? 0 : hist.SA;
				histValue.PLAN = hist.PLAN == undefined ? "" : hist.PLAN;
				histValue.TERM = hist.TERM == undefined ? 0 : hist.TERM;
				histValue.UNIT = hist.UNIT == undefined ? 0 : hist.UNIT;
				histValue.ACCM = hist.cumulativeCurrentResult == undefined ? 0 : hist.cumulativeCurrentResult;
				
				if(hist.coverageType.toLowerCase() == 'main'){
					currValue.ACCM = hist.cumulativeCurrentResult == undefined ? 0 : hist.cumulativeCurrentResult;					
				}
			}
			
			//validasi topup
			if(manfaat.coverageType == "topup"){
				manfaat.isNeedToBeCalculated = true;
				rule = "NB";
				isSavePrev = false;

				if(hist != undefined){
					previousPremi = hist.PREMI;
					previousAccm = hist.cumulativeCurrentResult;
				}
			}else{
				//check rule SA/PLAN
				if(manfaat.PLAN != undefined && manfaat.PLAN != '' && manfaat.PLAN != 'Y'){
					rule = "PLAN";
					if(histValue.PLAN != currValue.PLAN){
						isOnlyTermChanged = false;
					}
				}else if(manfaat.SA != undefined){
					rule = "SA";
					if(histValue.SA != parseInt(currValue.SA)){
						isOnlyTermChanged = false;
					}
				}else if(manfaat.UNIT != undefined){
					rule = "UNIT";
					if(histValue.UNIT != currValue.UNIT){
						isOnlyTermChanged = false;
					}
				}

				
				
				if (manfaat.TERM != hist.TERM || (newSmokerStatus != hist.smokerStatus && hist.smokerStatus != '') || 
						(newClazz != hist.clazz && hist.clazz != '')) {
					isTermChanged = true;
				}else{
					if(manfaat.isNeedToBeCalculated){
						// kondisi buat prulinkTerm kalo ada diskon
						if(pruLinkTerm.indexOf(manfaat.code) !== -1){
							isTermChanged = true;
						}
					}
				}

				if(rule == "SA"){
					if (parseInt(saBalance) > parseInt(hist.SA) || (parseInt(saBalance) >= parseInt(hist.SA) && isOnlyTermChanged)) {
						//cari sisa SA dan premi sebelum
						hist = manfaat.alterationHist[0];
						prevSA = hist.SA;
						saBalance = saBalance - hist.SA;
						previousPremi = hist.PREMI;
						previousAccm = hist.cumulativeCurrentResult;
						newSA = saBalance;

						//set value
						tmpPrevRule.alterationDate = hist.alterationDate;
						tmpPrevRule.PREMI = hist.PREMI;
						tmpPrevRule.ACCM = hist.cumulativeCurrentResult;
						tmpPrevRule.anb = hist.tertanggungAge;
						tmpPrevRule.age = hist.age;
						tmpPrevRule.SA = hist.SA;
						tmpPrevRule.prevSA = 0;
						tmpPrevRule.smokerStatus = hist.smokerStatus;
						tmpPrevRule.gender = hist.gender;
						tmpPrevRule.clazz = hist.clazz;

						if(!isTermChanged){
							isSavePrev = false;
						}

					} else if (parseInt(saBalance) < parseInt(hist.SA)) {						
						var indexPrevDownSA = 0;
						var countTotalSADown = 0;
						
						for (var i = 0; i < manfaat.alterationHist.length; i++) {
							currHist = manfaat.alterationHist[i];
							if (parseInt(saBalance) > parseInt(currHist.SA)) {
								prevSA = currHist.SA;
								newSA = saBalance - currHist.SA;
								indexPrevDownSA = i;
								previousPremi = currHist.PREMI;
								previousAccm = currHist.cumulativeCurrentResult;
								countTotalSADown++;
								break;
							}
						}

						if (countTotalSADown > 0) {
							if (indexPrevDownSA == 0) {
								hist = manfaat.alterationHist[0];
								newAnb = hist.tertanggungAge;
								newAge = hist.age;
							} else {
								hist = manfaat.alterationHist[indexPrevDownSA - 1];
								newAnb = hist.tertanggungAge;
								newAge = hist.age;
							}

							hist = manfaat.alterationHist[indexPrevDownSA];
							previousSA = hist.SA;	
							if(manfaat.alterationHist[indexPrevDownSA + 1] != undefined){
								if(manfaat.alterationHist[indexPrevDownSA + 1].SA > hist.SA){
									previousAnb = manfaat.alterationHist[indexPrevDownSA + 1].tertanggungAge;
									previousAge = manfaat.alterationHist[indexPrevDownSA + 1].age;
								}else{
									isSavePrev = false;
									previousAnb = hist.tertanggungAge;
									previousAge = hist.age;	
								}
							}else{
								previousAnb = hist.tertanggungAge;
								previousAge = hist.age;
							}

							if (manfaat.smokerStatus == "S" || hist.smokerStatus == "S") {
								previousSmokerStatus = "S";
							} else {
								previousSmokerStatus = manfaat.smokerStatus;
							}

							//set value
							tmpPrevRule.alterationDate = hist.alterationDate;
							tmpPrevRule.PREMI = previousPremi;
							tmpPrevRule.ACCM = previousAccm;
							tmpPrevRule.anb = previousAnb;
							tmpPrevRule.age = previousAge;
							tmpPrevRule.SA = previousSA;
							tmpPrevRule.prevSA = 0;
							tmpPrevRule.smokerStatus = previousSmokerStatus;
							tmpPrevRule.gender = manfaat.gender;
							tmpPrevRule.clazz = manfaat.clazz;

							if(!isTermChanged){
								if(previousPremi > 0){
									isSavePrev = false;	
								}
							}
						} else {
							//using prev alteration age
							hist = manfaat.alterationHist[manfaat.alterationHist.length - 1];
							newAnb = hist.tertanggungAge;
							newAge = hist.age;
							prevSA = hist.SA;
							isSavePrev = false;
						}
					} else {
						//do nothing
						rule = "NB";
						isSavePrev = false;
					}

					if (isTermChanged) {
						
						var age;
						var indexPrevSA = [];
						saBalance = manfaat.SA;
	
						for (var i = 0; i < manfaat.alterationHist.length; i++) {
							currHist = manfaat.alterationHist[i];
							if (parseInt(saBalance) >= parseInt(currHist.SA)) {
								saBalance = currHist.SA;
								indexPrevSA.push(i);
							}
						}
	
						for (var i = 0; i < indexPrevSA.length; i++) {
							prevIndex = indexPrevSA[i];
							tmpPrevRule = {};
	
							currHist = manfaat.alterationHist[prevIndex];
							prevHist = manfaat.alterationHist[prevIndex + 1];
	
							if (prevHist != undefined) {
								previousSA = currHist.SA - prevHist.SA;
								if (parseInt(prevHist.SA) > parseInt(currHist.SA) || previousSA == 0) {
									previousSA = currHist.SA;
									previousAnb = prevHist.tertanggungAge;
									previousAge = prevHist.age;
									previousAlterationDate = currHist.alterationDate; 
								}else{
									previousAnb = currHist.tertanggungAge;
									previousAge = currHist.age;
									previousAlterationDate = currHist.alterationDate;
								}
							} else {
								previousSA = currHist.SA;
								previousAnb = currHist.tertanggungAge;
								previousAge = currHist.age;
								previousAlterationDate = currHist.alterationDate;
							}
	
							if (manfaat.smokerStatus == "S" || currHist.smokerStatus == "S") {
								previousSmokerStatus = "S";
							} else {
								previousSmokerStatus = currHist.smokerStatus;
							}
	
							//set value
							tmpPrevRule.alterationDate = previousAlterationDate;
							tmpPrevRule.PREMI = currHist.PREMI;
							tmpPrevRule.ACCM = currHist.cumulativeCurrentResult;
							tmpPrevRule.anb = previousAnb;
							tmpPrevRule.age = previousAge;
							tmpPrevRule.SA = previousSA;
							tmpPrevRule.prevSA = 0;
							tmpPrevRule.smokerStatus = previousSmokerStatus;
							tmpPrevRule.gender = currHist.gender;
							tmpPrevRule.clazz = currHist.clazz;
	
							prevRule.push(tmpPrevRule);
						}
	
						if (indexPrevSA.length == 0) {
							//using prev alteration age
							hist = manfaat.alterationHist[manfaat.alterationHist.length - 1];
							newAnb = hist.tertanggungAge;
							newAge = hist.age;
							prevSA = hist.SA;
							isSavePrev = false;
						}

						previousPremi = 0;
						previousAccm = 0;
						prevSA = 0;	
					} else {
						if (isSavePrev) {
							prevRule.push(tmpPrevRule);
						}
					}

				}else if(rule == "PLAN"){
					if(hist == undefined){
						rule = "NB";
					}else{
						//check is a number
						var isPLANNumber = false;
						if(!isNaN(newPLAN)){
							isPLANNumber = true;
						}
						var indexPrev = 0;
						var indexNew = 0;

						var prevPLAN = hist.PLAN;
						if(isPLANNumber){
							indexPrev = parseInt(prevPLAN);
							indexNew = parseInt(newPLAN);
						}
						else{
							indexPrev = planAlphabeth.indexOf(prevPLAN);
							indexNew = planAlphabeth.indexOf(newPLAN);
						}

						//kondisi untuk plan turun
						var lastIndexUP = 0;
						if(indexPrev > indexNew){
							for (var i = 0; i < manfaat.alterationHist.length; i++) {
								currHist = manfaat.alterationHist[i];
								prevHist = manfaat.alterationHist[i + 1];
								
								if(isPLANNumber){
									currIndex = parseInt(currHist.PLAN);
								}else{
									currIndex = planAlphabeth.indexOf(currHist.PLAN);
								}								

								if(prevHist != undefined){
									if(isPLANNumber){
										prevIndex = parseInt(prevHist.PLAN);
									}else{
										prevIndex = planAlphabeth.indexOf(prevHist.PLAN);
									}
									if(currIndex > prevIndex){
										lastIndexUP = i;
										break;	
									}else{
										continue;
									}
								}else{
									lastIndexUP = i;
									break;
								}
							}

							hist = manfaat.alterationHist[lastIndexUP];
							newAnb = hist.tertanggungAge;
							newAge = hist.age;
							prevSA = hist.SA;
						}

						if(indexPrev >= indexNew){
							//check inputAdvance hist if pph
							if(manfaat.isPPH){
								var prevInputAdvance = hist.inputAdvanceCode;
								
								currIndex = planCode.indexOf(manfaat.inputAdvanceCode);
								prevIndex = planCode.indexOf(prevInputAdvance);

								newAge = manfaat.age;
								newAnb = manfaat.tertanggungAge;

								if(prevIndex >= currIndex){
									currIndex = 0;
									prevIndex = 0;
									
									for (var i = 0; i < manfaat.alterationHist.length; i++) {
										currHist = manfaat.alterationHist[i];
										prevHist = manfaat.alterationHist[i + 1];
										
										currIndex = planCode.indexOf(currHist.inputAdvanceCode);
		
										if(prevHist != undefined){
											prevIndex = planCode.indexOf(prevHist.inputAdvanceCode);

											if(currIndex > prevIndex){
												lastIndexUP = i;
												break;	
											}else{
												continue;
											}
										}else{
											lastIndexUP = i;
											break;
										}
									}

									hist = manfaat.alterationHist[lastIndexUP];
									newAnb = hist.tertanggungAge;
									newAge = hist.age;
									prevSA = hist.SA;
								}
							}
						}

						previousInputAdvance = hist.inputAdvance;
					}
				}else if(rule == "UNIT"){
					if(hist == undefined){
						rule = "NB";
					}else{
						var currUnit = 0;
						var prevUNIT = hist.UNIT;
						var lastIndexUP = 0;
						if(parseInt(prevUNIT) > parseInt(newUNIT)){
							for (var i = 0; i < manfaat.alterationHist.length; i++) {
								currHist = manfaat.alterationHist[i];
								prevHist = manfaat.alterationHist[i + 1];
								
								currUnit = parseInt(currHist.UNIT);

								if(prevHist != undefined){
									prevUNIT = prevHist.UNIT;
									
									if(parseInt(currUnit) > parseInt(prevUNIT)){
										lastIndexUP = i;
										break;	
									}else{
										continue;
									}
								}else{
									lastIndexUP = i;
									break;
								}
							}
							hist = manfaat.alterationHist[lastIndexUP];
							newAnb = hist.tertanggungAge;
							newAge = hist.age;
							prevSA = hist.SA;
						}
					}
				}
			}
		}
	}

	result.rule = rule;
	result.isTermChanged = isTermChanged;
	result.TERM = newTERM;
	result.prevPREMI = previousPremi;
	result.prevACCM = previousAccm;
	result.histValue = histValue;
	result.currValue = currValue;

	if(previousPremi == 0){
		prevSA = 0;
	}

	newRule.age = newAge;
	newRule.anb = newAnb;

	// Jika tidak perubahan di alter maka memakai umur yang sebelumnya
	if(!isConversion && manfaat.isNeedToBeCalculated == false){
		newRule.age = manfaat.alterationHist[0].age;
		newRule.anb = manfaat.alterationHist[0].tertanggungAge;
	}

	if(isTermChanged == true && isOnlyTermChanged == true){
		newRule.age = manfaat.alterationHist[0].age;
		newRule.anb = manfaat.alterationHist[0].tertanggungAge;
	}

	if(isConversion){
		if(isGIO){
			newRule.age = manfaatFrom.custList[0].age;
			newRule.anb = manfaatFrom.custList[0].anb;
		}
		
		if(isFUW){
			newRule.age = newRule.ageNew;
			newRule.anb = newRule.anbNew;
		}
	}

	if(flagFUGIO == true){
		newRule.age = manfaat.alterationHist[0].age;
		newRule.anb = manfaat.alterationHist[0].tertanggungAge;
	} else if(flagFUGIO == false){
		newRule.age = newRule.ageNew;
		newRule.anb = newRule.anbNew;
	}

	if(rule == 'SA' && isOnlyTermChanged && prevRule != undefined && prevRule.length > 0){
		newRule.SA = prevRule[0].SA;
		newRule.prevSA = prevRule[0].prevSA;
		newRule.age = prevRule[0].age;
		newRule.anb = prevRule[0].anb;
		prevRule.shift();
	}
	else{
		newRule.SA = newSA;
		newRule.prevSA = prevSA;
	}
	newRule.PLAN = newPLAN;
	newRule.PLAN2 = newPLAN2;
	newRule.UNIT = newUNIT;
	newRule.SAVER = newSAVER;
	newRule.previousInputAdvance = previousInputAdvance;
	newRule.smokerStatus = manfaat.smokerStatus;
	newRule.gender = manfaat.gender;
	newRule.clazz = manfaat.clazz;

	result.prevRule = prevRule;
	result.newRule = newRule;
	result.newRider = newRider;
	result.approvalTypeConversion = approvalTypeConversion;
	result.isGIO = isGIO;
	result.isFUW = isFUW;

	if(manfaat.coverageType.toLowerCase() == 'main'){
		result.cumulativeCalculateUsingNewRate = manfaat.cumulativeCalculateUsingNewRate;
		result.cumulativeRemainingSA = manfaat.cumulativeRemainingSA;
		result.cumulativePreviousSA = manfaat.cumulativePreviousSA;
		result.cumulativeCurrentResult = manfaat.cumulativeCurrentResult;
		result.cumulativePreviousSumResult = manfaat.cumulativePreviousSumResult;
	}

	return result;
}

function convertParamManfaat(tmpManfaat) {
	var manfaatList = [];

	for (var j = 0; j < tmpManfaat.custList.length; j++) {
		var tmpCustList = tmpManfaat.custList[j];
		var manfaat = convertParamCustList(tmpManfaat, tmpCustList, undefined, tmpCustList.age);
		manfaatList.push(manfaat);

	}
	return manfaatList;
}

function convertParamCustList(tmpManfaat, tmpCustList, alterationDate, age) {
	var manfaat = {};
	var newSA = undefined;
	var newTERM = undefined;
	var newPREMI = 0;
	var newPLAN = undefined;
	var newPLAN2 = undefined;
	var newUNIT = undefined;
	var newSAVER = undefined;
	var inputAdvance = undefined;
	var inputAdvanceCode = undefined;
	var inputNested = undefined;
	var isPPH = false;
	
	manfaat.alterationDate = alterationDate;
	manfaat.age = age;
	manfaat.code = tmpManfaat.code;
	manfaat.oldCode = tmpManfaat.oldCode;
	manfaat.seq = tmpManfaat.seq;
	manfaat.name = tmpManfaat.name;
	manfaat.coverageType = tmpManfaat.coverageType;
	manfaat.type = tmpManfaat.type;
	manfaat.flagIncrease = tmpManfaat.flagIncrease;
	manfaat.riderStatus = tmpManfaat.riderStatus;
	manfaat.cumulativeCurrentResult = tmpManfaat.cumulativeCurrentResult;
	
	manfaat.newLifeAssured = tmpCustList.newLifeAssured;
	manfaat.tertanggungName = tmpCustList.name;
	manfaat.tertanggungAge = tmpCustList.anb;
	manfaat.tertanggungKey = tmpCustList.key;
	manfaat.clazz = tmpCustList.clazz;
	manfaat.smokerStatus = tmpCustList.smokerStatus;
	manfaat.tertanggungCustomerId = tmpCustList.customerId;
	manfaat.itemInput = tmpCustList.itemInput;

	manfaat.loadList = getLoadList(tmpCustList);

	var tmpInputItem = {};
	for (var k = 0; k < tmpCustList.itemInput.length; k++) {
		tmpInputItem = tmpCustList.itemInput[k];
		if (tmpInputItem.key == "PDSA") {
			newSA = tmpInputItem.inputValue;
		} else if (tmpInputItem.key == "PDTERM") {
			newTERM = tmpInputItem.inputValue;
		} else if (tmpInputItem.key == "PDPREMI") {
			newPREMI = tmpInputItem.inputValue;
		} else if (tmpInputItem.key == "PDPLAN") {
			newPLAN = tmpInputItem.inputValue;
			inputAdvance = tmpInputItem.inputAdvance;
			inputNested = tmpInputItem.inputNested;

			if(inputAdvance != undefined){
				if(inputAdvance.indexOf("H1X") > -1 || inputAdvance.indexOf("H1Y") > -1 || inputAdvance.indexOf("H1Z") > -1){
					isPPH = true;
					inputAdvanceCode = inputAdvance.split(',')[0];
				}
			}
		}else if (tmpInputItem.key == "PDPLAN2") {
			newPLAN2 = tmpInputItem.inputValue;
			inputAdvance = tmpInputItem.inputAdvance;
			inputNested = tmpInputItem.inputNested;

			if(inputAdvance != undefined){
				if(inputAdvance.indexOf("H1X") > -1 || inputAdvance.indexOf("H1Y") > -1 || inputAdvance.indexOf("H1Z") > -1){
					isPPH = true;
					inputAdvanceCode = inputAdvance.split(',')[0];
				}
			}
		}else if (tmpInputItem.key == "PDUNIT") {
			newUNIT = tmpInputItem.inputValue;
		}else if (tmpInputItem.key == "PDSAVER") {
			newSAVER = tmpInputItem.inputValue;
		}
		
	}

	if (newSA != undefined) {
		manfaat.SA = newSA;
	}
	if (newTERM != undefined) {
		manfaat.TERM = newTERM;
	}
	if (newPREMI != undefined) {
		manfaat.PREMI = newPREMI;
	}
	if (newPLAN != undefined) {
		manfaat.PLAN = newPLAN;
	}
	if (newPLAN2 != undefined) {
		manfaat.PLAN2 = newPLAN2;
	}
	if (newUNIT != undefined) {
		manfaat.UNIT = newUNIT;
	}
	if (newSAVER != undefined) {
		manfaat.SAVER = newSAVER;
	}

	manfaat.inputAdvance = inputAdvance;
	manfaat.inputAdvanceCode = inputAdvanceCode;
	manfaat.inputNested = inputNested;
	manfaat.isPPH = isPPH;
	return manfaat;
}

function convertManfaatToManfaatList(isNeedToBeCalculated, alterationDate, riderStatus, approvalTypeConversion, isGIO, isFUW, code, oldCode, seq, name, 
	coverageType, type, clazz, smokerStatus, flagIncrease, anb, age, ageNew, anbNew, key, customerId, 
	prevSA, SA, TERM, PREMI, PLAN, PLAN2, UNIT, SAVER, prevPremi, prevAccm, inputAdvance, previousInputAdvance, inputNested, loadList, histValue, currValue, newRider, saOriginal,
	previousManfaat) {

	var manfaat = {};

	if (alterationDate != undefined) {
		manfaat.alterationDate = alterationDate;
	}

	if (isNeedToBeCalculated != undefined) {
		manfaat.isNeedToBeCalculated = isNeedToBeCalculated;
	}else{
		manfaat.isNeedToBeCalculated = false;
	}
	
	manfaat.riderStatus = riderStatus;
	manfaat.code = code;
	manfaat.oldCode = oldCode;
	manfaat.seq = seq;
	manfaat.name = name;
	manfaat.coverageType = coverageType;
	manfaat.type = type;
	manfaat.flagIncrease = flagIncrease;
	manfaat.saOriginal = saOriginal;
	manfaat.newRider = newRider;
	manfaat.approvalTypeConversion = approvalTypeConversion;
	manfaat.isGIO = isGIO;
	manfaat.isFUW = isFUW;
	manfaat.cumulativeCalculateUsingNewRate = previousManfaat.cumulativeCalculateUsingNewRate;
	manfaat.cumulativeRemainingSA = previousManfaat.cumulativeRemainingSA;
	manfaat.cumulativePreviousSA = previousManfaat.cumulativePreviousSA;
	manfaat.cumulativeCurrentResult = previousManfaat.cumulativeCurrentResult;
	manfaat.cumulativePreviousSumResult = previousManfaat.cumulativePreviousSumResult;
	
	var custList = [];
	var cust = {};
	cust.anb = anb;
	cust.age = age;
	cust.ageNew = ageNew;
	cust.anbNew = anbNew;
	cust.key = key;
	cust.clazz = clazz;
	cust.smokerStatus = smokerStatus;
	cust.customerId = customerId;
	cust.loadList = loadList;

	var itemInput = [];
	var tmpItemInput = {};

	if (SA != undefined) {
		if (SA > 0) {
			tmpItemInput.code = 'INPUTSA';
			tmpItemInput.inputValue = SA;
			tmpItemInput.key = "PDSA";
			itemInput.push(tmpItemInput);
			if(manfaat.saOriginal == undefined || manfaat.saOriginal == 0){
				manfaat.saOriginal = SA;
			}
		}
	}
	tmpItemInput = {};
	if (TERM != undefined) {
		if (TERM > 0) {
			tmpItemInput.code = 'TERMOPTION';
			tmpItemInput.inputValue = TERM;
			tmpItemInput.key = "PDTERM";
			itemInput.push(tmpItemInput);
		}
	}
	tmpItemInput = {};
	if (PREMI == undefined) {
		PREMI = 0;
	}
	tmpItemInput.code = 'INPUTPREMI';
	tmpItemInput.inputValue = PREMI;
	tmpItemInput.key = "PDPREMI";
	itemInput.push(tmpItemInput);

	tmpItemInput = {};
	if (PLAN != undefined) {
		tmpItemInput.code = 'PLANOPTION3';
		tmpItemInput.inputValue = PLAN;
		tmpItemInput.key = "PDPLAN";

		if (inputAdvance != undefined) {
			tmpItemInput.inputAdvance = inputAdvance;
		}
		if (inputNested != undefined) {
			tmpItemInput.inputNested = inputNested;
		}

		itemInput.push(tmpItemInput);
	}

	tmpItemInput = {};
	if (PLAN2 != undefined) {
		tmpItemInput.code = 'PLANOPTION3';
		tmpItemInput.inputValue = PLAN2;
		tmpItemInput.key = "PDPLAN2";

		if (inputAdvance != undefined) {
			tmpItemInput.inputAdvance = inputAdvance;
		}
		if (inputNested != undefined) {
			tmpItemInput.inputNested = inputNested;
		}

		itemInput.push(tmpItemInput);
	}

	tmpItemInput = {};
	if (UNIT != undefined) {
		tmpItemInput.code = 'INPUTUNIT';
		tmpItemInput.inputValue = UNIT;
		tmpItemInput.key = "PDUNIT";
		itemInput.push(tmpItemInput);
	}

	tmpItemInput = {};
	if (SAVER != undefined) {
		tmpItemInput.code = 'INPUTSAVER';
		tmpItemInput.inputValue = SAVER;
		tmpItemInput.key = "PDSAVER";
		itemInput.push(tmpItemInput);
	}

	cust.itemInput = itemInput;
	custList.push(cust);

	manfaat.custList = custList;
	if (prevPremi == undefined) {
		prevPremi = 0;
	}
	if (prevAccm == undefined) {
		prevAccm = 0;
	}
	if (prevSA == undefined) {
		prevSA = 0;
	}

	if(coverageType == "topup" || coverageType.toLowerCase() == "saver"){
		manfaat.previousSaver = prevPremi;
	}else{
		manfaat.previousPremi = prevPremi;
		manfaat.previousAccm = prevAccm;
		manfaat.previousSA = prevSA;
	}

	if(histValue != undefined){
		manfaat.histValue = histValue;
	}

	if(currValue != undefined){
		manfaat.currValue = currValue;
	}
	
	manfaat.previousInputAdvance = previousInputAdvance;
	return manfaat;
}


function prepareHistoryData(newData, alterationHistory) {
	var age;
	var oldSA = undefined;
	var oldTERM = undefined;
	var oldPLAN = undefined;
	var oldPLAN2 = undefined;
	var oldPREMI = undefined;
	var oldUNIT = undefined;
	var oldSAVER = undefined;
	var oldAge = undefined;
	var oldSmokingStatus = undefined;
	var oldAge = undefined;
	var alterationDate = undefined;

	var isNewBusiness = true;

	var tmpHistManfaatList = [];
	var oldManfaat = undefined;
	var listOldManfaat = [];
	for (var i = 0; i < alterationHistory.length; i++) {
		alterationDate = alterationHistory[i].alterationDate;
		tmpHistManfaatList = alterationHistory[i].manfaatList;
		if (i > 0) {
			if (isNewBusiness) {
				break;
			}
		}

		var tmpHistManfaat = {};
		for (var j = 0; j < tmpHistManfaatList.length; j++) {
			tmpHistManfaat = tmpHistManfaatList[j];
			if (tmpHistManfaat.code != newData.code) {

				if ((!((tmpHistManfaat.code.indexOf("H1X") > -1 && newData.code.indexOf("H1X") > -1) || 
				(tmpHistManfaat.code.indexOf("H1Y") > -1 && newData.code.indexOf("H1Y") > -1) ||
				(tmpHistManfaat.code.indexOf("H1Z") > -1 && newData.code.indexOf("H1Z") > -1) ))){
					continue;
				} 

			}

			if(newData.newLifeAssured){
				continue;
			}

			if (i == 0) {
				isNewBusiness = false;
			}

			var tmpHistCustList = {};
			for (var k = 0; k < tmpHistManfaat.custList.length; k++) {
				tmpHistCustList = tmpHistManfaat.custList[k];

				if (tmpHistCustList.key != newData.tertanggungKey) {
					continue;
				}
				oldSA = undefined;
				oldTERM = undefined;
				oldPREMI = undefined;
				oldPLAN = undefined;
				oldPLAN2 = undefined;
				oldUNIT = undefined;
				oldSAVER = undefined;

				var isPDSAChanged = false;
				var isPDTERMChanged = false;
				var isPDPLANChanged = false;
				var isPDPLAN2Changed = false;
				var isPDUNITChanged = false;
				var isPDSAVERChanged = false;

				var tmpHistInputItem = {};
				for (var l = 0; l < tmpHistCustList.itemInput.length; l++) {
					tmpHistInputItem = tmpHistCustList.itemInput[l];

					if (tmpHistInputItem.key == "PDSA") {
						oldSA = tmpHistInputItem.inputValue;
						//untuk original SA basic product
						newData.saOriginal = tmpHistInputItem.inputValue;
						//end untuk original SA basic product
					} else if (tmpHistInputItem.key == "PDTERM") {
						oldTERM = tmpHistInputItem.inputValue;
					} else if (tmpHistInputItem.key == "PDPLAN") {
						oldPLAN = tmpHistInputItem.inputValue;
					} else if (tmpHistInputItem.key == "PDPLAN2") {
						oldPLAN2 = tmpHistInputItem.inputValue;
					} else if (tmpHistInputItem.key == "PDPREMI") {
						oldPREMI = tmpHistInputItem.inputValue;
					} else if (tmpHistInputItem.key == "PDUNIT") {
						oldUNIT = tmpHistInputItem.inputValue;
					} else if (tmpHistInputItem.key == "PDSAVER") {
						oldSAVER = tmpHistInputItem.inputValue;
					}

				}

				if (newData.SA != oldSA) {
					isPDSAChanged = true;
				}
				if (newData.TERM != oldTERM) {
					isPDTERMChanged = true;
				}
				if (newData.PLAN != oldPLAN) {
					isPDPLANChanged = true;
				}
				if (newData.PLAN2 != oldPLAN2) {
					isPDPLAN2Changed = true;
				}
				if (newData.UNIT != oldUNIT) {
					isPDUNITChanged = true;
				}
				if (newData.SAVER != oldSAVER) {
					isPDSAVERChanged = true;
				}

				//tmpHistManfaat.alterationDate = alterationDate;
				oldManfaat = convertParamCustList(tmpHistManfaat, tmpHistCustList, alterationDate, tmpHistCustList.age);
				listOldManfaat.push(oldManfaat);
				oldManfaat = undefined;
			}
		}
	}

	var deletedIndex = [];
	var nextManfaat;
	var tmpListOldManfaat = listOldManfaat;
	listOldManfaat = [];
	for (var j = 0; j < tmpListOldManfaat.length; j++) {
		oldManfaat = tmpListOldManfaat[j];
		nextManfaat = tmpListOldManfaat[j+1];

		if(nextManfaat != undefined){
			if (!(oldManfaat.SA == nextManfaat.SA && 
				oldManfaat.TERM == nextManfaat.TERM && 
				oldManfaat.PLAN == nextManfaat.PLAN && 
				oldManfaat.PLAN2 == nextManfaat.PLAN2 && 
				oldManfaat.UNIT == nextManfaat.UNIT && 
				oldManfaat.SAVER == nextManfaat.SAVER)) { 
				listOldManfaat.push(oldManfaat);
			}
		}else{
			if(j > 1){
				var beforeManfaat;
				var beforeManfaat2;
				beforeManfaat = tmpListOldManfaat[j-1];
				beforeManfaat2 = tmpListOldManfaat[j-2];
				if(oldManfaat.SA == beforeManfaat.SA && beforeManfaat.SA == beforeManfaat2.SA){
					listOldManfaat.pop;
				}
			}
			else{
				listOldManfaat.push(oldManfaat);
			}
		}
	}

	return listOldManfaat;
}

function convertToManfaatList(manfaat) {
	var manfaatList = [];
	var tmpManfaat = {};

	var histValue = manfaat.rule.histValue; 
	var currValue = manfaat.rule.currValue;
	var tmpRule = manfaat.rule;
	var newRider = manfaat.rule.newRider;
	var approvalTypeConversion = manfaat.rule.approvalTypeConversion;
	var isGIO = manfaat.rule.isGIO;
	var isFUW = manfaat.rule.isFUW;
	var clazz = manfaat.rule.newRule.clazz;

	var rule = {};
	if (tmpRule.rule == "SA" || tmpRule.rule == "PLAN" || tmpRule.rule == "UNIT") {
		var prevPremi;
		if (tmpRule.isTermChanged) {
			for (var i = 0; i < tmpRule.prevRule.length; i++) {
				rule = tmpRule.prevRule[i];

				tmpManfaat = convertManfaatToManfaatList(manfaat.isNeedToBeCalculated, rule.alterationDate, manfaat.riderStatus, approvalTypeConversion, isGIO, isFUW, manfaat.code, 
					manfaat.oldCode, manfaat.seq, manfaat.name, manfaat.coverageType, manfaat.type, clazz,
					manfaat.smokerStatus, manfaat.flagIncrease, rule.anb, rule.age, manfaat.rule.newRule.ageNew, manfaat.rule.newRule.anbNew, manfaat.tertanggungKey, manfaat.tertanggungCustomerId,
					rule.prevSA, rule.SA, tmpRule.TERM, rule.PREMI, rule.PLAN, rule.PLAN2, rule.UNIT, rule.SAVER, 0, 0, undefined, undefined, undefined, manfaat.loadList, histValue, currValue,
					newRider, manfaat.saOriginal, manfaat);

				manfaatList.push(tmpManfaat);
			}
		} else {
			rule = tmpRule.prevRule[0];

			if (rule != undefined) {
				tmpManfaat = convertManfaatToManfaatList(manfaat.isNeedToBeCalculated, rule.alterationDate, manfaat.riderStatus, approvalTypeConversion, isGIO, isFUW, manfaat.code, 
					manfaat.oldCode, manfaat.seq, manfaat.name, manfaat.coverageType, manfaat.type, clazz,
					manfaat.smokerStatus, manfaat.flagIncrease, rule.anb, rule.age, manfaat.rule.newRule.ageNew, manfaat.rule.newRule.anbNew, manfaat.tertanggungKey, manfaat.tertanggungCustomerId,
					rule.prevSA, rule.SA, tmpRule.TERM, rule.PREMI, rule.PLAN, rule.PLAN2, rule.UNIT, rule.SAVER, 0, 0, undefined, undefined, undefined, manfaat.loadList, histValue, currValue,
					newRider, manfaat.saOriginal, manfaat);

				manfaatList.push(tmpManfaat);				
			}
		}
		prevPremi = manfaat.rule.prevPREMI;
		prevAccm = manfaat.rule.prevACCM;
		rule = tmpRule.newRule;
		tmpManfaat = convertManfaatToManfaatList(manfaat.isNeedToBeCalculated, rule.alterationDate, manfaat.riderStatus, approvalTypeConversion, isGIO, isFUW, manfaat.code,  
			manfaat.oldCode, manfaat.seq, manfaat.name, manfaat.coverageType, manfaat.type, clazz,
			manfaat.smokerStatus, manfaat.flagIncrease, rule.anb, rule.age, rule.ageNew, rule.anbNew, manfaat.tertanggungKey, manfaat.tertanggungCustomerId,
			rule.prevSA, rule.SA, tmpRule.TERM, manfaat.PREMI, rule.PLAN, rule.PLAN2, rule.UNIT, rule.SAVER, prevPremi, prevAccm, manfaat.inputAdvance, rule.previousInputAdvance, 
			manfaat.inputNested, manfaat.loadList, histValue, currValue, newRider, manfaat.saOriginal, manfaat);
	
		manfaatList.push(tmpManfaat);

	} else {
		rule = tmpRule.newRule;

		if(manfaat.coverageType == "topup"){
			for(var i = 0; i < manfaat.itemInput.length; i++){
				if(manfaat.itemInput[i].code == "INPUTPREMI"){
					manfaat.PREMI = manfaat.itemInput[i].inputValue;
				}
			}

			tmpManfaat = convertManfaatToManfaatList(manfaat.isNeedToBeCalculated, undefined, manfaat.riderStatus, approvalTypeConversion, isGIO, isFUW, manfaat.code, manfaat.oldCode,
				manfaat.seq, manfaat.name, manfaat.coverageType, manfaat.type, clazz,
				manfaat.smokerStatus, manfaat.flagIncrease, rule.anb, rule.age, rule.ageNew, rule.anbNew, manfaat.tertanggungKey, manfaat.tertanggungCustomerId,
				undefined, manfaat.SA, manfaat.TERM, manfaat.PREMI, manfaat.PLAN, manfaat.PLAN2, manfaat.UNIT, manfaat.SAVER, tmpRule.prevPREMI, tmpRule.prevACCM,
				manfaat.inputAdvance, undefined, manfaat.inputNested, manfaat.loadList, histValue, currValue, newRider, manfaat.saOriginal, manfaat);
		}else{
			tmpManfaat = convertManfaatToManfaatList(manfaat.isNeedToBeCalculated, undefined, manfaat.riderStatus, approvalTypeConversion, isGIO, isFUW, manfaat.code, manfaat.oldCode,
				manfaat.seq, manfaat.name, manfaat.coverageType, manfaat.type, clazz,
				manfaat.smokerStatus, manfaat.flagIncrease, rule.anb, rule.age, rule.ageNew, rule.anbNew, manfaat.tertanggungKey, manfaat.tertanggungCustomerId,
				undefined, manfaat.SA, manfaat.TERM, manfaat.PREMI, manfaat.PLAN, manfaat.PLAN2, manfaat.UNIT, manfaat.SAVER, undefined, undefined, manfaat.inputAdvance, undefined, 
				manfaat.inputNested, manfaat.loadList, histValue, currValue, newRider, manfaat.saOriginal, manfaat);

		}

		manfaatList.push(tmpManfaat);
	}

	return manfaatList;
}

function checkIsNeedToBeCalculated(newData, listHistory, alterationHist){
	var isNeedToBeCalculated = false;

	var hist = listHistory[0];
	if(hist != undefined){
		if(hist.SA != undefined && newData.SA != undefined){
			if(parseInt(hist.SA) != parseInt(newData.SA)){
				isNeedToBeCalculated = true;
			}	
		}
		if(hist.TERM != undefined && newData.TERM != undefined){
			if(hist.TERM != newData.TERM){
				isNeedToBeCalculated = true;
			}
		}
		if(hist.PLAN != undefined && newData.PLAN != undefined){
			if(hist.PLAN != newData.PLAN){
				isNeedToBeCalculated = true;
			}
		}
		if(hist.PLAN2 != undefined && newData.PLAN2 != undefined){
			if(hist.PLAN2 != newData.PLAN2){
				isNeedToBeCalculated = true;
			}
		}
		if(hist.UNIT != undefined && newData.UNIT != undefined){
			if(hist.UNIT != newData.UNIT){
				isNeedToBeCalculated = true;
			}
		}
		if(hist.SAVER != undefined && newData.SAVER != undefined){
			if(hist.SAVER != newData.SAVER){
				isNeedToBeCalculated = true;
			}
		}

		if(hist.smokerStatus != undefined && hist.smokerStatus != "" && newData.smokerStatus != undefined && newData.smokerStatus != ""){
			if(hist.smokerStatus != newData.smokerStatus){
				isNeedToBeCalculated = true;
			}
		}

		if(hist.clazz != undefined && hist.clazz != "" && newData.clazz != undefined && newData.clazz != ""){
			if(newData.clazz != hist.clazz){
				isNeedToBeCalculated = true;
			}
		}

		if(hist.code.indexOf("H1X") > -1 || hist.code.indexOf("H1Y") > -1 || hist.code.indexOf("H1Z") > -1 || 
			newData.code.indexOf("H1X") > -1 || newData.code.indexOf("H1Y") > -1 || newData.code.indexOf("H1Z") > -1){
			if(hist.code != newData.code){
				isNeedToBeCalculated = true;
			}
		}

	}else{
		var isNotExistInHist = false;
		if(alterationHist.length > 0){
			var tmpHistManfaatList =  alterationHist[0].manfaatList;
			var tmpHistManfaat = {};
			var tmpHistCustList = {};

			for (var j = 0; j < tmpHistManfaatList.length; j++) {
				tmpHistManfaat = tmpHistManfaatList[j];
				tmpHistCustList = tmpHistManfaat.custList[0];
				
				if (tmpHistManfaat.code == newData.code) {
					if(tmpHistCustList.key == newData.tertanggungKey){
						isNotExistInHist = true;
						break;	
					}
				}
			}		
		}
		if(!isNotExistInHist){
			isNeedToBeCalculated = true;
		}
	}

	if(newData.newLifeAssured){
		isNeedToBeCalculated = true;
	}

	return isNeedToBeCalculated;
}

function prepareLoadList(newManfaat, listHistory){
	var allLoadList = [];
	var objLoadList = {};

	var tmpLoadList = getLoadList(newManfaat);

	var tmpLoadListHist = [];
	for (var h = 0; h < listHistory.length; h++) {
		tmpLoadListHist = getLoadList(listHistory[h]);

		for (var i = 0; i < tmpLoadListHist.length; i++) {
			tmpLoadList.push(tmpLoadListHist[i]);
		}
	}

	//distinct load list
	//get all code
	var allCode = [];

	for (var i = 0; i < tmpLoadList.length; i++) {
		if(allCode.indexOf(tmpLoadList[i].code) == -1){
			allCode.push(tmpLoadList[i].code);
			allLoadList.push(tmpLoadList[i]);
		}
	}

	return allLoadList;
}

function getLoadList(tmpObjList){
	var loadList = [];
	var tmpLoadList;

	var objLoadList = {};
	if(tmpObjList.loadList != undefined){
		for (var j = 0; j < tmpObjList.loadList.length; j++) {
			tmpLoadList = tmpObjList.loadList[j];
			objLoadList = {};
			objLoadList.code = tmpLoadList.code;
			objLoadList.selectedValue = tmpLoadList.selectedValue;
			objLoadList.divider = tmpLoadList.divider;

			loadList.push(objLoadList);
		}
	}
	return loadList;
}