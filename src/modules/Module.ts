import { Program } from "../types"

export abstract class Module {
  public abstract execute(program: Program): boolean
  public abstract getName(): string
}
