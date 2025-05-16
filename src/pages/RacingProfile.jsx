import { useState, useEffect } from "react";
import {
  FaTrophy,
  FaEdit,
} from "react-icons/fa";
import ApiService from "../ApiService";
import { getGlobalRacerId } from "../GlobalVariable";

const RacingProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const racerId = getGlobalRacerId();
      if (!racerId) return;

      try {
        const [racer, emergencyContacts] = await Promise.all([
          ApiService.getRacerById(racerId),
          ApiService.getEmergencyContactsByRacer(racerId),
        ]);

        const emergency = emergencyContacts[0] || {};
        const fullName = `${racer.first_name} ${racer.last_name}`;

        setUserData({
          name: fullName,
          welcomeName: fullName.toUpperCase(),
          rank: "#1",
          totalwin: 12,
          bestLapTime: "1:38.4",
          bestLapCircuit: "KATUKURUNDA CIRCUIT, 2024",
          profileImage: "/api/placeholder/100/100",
          emergency: {
            name: emergency.contact_name || "-",
            relation: emergency.relationship ? `(${emergency.relationship})` : "",
            phone: emergency.contact_phone || "-",
          },
          personal: {
            dob: new Date(racer.date_of_birth).toLocaleDateString(),
            nationality: racer.nationality,
          },
          racing: {
            type: racer.racer_type,
            team: racer.racing_team,
            license: "SLR-2025-7895",
          },
          league: "SRI LANKA RACING LEAGUE 2025",
          races: [
            {
              name: "COLOMBO STREET RACE",
              date: "MARCH 2025",
              track: "COLOMBO",
              lapTime: "1:45.2",
              position: "1ST",
              medal: "🥇",
            },
            {
              name: "KATUKURUNDA CIRCUIT GP",
              date: "FEBRUARY 2025",
              track: "KATUKURUNDA",
              lapTime: "1:38.4",
              position: "2ND",
              medal: "🥈",
            },
            {
              name: "SIGIRIYA OFF-ROAD RALLY",
              date: "JANUARY 2025",
              track: "SIGIRIYA",
              lapTime: "2:12.8",
              position: "3RD",
              medal: "🥉",
            },
            {
              name: "PANNALA GRAND PRIX",
              date: "DECEMBER 2024",
              track: "PANNALA CIRCUIT",
              lapTime: "1:42.9",
              position: "5TH",
              medal: "",
            },
          ],
          registrations: [
            {
              name: "KATUKURUNDA SPRINT CHALLENGE",
              status: "REGISTERED",
              date: "AUGUST 9, 2025",
              location: "KATUKURUNDA CIRCUIT",
              category: "TIME ATTACK",
            },
            {
              name: "SIGIRIYA ENDURANCE RALLY",
              status: "PAYMENT PENDING",
              date: "AUGUST 10, 2025",
              location: "SIGIRIYA OFF-ROAD TRACK",
              category: "ENDURANCE",
            },
            {
              name: "COLOMBO STREET RACE",
              status: "REGISTERED",
              date: "AUGUST 8, 2025",
              location: "COLOMBO CITY CIRCUIT",
              category: "STREET RACING",
            },
          ],
          stats: {
            rank: "#1",
            podiums: 7,
            points: 1520,
          },
          upcoming: [
            {
              name: "GALLE STREET CIRCUIT",
              date: "OCTOBER 2025",
            },
            {
              name: "DIYATALAWA MOUNTAIN RALLY",
              date: "NOVEMBER 2025",
            },
          ],
        });
      } catch (err) {
        console.error("Error loading profile data:", err);
      }
    };

    fetchData();
  }, []);

  if (!userData) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="bg-light-gray/20 text-white min-h-screen">
      <div className="pt-10 py-4 px-6 border-t border-gray-700">
        <h1 className="font-heading text-2xl md:text-3xl bg-black inline-block px-2">
          WELCOME BACK, <span className="header-title">{userData.welcomeName}</span>
        </h1>
      </div>

      <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card bg-white text-secondary rounded-lg shadow-lg">
          <h2 className="font-heading text-2xl mb-6">OVERVIEW</h2>
          <div className="mb-6 flex">
            <p className="text-md font-extrabold font-heading text-blue">CURRENT RANK:</p>
            <p className="font-heading text-2xl text-primary ms-10">{userData.rank}</p>
          </div>
          <p className="text-xs text-blue">IN {userData.league}</p>
          <div className="mb-6 flex">
            <p className="text-md font-extrabold font-heading text-blue">TOTAL WIN:</p>
            <p className="font-heading text-2xl ms-10 text-red">{userData.totalwin}</p>
          </div>
          <div className="flex">
            <p className="text-md font-heading text-blue">BEST LAP TIME:</p>
            <p className="font-heading text-2xl text-primary ms-10">{userData.bestLapTime}</p>
          </div>
          <p className="text-xs text-blue">{userData.bestLapCircuit}</p>
        </div>

        <div className="col-span-1 lg:col-span-2 card bg-white text-secondary rounded-lg shadow-lg">
          <div className="flex justify-between mb-6">
            <h2 className="font-heading text-2xl">PROFILE</h2>
            <button className="flex items-center text-secondary border border-secondary rounded-full px-4 py-1">
              EDIT <FaEdit className="ml-2" />
            </button>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center mb-6 md:mb-0 md:mr-8">
              <img src={userData.profileImage} alt="Profile" className="rounded-full w-24 h-24 object-cover border-4 border-primary" />
              <h3 className="font-heading text-lg mt-2">{userData.name}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 flex-grow">
              <div>
                <p className="text-sm text-dark-gray">EMERGENCY CONTACT</p>
                <p className="font-medium">
                  {userData.emergency.name} {userData.emergency.relation}
                </p>
                <p className="text-sm">{userData.emergency.phone}</p>
              </div>
              <div>
                <p className="text-sm text-dark-gray">RACER TYPE</p>
                <p className="font-medium">{userData.racing.type}</p>
              </div>
              <div>
                <p className="text-sm text-dark-gray">DATE OF BIRTH</p>
                <p className="font-medium">{userData.personal.dob}</p>
              </div>
              <div>
                <p className="text-sm text-dark-gray">TEAM</p>
                <p className="font-medium">{userData.racing.team}</p>
              </div>
              <div>
                <p className="text-sm text-dark-gray">NATIONALITY</p>
                <p className="font-medium">{userData.personal.nationality}</p>
              </div>
              <div>
                <p className="text-sm text-dark-gray">LICENSE NUMBER</p>
                <p className="font-medium">{userData.racing.license}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

     {/* Active Registrations */}
<div className="px-4 md:px-6 mb-8">
  <h2 className="bg-primary text-white font-heading text-2xl py-2 px-4 mb-6 inline-block">
    ACTIVE REGISTRATIONS
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {userData.registrations.map((reg, index) => (
      <div key={index} className="card bg-white text-secondary rounded-lg shadow-lg">
        <h3 className="font-heading text-xl mb-4">{reg.name}</h3>
        <p className={`text-sm mb-4 ${
          reg.status === "REGISTERED" ? "text-success" :
          reg.status === "PAYMENT PENDING" ? "text-warning" : ""
        }`}>
          {reg.status}
        </p>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-dark-gray">DATE</p>
            <p className="font-medium">{reg.date}</p>
          </div>
          <div>
            <p className="text-xs text-dark-gray">LOCATION</p>
            <p className="font-medium">{reg.location}</p>
          </div>
          <div>
            <p className="text-xs text-dark-gray">CATEGORY</p>
            <p className="font-medium">{reg.category}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

{/* Performance Tracking */}
<div className="px-4 md:px-6 mb-8">
  <h2 className="bg-primary text-white font-heading text-2xl py-2 px-4 mb-6 inline-block">
    PERFORMANCE TRACKING
  </h2>
  <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="flex bg-white text-secondary p-4 rounded-lg">
      <p className="text-sm text-dark-gray">OVERALL CHAMPIONSHIP RANK</p>
      <p className="font-heading text-3xl text-primary ms-4">{userData.stats.rank}</p>
    </div>
    <div className="flex bg-white text-secondary p-4 rounded-lg">
      <p className="text-sm text-dark-gray">TOTAL PODIUM FINISHES</p>
      <p className="font-heading text-3xl ms-4">{userData.stats.podiums}</p>
    </div>
    <div className="flex bg-white text-secondary p-4 rounded-lg">
      <p className="text-sm text-dark-gray">TOTAL POINTS EARNED</p>
      <p className="font-heading text-3xl text-primary ms-4">{userData.stats.points}</p>
    </div>
  </div>

  {/* Races Table */}
  <div className="bg-white text-secondary rounded-lg overflow-hidden">
    <table className="w-full">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-4 text-left">RACE NAME</th>
          <th className="p-4 text-left">DATE</th>
          <th className="p-4 text-left">TRACK</th>
          <th className="p-4 text-left">LAP TIME (BEST)</th>
          <th className="p-4 text-left">FINAL POSITION</th>
        </tr>
      </thead>
      <tbody>
        {userData.races.map((race, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
            <td className="p-4">{race.name}</td>
            <td className="p-4">{race.date}</td>
            <td className="p-4">{race.track}</td>
            <td className="p-4">{race.lapTime}</td>
            <td className="p-4">{race.medal} {race.position}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

{/* Upcoming Races */}
<div className="px-4 md:px-6 mb-8">
  <h2 className="bg-primary text-white font-heading text-2xl py-2 px-4 mb-6 inline-block">
    UPCOMING RACES & REGISTRATION
  </h2>
  <div className="space-y-4">
    {userData.upcoming.map((race, index) => (
      <div key={index} className="bg-white text-secondary p-4 rounded-lg flex justify-between items-center">
        <h3 className="font-heading text-lg">{race.name} - {race.date}</h3>
        <button className="border border-primary text-primary rounded-full px-6 py-2 hover:bg-primary hover:text-white transition-colors">
          REGISTER
        </button>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default RacingProfile;
