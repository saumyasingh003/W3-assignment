import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0); 


  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get("https://3w-backend-assign.vercel.app/api/users/users");
      const newTotalCount = response.data.totalUsers;
      
    
      if (newTotalCount !== totalCount) {
        setUsers(response.data.users);
        setTotalCount(newTotalCount);
        if (!loading) { 
          toast.success("New data received!");
        }
      }
      
      setLoading(false);
    } catch (error) {
      if (!loading) {
        toast.error("Failed to fetch users");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchUsers();
  }, []); 

  
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  useEffect(() => {
    setCurrentPage(1);
  }, [totalCount]);

  return (
    <div className="w-full mx-auto p-6 bg-gradient-to-b from-gray-50 to-white shadow-xl rounded-lg">
      <div className="text-3xl font-bold mb-8 text-center text-gray-800">
        Admin Dashboard
      </div>

 
    <p className="text-center text-gray-800 font-bold ">Total Users: {totalCount}</p>
      <div className="flex justify-end mb-4">
        <button
          onClick={()=>{fetchUsers}}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 flex items-center gap-2 cursor-pointer"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : users.length > 0 ? (
        <>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-500 to-blue-600">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Social Handle
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Images
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {indexOfFirstUser + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.socialHandle}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 flex-wrap">
                        {user.images && user.images.length > 0 ? (
                          user.images.map((image, idx) => (
                            <img
                              key={idx}
                              src={image}
                              alt={`${user.name}'s image ${idx + 1}`}
                              className="w-16 h-16 object-cover rounded-lg shadow-sm hover:shadow-md transition duration-150"
                            />
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No images available</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm shadow-sm ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600 border border-gray-200 hover:border-blue-400"
              } transition-all duration-200 ease-in-out`}
            >
              ← Previous
            </button>
            
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => paginate(idx + 1)}
                  className={`w-10 h-10 rounded-lg font-medium text-sm transition-all duration-200 ease-in-out ${
                    currentPage === idx + 1
                      ? "bg-blue-600 text-blue-500 shadow-md hover:bg-blue-700"
                      : "bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600 border border-gray-200 hover:border-blue-400"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm shadow-sm ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50 hover:text-blue-600 border border-gray-200 hover:border-blue-400"
              } transition-all duration-200 ease-in-out`}
            >
              Next →
            </button>
          </div>

          {/* Showing entries info */}
          <div className="text-center mt-4 text-sm text-gray-600">
            Showing {indexOfFirstUser + 1} to{" "}
            {Math.min(indexOfLastUser, users.length)} of {users.length} entries
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No users found.</p>
        </div>
      )}
    </div>
  );
};

export default UserTable;
