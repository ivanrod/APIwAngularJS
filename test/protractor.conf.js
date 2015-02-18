exports.config = {
	// Donde corre Selenium
	seleniumAddress: 'http://localhost:4444/wd/hub',

	// Donde corre mi app
	baseUrl: 'http://localhost:3001',

	// Este es importante porque le dice a Protractor donde
	// tengo la directiva ng-app. Por defecto es en body...
	rootElement: 'html',

	// En este array indico donde están mis specs. Se pueden usar
	// expresiones regulares y se ejecutaran en el orden en que se
	// ingresaron en el array.
	specs: ['./e2e/specs/*.spec.js'],

	// En este atributo params se puede dejar disponible valores
	// que podré acceder dentro de mis pruebas. Esto es algo de lo
	// que me pretendo deshacer integrando mis test con Rails.
	params: {
		storeUser: {
			username: 'user',
			password: '123456'
		}
	},

	// Protractor permite trabajar con Mocha o Jasmine y permite configurar ambos.
	jasmineNodeOpts: {
		showColors: true
	}
};