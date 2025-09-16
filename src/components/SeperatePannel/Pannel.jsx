import { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";
import JoinVolunteer from "../../pages/JoinVolunteer";

import {
  FiHelpCircle,
  FiUsers,
  FiUserPlus,
  FiMic,
  FiSquare,
  FiCheckCircle,
  FiRefreshCcw,
  FiCoffee,
  FiPhone,
  FiMapPin,
  FiHome,
  FiHeart,
  FiActivity,
} from "react-icons/fi";

export default function CreateRequestPanel() {
  const [selectedTab, setSelectedTab] = useState("help");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [volunteers, setVolunteers] = useState([]);

  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/request/get_volunteer_detail", {
        withCredentials: true,
      });
      setVolunteers(res.data || []);
    } catch (err) {
      console.error("Error fetching volunteers", err);
    }
  };

  const handleMicStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const handleMicStop = () => {
    SpeechRecognition.stopListening();
    setDetails((prev) => (prev + " " + transcript).trim());
  };

  const handleSubmit = async () => {
    if (!selectedCategory) {
      setMessage("Please select a category first");
      return;
    }
    if (!details.trim()) {
      setMessage("Please describe your request");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        "http://localhost:4000/api/request/create_request",
        { category: selectedCategory, details },
        { withCredentials: true }
      );

      setMessage("✅ Request created successfully!");
      setDetails("");
      setSelectedCategory(null);
      resetTranscript();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create request. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-h-screen w-full bg-gradient-to-br from-[#E1F5FE] to-[#B2EBF2] md:p-0 overflow-y-auto">
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-xl shadow-xl  p-6 md:p-1 ">
        
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#003087] ">
            HelpBridge
          </h1>
          <p className="text-black text-lg font-medium">
            Seamlessly connect those in need with trusted volunteers
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 mb-8 bg-[#E1F5FE] p-2 rounded-xl">
          {[
            { key: "help", label: "Request Help", icon: <FiHelpCircle size={28} /> },
            { key: "contribute", label: "Find Volunteers", icon: <FiUsers size={28} /> },
            { key: "register", label: "Join as Volunteer", icon: <FiUserPlus size={30} /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setSelectedTab(tab.key);
                setMessage("");
              }}
              className={`flex items-center justify-center gap-2 py-3 px-4 text-m md:text-base font-medium rounded-lg transition-all ${
                selectedTab === tab.key
                  ? "bg-gradient-to-r from-[#154D71] to-[#1C6EA4] text-white shadow-md"
                  : "text-black hover:bg-white hover:shadow-sm"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Help Tab */}
        {selectedTab === "help" && (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-center text-[#0c2788] mb-6">
              Submit Assistance Request
            </h2>
            
            <div className="mb-8">
            <div className="grid grid-cols-1 text-black sm:grid-cols-3 gap-4">
  {[
    { name: "Medical", icon: <FiActivity size={32} className="text-red-700" />, border: "border-2 border-red-300",bg:"bg-red-200/30" },
    { name: "Food", icon: <FiCoffee size={32} className="text-purple-800" />, border: "border-2 border-purple-300" ,bg:"bg-purple-200/30"},
    { name: "Shelter", icon: <FiHome size={32} className="text-yellow-500" />, border: "border-2 border-yellow-300" ,bg:"bg-yellow-50"},
  ].map((cat) => (
    <button
      key={cat.name}
      onClick={() => setSelectedCategory(cat.name)}
      className={`p-5 rounded-xl text-center transition-all flex flex-col items-center
        ${
          selectedCategory === cat.name
            ? `${cat.border} ${cat.bg} text-white shadow-md`
            : `bg-white text-[#003087] ${cat.border} hover:border-[#0077CC]`
        }`}
    >
      {cat.icon}
      <span className="mt-2 text-black font-medium">{cat.name}</span>
    </button>
  ))}
</div>


            </div>

            {selectedCategory && (
              <div className="bg-white p-6 rounded-2xl border border-black shadow-sm">
                <h3 className="text-lg font-semibold text-black/70 mb-4">
                  Describe your {selectedCategory.toLowerCase()} needs
                </h3>
                
                <textarea
                  rows={5}
                  value={details || transcript}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide clear details about what you need..."
                  className="w-full border border-black rounded-xl p-4 text-black font-semibold focus:ring-2 focus:ring-[#0077CC] focus:border-transparent outline-none resize-none"
                />
                
                <div className="flex flex-col sm:flex-row gap-3 mt-5">
                  {!listening ? (
                    <button
                      onClick={handleMicStart}
                      className="flex font-semibold items-center justify-center gap-2 bg-[#0077CC] border-1 border-black text-white py-3 px-4 rounded-xl shadow hover:bg-[#003087] transition flex-1"
                    >
                      <FiMic size={18} />
                      <span>Start Voice Input</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleMicStop}
                      className="flex items-center justify-center gap-2 bg-[#FF6B6B] text-white py-3 px-4 rounded-xl shadow hover:bg-[#D32F2F] transition flex-1"
                    >
                      <FiSquare size={18} />
                      <span>Stop Recording</span>
                    </button>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-xl shadow hover:bg-green-800 transition disabled:opacity-50 flex-1"
                  >
                    <FiCheckCircle size={18} />
                    <span>{isSubmitting ? "Submitting..." : "Submit Request"}</span>
                  </button>
                </div>
                
                {listening && (
                  <div className="mt-4 p-3 bg-[#e0e4f8] rounded-lg text-[#003087]">
                    <p className="font-medium">Listening...</p>
                    <p className="mt-1 text-black">{transcript}</p>
                  </div>
                )}
              </div>
            )}

            {message && (
              <div
                className={`mt-6 p-4 rounded-xl text-center font-semibold ${
                  message.includes("✅")
                    ? "bg-[#E7F6E9] text-[#2E7D32] border border-[#4CAF50]"
                    : "bg-[#FFEBEE] text-[#C62828] border border-[#EF5350]"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        )}

        {/* Contribute Tab */}
        {selectedTab === "contribute" && (
  <div className="animate-fadeIn">
    <h2 className="text-3xl font-extrabold text-center text-[#003087] mb-8 tracking-wide">
      Available Volunteers
    </h2>

    {/* Load/Refresh Button */}
    <div className="flex justify-center mb-8">
      <button
        onClick={fetchVolunteers}
        className="flex items-center gap-2 bg-gradient-to-r from-[#11b01b] to-[#0a8c13] text-white py-3 px-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-200"
      >
        <FiRefreshCcw size={18} />
        <span className="font-medium">
          {volunteers.length ? "Refresh Volunteers" : "Load Volunteers"}
        </span>
      </button>
    </div>

    {/* Volunteer List */}
    {volunteers.length > 0 ? (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {volunteers.map((vol, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl hover:border-[#003087]/50 transition duration-200"
          >
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-[#f5f5f5] border border-gray-300 flex items-center justify-center text-[#003087] text-xl font-bold">
                {vol.name ? vol.name.charAt(0).toUpperCase() : "V"}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[#003087]">
                  {vol.name || "Anonymous Volunteer"}
                </h3>
                <p className="text-red-800">
                  {vol.category || "Volunteer"}
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-gray-700">
              <p className="flex items-center gap-2">
                <FiPhone className="text-[#0c5b93]" />
                <a
                  href={`tel:${vol.phone}`}
                  className="hover:text-[#003087] hover:underline"
                >
                  {vol.phone || "Not Available"}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FiMapPin className="text-[#0c5b93]" />
                <span>{vol.address || "Location not provided"}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      /* Empty State */
      <div className="text-center py-14 bg-white rounded-2xl border border-gray-300 shadow-md">
        <FiUsers className="mx-auto text-[#0c5b93] text-6xl mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No Volunteers Loaded
        </h3>
        <p className="text-gray-500">
          Click <span className="font-medium">"Load Volunteers"</span> to see available helpers in your community.
        </p>
      </div>
    )}
  </div>
)}

        {/* Register Tab */}
        {selectedTab === "register" && (
          <div className="animate-fadeIn">
            <JoinVolunteer />
          </div>
        )}

        {/* Footer Note */}
        {/* <div className="mt-10 pt-5 border-t border-[#B2EBF2] text-center text-[#0077CC] text-sm">
          <p>Your request will be securely shared with verified volunteers in your area</p>
        </div> */}
      </div>
    </div>
  );
}
