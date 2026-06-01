export interface GalleryPhoto {
  src: string
  fileName: string
  alt: string
  caption: string
  category: 'Training' | 'Match Day' | 'Academy Life'
  tall?: boolean
  wide?: boolean
}

const imageModules = import.meta.glob<string>('../assets/IMG_*.{JPG,jpg,JPEG,jpeg}', {
  eager: true,
  import: 'default',
})

const categories: GalleryPhoto['category'][] = ['Training', 'Match Day', 'Academy Life']
const captions = [
  'Ball mastery and brave touches',
  'Standards carried into every drill',
  'Game moments shaped by preparation',
  'Togetherness around the session',
  'Focus, movement, and match tempo',
  'Player development in motion',
]

function getPhotoNumber(path: string) {
  return Number(path.match(/IMG_(\d+)/)?.[1] ?? 0)
}

function getFileName(path: string) {
  return path.split('/').pop() ?? path
}

export const galleryPhotos: GalleryPhoto[] = Object.entries(imageModules)
  .sort(([a], [b]) => getPhotoNumber(a) - getPhotoNumber(b))
  .map(([path, src], index) => {
    const photoNumber = getPhotoNumber(path)
    const category = categories[index % categories.length]

    return {
      src,
      fileName: getFileName(path),
      alt: `ID All Stars football photo ${photoNumber || index + 1}`,
      caption: captions[index % captions.length],
      category,
      tall: index % 11 === 3,
      wide: index % 13 === 5,
    }
  })

export function getGalleryPhoto(index: number) {
  return galleryPhotos[index % galleryPhotos.length]
}