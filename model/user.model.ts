export default interface User {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles?: "ROLE_PUBLISHER" | "ROLE_VISITOR";
}
