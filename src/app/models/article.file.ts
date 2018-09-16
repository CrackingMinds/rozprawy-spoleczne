import { AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

export class ArticleFile {
  private readonly _name: string;
  private readonly _rawFile: File;
  private _ref: AngularFireStorageReference;
  private _url: Observable<string>;
  private _isUploaded: boolean = false;

  get ref(): AngularFireStorageReference {
    return this._ref;
  }

  set ref(value: AngularFireStorageReference) {
    this._ref = value;
  }

  get name(): string {
    return this._name;
  }

  get url(): Observable<string> {
    return this._url;
  }
  set url(value: Observable<string>) {
    this._url = value;
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

  constructor(rawFile: File) {
    this._name = rawFile.name;
    this._rawFile = rawFile;
  }

}
