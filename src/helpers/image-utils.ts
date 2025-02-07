function getImageURL(name: String) {
    return new URL(`../assets/images/${name}`, import.meta.url).href
}
export {getImageURL};