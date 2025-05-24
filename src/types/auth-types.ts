export type AuthContext = {
	user: User | null;
};

export type User = {
	id?: string;
	email?: string;
	name?: string;
};

export type UserData = {
	user: User | null;
	isAuthorized: boolean;
	isFetching: boolean;
};
