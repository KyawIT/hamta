export const MAX_UPLOAD_IMAGE_BYTES = 10 * 1024 * 1024;
export const IMAGE_UPLOAD_ACCEPT = 'image/jpeg,image/png,image/gif';

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif']);
const ALLOWED_EXTENSIONS = /\.(jpe?g|png|gif)$/i;

export async function validateUploadImage(file: File): Promise<string | null> {
  if (file.size === 0) {
    return 'Die Bilddatei ist leer.';
  }

  if (file.size > MAX_UPLOAD_IMAGE_BYTES) {
    return 'Das Bild ist zu groß. Maximal 10 MB sind erlaubt.';
  }

  const type = file.type.toLowerCase();
  const supported = ALLOWED_TYPES.has(type) || ALLOWED_EXTENSIONS.test(file.name);
  if (!supported) {
    return 'Bitte JPG, PNG oder GIF hochladen.';
  }

  if (!(await canDecodeImage(file))) {
    return 'Die Datei konnte nicht als Bild gelesen werden.';
  }

  return null;
}

async function canDecodeImage(file: File): Promise<boolean> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(file);
      const valid = bitmap.width > 0 && bitmap.height > 0;
      bitmap.close();
      return valid;
    } catch {
      // Fall back to an HTMLImageElement for browsers with partial createImageBitmap support.
    }
  }

  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    const done = (valid: boolean) => {
      URL.revokeObjectURL(url);
      resolve(valid);
    };

    image.onload = () => done(image.naturalWidth > 0 && image.naturalHeight > 0);
    image.onerror = () => done(false);
    image.src = url;
  });
}
