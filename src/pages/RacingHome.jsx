import { useState, useEffect } from "react";
import {
  FiClock,
  FiCalendar,
  FiMapPin,
  FiChevronRight,
  FiZap,
  FiUsers,
} from "react-icons/fi";
import { FaTrophy, FaStar, FaArrowRight } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";

export default function RacingHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 10,
    hours: 8,
    minutes: 45,
    seconds: 20,
  });

  // Featured races
  const featuredRaces = [
    {
      id: 1,
      title: "Katukurunda Circuit Challenge",
      date: "June 15, 2025",
      location: "Katukurunda Racing Circuit",
      image: "./racing-img1.png",
    },
    {
      id: 2,
      title: "Foxhill Supercross",
      date: "July 2, 2025",
      location: "Foxhill, Diyatalawa",
      image: "./racing-img2.png",
    },
    {
      id: 3,
      title: "Colombo Night Race",
      date: "August 20, 2025",
      location: "Colombo City Streets",
      image: "racing-img3.png",
    },
  ];

  const featureCards = [
    {
      icon: "./explore-img1.png",
      title: "Easy Online Sign-up",
      description:
        "Racers can quickly register for events, upload documents, and pay online — no paperwork, no hassle.",
    },
    {
      icon: "explore-img2.png",
      title: "Real-Time GPS Tracking",
      description:
        "Watch racers on the move with live map updates, speed, and lap data — ideal for officials and fans alike.",
    },
    {
      icon: "./explore-img3.png",
      title: "Smart Leaderboards",
      description:
        "Ranking isn't just about speed. Our system scores racers based on control, safety, and consistency in each category.",
    },
    {
      icon: "./explore-img4.png",
      title: "Control Panel for Organizers",
      description:
        "From approving racers to managing safety flags and race reports, officials get everything they need in one place.",
    },
    {
      icon: "./explore-img5.png",
      title: "Learn About Tracks & Teams",
      description:
        "New to racing? Explore Sri Lanka's circuits and top racing teams in our static info hub.",
    },
  ];

  // News items
  const newsItems = [
    {
      id: 1,
      title: "RevUP partners with global racing brand",
      excerpt:
        "Exciting new partnership announced to bring international standards to local races",
      date: "May 8, 2025",
      image: "./racing-img2.png",
    },
    {
      id: 2,
      title: "New safety regulations implemented",
      excerpt:
        "Enhanced safety measures for all circuit races starting next month",
      date: "May 1, 2025",
      image: "./racing-img2.png",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Dilan Fernando",
      role: "Professional Racer",
      quote:
        "RevUP has transformed racing in Sri Lanka. The live tracking feature helps my team optimize strategy in real-time.",
      avatar: "/api/placeholder/100/100",
    },
    {
      id: 2,
      name: "Shehan Perera",
      role: "Team Manager",
      quote:
        "The platform's organization tools have made managing our race calendar and team logistics incredibly efficient.",
      avatar: "/api/placeholder/100/100",
    },
  ];

  // Banner slides
  const bannerSlides = [
    {
      id: 1,
      title: "Experience the Thrill of Sri Lanka's",
      subtitle: "Biggest Racing Event!",
      description:
        "Track races in real time, register to compete, or explore Sri Lanka’s top circuits.",
      image: "./racing-img1.png",
    },
    {
      id: 2,
      title: "Experience the Thrill of Sri Lanka's",
      subtitle: "Biggest Racing Event!",
      description:
        "Track races in real time, register to compete, or explore Sri Lanka’s top circuits.",
      image: "./racing-img2.png",
    },
  ];

  // Top riders data
  const topRiders = [
    {
      rank: 1,
      name: "DILAN FERNANDO",
      points: 1520,
      bestLap: "138.4",
      wins: "3 WINS",
    },
    {
      rank: 2,
      name: "SHEJIAN PEREBA",
      points: 1340,
      bestLap: "141.2",
      wins: "2 WINS",
    },
    {
      rank: 3,
      name: "KASUN SUVA",
      points: 1200,
      bestLap: "142.8",
      wins: "1 WIN",
    },
    {
      rank: 4,
      name: "AMILA RATHHAYARE",
      points: 1050,
      bestLap: "145.0",
      wins: "1 WIN",
    },
    {
      rank: 5,
      name: "NUWAN JAYASUNDARA",
      points: 860,
      bestLap: "147.3",
      wins: "0 WIN",
    },
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner with slider */}
      <div className="relative h-screen max-h-[600px] overflow-hidden">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="object-cover w-full h-full text-xl"
            />
            <div className="absolute inset-0 flex mt-20 z-20">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl">
                  <h1 className="text-white text-3xl font-medium">
                    {slide.title}
                  </h1>
                  <h2 className="header-title">{slide.subtitle}</h2>
                  <h2 className="text-white text-lg font-medium font-sans mb-4">
                    {slide.description}
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
                    <button className="btn-primary w-full sm:w-1/2 text-center">
                      Register as Racer{" "}
                      <BsArrowRight className="inline-block ml-2" />
                    </button>
                    <button className="btn-back w-full sm:w-1/2 text-center">
                      View Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider controls */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-red-500" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Featured Races */}
      <div className="w-full">
        <div className="py-16 bg-white">
          <div className=" mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold header-title">
                Featured Races
              </h2>
              <a
                href="#"
                className="text-red-500 flex items-center hover:underline"
              >
                View All <FiChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
              {featuredRaces.map((race) => (
                <div
                  key={race.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={race.image}
                      alt={race.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 m-3 rounded">
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold mb-2 text-gray-700 text-lg letter-space">
                      {race.title}
                    </h3>
                    <div className="flex items-center mb-2">
                      <FiCalendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">{race.date}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <FiMapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {race.location}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-primary flex-1 py-2 flex items-center justify-center">
                        Register <BsArrowRight className="ml-2 h-4 w-4" />
                      </button>
                      <button className="btn-back flex-1 py-2">Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Top Riders */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="py-16 bg-gray-50 px-4 md:px-8"
        >
          <div className="mx-auto">
            <h2 className="header-title">Top Racers This Season</h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg overflow-hidden shadow-md">
                <thead className="bg-light-gray text-white">
                  <tr>
                    <th className="py-5 px-4 text-left">RANK</th>
                    <th className="py-5 px-4 text-left">RACER NAME</th>
                    <th className="py-5 px-4 text-left">POINTS</th>
                    <th className="py-5 px-4 text-left">BEST LAP TIME</th>
                    <th className="py-5 px-4 text-left">TOTAL WINS</th>
                  </tr>
                </thead>
                <tbody>
                  {topRiders.map((rider, index) => (
                    <motion.tr
                      key={rider.rank}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border-b border-gray-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="py-4 px-4 font-bold">#{rider.rank}</td>
                      <td className="py-4 px-4 font-semibold text-dark-gray">
                        {rider.name}
                      </td>
                      <td className="py-4 px-4 text-dark-gray">
                        {rider.points}
                      </td>
                      <td className="py-4 px-4 text-dark-gray">
                        {rider.bestLap}
                      </td>
                      <td className="py-4 px-4 text-dark-gray">{rider.wins}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>
        
        <div className="bg-gray-100 min-h-screen p-6 font-sans mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="header-title text-2xl md:text-3xl">
              EXPLORE KNOWLEDGE BANK
            </h1>
          </div>

          {/* First Card - Race Tracks (Left image, Right content) */}
          <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
            <div className="flex flex-col md:flex-row h-68">
              <div className="md:w-1/3">
                <img
                  src="./racing-img1.png"
                  alt="Sri Lanka Race Track"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-2/3 flex flex-col justify-between">
                <div>
                  <h2 className="font-heading font-bold text-xl text-blue uppercase">
                    SRI LANKA'S ICONIC RACE TRACKS
                  </h2>
                  <p className="text-gray-700 mt-2">
                    Explore famous tracks like Katukurunda, Pannala, Sigiriya,
                    and Colombo. Learn about their layout, terrain, and racing
                    history.
                  </p>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="bg-red-600 text-white rounded-full px-6 py-2 flex items-center justify-center gap-2 font-medium hover:bg-red-700 transition-colors">
                    VIEW ALL TRACKS <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Second Card - Racing Teams (Left content, Right image) */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row-reverse h-68">
              <div className="md:w-1/3">
                <img
                  src="./racing-img2.png"
                  alt="Racing Teams"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-2/3 flex flex-col justify-between">
                <div>
                  <h2 className="font-heading font-bold text-xl text-blue uppercase">
                    TOP RACING TEAMS
                  </h2>
                  <p className="text-gray-700 mt-2">
                    Meet the most competitive racing teams, their members, and
                    achievements. Great for fans and aspiring racers.
                  </p>
                </div>
                <div className="flex justify-start mt-4">
                  <button className="bg-red-600 text-white rounded-full px-6 py-2 flex items-center justify-center gap-2 font-medium hover:bg-red-700 transition-colors">
                    VIEW ALL TEAMS <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
