import { FileUploader, FileItem, FileUploaderOptions } from 'ng2-file-upload';

export class CustomFileUploaderService extends  FileUploader {

  constructor(
    options: FileUploaderOptions,
  ) {
    super(options);
  }

  uploadAllFiles() {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      const sendable = new FormData();
      const fakeItem: FileItem = null;
      this.onBuildItemForm(fakeItem, sendable);

      for (const item of this.queue) {
        item.isReady = true;
        item.isUploading = true;
        item.isUploaded = false;
        item.isSuccess = false;
        item.isCancel = false;
        item.isError = false;
        item.progress = 0;

        if (typeof item._file.size !== 'number') {
          throw new TypeError('The file specified is no longer valid');
        }
        sendable.append('files', item._file, item.file.name);
      }

      if (this.options.additionalParameter !== undefined) {
        Object.keys(this.options.additionalParameter).forEach((key) => {
          sendable.append(key, this.options.additionalParameter[key]);
        });
      }

      xhr.onerror = () => {
        this.onErrorItem(fakeItem, null, xhr.status, null);
      };

      xhr.onabort = () => {
        this.onErrorItem(fakeItem, null, xhr.status, null);
      };

      xhr.open('POST', this.options.url, true);
      xhr.withCredentials = true;
      if (this.options.headers) {
        for (let j = 0, a = this.options.headers; j < a.length; j++) {
          const header = a[j];
          xhr.setRequestHeader(header.name, header.value);
        }
      }
      if (this.authToken) {
        xhr.setRequestHeader(this.authTokenHeader, this.authToken);
      }

      xhr.onload = () => {
        const headers = this._parseHeaders(xhr.getAllResponseHeaders());
        const response = this._transformResponse(xhr.response, headers);
        const gist = this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
        const method = '_on' + gist + 'Item';
        for (const item of this.queue) {
          this[method](item, response, xhr.status, headers);
        }
        this._onCompleteItem(this.queue[0], response, xhr.status, headers);
      };

      xhr.onloadend = () => {
        try {
          if (xhr.status === 200) {
            resolve({response:  xhr.response});
          } else {
            console.log(`${xhr.status}: ${xhr.statusText}`);
            resolve({response: `${xhr.status}: ${xhr.statusText}`});
          }
        } catch (e) {
          console.log(e);
          resolve({response:  e});
        }
      };
      xhr.send(sendable);
    });
  }
}
