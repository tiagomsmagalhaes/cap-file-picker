declare module '@capacitor/core' {
  interface PluginRegistry {
    FilePicker: FilePickerPlugin;
  }
}

export interface FilePickerPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
