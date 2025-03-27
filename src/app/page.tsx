import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getAllPosts } from '@/lib/api';
import { BookOpen, Bookmark, ChevronRight, Palette, Star } from 'lucide-react';
import Image from 'next/image';
import { HeroPost } from './_components/hero-post';

export default function Index() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <section className="bg-muted w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover the Art Behind Your Favorite Worlds
                  </h1>
                  <p className="text-muted-foreground max-w-[600px] md:text-xl">
                    Explore in-depth reviews, interviews, and insights into the
                    most beautiful concept art books from games, films, and
                    animation.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">
                    Browse Latest Reviews
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Join Community
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[300px] sm:h-[450px] sm:w-[400px] lg:h-[550px] lg:w-[450px]">
                  <HeroPost {...heroPost} />
                  <div className="absolute -bottom-6 -left-6 rounded-lg bg-white p-4 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span className="font-bold">Editor's Choice</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="bg-primary text-primary-foreground inline-block rounded-lg px-3 py-1 text-sm">
                  What We Cover
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Explore Art Book Categories
                </h2>
                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From concept art to character design, we review and analyze
                  the most beautiful art books across all media.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/20 rounded-full p-2">
                      <Palette className="text-primary h-6 w-6" />
                    </div>
                    <CardTitle>Game Art</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Explore the visual development behind your favorite video
                    games, from AAA titles to indie gems.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Explore <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/20 rounded-full p-2">
                      <BookOpen className="text-primary h-6 w-6" />
                    </div>
                    <CardTitle>Film & Animation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Discover the concept art and visual development that brings
                    your favorite movies and animations to life.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Explore <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/20 rounded-full p-2">
                      <Bookmark className="text-primary h-6 w-6" />
                    </div>
                    <CardTitle>Artist Collections</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Explore monographs and collections from renowned concept
                    artists and illustrators from around the world.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-1">
                    Explore <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Latest Reviews
                </h2>
                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our most recent deep dives into the world of concept art
                  books.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card
                  key={i}
                  className="overflow-hidden transition-all hover:shadow-lg"
                >
                  <div className="relative h-[200px] w-full">
                    <Image
                      src={`/placeholder.svg?height=200&width=400&text=Art Book ${i}`}
                      alt={`Art book ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">
                      The Art of Imaginary World {i}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, j) => (
                            <Star
                              key={j}
                              className={`h-4 w-4 ${j < 4 ? 'text-yellow-500' : 'text-muted'}`}
                            />
                          ))}
                      </div>
                      <span className="text-muted-foreground text-sm">
                        4.0/5.0
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">
                      A stunning collection of concept art showcasing the visual
                      development process behind this acclaimed project. The
                      book features hundreds of illustrations, character
                      designs, and environment paintings.
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="gap-1">
                      Read Review <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="lg">
                View All Reviews
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="bg-primary text-primary-foreground inline-block rounded-lg px-3 py-1 text-sm">
                    Stay Updated
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Never Miss a Review
                  </h2>
                  <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Subscribe to our newsletter and be the first to know about
                    new art book releases, exclusive interviews with artists,
                    and special discounts.
                  </p>
                </div>
                <div className="flex w-full max-w-sm flex-col gap-2">
                  <form className="flex flex-col gap-2 sm:flex-row">
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      className="flex-1"
                    />
                    <Button type="submit">Subscribe</Button>
                  </form>
                  <p className="text-muted-foreground text-xs">
                    By subscribing, you agree to our Terms of Service and
                    Privacy Policy.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-full overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=500&text=Newsletter"
                    alt="Newsletter image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
