const BASE_URL = "https://front-school-strapi.ktsdev.ru/api";

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
  const res = await fetch(`${BASE_URL}/auth/local/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return res.json();
}

export async function login(params: LoginParams): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return res.json();
}

