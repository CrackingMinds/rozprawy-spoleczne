import { Observable } from 'rxjs';

export class FileUploadTask {

  private readonly _downloadUrl: Observable<string>;
  private readonly _uploadProgress: Observable<number>;
  private readonly _storagePath: string;

  get downloadUrl(): Observable<string> {
    return this._downloadUrl;
  }

  get uploadProgress(): Observable<number> {
    return this._uploadProgress;
  }

  get storagePath(): string {
    return this._storagePath;
  }

  constructor(
    downloadUrl: Observable<string>,
    uploadProgress: Observable<number>,
    storagePath: string
  ) {
    this._downloadUrl = downloadUrl;
    this._uploadProgress = uploadProgress;
    this._storagePath = storagePath;
  }

}
