import { AngularFireStorageReference } from 'angularfire2/storage';

import { ArticleFile } from 'app/models/article.file';

export class ArticleUploadFile {
  private readonly _name: string;
  private readonly _rawFile: File;
  private _ref: AngularFireStorageReference;
  private _downloadUrl: string;
  private _isUploaded: boolean = false;
  private _filePath: string;

  get ref(): AngularFireStorageReference {
    return this._ref;
  }

  set ref(value: AngularFireStorageReference) {
    this._ref = value;
  }

  get name(): string {
    return this._name;
  }

  get downloadUrl(): string {
    return this._downloadUrl;
  }
  set downloadUrl(value: string) {
    this._downloadUrl = value;
  }

  get rawFile(): File {
    return this._rawFile;
  }

  get isUploaded(): boolean {
    return this._isUploaded;
  }

  set isUploaded(value: boolean) {
    this._isUploaded = value;
  }

  get filePath(): string {
    return this._filePath;
  }

  set filePath(path: string) {
    this._filePath = path;
  }

  constructor(rawFile: File) {
    this._rawFile = rawFile;
    this._name = this._rawFile.name;
  }

  getArticleFile(): ArticleFile {
    return new ArticleFile(this._filePath, this._downloadUrl);
  }

}
