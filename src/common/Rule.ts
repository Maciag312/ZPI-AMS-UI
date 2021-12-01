import Matcher from './Matcher'
export default interface Rule {
    name: string;
    matchers: Matcher[];
}
  