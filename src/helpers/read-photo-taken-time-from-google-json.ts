import { GoogleMetadata } from '../models/google-metadata';
import { promises as fspromises } from "fs"
import { MediaFileInfo } from '../models/media-file-info'

const { readFile } = fspromises;

export async function readPhotoTakenTimeFromGoogleJson(mediaFile: MediaFileInfo): Promise<string|null> {
  if (!mediaFile.jsonFilePath || !mediaFile.jsonFileExists) {
    return null;
  }

  const jsonContents = await readFile(mediaFile.jsonFilePath, 'utf8');
  const googleJsonMetadata = JSON.parse(jsonContents) as GoogleMetadata;

  if (googleJsonMetadata?.photoTakenTime?.formatted) {
    const photoTakenDate = new Date(googleJsonMetadata.photoTakenTime.formatted);
    return photoTakenDate.toISOString();
  } else {
    return null;
  }
}
