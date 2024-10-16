"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Kanit } from "next/font/google";
import { useEffect, useState } from "react";
import API_URL from "@/common/constants/api";
import { PopularMangaTypes } from "@/types/popularManga.type";
import Link from "next/link";
import RatingStar from "../ui/ratingStar";
import { Skeleton } from "../ui/skeleton"; // Import your skeleton component

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["400", "700"],
});

const HeroCarousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 7000,
    pauseOnHover: true,
  };

  const [popular, setPopular] = useState<PopularMangaTypes[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      const response = await fetch(`${API_URL}/manga/popular`);
      const data = await response.json();
      setPopular(data);
      setLoading(false); // End loading
    };

    fetchData();
  }, []);

  if (!popular) {
    return <div>No data</div>;
  }

  return (
    <Slider className="rounded-[0px]" {...settings}>
      {loading // Conditional rendering based on loading state
        ? Array.from({ length: 3 }).map(
            (
              _,
              index // Display skeletons
            ) => (
              <Card
                key={index}
                className={`h-[240px] md:h-[300px] rounded-[0px] relative ${kanit.className}`}
              >
                <Skeleton className="w-full h-full" />
                <CardContent className="absolute bottom-0 w-full h-full z-50 backdrop-blur-xl bg-black/50 p-4 text-white">
                  <Skeleton className="h-6 w-3/4 mb-2" /> {/* Title skeleton */}
                  <Skeleton className="h-4 w-1/2 mb-1" /> {/* Type skeleton */}
                  <Skeleton className="h-4 w-1/2 mb-2" />{" "}
                  {/* Genres skeleton */}
                  <Skeleton className="h-4 w-full mb-2" />{" "}
                  {/* Summary skeleton */}
                  <Skeleton className="h-4 w-1/2" /> {/* Status skeleton */}
                  <Skeleton className="h-4 w-1/2" /> {/* Author skeleton */}
                </CardContent>
              </Card>
            )
          )
        : popular.map((manga) => (
            <Card
              key={manga.id}
              className={`h-[240px] md:h-[300px] rounded-[0px] relative ${kanit.className}`}
            >
              <Image
                src={manga.coverImageUrl}
                alt={manga.title}
                className="w-full h-full object-cover"
                width={200}
                height={300}
                priority
              />
              <CardContent className="absolute bottom-0 w-full h-full z-50 backdrop-blur-xl bg-black/50 p-4 text-white">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2 max-w-[70%]">
                    <div>
                      <Link href={`/comic/${manga.id}`}>
                        <h1 className="text-lg md:text-2xl line-clamp-1">
                          {manga.title}
                        </h1>
                      </Link>
                      <p className="text-[14px] md:text-lg text-[#FFC107]">
                        {manga.type[0]?.name}
                      </p>
                      <p className="text-[12px] md:text-base text-[#DDDDDD] line-clamp-1">
                        {manga.genres.map((genre) => genre.name).join(", ")}
                      </p>
                      <div className="mt-2">
                        <RatingStar
                          className="w-4 h-4"
                          initialRating={manga.avgRating}
                          disabled
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[14px] md:text-lg text-[#DDDDDD] line-clamp-1 mb-2">
                        Summary
                      </h4>
                      <p className="text-[12px] md:text-base text-[#DDDDDD] line-clamp-2">
                        {manga.description}
                      </p>
                      <p className="text-[13px] text-[#DDDDDD] mt-2">
                        Status:{" "}
                        <span className="text-[#FFC107]">{manga.status}</span>
                      </p>
                      <p className="text-[13px] text-[#DDDDDD] mt-2 line-clamp-1">
                        Author:{" "}
                        <span className="text-[#DDDDDD]">
                          {manga.authors
                            .map((author) => author.name)
                            .join(", ")}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <Link href={`/comic/${manga.id}`}>
                      <Image
                        src={manga.coverImageUrl}
                        alt={manga.title}
                        className="w-[74px] md:w-[124px] object-fit"
                        width={200}
                        height={300}
                        priority
                      />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
    </Slider>
  );
};

export default HeroCarousel;
