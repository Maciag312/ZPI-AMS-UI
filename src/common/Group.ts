import Permission from "./Permission";

export default interface Group {
    group: string;
    color: string;
    permissions: Permission[]
}
  