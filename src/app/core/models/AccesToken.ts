export interface AccessToken {
  token: string;
  expirationDate: string;
}

export interface MemberInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
}

export interface LoginResponse {
  loggedResponse: {
    accessToken: AccessToken;
    requiredAuthenticatorType: null | string;
  };
  memberInfo: MemberInfo;
}
