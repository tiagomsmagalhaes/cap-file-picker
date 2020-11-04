import Foundation
import Capacitor
import CoreServices



/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(FilePicker)
public class FilePicker: CAPPlugin {

    var savedCall: CAPPluginCall? = nil

    @objc func pickFile(_ call: CAPPluginCall) {
            savedCall = call
            let multiple_selection = call.getBool("multiple") ?? true
            let exts: [String] = call.getArray("extensions", String.self) ?? ["*"]
            var extUTIs: [String] = []
            for element in exts
            {
                let fileExtension: CFString = element as CFString
                var extUTI:CFString?
                if(element == "images")
                {
                    extUTI = kUTTypeImage
                }
                else if(element == "csv") {
                    extUTI = kUTTypeCommaSeparatedText
                }
                else if(element == "videos")
                {
                    extUTI = kUTTypeVideo
                }
                else if(element == "audios")
                {
                    extUTI = kUTTypeAudio
                }
                else if(element == "*")
                {
                    extUTI = kUTTypeData
                }
                else
                {
                   extUTI  = UTTypeCreatePreferredIdentifierForTag(
                        kUTTagClassFilenameExtension,
                        fileExtension,
                        nil
                    )?.takeUnretainedValue()
                }
                extUTIs.append(extUTI! as String)
            }
            
            DispatchQueue.main.async {
                let types: [String] = extUTIs
                let documentPicker = UIDocumentPickerViewController(documentTypes: types, in: .import)
                documentPicker.delegate = self
                documentPicker.modalPresentationStyle = .formSheet
                documentPicker.allowsMultipleSelection = multiple_selection
                self.bridge.viewController.present(documentPicker, animated: true, completion: nil)
                
            }
        }
}

extension FilePicker: UIDocumentPickerDelegate {
    public func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
        var paths:[String] = []
        var original_names:[String] = []
        var extensions:[String] = []
        var files : [String] = []
        for value in urls {
            do {

                let fileData = try Data.init(contentsOf: value.absoluteURL);
                let fileStream = fileData.base64EncodedString()
            
                files.append(fileStream)
//                paths.append(value.absoluteString)
                paths.append(value.absoluteString.replacingOccurrences(of: "file:///", with: "capacitor://localhost/_capacitor_file_/"))
                original_names.append(value.lastPathComponent)
                extensions.append(value.pathExtension)
            } catch  {
                savedCall?.error("Cenas")
            }
            
        }
        savedCall!.success([
            "paths" : paths,
            "original_names": original_names,
            "extensions" : extensions
        ])
    }
}

