export interface UserTestData {
  username: string;
  password: string;
  employeeName: string;
  userRole: string;
  status: string;
}

export function generateUserTestData(): UserTestData {
  const timestamp = Date.now();

  return {
    username: `qauser${timestamp}`,
    password: "Test@12345",
    //employeeName: "manda akhil user",
    employeeName: "manda akhil user",
    userRole: "ESS",
    status: "Enabled"
  };
}