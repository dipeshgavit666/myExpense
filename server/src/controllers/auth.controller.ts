import type { ApiResponse, IAuthResponse, IUser } from "../types";
import { type Request, type Response } from "express";

let fakeUsers: IUser[] = [
  {
    id: "user123",
    name: "user123",
    email: "user123@gmail.com",
    password: "password123",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    id: "user456",
    name: "user456",
    email: "user456@gmail.com",
    password: "password456",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    id: "user789",
    name: "user789",
    email: "user789@gmail.com",
    password: "password789",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
];

export const signUp = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Please provide name, email and password",
    };
    res.status(400).json(response);
  }

  const existingUser = fakeUsers.find((user) => user.email === email);

  if (existingUser) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Email is alredy registered",
    };
    res.status(400).json(response);
  }

  const newUser: IUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  fakeUsers.push(newUser);

  const { password: _, ...userWithoutPassword } = newUser;

  const authResponse: IAuthResponse = {
    user: userWithoutPassword,
    token: "fake-jwt-" + newUser.id,
  };

  const response: ApiResponse<IAuthResponse> = {
    success: true,
    data: authResponse,
    message: "Account created successfully",
  };
  return res.status(201).json(response);
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Email and Password is required",
    };
    return res.status(400).json(response);
  }

  const user = fakeUsers.find((user) => user.email === email);

  if (!user || user.password !== password) {
    const response: ApiResponse<null> = {
      success: false,
      error: "invalid email and password",
    };
    return res.status(401).json(response);
  }

  const { password: _, ...userWithoutPassword } = user;

  const authResponse: IAuthResponse = {
    user: userWithoutPassword,
    token: "fake-jwt-" + user.id,
  };

  const response: ApiResponse<IAuthResponse> = {
    success: true,
    data: authResponse,
    message: "login successfull",
  };
  return res.status(201).json(response);
};

export const getUser = (req: Request, res: Response) => {
  const userId = "user123";

  const user = fakeUsers.find((user) => user.id === userId);
  if (!user) {
    const response: ApiResponse<null> = {
      success: false,
      error: "User not found",
    };
    return res.status(401).json(response);
  }

  const { password: _, ...userWithoutPassword } = user;

  const response: ApiResponse<Omit<IUser, "password">> = {
    success: true,
    data: userWithoutPassword,
  };
  return res.status(200).json(response);
};

export const updateProfile = (req: Request, res: Response) => {
  const { name, email } = req.body;

  const userId = "user123";

  const userIndex = fakeUsers.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    const response: ApiResponse<null> = {
      success: false,
      error: "User not found",
    };
    return res.status(404).json(response);
  }

  if (email && email !== fakeUsers[userIndex].email) {
    const emailExistes = fakeUsers.find((user) => user.email === email);

    if (emailExistes) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Email alresy in use!",
      };
      return res.status(409).json(response);
    }
  }

  fakeUsers[userIndex] = {
    ...fakeUsers[userIndex],
    name: name || fakeUsers[userIndex].name,
    email: email || fakeUsers[userIndex].email,
    updatedAt: new Date(),
  };

  const { password: _, ...userWithoutPassword } = fakeUsers[userIndex];
};
