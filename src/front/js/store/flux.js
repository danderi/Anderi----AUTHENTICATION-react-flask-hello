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
						console.log("Form sent successfully");
					} else {
						console.error("Error submitting form");
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
						const data = await response.json();
						localStorage.setItem("jwt-token", data.token);
						return { success: true, error: null };
					} else {
						const errorMessage = await response.text();
						// Distinguimos entre diferentes tipos de errores devueltos por la API
						if (errorMessage === "email/user not found.") {
							throw new Error("Login error: User not found.");
						} else if (errorMessage === "Invalid password.") {
							throw new Error("Login error: Invalid password.");
						} else {
							throw new Error("Login error: " + errorMessage);
						}
					}
				} catch (error) {
					throw new Error("Request error: " + error.message);
				}
			},
			
			
			
//-------------------------------------------------------------------------------------------------------------------------------------------			
			fetchMyInfo: async () => {
				try {
					const response = await fetch("URL_PARA_OBTENER_LA_INFO_DE_MI_INFO", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							// Incluir cualquier header necesario, como el token de autorización si es necesario
						},
					});
					if (!response.ok) {
						throw new Error("Failed to fetch my info");
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error fetching my info:", error);
					throw error;
				}
			},
	
			fetchUsers: async () => {
				try {
					const response = await fetch("URL_PARA_OBTENER_LA_LISTA_DE_USUARIOS", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							// Incluir cualquier header necesario, como el token de autorización si es necesario
						},
					});
					if (!response.ok) {
						throw new Error("Failed to fetch users");
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error fetching users:", error);
					throw error;
				}
			},
//----------------------------------------------------------------------------------------------------		

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
