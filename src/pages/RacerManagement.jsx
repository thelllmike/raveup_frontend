import { useState } from 'react';
import { 
  FaSearch, 
  FaChevronDown, 
  FaTimes, 
  FaBars,
  FaUser,
  FaFlagCheckered,
  FaTrophy,
  FaMoneyBillWave
} from 'react-icons/fa';

export default function RacerManagement() {
  const [activeTab, setActiveTab] = useState('racer');
  const [filterStatus, setFilterStatus] = useState('pending');
  const [filterCategory, setFilterCategory] = useState('professional');
  const [filterNationality, setFilterNationality] = useState('sri lankan');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for racers
  const [racers, setRacers] = useState([
    {
      id: '#3201',
      name: 'DILAN FERNANDO',
      category: 'PROFESSIONAL',
      nationality: 'SRI LANKAN',
      team: 'APEX RACING',
      license: 'SLR-2025-7895',
      status: filterStatus === 'approved' ? 'approved' : 'pending',
      image: '/api/placeholder/120/120'
    },
    {
      id: '#3202',
      name: 'SHEHAN PERERA',
      category: 'PROFESSIONAL',
      nationality: 'SRI LANKAN',
      team: 'SPEED HUNTERS',
      license: 'SLR-2025-6532',
      status: 'pending',
      image: '/api/placeholder/120/120'
    },
    {
      id: '#3204',
      name: 'AMILA RATHNAYAKE',
      category: 'PROFESSIONAL',
      nationality: 'SRI LANKAN',
      team: 'DRAGON RACERS',
      license: 'SLR-2025-4287',
      status: 'pending',
      image: '/api/placeholder/120/120'
    }
  ]);

  // Handler for approving racers
  const handleApprove = (id) => {
    const updatedRacers = racers.map(racer => 
      racer.id === id ? {...racer, status: 'approved'} : racer
    );
    setRacers(updatedRacers);
  };

  // Filter racers based on search and filters
  const filteredRacers = racers.filter(racer => {
    const matchesSearch = searchQuery ? 
      racer.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    
    const matchesStatus = filterStatus === 'all' ? 
      true : racer.status === filterStatus;
    
    const matchesCategory = filterCategory === 'all' ? 
      true : racer.category.toLowerCase() === filterCategory.toLowerCase();
    
    const matchesNationality = filterNationality === 'all' ? 
      true : racer.nationality.toLowerCase() === filterNationality.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesCategory && matchesNationality;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="SEARCH BY NAME, LICENSE NO, OR RACER ID" 
              className="w-full pl-4 pr-12 py-3 border rounded-full bg-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#E21518] text-white p-2 rounded-full">
              <FaSearch size={20} />
            </button>
            <button className="absolute right-16 top-1/2 transform -translate-y-1/2 p-2">
              <FaBars size={20} />
            </button>
          </div>

          {/* Filters */}
          {searchQuery && (
            <div className="mt-4">
              <h3 className="text-gray-700 font-bold mb-2">FILTERS</h3>
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <div className="text-xs text-gray-500 mb-1">CATEGORY</div>
                  <div className="flex items-center border rounded px-3 py-1">
                    <span className="font-medium">{filterCategory.toUpperCase()}</span>
                    <FaTimes size={16} className="ml-2 text-gray-400" />
                  </div>
                </div>

                <div className="relative">
                  <div className="text-xs text-gray-500 mb-1">STATUS</div>
                  <div className="flex items-center border rounded px-3 py-1">
                    <span className="font-medium">{filterStatus === 'approved' ? 'APPROVED' : 'PENDING'}</span>
                    <FaTimes size={16} className="ml-2 text-gray-400" />
                  </div>
                </div>

                <div className="relative">
                  <div className="text-xs text-gray-500 mb-1">NATIONALITY</div>
                  <div className="flex items-center border rounded px-3 py-1">
                    <span className="font-medium">{filterNationality.toUpperCase()}</span>
                    <FaTimes size={16} className="ml-2 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pending Approvals Section */}
        {!searchQuery && filterStatus === 'pending' && (
          <div className="mb-6">
            <div className="header-title">
              PENDING APPROVALS
            </div>
            
            <div className="bg-gray-300 rounded-t-lg">
              <div className="grid grid-cols-5 p-4 font-medium">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-4" />
                  RACER ID
                </div>
                <div>NAME</div>
                <div>CATEGORY</div>
                <div>TEAM</div>
                <div>ACTIONS</div>
              </div>
            </div>
            
            {racers.filter(racer => racer.status === 'pending').map((racer, index) => (
              <div key={racer.id} className={`border-b p-4 grid grid-cols-5 items-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="font-medium">{racer.id}</div>
                <div className="font-medium">{racer.name}</div>
                <div>{racer.category}</div>
                <div>{racer.team}</div>
                <div className="flex space-x-2">
                  <button className="border border-[#E21518] text-[#E21518] rounded-full px-4 py-2 font-medium">
                    REJECT
                  </button>
                  <button 
                    className="bg-[#E21518] text-white rounded-full px-4 py-2 font-medium"
                    onClick={() => handleApprove(racer.id)}
                  >
                    APPROVE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRacers.map(racer => (
              <div key={racer.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="relative">
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full flex items-center ${racer.status === 'approved' ? 'bg-green-500' : 'bg-yellow-400'} text-white`}>
                    <span className="w-2 h-2 rounded-full bg-white mr-2"></span>
                    {racer.status === 'approved' ? 'APPROVED' : 'PENDING'}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    <img 
                      src={racer.image} 
                      alt={racer.name} 
                      className="rounded-full w-24 h-24 object-cover border-4 border-gray-200" 
                    />
                  </div>
                  
                  <h3 className="text-center font-bold text-lg mb-4">{racer.name} - {racer.id}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-gray-500 text-sm">CATEGORY</div>
                      <div className="font-medium">{racer.category}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">NATIONALITY</div>
                      <div className="font-medium">{racer.nationality}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">TEAM</div>
                      <div className="font-medium">{racer.team}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-sm">LICENSE NUMBER</div>
                      <div className="font-medium">{racer.license}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {racer.status === 'pending' ? (
                      <>
                        <button className="flex-1 border border-[#E21518] text-[#E21518] rounded-full py-2 font-medium">
                          REJECT
                        </button>
                        <button 
                          className="flex-1 bg-[#E21518] text-white rounded-full py-2 font-medium"
                          onClick={() => handleApprove(racer.id)}
                        >
                          APPROVE
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="flex-1 border border-[#E21518] text-[#E21518] rounded-full py-2 font-medium">
                          BAN
                        </button>
                        <button className="flex-1 bg-[#E21518] text-white rounded-full py-2 font-medium">
                          EDIT
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}