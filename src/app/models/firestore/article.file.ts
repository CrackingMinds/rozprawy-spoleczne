export class F_ArticleFile {
  private downloadUrl: string;
  private storagePath: string;

  withDownloadUrl(url: string): F_ArticleFile {
    this.downloadUrl = url;
    return this;
  }

  withStoragePath(path: string): F_ArticleFile {
    this.storagePath = path;
    return this;
  }

}
