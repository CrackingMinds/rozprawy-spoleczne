export class ArticleFile {

  private _rawFile: File;

  get name(): string {
    return this._rawFile.name;
  }

  get rawFile(): File {
    return this._rawFile;
  }

  constructor(rawFile: File) {
    this._rawFile = rawFile;
  }

}
