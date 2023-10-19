export const base642File = (base64: string) => {
    const image = new Image()
    image.src = base64
    return image
}
