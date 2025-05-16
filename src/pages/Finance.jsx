import { useState } from 'react';
import { FaSearch, FaFilter, FaTimes, FaChevronDown, FaDownload, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

export default function FinancialPayments() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Mock payments data
  const payments = [
    {
      id: 'TXN-87523',
      racer: 'DILAN FERNANDO',
      race: 'SIGIRIYA RALLY',
      amount: '5,000',
      status: 'PAID',
      date: 'AUG 01, 2025',
      method: 'CREDIT CARD'
    },
    {
      id: 'TXN-87524',
      racer: 'SHEHAN PERERA',
      race: 'COLOMBO STREET RACE',
      amount: '6,000',
      status: 'PENDING',
      date: 'AUG 02, 2025',
      method: 'LANKA PAY'
    },
    {
      id: 'TXN-87525',
      racer: 'KASUN SILVA',
      race: 'KATUKURUNDA SPRINT',
      amount: '4,500',
      status: 'PAID',
      date: 'AUG 02, 2025',
      method: 'CARD'
    }
  ];

  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    setShowEditModal(true);
  };

  const handleSave = () => {
    // Save logic would go here
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
                placeholder="SEARCH BY RACER NAME, RACE NAME, OR TRANSACTION ID"
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

        {/* Payments Content */}
        <div>
          {/* Payments Title */}
          <div className="header-title">
            PAYMENTS
          </div>

          {/* Payments Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gray-400 grid grid-cols-8 py-4 px-2 text-white font-medium">
              <div className="col-span-1 px-4">TRANSACTION ID</div>
              <div className="col-span-1">RACER NAME</div>
              <div className="col-span-1">RACE NAME</div>
              <div className="col-span-1">AMOUNT (LKR)</div>
              <div className="col-span-1">STATUS</div>
              <div className="col-span-1">DATE</div>
              <div className="col-span-1">METHOD</div>
              <div className="col-span-1">ACTIONS</div>
            </div>

            {payments.map((payment) => (
              <div key={payment.id} className="grid grid-cols-8 py-6 px-2 border-b">
                <div className="col-span-1 px-4">{payment.id}</div>
                <div className="col-span-1">{payment.racer}</div>
                <div className="col-span-1">{payment.race}</div>
                <div className="col-span-1">{payment.amount}</div>
                <div className={`col-span-1 ${payment.status === 'PAID' ? 'text-green-500' : 'text-yellow-500'}`}>
                  {payment.status}
                </div>
                <div className="col-span-1">{payment.date}</div>
                <div className="col-span-1">{payment.method}</div>
                <div className="col-span-1 flex space-x-2">
                  {payment.status === 'PAID' ? (
                    <>
                      <button 
                        className="bg-white text-red-600 border border-red-600 rounded-full px-4 py-2"
                        onClick={() => handleEdit(payment)}
                      >
                        REFUND
                      </button>
                      <button className="bg-red-600 text-white rounded-full px-4 py-2 flex items-center">
                        <FaDownload className="mr-2" /> DOWNLOAD
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        className="bg-white text-red-600 border border-red-600 rounded-full px-4 py-2"
                        onClick={() => handleEdit(payment)}
                      >
                        EDIT
                      </button>
                      <button className="bg-red-600 text-white rounded-full px-4 py-2">
                        REMIND
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Edit/Refund Modal */}
      {showEditModal && selectedPayment && (
        <div className="fixed inset-0 bg-black  flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {selectedPayment.status === 'PAID' ? 'PROCESS REFUND' : 'EDIT PAYMENT'}
                </h2>
                <button onClick={() => setShowEditModal(false)}>
                  <FaTimes size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TRANSACTION ID</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 py-3 px-4"
                  defaultValue={selectedPayment.id}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">RACER NAME</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 py-3 px-4"
                  defaultValue={selectedPayment.racer}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">RACE NAME</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 py-3 px-4"
                  defaultValue={selectedPayment.race}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">AMOUNT (LKR)</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 py-3 px-4"
                  defaultValue={selectedPayment.amount}
                />
              </div>
              {selectedPayment.status === 'PENDING' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PAYMENT METHOD</label>
                  <select
                    className="w-full rounded-md border border-gray-300 py-3 px-4"
                    defaultValue={selectedPayment.method}
                  >
                    <option value="CREDIT CARD">CREDIT CARD</option>
                    <option value="DEBIT CARD">DEBIT CARD</option>
                    <option value="LANKA PAY">LANKA PAY</option>
                    <option value="BANK TRANSFER">BANK TRANSFER</option>
                  </select>
                </div>
              )}
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
                {selectedPayment.status === 'PAID' ? 'PROCESS REFUND' : 'SAVE CHANGES'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}