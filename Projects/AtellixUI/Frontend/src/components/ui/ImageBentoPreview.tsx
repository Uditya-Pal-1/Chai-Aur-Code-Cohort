const photos = [
  {
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=80',
    alt: 'Warm, light-filled creative studio with shared desks',
    label: 'A better place to focus',
    className: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    alt: 'Laptop showing a developer workspace',
    label: 'Built for the details',
    className: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    alt: 'A calm desk beside a large studio window',
    label: 'Room to think',
    className: '',
  },
]

export default function ImageBentoPreview() {
  return (
    <div className="grid h-[360px] grid-cols-3 grid-rows-2 gap-3 overflow-hidden rounded-2xl">
      {photos.map((photo) => (
        <figure className={`group relative m-0 overflow-hidden rounded-xl bg-zinc-900 ${photo.className}`} key={photo.src}>
          <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={photo.src} alt={photo.alt} loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
          <figcaption className="absolute inset-x-3 bottom-3 text-xs font-medium text-white sm:inset-x-4 sm:bottom-4 sm:text-sm">{photo.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}
