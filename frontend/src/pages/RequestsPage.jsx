import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateModal from "../components/updateModal";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleUpdate = (requestId) => {
    const req = requests.find((r) => r.requestId === requestId);
    setSelectedRequest(req);
    setIsModalOpen(true); // ✅ Open modal
  };

  const handleFulfill = (id) => {
    console.log(`Fulfill request ${id}`);
    // Add fulfill logic if needed
  };

  const handleModalSubmit = async ({ message, status }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/requests/${selectedRequest.requestId}`,
        {
          updateMessage: message,
          status,
          query: selectedRequest.query,
        }
      );

      // Update local state with updated request
      const updated = requests.map((req) =>
        req._id === selectedRequest._id ? response.data.data : req
      );
      setRequests(updated);
    } catch (err) {
      console.error("Update failed:", err.message);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-[#B5FCCD] text-[#1f4030] border border-[#7AC6D2]";
      case "Rejected":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-[#FFF6D1] text-yellow-700 border border-yellow-300";
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/requests");
        setRequests(res.data.data);
      } catch (error) {
        console.error("Error fetching requests:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-white text-gray-800 font-sans">
      <h1 className="text-3xl font-bold tracking-tight text-[#3A59D1] mb-8">
        🔧 Requests Dashboard
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-xl bg-white border border-[#7AC6D2]">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#3D90D7] text-white uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-3">Request ID</th>
              <th className="px-6 py-3">Requested By</th>
              <th className="px-6 py-3">Query</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Update Message</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : requests.length > 0 ? (
              requests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-[#E9F8FF] transition duration-300 border-b border-gray-200"
                >
                  <td className="px-6 py-4">{req.requestId}</td>
                  <td className="px-6 py-4">{req.requestedBy}</td>
                  <td className="px-6 py-4">{req.query}</td>
                  <td className="px-6 py-4">{req.contact}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(
                        req.status
                      )}`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {req.status === "Approved" || req.status === "Rejected" ? (
                      req.updateMessage || "-"
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {req.status === "Pending" ? (
                      <button
                        onClick={() => handleUpdate(req.requestId)}
                        className="bg-transparent border border-[#3A59D1] text-[#3A59D1] hover:bg-[#3A59D1]/10 px-4 py-1 rounded-full text-xs transition duration-300"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFulfill(req._id)}
                        className="bg-[#3A59D1] hover:bg-[#2e49b8] text-white px-4 py-1 rounded-full text-xs transition duration-300"
                      >
                        Fulfilled
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No Requests To Display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal Mount */}
      {selectedRequest && (
        <UpdateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default RequestsPage;
