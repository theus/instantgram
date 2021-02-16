import { Module } from "../modules/Module"
import { Program } from "../types"

export class Found {
  constructor(
    private _program: Program,
    private _module: Module
  ) {}

  public image(link: string): void {
    this._program.setImageLink(link)
    this._program.foundImage = true
    this._program.foundByModule = this._module.getName()
    window.open(this._program.imageLink as string)
  }

  public video(link: string): void {
    window.open(link)
    this._program.foundByModule = this._module.getName()
    this._program.foundVideo = true
    this._program.alertNotInInstagramPost = true // if don't find nothing, alert to open the post
  }
}
