const mockUser = {
    id: 1,
    name: "Usuario Prueba",
    email: "usuario@prueba.com",
    token: "mock-token-12345",
};

export const authService = {
    login: async (credentials) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (credentials.email === "usuario@prueba.com" && credentials.password === "password") {
                    localStorage.setItem("token", mockUser.token);
                    resolve({ token: mockUser.token, user: mockUser });
                } else {
                    reject({ response: { data: { message: "Credenciales inválidas" } } });
                }
            }, 1000);
        });
    },

    logout: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                localStorage.removeItem("token");
                resolve();
            }, 500);
        });
    },

    verifyToken: async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const token = localStorage.getItem("token");
                if (token === mockUser.token) {
                    resolve({ user: mockUser });
                } else {
                    reject({ response: { data: { message: "Token inválido" } } });
                }
            }, 500);
        });
    },

    register: async (userData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ message: "Usuario registrado exitosamente", user: { ...userData, id: Date.now() } });
            }, 1000);
        });
    },
};

export default authService;