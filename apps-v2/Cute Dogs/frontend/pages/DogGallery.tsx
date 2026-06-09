import { useMemo, useState } from 'react'
import { Heart, Shuffle, Dog as DogIcon } from 'lucide-react'
import { Button } from '../lib/shadcn/button'
import { Card, CardContent, CardFooter } from '../lib/shadcn/card'
import { Badge } from '../lib/shadcn/badge'
import { cn } from '../lib/shadcn/utils'

type Dog = {
  id: string
  name: string
  breed: string
  url: string
}

// Curated set of cute dog photos from dog.ceo (stable public CDN URLs).
const DOGS: Dog[] = [
  { id: '1', name: 'Biscuit', breed: 'Golden Retriever', url: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_1442.jpg' },
  { id: '2', name: 'Mochi', breed: 'Shiba Inu', url: 'https://images.dog.ceo/breeds/shiba/shiba-13.jpg' },
  { id: '3', name: 'Pepper', breed: 'Pug', url: 'https://images.dog.ceo/breeds/pug/n02110958_15626.jpg' },
  { id: '4', name: 'Luna', breed: 'Husky', url: 'https://images.dog.ceo/breeds/husky/n02110185_10047.jpg' },
  { id: '5', name: 'Daisy', breed: 'Corgi', url: 'https://images.dog.ceo/breeds/corgi-cardigan/n02113186_1080.jpg' },
  { id: '6', name: 'Rocky', breed: 'Beagle', url: 'https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg' },
  { id: '7', name: 'Bella', breed: 'Labrador', url: 'https://images.dog.ceo/breeds/labrador/n02099712_5104.jpg' },
  { id: '8', name: 'Charlie', breed: 'Poodle', url: 'https://images.dog.ceo/breeds/poodle-standard/n02113799_2371.jpg' },
  { id: '9', name: 'Milo', breed: 'Pomeranian', url: 'https://images.dog.ceo/breeds/pomeranian/n02112018_10068.jpg' },
  { id: '10', name: 'Coco', breed: 'Dachshund', url: 'https://images.dog.ceo/breeds/dachshund/dog-1418275_640.jpg' },
  { id: '11', name: 'Buddy', breed: 'Border Collie', url: 'https://images.dog.ceo/breeds/collie-border/n02106166_2207.jpg' },
  { id: '12', name: 'Maple', breed: 'Samoyed', url: 'https://images.dog.ceo/breeds/samoyed/n02111889_3219.jpg' },
]

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const a = copy[i]!
    const b = copy[j]!
    copy[i] = b
    copy[j] = a
  }
  return copy
}

export default function DogGallery() {
  const [order, setOrder] = useState<Dog[]>(DOGS)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const favoriteCount = favorites.size

  const dogs = useMemo(() => order, [order])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <DogIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Cute Dogs</h1>
              <p className="text-sm text-muted-foreground">A wholesome gallery of very good boys and girls</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-current" />
              {favoriteCount} favorite{favoriteCount === 1 ? '' : 's'}
            </Badge>
            <Button onClick={() => setOrder(shuffle(DOGS))} variant="default" className="gap-2">
              <Shuffle className="w-4 h-4" />
              Shuffle
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dogs.map((dog) => {
            const isFav = favorites.has(dog.id)
            return (
              <Card key={dog.id} className="overflow-hidden group">
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <img
                    src={dog.url}
                    alt={`${dog.name} the ${dog.breed}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => toggleFavorite(dog.id)}
                    aria-label={isFav ? `Unfavorite ${dog.name}` : `Favorite ${dog.name}`}
                    className={cn(
                      'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-colors',
                      'bg-background/70 hover:bg-background/90 border border-border',
                    )}
                  >
                    <Heart
                      className={cn(
                        'w-5 h-5 transition-colors',
                        isFav ? 'text-red-500 fill-red-500 dark:text-red-400 dark:fill-red-400' : 'text-muted-foreground',
                      )}
                    />
                  </button>
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="text-lg font-semibold">{dog.name}</h2>
                    <span className="text-xs text-muted-foreground">#{dog.id}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{dog.breed}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant={isFav ? 'secondary' : 'outline'}
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => toggleFavorite(dog.id)}
                  >
                    <Heart className={cn('w-4 h-4', isFav && 'fill-current text-red-500 dark:text-red-400')} />
                    {isFav ? 'Favorited' : 'Add to favorites'}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </main>

      <footer className="border-t border-border mt-8">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-muted-foreground">
          Made with <Heart className="inline w-3.5 h-3.5 -mt-0.5 text-red-500 dark:text-red-400 fill-current" /> for dog lovers everywhere.
        </div>
      </footer>
    </div>
  )
}
