export class F_ArticleFile {
  private readonly _storagePath: string;
  private readonly _downloadUrl: string;
  private readonly _name: string;

  get storagePath(): string {
    return this._storagePath;
  }

  get downloadUrl(): string {
    return this._downloadUrl;
  }

  get name(): string {
    return this._name;
  }

  constructor(name: string, storagePath: string, downloadUrl: string) {
    this._name = name;
    this._storagePath = storagePath;
    this._downloadUrl = downloadUrl;
  }

}
