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
    console.log(options);
    return new Promise(async (resolve, reject) => {
      try {
        const fileInput: HTMLInputElement = document.createElement('input');

        fileInput.hidden = true;
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('id', 'filePicker');

        let accept: string;

        options.extensions.forEach(ext => {
          if(ext == 'images') {
            accept = accept.concat("image/*,")
          } else if(ext == 'videos') {
            accept = accept.concat("video/*,")
          } else if(ext == 'csb') {
            accept = accept.concat("text/csv,")
          } else if(ext == 'audios') {
            accept = accept.concat("audio/*,")
          }
        })

        fileInput.setAttribute('accept', "text/csv");

        fileInput.addEventListener('change', () => {
          if (document !== null) {
            const files = fileInput.files;
            if (files) {
              resolve({files});
              
            }
          }
        })
        fileInput.click();






        // const csv = await Filesystem.readFile({
        //   path: 'file:///Users/tiago/Downloads/b0baa268-f6ce-45f1-a73a-19a4103394c0.csv'
        // })

        // if (csv) {
        //   console.log(csv.data)
        //   resolve({
        //     paths: [csv.data], extensions: ['csv'],
        //     original_names: ['b0baa268-f6ce-45f1-a73a-19a4103394c0.csv'],
        //   })
        // }

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

  // async echo(options: { value: string }): Promise<{ value: string }> {
  //   console.log('ECHO', options);
  //   return options;
  // }
}

const FilePicker = new FilePickerWeb();

export { FilePicker };

// import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(FilePicker);
