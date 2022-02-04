import { Program } from "../types"

export abstract class Module {
  public abstract execute(program: Program): boolean
  public abstract getName(): string

  public error(e: Error, program: Program): void {
    const moduleName = this.getName()

    console.error(`${moduleName}()`, `[instantgram] ${program.VERSION}`, e)
  }
}
