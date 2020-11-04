import { WebPlugin, registerWebPlugin } from '@capacitor/core';
import { FilePickerPlugin } from './definitions';

export class FilePickerWeb extends WebPlugin implements FilePickerPlugin {
  constructor() {
    super({
      name: 'FilePicker',
      platforms: ['web'],
    });
  }

  async pickFile(options: {
    multiple: boolean;
    extensions: string[];
  }): Promise<{
    paths?: string[],
    original_names?: string[],
    extensions?: string[],
    files?: FileList
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const fileInput: HTMLInputElement = document.createElement('input');
        const accept: string[] = [];

        options.extensions.forEach(ext => {
          switch (ext) {
            case 'images': accept.push('image/*'); break;
            case 'videos': accept.push('video/*'); break;
            case 'audios': accept.push('audio/*'); break;
            case 'csv': accept.push('.csv'); break;
          }
        })

        fileInput.hidden = true;
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('id', 'filePicker');
        fileInput.setAttribute('accept', accept.join(','));

        fileInput.addEventListener('change', () => {
          if (document !== null) {
            const files = fileInput.files;
            if (files) {
              resolve({files});
              
            }
          }
        })
        fileInput.click();

      } catch (error) {
        reject(error)
      }
    })
  }

  async getContacts(filter: string): Promise<{ results: any[] }> {
    console.log('filter: ', filter);
    return {
      results: [{
        firstName: 'Dummy',
        lastName: 'Entry',
        telephone: '123456'
      }]
    };
  }

}

const FilePicker = new FilePickerWeb();

export { FilePicker };

// import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FilePicker);
