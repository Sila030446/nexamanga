import AllGenres from "@/components/home/AllGenres";
import HeroCarousel from "@/components/home/HeroCarousel";
import UpdateManga from "@/components/home/UpdateManga";

export default function Home() {
  return (
    <section>
      <HeroCarousel />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
        <div className=" col-span-3">
          <UpdateManga />
        </div>
        <div className="col-span-1 w-full">
          <AllGenres />
        </div>
      </div>
    </section>
  );
}
