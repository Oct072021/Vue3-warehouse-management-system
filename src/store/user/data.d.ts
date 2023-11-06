export interface UserState {
	token: string | undefined
	name: string
	avatar: string
	introduction: string
	roles: string[]
}

export interface UserInfo {
	[index: string]: string
}

export interface LoginResponse {
	token: string
}

export interface UserInfoResponse {
	avatar: string
	introduction: string
	name: string
	roles: string[]
}
