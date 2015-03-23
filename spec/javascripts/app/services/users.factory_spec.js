describe("Users (elders) helper functions in the app", function() {
  var usersFactory;

  beforeEach(module("play"));

  beforeEach(inject(function (_usersFactory_) {
    usersFactory = _usersFactory_;
  }));

  //////////
  //Mocks //
  //////////
  var response = [{"assets":[{"assetId":"Cam_002","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"description":"Cámara para User_002","enable":true,"externalId":"","family":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"Cámara IP FI8910W","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":23,"version":0},"id":71,"name":"FI8910W","version":0},"id":44,"location":"41.36624520292533, 2.1280860900878906","rule":{"assetFamily":{"company":{"id":1,"nombre":"Altran","tipoContrato":"ENTERPRISE","version":0},"descripcion":"Generic family","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":1,"version":0},"id":1,"name":"Generic","version":0},"author":"Altran","company":{"id":1,"nombre":"Altran","tipoContrato":"ENTERPRISE","version":0},"fcreation":1398424271000,"id":1,"name":"NoRule","path":"","source":null,"version":0},"version":0,"$$hashKey":"object:54"},{"assetId":"Pulsera_002","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"description":"Pulsera para User_002","enable":true,"externalId":"","family":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"eNest es una solución personal avanzada de seguridad que permite al usuario alertar sobre situaciones de emergencia, y estar localizado en todo momento y en cualquier lugar","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":22,"version":0},"id":70,"name":"eNest","version":0},"id":43,"location":"","rule":{"assetFamily":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"eNest es una solución personal avanzada de seguridad que permite al usuario alertar sobre situaciones de emergencia, y estar localizado en todo momento y en cualquier lugar","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":22,"version":0},"id":70,"name":"eNest","version":0},"author":"luis","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"fcreation":1422355930000,"id":56,"name":"AlertaDistanciaSeguridad","path":"com.altran.kharonte.middleware.rulesengine.AlertaDistanciaSeguridad","source":"WHEN (PAYLOAD.distanceToHome > 1000) THEN\n\talert(\"alertaDistancia\",4)\nEND ","version":6},"version":5,"$$hashKey":"object:55"}],"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"id":4,"name":"Elder_003","version":1,"$$hashKey":"object:36"},{"assets":[{"assetId":"Camara_005","company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"description":"","enable":true,"externalId":"","family":{"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"descripcion":"Cámara IP FI8910W","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":23,"version":0},"id":71,"name":"FI8910W","version":0},"id":50,"location":"41.35973886387978, 2.1121859550476074","rule":{"assetFamily":{"company":{"id":1,"nombre":"Altran","tipoContrato":"ENTERPRISE","version":0},"descripcion":"Generic family","familyPrivacyFlags":{"AADC":false,"ATRS":false,"GDSA":false,"ILMAEDP":false,"RAEM":false,"VIS":false,"VISDAS":false,"VISMicroAggregation":false,"erasable":false,"id":1,"version":0},"id":1,"name":"Generic","version":0},"author":"Altran","company":{"id":1,"nombre":"Altran","tipoContrato":"ENTERPRISE","version":0},"fcreation":1398424271000,"id":1,"name":"NoRule","path":"","source":null,"version":0},"version":0,"$$hashKey":"object:66"}],"company":{"id":5,"nombre":"Orange","tipoContrato":"ENTERPRISE","version":1},"id":7,"name":"Elder_005","version":1,"dbName":"Concha Velasco","address":"C/ Falsa 123","phone":"98789798","$$hashKey":"object:39"}];

  var carers = [{"name":"Cuidador_001","elders":[{"id":1,"userId":"Elder_001","name":"Andrés Pajares","address":"C/Falsa 123","phone":"654654695","created_at":"2015-02-26T09:16:07.054Z","updated_at":"2015-02-27T09:44:05.403Z"}]}];

  //////////
  //Tests //
  //////////
  it("should have a getElderDataFromGroup() function which take a group from play platform and returns only the elder data", function(){
  	var elderData = usersFactory.getElderDataFromGroup(response, "Elder_005");
  	var expectedData = {
					    "userId": "Elder_005",
					    "name": "Concha Velasco",
					    "address": "C/ Falsa 123",
					    "phone": "98789798"
					  };
  	expect(elderData).toEqual(expectedData);
  })

  it("should have a getCarerDataFromCarers() function which take an array of carers and returns a specific carer", function(){
    var expectedCarer = carers[0];
    var testCarer = usersFactory.getCarerDataFromCarers("Cuidador_001", carers);

    expect(testCarer).toEqual(expectedCarer);
  })

});