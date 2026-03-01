import { DI_TOKENS } from "./types";
import { Container } from "inversify";

const container = new Container();

export const resolve = <T>(identifier: any): T => {
  return container.get<T>(identifier);
};

export default container;
