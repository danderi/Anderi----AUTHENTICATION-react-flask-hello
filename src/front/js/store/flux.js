const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {

			submitSignupForm: async formData => {
				console.log("Antes de fetch: ", formData)
				try {
					const response = await fetch("https://crispy-spoon-q56xvgvrg4rf5wq-3001.app.github.dev/api/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData)
					});
		
					if (response.ok) {
						console.log("Formulario enviado exitosamente");
					} else {
						console.error("Error al enviar formulario");
					}
				} catch (error) {
					console.error("Error:", error);
				}
			},

			submitLoginForm: async loginData => {
				try {
					const response = await fetch("https://crispy-spoon-q56xvgvrg4rf5wq-3001.app.github.dev/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(loginData)
					});
		
					if (response.ok) {
						console.log("Login realizado exitosamente");
					} else {
						console.error("Error de login");
					}
				} catch (error) {
					console.error("Error:", error);
				}
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
