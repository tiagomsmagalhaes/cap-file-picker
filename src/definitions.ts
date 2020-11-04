declare module '@capacitor/core' {
  interface PluginRegistry {
    FilePicker: FilePickerPlugin;
  }
}

export interface FilePickerPlugin {
  pickFile(options: {
    multiple: boolean;
    extensions: string[];
  }): Promise<{
    paths?: string[] | string,
    original_names?: string[] | string,
    extensions?: string[] | string,
    files?: FileList,
  }>;

  getContacts(filter: string): Promise<{results: any[]}>;


}
