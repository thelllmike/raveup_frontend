import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaChevronDown } from "react-icons/fa";
import { FiFlag } from "react-icons/fi";

export default function RacingDashboard() {
  return (
    <div className="font-sans bg-gray-100 min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 flex-grow">
        {/* Quick Stats */}
        <div className="mb-8">
          <h2 className="header-title">QUICK STATS</h2>
          <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-red-600">TOTAL RACERS</h3>
              <p className="text-5xl font-bold mt-2">320</p>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-red-600">APPROVED REGISTRATIONS</h3>
              <p className="text-5xl font-bold mt-2">285</p>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-red-600">PENDING APPROVALS</h3>
              <p className="text-5xl font-bold mt-2">35</p>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-red-600">TOTAL RACES CONDUCTED</h3>
              <p className="text-5xl font-bold mt-2">18</p>
            </div>
          </div>
        </div>

        {/* Upcoming Races */}
        <div className="mb-8">
          <h2 className="header-title">UPCOMING RACES</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold letter-space">COLOMBO STREET RACE</h3>
              <div className="mt-6">
                <p className="text-xs font-medium text-red-600">DATE</p>
                <p className="text-2xl font-bold mt-1">AUGUST 8, 2025</p>
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium text-red-600">LOCATION</p>
                <p className="text-xl font-bold mt-1">COLOMBO CITY CIRCUIT</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold letter-space">KATUKURUNDA SPRINT CHALLENGE</h3>
              <div className="mt-6">
                <p className="text-xs font-medium text-red-600">DATE</p>
                <p className="text-2xl font-bold mt-1">AUGUST 9, 2025</p>
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium text-red-600">LOCATION</p>
                <p className="text-xl font-bold mt-1">KATUKURUNDA CIRCUIT</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold letter-space">SIGIRIYA ENDURANCE RALLY</h3>
              <div className="mt-6">
                <p className="text-xs font-medium text-red-600">DATE</p>
                <p className="text-2xl font-bold mt-1">AUGUST 10, 2025</p>
              </div>
              <div className="mt-4">
                <p className="text-xs font-medium text-red-600">LOCATION</p>
                <p className="text-xl font-bold mt-1">SIGIRIYA OFF-ROAD TRACK</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Race Results and Fastest Lap */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-between items-center">
            <h2 className="header-title">RECENT RACE RESULTS</h2>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-dark-gray text-lg font-bold">FASTEST LAP IN LAST RACE</p>
              <div className="flex items-center">
                <p className="text-4xl font-bold text-red-600 mr-4">1:38.4</p>
                <div>
                  <p className="font-bold">DILAN FERNANDO</p>
                  <p className="text-sm text-gray-500">(PANNALA CIRCUIT)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold letter-space">PANNALA GRAND PRIX</h3>
              <div className="mt-4">
                <p className="text-xs font-medium text-red-600">WINNER</p>
                <p className="text-xl font-bold mt-1">DILAN FERNANDO</p>
              </div>
              <div className="mt-3">
                <p className="text-xs font-medium text-red-600">2ND PLACE</p>
                <p className="font-bold mt-1">SHEHAN PERERA</p>
              </div>
              <div className="mt-3">
                <p className="text-xs font-medium text-red-600">3RD PLACE</p>
                <p className="font-bold mt-1">KASUN SILVA</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold letter-space">KANDY HILL CLIMB</h3>
              <div className="mt-4">
                <p className="text-xs font-medium text-red-600">WINNER</p>
                <p className="text-xl font-bold mt-1">AMILA RATHNAYAKE</p>
              </div>
              <div className="mt-3">
                <p className="text-xs font-medium text-red-600">2ND PLACE</p>
                <p className="font-bold mt-1">DILAN FERNANDO</p>
              </div>
              <div className="mt-3">
                <p className="text-xs font-medium text-red-600">3RD PLACE</p>
                <p className="font-bold mt-1">NUWAN JAYASUNDARA</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold letter-space">NEGOMBO CIRCUIT RACE</h3>
              <div className="mt-4">
                <p className="text-xs font-medium text-red-600">WINNER</p>
                <p className="text-xl font-bold mt-1">KASUN SILVA</p>
              </div>
              <div className="mt-3">
                <p className="text-xs font-medium text-red-600">2ND PLACE</p>
                <p className="font-bold mt-1">AMILA RATHNAYAKE</p>
              </div>
              <div className="mt-3">
                <p className="text-xs font-medium text-red-600">3RD PLACE</p>
                <p className="font-bold mt-1">RAVI SENANAYAKE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mb-8">
          <h2 className="header-title">LEADERBOARD (TOP 5 RACERS)</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">RANK</th>
                  <th className="px-6 py-3 text-left font-medium">RACER NAME</th>
                  <th className="px-6 py-3 text-left font-medium">POINTS</th>
                  <th className="px-6 py-3 text-left font-medium">BEST LAP TIME</th>
                  <th className="px-6 py-3 text-left font-medium">TOTAL WINS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">#1</td>
                  <td className="px-6 py-4 font-bold">DILAN FERNANDO</td>
                  <td className="px-6 py-4">1520</td>
                  <td className="px-6 py-4">1:38.4</td>
                  <td className="px-6 py-4">3 WINS</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">#2</td>
                  <td className="px-6 py-4 font-bold">SHEHAN PERERA</td>
                  <td className="px-6 py-4">1340</td>
                  <td className="px-6 py-4">1:41.2</td>
                  <td className="px-6 py-4">2 WINS</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">#3</td>
                  <td className="px-6 py-4 font-bold">KASUN SILVA</td>
                  <td className="px-6 py-4">1210</td>
                  <td className="px-6 py-4">1:42.8</td>
                  <td className="px-6 py-4">1 WIN</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">#4</td>
                  <td className="px-6 py-4 font-bold">AMILA RATHNAYAKE</td>
                  <td className="px-6 py-4">1105</td>
                  <td className="px-6 py-4">1:45.0</td>
                  <td className="px-6 py-4">1 WIN</td>
                </tr>
                <tr>
                  <td className="px-6 py-4">#5</td>
                  <td className="px-6 py-4 font-bold">NUWAN JAYASUNDARA</td>
                  <td className="px-6 py-4">980</td>
                  <td className="px-6 py-4">1:47.3</td>
                  <td className="px-6 py-4">0 WIN</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
            
    </div>
  );
}