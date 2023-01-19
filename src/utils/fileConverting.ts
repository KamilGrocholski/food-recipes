export const convertBlobToBase64 = async (blob: Blob) => { // blob data
  return await blobToBase64(blob) as string
}

const blobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export const createObjectUrl = (file: File): string => {
    return URL.createObjectURL(file)
}

export const toBlob = async (url: string) => {
    return await fetch(url).then(res => res.blob())
}

export const convertFileToBase64 = async (file: File) => {
    const url = createObjectUrl(file)
    const blob = await toBlob(url)
    const base64 = convertBlobToBase64(blob)

    return base64
}