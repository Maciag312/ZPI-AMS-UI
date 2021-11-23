import Permission from "./Permission";

export default interface Role {
    role: string;
    color: string;
    permissions: Permission[]
}
  