const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: null,
            userList: [],
        },
        actions: {
            submitSignupForm: async formData => {
                console.log("Antes de fetch: ", formData);
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
                        localStorage.setItem("token", data.access_token);
                        return { success: true, error: null };
                    } else {
                        const errorData = await response.json();
                        return { success: false, error: errorData.error };
                    }
                } catch (error) {
                    return { success: false, error: "Request error: " + error.message };
                }
            },

            getUserInfo: async () => {
                let myToken = localStorage.getItem("token");
                try {
                    const response = await fetch("https://crispy-spoon-q56xvgvrg4rf5wq-3001.app.github.dev/api/user", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${myToken}`,
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setStore({ user: data });
                        return data;
                    } else {
                        throw new Error("Error fetching user info");
                    }
                } catch (error) {
                    console.error("Error:", error);
                    return null;
                }
            },

            getUserList: async () => {
                let myToken = localStorage.getItem("token");
                try {
                    const response = await fetch("https://crispy-spoon-q56xvgvrg4rf5wq-3001.app.github.dev/api/private", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${myToken}`,
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setStore({ userList: data });
                        return data;
                    } else {
                        throw new Error("Error fetching user list");
                    }
                } catch (error) {
                    console.error("Error:", error);
                    return [];
                }
            },

            logout: () => {
                localStorage.removeItem('token');
                setStore({ user: null, userList: [] });
            }
        }
    };
};

export default getState;

