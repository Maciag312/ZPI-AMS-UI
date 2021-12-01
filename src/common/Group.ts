import Permission from "./Permission";
import Rule from "./Rule";

export default interface Group {
    group: string;
    color: string;
    permissions: Permission[]
    rule: Rule
}
  