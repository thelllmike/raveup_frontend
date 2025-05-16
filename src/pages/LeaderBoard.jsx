import { useState } from 'react';
import { FaSearch, FaFilter, FaTimes, FaChevronDown } from 'react-icons/fa';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

export default function LeaderBoard() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRacer, setSelectedRacer] = useState(null);

  // Mock data
  const racers = [
    { 
      rank: 1, 
      name: 'DILAN FERNANDO', 
      id: '#3201', 
      category: '1000CC', 
      points: 1520, 
      wins: 3, 
      bestLap: '1:38.4',
      team: 'APEX RACING'
    },
    { 
      rank: 2, 
      name: 'SHEHAN PERERA', 
      id: '#3202', 
      category: '600CC', 
      points: 1340, 
      wins: 2, 
      bestLap: '1:41.2',
      team: 'SPEED HUNTERS'
    },
    { 
      rank: 3, 
      name: 'KASUN SILVA', 
      id: '#3203', 
      category: '1000CC', 
      points: 1210, 
      wins: 1, 
      bestLap: '1:42.8',
      team: 'PRIVATEER'
    },
  ];

  const handleEdit = (racer) => {
    setSelectedRacer(racer);
    setShowEditModal(true);
  };

  const handleSave = () => {
    setShowEditModal(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex">
            <div className="relative flex-grow">
              <input 
                type="text" 
                className="w-full rounded-lg border border-gray-300 py-3 px-4 pr-10"
                placeholder="SEARCH BY RACER NAME, RACER ID, TEAM"
              />
              <button className="absolute right-3 top-3 text-red-600">
                <FaSearch size={20} />
              </button>
            </div>
            <button className="ml-2 border border-gray-300 rounded-lg p-3">
              <FaFilter size={20} />
            </button>
          </div>
        </div>

        {/* Leaderboard Content */}
        <div>
          {/* Leaderboard Title */}
          <div className="header-title">
            LEADERBOARD
          </div>

          {/* Leaderboard Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gray-400 grid grid-cols-9 py-4 px-2 text-white font-medium">
              <div className="col-span-1 px-4">RANK</div>
              <div className="col-span-1">RACER NAME</div>
              <div className="col-span-1">RACER ID</div>
              <div className="col-span-1">CATEGORY</div>
              <div className="col-span-1">POINTS</div>
              <div className="col-span-1">WINS</div>
              <div className="col-span-1">BEST LAP</div>
              <div className="col-span-1">TEAM</div>
              <div className="col-span-1">ACTIONS</div>
            </div>

            {racers.map((racer) => (
              <div key={racer.id} className="grid grid-cols-9 py-6 px-2 border-b">
                <div className="col-span-1 px-4">#{racer.rank}</div>
                <div className="col-span-1">{racer.name}</div>
                <div className="col-span-1">{racer.id}</div>
                <div className="col-span-1">{racer.category}</div>
                <div className="col-span-1">{racer.points}</div>
                <div className="col-span-1">{racer.wins}</div>
                <div className="col-span-1">{racer.bestLap}</div>
                <div className="col-span-1">{racer.team}</div>
                <div className="col-span-1">
                  <button 
                    className="bg-red-600 text-white rounded-full px-6 py-2"
                    onClick={() => handleEdit(racer)}
                  >
                    EDIT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {showEditModal && selectedRacer && (
        <div className="fixed inset-0 bg-black/20  flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">EDIT RANKING</h2>
                <button onClick={() => setShowEditModal(false)}>
                  <FaTimes size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">RACER ID</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 py-3 px-4"
                  defaultValue={selectedRacer.id}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CATEGORY</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 py-3 px-4"
                  defaultValue={selectedRacer.category}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TOTAL POINTS</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 py-3 px-4"
                  defaultValue={selectedRacer.points}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NUMBER OF WINS</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 py-3 px-4"
                  defaultValue={selectedRacer.wins}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">BEST LAP TIME</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 py-3 px-4"
                  defaultValue={selectedRacer.bestLap}
                />
              </div>
            </div>
            <div className="p-6 bg-gray-50 flex justify-end space-x-4">
              <button 
                className="px-6 py-2 border border-red-600 text-red-600 rounded-full"
                onClick={() => setShowEditModal(false)}
              >
                CANCEL
              </button>
              <button 
                className="px-6 py-2 bg-red-600 text-white rounded-full"
                onClick={handleSave}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}