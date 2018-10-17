export class ArticleFile {

  private readonly _filePath: string;
  private readonly _url: string;

  constructor(filePath: string, url: string) {
    this._filePath = filePath;
    this._url = url;
  }

  get url(): string {
    return this._url;
  }

  get filePath(): string {
    return this._filePath;
  }

}
