// src/components/ExistingApplications.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ExistingApplications = () => {
  const candidates = useSelector(state => state.candidates);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredCandidates = candidates.filter(candidate => {
    if (!searchTerm.trim()) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.appliedFor.toLowerCase().includes(searchLower) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchLower))
    );
  });
  
  return (
    <div className="container mx-auto p-6 max-w-screen-xl">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Existing Applications</h2>
      
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name, position or skills..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 text-lg border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
      </div>
      
      {filteredCandidates.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-500">No candidates found. Add new candidates or adjust your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCandidates.map(candidate => (
            <div key={candidate.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="bg-blue-600 text-white p-6 flex items-center">
                <img 
                  src={candidate.profileImageUrl || '/api/placeholder/60/60'} 
                  alt={candidate.name} 
                  className="w-16 h-16 object-cover rounded-full border-2 border-white mr-6"
                />
                <div>
                  <h3 className="font-semibold text-xl">{candidate.name}</h3>
                  <p className="text-sm">{candidate.appliedFor}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Contact Information:</p>
                  <p className="text-sm text-gray-700">{candidate.email}</p>
                  <p className="text-sm text-gray-700">{candidate.phone}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Skills:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {candidate.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Experience:</p>
                  <p className="text-sm text-gray-700 line-clamp-3">{candidate.experience}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExistingApplications;
