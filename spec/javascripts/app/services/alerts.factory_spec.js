describe("Alerts helpers function in the app", function() {
  var alertsFactory;

  beforeEach(module("play"));

  beforeEach(inject(function (_alertsFactory_) {
    alertsFactory = _alertsFactory_;
  }));

//Groups obtained querying all
  var groups = [
  {"assets":[{"assetId":"Pulsera_001","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"description":"","enable":true,"externalId":"Pulsera_001","family":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"eNest es una solución personal avanzada de seguridad que permite al usuario alertar sobre situaciones de emergencia, y estar localizado en todo momento y en cualquier lugar","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":22,"version":0},"id":70,"name":"eNest","version":0},"id":40,"location":"","rule":{"assetFamily":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"eNest es una solución personal avanzada de seguridad que permite al usuario alertar sobre situaciones de emergencia, y estar localizado en todo momento y en cualquier lugar","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":22,"version":0},"id":70,"name":"eNest","version":0},"author":"luis","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"fcreation":1422355930000,"id":56,"name":"AlertaDistanciaSeguridad","path":"com.altran.kharonte.middleware.rulesengine.AlertaDistanciaSeguridad","source":"WHEN (PAYLOAD.distanceToHome > 1000) THEN\n\talert(\"alertaDistancia\",4)\nEND ","version":6},"version":2,"$$hashKey":"object:38"},{"assetId":"Cam_001","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"description":"","enable":true,"externalId":"Cam_001","family":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"Cámara IP FI8910W","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":23,"version":0},"id":71,"name":"FI8910W","version":0},"id":41,"location":"41.35890136704563, 2.0997726917266846","rule":{"assetFamily":{"company":{"id":1,"nombre":"Altran","tipoContrato":"ENTERPRISE","version":0},"descripcion":"Generic family","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":1,"version":0},"id":1,"name":"Generic","version":0},"author":"Altran","company":{"id":1,"nombre":"Altran","tipoContrato":"ENTERPRISE","version":0},"fcreation":1398424271000,"id":1,"name":"NoRule","path":"","source":null,"version":0},"version":0,"$$hashKey":"object:39"}],"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"id":2,"name":"Elder_001","version":0,"dbName":"Andrés Pajares","$$hashKey":"object:23"},{"assets":[{"assetId":"Cam_002","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"description":"Cámara para User_002","enable":true,"externalId":"","family":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"Cámara IP FI8910W","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":23,"version":0},"id":71,"name":"FI8910W","version":0},"id":44,"location":"41.36624520292533, 2.1280860900878906","rule":{"assetFamily":{"company":{"id":1,"nombre":"Altran","tipoContrato":"ENTERPRISE","version":0},"descripcion":"Generic family","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":1,"version":0},"id":1,"name":"Generic","version":0},"author":"Altran","company":{"id":1,"nombre":"Altran","tipoContrato":"ENTERPRISE","version":0},"fcreation":1398424271000,"id":1,"name":"NoRule","path":"","source":null,"version":0},"version":0,"$$hashKey":"object:42"},{"assetId":"Pulsera_002","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"description":"Pulsera para User_002","enable":true,"externalId":"","family":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"eNest es una solución personal avanzada de seguridad que permite al usuario alertar sobre situaciones de emergencia, y estar localizado en todo momento y en cualquier lugar","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":22,"version":0},"id":70,"name":"eNest","version":0},"id":43,"location":"","rule":{"assetFamily":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"eNest es una solución personal avanzada de seguridad que permite al usuario alertar sobre situaciones de emergencia, y estar localizado en todo momento y en cualquier lugar","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":22,"version":0},"id":70,"name":"eNest","version":0},"author":"luis","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"fcreation":1422355930000,"id":56,"name":"AlertaDistanciaSeguridad","path":"com.altran.kharonte.middleware.rulesengine.AlertaDistanciaSeguridad","source":"WHEN (PAYLOAD.distanceToHome > 1000) THEN\n\talert(\"alertaDistancia\",4)\nEND ","version":6},"version":5,"$$hashKey":"object:43"}],"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"id":4,"name":"Elder_003","version":1,"$$hashKey":"object:24"},{"assets":[{"assetId":"Camara_003","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"description":"Camara para user_003","enable":true,"externalId":"","family":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"Cámara IP FI8910W","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":23,"version":0},"id":71,"name":"FI8910W","version":0},"id":46,"location":"41.35825713137813, 2.117142677307129","rule":{"assetFamily":{"company":{"id":1,"nombre":"Altran","tipoContrato":"ENTERPRISE","version":0},"descripcion":"Generic family","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":1,"version":0},"id":1,"name":"Generic","version":0},"author":"Altran","company":{"id":1,"nombre":"Altran","tipoContrato":"ENTERPRISE","version":0},"fcreation":1398424271000,"id":1,"name":"NoRule","path":"","source":null,"version":0},"version":0,"$$hashKey":"object:46"},{"assetId":"Pulsera_003","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"description":"Pulsera para user_003","enable":true,"externalId":"","family":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"eNest es una solución personal avanzada de seguridad que permite al usuario alertar sobre situaciones de emergencia, y estar localizado en todo momento y en cualquier lugar","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":22,"version":0},"id":70,"name":"eNest","version":0},"id":45,"location":"","rule":{"assetFamily":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"eNest es una solución personal avanzada de seguridad que permite al usuario alertar sobre situaciones de emergencia, y estar localizado en todo momento y en cualquier lugar","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":22,"version":0},"id":70,"name":"eNest","version":0},"author":"luis","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"fcreation":1422355930000,"id":56,"name":"AlertaDistanciaSeguridad","path":"com.altran.kharonte.middleware.rulesengine.AlertaDistanciaSeguridad","source":"WHEN (PAYLOAD.distanceToHome > 1000) THEN\n\talert(\"alertaDistancia\",4)\nEND ","version":6},"version":0,"$$hashKey":"object:47"}],"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"id":5,"name":"Elder_004","version":1,"$$hashKey":"object:25"},{"assets":[{"assetId":"Camara_004","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"description":"Camara para user004","enable":true,"externalId":"","family":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"Cámara IP FI8910W","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":23,"version":0},"id":71,"name":"FI8910W","version":0},"id":48,"location":"41.370110046816414, 2.106499671936035","rule":{"assetFamily":{"company":{"id":1,"nombre":"Altran","tipoContrato":"ENTERPRISE","version":0},"descripcion":"Generic family","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":1,"version":0},"id":1,"name":"Generic","version":0},"author":"Altran","company":{"id":1,"nombre":"Altran","tipoContrato":"ENTERPRISE","version":0},"fcreation":1398424271000,"id":1,"name":"NoRule","path":"","source":null,"version":0},"version":0,"$$hashKey":"object:50"},{"assetId":"Pulsera_004","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"description":"Pulsera para user004","enable":true,"externalId":"","family":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"eNest es una solución personal avanzada de seguridad que permite al usuario alertar sobre situaciones de emergencia, y estar localizado en todo momento y en cualquier lugar","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":22,"version":0},"id":70,"name":"eNest","version":0},"id":47,"location":"","rule":{"assetFamily":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"eNest es una solución personal avanzada de seguridad que permite al usuario alertar sobre situaciones de emergencia, y estar localizado en todo momento y en cualquier lugar","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":22,"version":0},"id":70,"name":"eNest","version":0},"author":"luis","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"fcreation":1422355930000,"id":56,"name":"AlertaDistanciaSeguridad","path":"com.altran.kharonte.middleware.rulesengine.AlertaDistanciaSeguridad","source":"WHEN (PAYLOAD.distanceToHome > 1000) THEN\n\talert(\"alertaDistancia\",4)\nEND ","version":6},"version":0,"$$hashKey":"object:51"}],"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"id":6,"name":"Elder_002","version":1,"dbName":"Fernando Esteso","$$hashKey":"object:26"},{"assets":[{"assetId":"Pulsera_005","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"description":"Pulsera para user005","enable":true,"externalId":"","family":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"eNest es una solución personal avanzada de seguridad que permite al usuario alertar sobre situaciones de emergencia, y estar localizado en todo momento y en cualquier lugar","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":22,"version":0},"id":70,"name":"eNest","version":0},"id":49,"location":"","rule":{"assetFamily":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"eNest es una solución personal avanzada de seguridad que permite al usuario alertar sobre situaciones de emergencia, y estar localizado en todo momento y en cualquier lugar","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":22,"version":0},"id":70,"name":"eNest","version":0},"author":"luis","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"fcreation":1422355930000,"id":56,"name":"AlertaDistanciaSeguridad","path":"com.altran.kharonte.middleware.rulesengine.AlertaDistanciaSeguridad","source":"WHEN (PAYLOAD.distanceToHome > 1000) THEN\n\talert(\"alertaDistancia\",4)\nEND ","version":6},"version":0,"$$hashKey":"object:54"},{"assetId":"Camara_005","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"description":"","enable":true,"externalId":"","family":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"Cámara IP FI8910W","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":23,"version":0},"id":71,"name":"FI8910W","version":0},"id":50,"location":"41.35973886387978, 2.1121859550476074","rule":{"assetFamily":{"company":{"id":1,"nombre":"Altran","tipoContrato":"ENTERPRISE","version":0},"descripcion":"Generic family","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":1,"version":0},"id":1,"name":"Generic","version":0},"author":"Altran","company":{"id":1,"nombre":"Altran","tipoContrato":"ENTERPRISE","version":0},"fcreation":1398424271000,"id":1,"name":"NoRule","path":"","source":null,"version":0},"version":0,"$$hashKey":"object:55"}],"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"id":7,"name":"Elder_005","version":1,"dbName":"Concha Velasco","$$hashKey":"object:27"}
  ];
//Alerts obtained querying all by date
  var alerts = [{"userId":"Elder_001","alerts":[{"fecha":1425284408000,"id":106,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1425284405000,"id":105,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424861758000,"id":96,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424791025000,"id":92,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424791022000,"id":91,"level":4,"msg":"alertaDistancia","version":0}]},{"userId":"Elder_003","alerts":[{"fecha":1425284424000,"id":108,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1425284421000,"id":107,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424861775000,"id":99,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424861772000,"id":98,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424861769000,"id":97,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424791006000,"id":90,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424791004000,"id":89,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424791000000,"id":88,"level":4,"msg":"alertaDistancia","version":0}]},{"userId":"Elder_004","alerts":[{"fecha":1425284394000,"id":104,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1425284391000,"id":103,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424861799000,"id":101,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424861793000,"id":100,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424790984000,"id":87,"level":4,"msg":"alertaDistancia","version":0}]},{"userId":"Elder_002","alerts":[{"fecha":1424791046000,"id":95,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424791043000,"id":94,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424791037000,"id":93,"level":4,"msg":"alertaDistancia","version":0}]},{"userId":"Elder_005","alerts":[{"fecha":1425284436000,"id":110,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1425284434000,"id":109,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424861808000,"id":102,"level":4,"msg":"alertaDistancia","version":0}]}];

//Alerts obtained querying asset by asset
  var alertsWithoutUserInfo = [{"fecha":1425399641000,"id":114,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1425399638000,"id":113,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1425399635000,"id":112,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1425399632000,"id":111,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1425284436000,"id":110,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1425284434000,"id":109,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424861808000,"id":102,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424680192000,"id":83,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424456099000,"id":78,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424334407000,"id":71,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424246723000,"id":65,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424173792000,"id":55,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1424173789000,"id":54,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1423561460000,"id":42,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1423561457000,"id":41,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1423561454000,"id":40,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1423416916000,"id":37,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1423123286000,"id":28,"level":4,"msg":"alertaDistancia","version":0},{"fecha":1423123281000,"id":27,"level":4,"msg":"alertaDistancia","version":0}];

  it("should have a sortMomentHelper() function wich helps sort JS function to order an array with moment()", function() {
  	var firstAlert = {
  		"time": moment()
  	};
  	var secondAlert = {
  		"time": moment().add(1, 'days')
  	};
  	var thirdAlert = {
  		"time": moment().add(2, 'days')
  	};  	

    expect(secondAlert.time.isAfter(firstAlert.time)).toEqual(true)
    expect(thirdAlert.time.isAfter(secondAlert.time)).toEqual(true)

  	var alertsArray = [secondAlert, firstAlert, thirdAlert];
  	var alertsCorrected = [firstAlert, secondAlert, thirdAlert];

    alertsArray = alertsArray.sort(this.sortMomentHelper);

    for (var i; i < alertsArray; i++){
    	expect(alertsArray[i]).toEqual(alertsCorrected[i]);
    }
    
  });

  it("should have a formatAlerts() function which gets alerts from a user and returns it with a certain format", function() {
    var userAlerts = alerts[0];
    var user = "Concha Velasco";

    firstAlertFormated = {
    	"name": "Concha Velasco",
    	"userId": "Elder_001",
    	"text": "  ha salido de su zona de seguridad.",
    	"level": 4,
    	"time": moment(1425284408000).locale("es")
    }

    expect(alertsFactory.formatAlerts(userAlerts, user)[0]).toEqual(firstAlertFormated);
  })

  it("should have a getAlertsByUser() function which take an array with alerts of several users and returns only those which belongs to a specific user", function(){
  	var user = "Elder_001";
  	var userAlerts = alerts[0];

  	expect(alertsFactory.getAlertsByUser(user, alerts)).toEqual(userAlerts)
  })

  it("should have a lastUsersAlerts() function wich gets all elders and alerts and returns alerts sorted by date and elder", function(){
  	var firstAlert = {
  		"name":"Concha Velasco",
	  	"userId":"Elder_005",
	  	"text":"  ha salido de su zona de seguridad.",
	  	"level":4,
	  	"time":moment(1425284436000).locale("es")
	  }

	expect(alertsFactory.lastUsersAlerts(groups, alerts).length).toEqual(24)
  	expect(alertsFactory.lastUsersAlerts(groups, alerts)[0]).toEqual(firstAlert)

  });

  it("should have a lastWeekAlerts() function which take an array of alerts formated with formatAlerts() function and returns only the last week alerts", function(){
  	var userAlerts = alertsFactory.formatAlerts(alerts[0], "Concha Velasco")
  	var lastWeekAlertsTest = alertsFactory.lastWeekAlerts(userAlerts);

  	expect(lastWeekAlertsTest.length).toBeGreaterThan(0)
  	var valid = true;
  	
  	for (var i = 0; i < lastWeekAlertsTest.length; i ++){
  		var alertTest = moment(lastWeekAlertsTest[i].fecha);
  		if (alertTest.isBefore(moment().subtract(7, 'days'))){
  			valid =false;
  		}
  	}

  	expect(valid).toBeTruthy()
  })

  it("should have a userAlerts() function which take an user (id and name) and a array of alerts(without user info) and returns those alerts formated(with user info) and sorted by date", function(){
  	var userId = "Elder_999";
  	var userName = "Concha";

  	var userAlertsTest = alertsFactory.userAlerts(userId, alertsWithoutUserInfo, userName)
  	var firstExpectedAlert = {
  		"name":"Concha",
  		"userId":"Elder_999",
  		"text":"  ha salido de su zona de seguridad.",
  		"level":4,
	  	"time":moment(1425399641000).locale("es")
	  };

	expect(userAlertsTest.length).toEqual(19)
  	expect(userAlertsTest[0]).toEqual(firstExpectedAlert)

  })
 

});