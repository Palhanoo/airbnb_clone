import axios from 'axios';

const api = axios.create({
    baseURL: "http://192.168.0.187:3000/api/",
    headers: { 'Content-Type': 'application/json' }
});

export const registerUser = async (user: any) => {
    try {
      console.log(user)
      const res = await api.post("/auth/signup", {
        name: user.name,
        email: user.email,
        password: user.password,
        role: "user",
        provider: "local",
        // picture: user.imageUrl,
        // accessToken: user.id,
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }

const loginUser = async (user: {email: string, password: string}) => {
    try {
        const res = await api.post("auth/signin", {
            email: user.email,
            password: user.password,
        });
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export default api;