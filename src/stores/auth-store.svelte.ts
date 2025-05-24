import type { User, UserData } from '../types';
import { writable } from 'svelte/store';

export const userData = writable<UserData>({
	user: null,
	isAuthorized: false,
	isFetching: false
});

export function setAuthUser(newUser: User | null) {
	userData.set({
		user: newUser,
		isAuthorized: !!newUser,
		isFetching: false
	});
}

export function logout() {
	userData.update((s) => ({
		...s,
		isFetching: true
	}));

	setTimeout(() => {
		userData.set({
			user: null,
			isAuthorized: false,
			isFetching: false
		});
	}, 500);
}

export function setFakeUser() {
	userData.set({
		user: null,
		isAuthorized: false,
		isFetching: true
	});

	setTimeout(() => {
		userData.set({
			isAuthorized: true,
			isFetching: false,
			user: {
				id: '1',
				email: 'test@example.com',
				name: 'test user'
			}
		});
	}, 500);
}
