import axios from "axios";

const apiAuth = axios.create({
  baseURL: "https://front-school-strapi.ktsdev.ru/api",
});

type RegisterParams = {
  username: string;
  email: string;
  password: string;
};

type LoginParams = {
  identifier: string; // email или username
  password: string;
};

type AuthResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export async function register(params: RegisterParams): Promise<AuthResponse> {
  const response = await apiAuth.post<AuthResponse>("/auth/local/register", params);
  return response.data;
}

export async function login(params: LoginParams): Promise<AuthResponse> {
  const response = await apiAuth.post<AuthResponse>("/auth/local", params);
  return response.data;
}

