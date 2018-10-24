export interface IF_ArticleFile {
  storagePath: string;
  downloadUrl: string;
  name: string;
}

export class F_ArticleFile implements IF_ArticleFile {
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

  get value(): IF_ArticleFile {
    return {
      storagePath: this.storagePath,
      downloadUrl: this.downloadUrl,
      name: this.name
    };
  }

  constructor(name: string, storagePath: string, downloadUrl: string) {
    this._name = name;
    this._storagePath = storagePath;
    this._downloadUrl = downloadUrl;
  }

}
