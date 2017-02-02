function turn_off_visibility(tbid) {
    document.getElementById(tbid).style.display = "none";
}

function turn_on_visibility(tbid) {
    document.getElementById(tbid).style.display = "table";
}

function toggle_visibility(tbid) {
    if (document.getElementById(tbid).style.display != "table") {
        document.getElementById(tbid).style.display = "table";
    }
    else {
        document.getElementById(tbid).style.display = "none";
    }
}


function copyContents(element, tgt) {
    tgt.appendChild(element);
}

function makecheckbox(checkbox, parameter) {
    document.getElementById(checkbox).innerHTML = '<input id=\"globalParameterCheckBox' + document.getElementById(parameter).getAttribute("name").substring(20) + '\" type=\"checkbox\" onclick=\"onClickGlobalParameterCheckBox(\'' + document.getElementById(parameter).getAttribute("name").substring(20) + '\', \'' + parameter + '\')\">';
}

function removeduplicatecheckbox(parameter) {
    document.getElementById("globalParameterCheckBox" + document.getElementById(parameter).getAttribute("name").substring(20)).parentNode.removeChild(document.getElementById("globalParameterCheckBox" + document.getElementById(parameter).getAttribute("name").substring(20)));
}

function hideduplicatefield(parameter) {
    document.getElementById("globalParameterName" + document.getElementById(parameter).getAttribute("name").substring(20)).parentNode.style.display = "none";
}

//function showsupervisorerror(errMessage) {
function showsupervisorerror() {
    var errMessage = document.getElementById("SUPERVISOR_ERROR").value;
    if (errMessage != "not set" && errMessage != "") {
        document.getElementById("supervisorRow").style.display = "";
        document.getElementById("supervisorError").innerHTML = errMessage;
    }
}

// The scripts below use jQuery.
$(document).ready(function () {
    var initcolor = $('#currentState').text();
    $('#currentState').attr("class", "hcal_control_" + initcolor);
    if ($('#currentState').text() == "Configured") {$('#Destroy').hide();}
    var cachedRunNo = $('#RUN_NUMBER').val();
    var cachedNevents = $('#NUMBER_OF_EVENTS').val();
    var cachedSupErr = $('#SUPERVISOR_ERROR').val();
    if ($('#currentState').text() == "Configured") {
      $('#Destroy').hide();
      $('#commandSection :input[value="Exit"]').val("Halt+Destroy");
      $('#commandSection :input[value="Halt+Destroy"]').insertAfter($('#Destroy'));
    }
    var cachedState = $('#currentState').text();
    //$('#commandParameterCheckBox').attr("onclick", "onClickCommandParameterCheckBox(); toggle_visibility('Blork');");


    setInterval(function () {

      hidelocalparams();
      var currentState = $('#currentState').text();
      if (currentState != cachedState) {
        $('#currentState').attr("class", "hcal_control_" + currentState);
        if (currentState == "Initial") {
            $('#newRUN_CONFIG_SELECTEDcheckbox :checkbox').show();
        }
        else {
            $('#newRUN_CONFIG_SELECTEDcheckbox :checkbox').hide();
        }
        if (currentState == "Configured") {
          $('#Destroy').hide();
          $('#commandSection :input[value="Exit"]').val("Halt+Destroy");
          $('#commandSection :input[value="Halt+Destroy"]').insertAfter($('#Destroy'));
        }
        if (currentState == "Error") {
          $('#Destroy').show();
          $('#Destroy').siblings('input[value="Halt+Destroy"]').hide();
        }
      }
      if ($('#SUPERVISOR_ERROR').val() !=  cachedSupErr) { showsupervisorerror(); }
      if ($('#RUN_NUMBER').val() !=  cachedRunNo) { getfullpath(); }
      if ($('#NUMBER_OF_EVENTS').val() !=  cachedNevents) { getfullpath(); }
      //$('#commandParameterCheckBox').attr("onclick", "onClickCommandParameterCheckBox(); toggle_visibility('Blork');");
      cachedRunNo = $('#RUN_NUMBER').val();
      cachedNevents = $('#NUMBER_OF_EVENTS').val();
      cachedSupErr = $('#SUPERVISOR_ERROR').val();
      cachedState = currentState;
	    if ($('#EXIT').val() == "true" && currentState=="Halted") { onDestroyButton(); }
      //$('#commandParameterCheckBox').attr("onclick", "onClickCommandParameterCheckBox(); toggle_visibility('Blork');");
    }, 750);


    $('#dropdowndiv').on('change', 'select', function () {
        $('#masked_resourses_td').show();
    });
});

function setProgress(parName, progress) {
    var numberOfEvents = $("#NUMBER_OF_EVENTS").val();
    var width = $(".container").width();
    var progressPercent = 0;
    if (parName == "HCAL_EVENTSTAKEN") {
      progressPercent = 100 * progress / numberOfEvents;
    }
    else if ( parName == "PROGRESS") {
      progressPercent = 100 * progress;
    }
    var progressBarWidth = progressPercent * (width / 100);
    //$(".progressbar").width(progressBarWidth);
    progressPercent = progressPercent.toFixed(2);
    //console.log("progressPercent is: " + progressPercent);
    $(".progressbar").width(progressBarWidth).html(progressPercent + "% &nbsp; &nbsp;");
}

function mirrorSelection() {
    $('#CFGSNIPPET_KEY_SELECTED').val($('#dropdown option:selected').text());
    $('#RUN_CONFIG_SELECTED').val($('#dropdown option:selected').val());
    //$('#MASKED_RESOURCES').val($('#dropdown option:selected').attr("maskedresources"));
}

function checkCheckboxes() {
    $('#newCFGSNIPPET_KEY_SELECTEDcheckbox :checkbox').prop('checked', true);
    $('#newRUN_CONFIG_SELECTEDcheckbox :checkbox').prop('checked', true);
    $('#newMASKED_RESOURCEScheckbox :checkbox').prop('checked', true);
}

function undisable(paramNumber) {
    var parameterInputBoxID = "#globalParameterName".concat(paramNumber);
    $(parameterInputBoxID).removeAttr("disabled");
}
function clickboxes() {
    if ($('#newCFGSNIPPET_KEY_SELECTEDcheckbox :checkbox:checked').length == 0) {
        $('#newCFGSNIPPET_KEY_SELECTEDcheckbox :checkbox').click();
        $('#newRUN_CONFIG_SELECTEDcheckbox :checkbox').click();
        $('#newMASKED_RESOURCEScheckbox :checkbox').click();
    }
}
function preclickFMs() {
  $('#masks :checkbox').each( function (index) { 
    if ( $.inArray($(this).val(), $('#dropdown option:selected').attr("maskedfm").split(";"))  !== -1) { $(this).prop('checked', true); }
    else { $(this).prop('checked', false); }
  });
}

function makedropdown(availableRunConfigs, availableLocalRunKeys) {
    //availableRunConfigs = availableRunConfigs.substring(0, availableRunConfigs.length - 1);
    //var array = availableRunConfigs.split(';');
    var localRunKeysArray = JSON.parse(availableLocalRunKeys);
    var runConfigMap = JSON.parse(availableRunConfigs);
    var dropdownoption = "<select id='dropdown' > <option value='not set' maskedresources=''> --SELECT-- </option>";

    //for (var i = 0, l = array.length; i < l; i++) {
        //var option = array[i].split(':');
    for (var i = 0; i<localRunKeysArray.length; i++) {
        maskedFM = "";
        if (runConfigMap[localRunKeysArray[i]].hasOwnProperty('maskedFM')) { maskedFM=runConfigMap[localRunKeysArray[i]].maskedFM; }
        dropdownoption = dropdownoption + "<option value='" + runConfigMap[localRunKeysArray[i]].snippet + "' maskedresources='" + runConfigMap[localRunKeysArray[i]].maskedapps +"' maskedFM='" + maskedFM + "' >" + localRunKeysArray[i] + "</option>";
    }
    dropdownoption = dropdownoption + "</select>";
    $('#dropdowndiv').html(dropdownoption);
    var cfgSnippetKeyNumber = $('#CFGSNIPPET_KEY_SELECTED').attr("name").substring(20);
    var cfgSnippetArgs = "'" + cfgSnippetKeyNumber + "', 'CFGSNIPPET_KEY_SELECTED'";
    var masterSnippetNumber = $('#RUN_CONFIG_SELECTED').attr("name").substring(20);
    var masterSnippetArgs = "'" + masterSnippetNumber + "', 'RUN_CONFIG_SELECTED'";
    var maskedResourcesNumber = $('#MASKED_RESOURCES').attr("name").substring(20);
    var maskedResourcesArgs = "'" + maskedResourcesNumber + "', 'MASKED_RESOURCES'";
    var onchanges = "onClickGlobalParameterCheckBox(" + cfgSnippetArgs + "); onClickGlobalParameterCheckBox(" + masterSnippetArgs + "); onClickGlobalParameterCheckBox(" + maskedResourcesArgs + "); clickboxes(); mirrorSelection(); preclickFMs(); fillMask();";
    $('#dropdown').attr("onchange", onchanges);
}

function fillMask() {
    var finalMasks=[];
    $('#masks :checked').each(function () {
        finalMasks.push($(this).val());
    });
    //HERE
    //$('#dropdown option:selected').text()
    var userXMLmaskedApps = $('#dropdown option:selected').attr("maskedresources").split("|");
    for (var i = 0; i < userXMLmaskedApps.length; i++) {
      finalMasks.push(userXMLmaskedApps[i]);
    }
    $('#MASKED_RESOURCES').val(JSON.stringify(finalMasks));
    $('#maskTest').html(JSON.stringify(finalMasks));
}

function makecheckboxes() {
    var param = $('#AVAILABLE_RESOURCES').html().replace("[", "").replace("]","");
    param =  param.replace(/['"]+/g, '');
    var array = param.split(',');
    var maskDivContents = "<ul>";
    for (var i = 0, l = array.length; i < l; i++) {
        var option = array[i].split(':');
        var checkbox = "<li><input type='checkbox' onchange='fillMask();' value='" + option + "'>" + option + "</li>";
        maskDivContents += checkbox;
    }
    maskDivContents += "</ul>";
    $('#masks').html(maskDivContents);
}

function hidecheckboxes() {
    var currentState = $('#currentState').text();
    if (currentState == "Initial") {
        $('#dropdowndiv').show();
        $('#newCFGSNIPPET_KEY_SELECTEDcheckbox :checkbox').show();
        $('#newRUN_CONFIG_SELECTEDcheckbox :checkbox').show();
    }
    else {
        $('#dropdowndiv').hide();
        $('#newCFGSNIPPET_KEY_SELECTEDcheckbox :checkbox').hide();
        $('#newRUN_CONFIG_SELECTEDcheckbox :checkbox').hide();
    }
}

function hideinitializebutton() {
    var button = $('#commandSection :input')
    button.each(function () {
        if ($('#CFGSNIPPET_KEY_SELECTED').val() == "not set") {
            button.hide();
        }
        else {
            button.show();
        }
    });
}


function hidelocalparams() {
    if ($('#CFGSNIPPET_KEY_SELECTED').val().indexOf("global") !== -1) {
        $('#newNUMBER_OF_EVENTScheckbox').parent().hide();
        $('#newHCAL_EVENTSTAKEN').parent().hide();
    }
}

function moveversionnumber() {

    $('#hcalfmVersion').css('font-size', '12');
    $('#hcalfmVersion').css('color', '#dddddd');
    $('#hcalfmVersion').css('font-family', 'Open Sans, sans-serif');
    $('#hcalfmVersion').appendTo('#versionSpot');
}


//    function getfullpath(nEvents) {
    function getfullpath() {
      var maskSummary = $("#MASK_SUMMARY").text();
      maskSummary = maskSummary.replace(/\"/g, "");
      maskSummary = maskSummary.replace("\[","");
      maskSummary = maskSummary.replace("\]","");
      maskSummary = maskSummary.replace(/,/g, ", ");
      if (maskSummary === "") {maskSummary = "none";}
      $("#elogInfo").text("Run # " + $("#RUN_NUMBER").val()  + " - " + $(".control_label2").first().text() + " - Local run key: "+ $("#CFGSNIPPET_KEY_SELECTED").val()  + " - " + $("#NUMBER_OF_EVENTS").val() + " events, masks: " + maskSummary);
    }



function hcalOnLoad() {
    activate_relevant_table('AllParamTables');
    removeduplicatecheckbox('CFGSNIPPET_KEY_SELECTED');
    removeduplicatecheckbox('RUN_CONFIG_SELECTED');
    removeduplicatecheckbox('MASKED_RESOURCES');
    removeduplicatecheckbox('MASK_SUMMARY');
    removeduplicatecheckbox('NUMBER_OF_EVENTS');
    removeduplicatecheckbox('ACTION_MSG');
    removeduplicatecheckbox('RUN_NUMBER');
    copyContents(CFGSNIPPET_KEY_SELECTED, newCFGSNIPPET_KEY_SELECTED);
    makecheckbox('newCFGSNIPPET_KEY_SELECTEDcheckbox', 'CFGSNIPPET_KEY_SELECTED');
    copyContents(RUN_CONFIG_SELECTED, newRUN_CONFIG_SELECTED);
    makecheckbox('newRUN_CONFIG_SELECTEDcheckbox', 'RUN_CONFIG_SELECTED');
    copyContents(MASKED_RESOURCES, newMASKED_RESOURCES);
    makecheckbox('newMASKED_RESOURCEScheckbox', 'MASKED_RESOURCES');
    copyContents(MASK_SUMMARY, newMASK_SUMMARY);
    copyContents(NUMBER_OF_EVENTS, newNUMBER_OF_EVENTS);
    makecheckbox('newNUMBER_OF_EVENTScheckbox', 'NUMBER_OF_EVENTS');
    copyContents(ACTION_MSG, newACTION_MSG);
    copyContents(HCAL_EVENTSTAKEN, newHCAL_EVENTSTAKEN);
    copyContents(RUN_NUMBER, newRUN_NUMBER);
    makecheckbox('newRUN_NUMBERcheckbox', 'RUN_NUMBER');
    copyContents(HCAL_TIME_OF_FM_START, newHCAL_TIME_OF_FM_START);
    hidecheckboxes();
    hideinitializebutton();
    hidelocalparams();
    hideduplicatefield('CFGSNIPPET_KEY_SELECTED');
    hideduplicatefield('RUN_CONFIG_SELECTED');
    hideduplicatefield('MASKED_RESOURCES');
    hideduplicatefield('MASK_SUMMARY');
    hideduplicatefield('NUMBER_OF_EVENTS');
    hideduplicatefield('ACTION_MSG');
    hideduplicatefield('RUN_NUMBER');
    hideduplicatefield('HCAL_EVENTSTAKEN');
    hideduplicatefield('HCAL_TIME_OF_FM_START');
    removeduplicatecheckbox('USE_RESET_FOR_RECOVER');
    removeduplicatecheckbox('USE_PRIMARY_TCDS');
    getfullpath();
    showsupervisorerror();
    moveversionnumber();
    makedropdown($('#AVAILABLE_RUN_CONFIGS').text(), $('#AVAILABLE_LOCALRUNKEYS').text());
    onClickCommandParameterCheckBox();
}
