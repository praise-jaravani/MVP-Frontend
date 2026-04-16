import type { User } from '../types/index.js';
import defaultUsersData from '../data/users.json';

const STORAGE_KEY = 'shieldai_users';
const SESSION_KEY = 'shieldai_session';

export function initUsers(): void {
  // On first load, seed localStorage from users.json if not already present
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsersData));
  }
}

export function getUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function signIn(email: string, password: string): User | null {
  const users = getUsers();
  const match = users.find(u => u.email === email && u.password === password);
  if (match) {
    localStorage.setItem(SESSION_KEY, match.id);
    return match;
  }
  return null;
}

export function signUp(newUser: Omit<User, 'id' | 'createdAt' | 'plan' | 'avatar'>): User {
  const users = getUsers();
  const user: User = {
    ...newUser,
    id: `u${Date.now()}`,
    createdAt: new Date().toISOString(),
    plan: 'starter',
    avatar: null,
  };
  saveUsers([...users, user]);
  localStorage.setItem(SESSION_KEY, user.id);
  return user;
}

export function getCurrentUser(): User | null {
  const id = localStorage.getItem(SESSION_KEY);
  if (!id) return null;
  return getUsers().find(u => u.id === id) || null;
}

export function signOut(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function updateUser(updatedUser: User): void {
  const users = getUsers();
  saveUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
}
