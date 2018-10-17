export class F_ArticleFile {
  private name: string;
  private storagePath: string;
  private downloadUrl: string;

  constructor(name, storagePath) {
    this.name = name;
    this.storagePath = storagePath;
  }

  setDownloadUrl(url: string) {
    this.downloadUrl = url;
  }

}
