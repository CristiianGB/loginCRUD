const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
	  user: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        
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
      },
      login: async (username, password) => {
        const store = getStore();
        
          const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
          if (!resp.ok) throw Error("There was a problem in the login request");
          if (resp.status === 401) {
            throw "Invalid credentials";
          } else if (resp.status === 400) {
            throw "Invalid username or password format";
          }

          const data = await resp.json();
          localStorage.setItem("token", data.token);
          setStore({ token: data.token });
          return true;
        
      },
      getProfile: () => {
		const token = getStore().token
        fetch(process.env.BACKEND_URL+"/api/protected", {
			method: "POST", 
			headers: {
				"Content-Type": "application/json",
				'Authorization': 'Bearer '+ token 
			}
		}).then((resp)=>{
			return resp.json()
		}
		).then((data)=>{
			return setStore({user: data})
		})

      },
      
    },
  };
};

export default getState;
