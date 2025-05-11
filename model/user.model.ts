import { Role } from "@/context/authContext";

export default interface User {
  id?: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  roles?: Role[];
}
