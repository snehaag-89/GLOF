import { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

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
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

 

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/request/get_volunteer_detail", {},{
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
    <div className="h-full w-full bg-gradient-to-br from-indigo-50 to-purple-100 p-6 overflow-y-auto">
      <div className="h-full w-full bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-200">

        {/* ─── Tabs ─────────────────────────────── */}
        <div className="flex justify-around border-b mb-8">
          {[
            { key: "help", label: "🆘 Need Help" },
            { key: "contribute", label: "🤝 Contribute" },
            { key: "register", label: "✍️ Register as Volunteer" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setSelectedTab(tab.key);
                setMessage("");
              }}
              className={`flex-1 py-4 text-lg font-semibold border-b-4 transition-all ${
                selectedTab === tab.key
                  ? "border-indigo-600 text-indigo-700"
                  : "border-transparent text-gray-500 hover:text-indigo-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── Help Tab ─────────────────────────────── */}
        {selectedTab === "help" && (
          <div>
            <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
              Create Assistance Request
            </h2>
            <p className="text-center text-gray-500 mb-6 text-lg">
              Choose a category and describe your needs
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              {["Medical", "Food", "Shelter"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`p-6 rounded-2xl border-2 text-lg font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-indigo-100 border-indigo-600 text-indigo-700 shadow-lg"
                      : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {selectedCategory && (
              <div>
                <textarea
                  rows={6}
                  value={details || transcript}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={`Describe your ${selectedCategory.toLowerCase()} needs...`}
                  className="w-full border rounded-2xl p-4 text-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow"
                />
                <div className="flex gap-4 mt-5">
                  {!listening ? (
                    <button
                      onClick={handleMicStart}
                      className="flex-1 bg-indigo-600 text-white py-3 rounded-xl shadow hover:bg-indigo-700 transition text-lg"
                    >
                      🎤 Start Speaking
                    </button>
                  ) : (
                    <button
                      onClick={handleMicStop}
                      className="flex-1 bg-red-500 text-white py-3 rounded-xl shadow hover:bg-red-600 transition text-lg"
                    >
                      🛑 Stop & Save
                    </button>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 transition disabled:opacity-50 text-lg"
                  >
                    {isSubmitting ? "Submitting..." : "✅ Submit"}
                  </button>
                </div>
              </div>
            )}

            {message && (
              <div
                className={`mt-6 p-4 rounded-xl text-center font-semibold text-lg ${
                  message.includes("✅")
                    ? "bg-green-50 text-green-700 border border-green-300"
                    : "bg-red-50 text-red-700 border border-red-300"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        )}

        {/* ─── Contribute Tab ─────────────────────────────── */}
        {selectedTab === "contribute" && (
          <div>
            <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
              Volunteer List
            </h2>

            {!volunteers.length ? (
              <div className="flex justify-center">
                <button
                  onClick={fetchVolunteers}
                  className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-xl shadow hover:bg-green-700 transition"
                >
                  📋 Get All Volunteers
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 mt-6">
                {volunteers.map((vol, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl border shadow-md bg-white hover:shadow-xl transition"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl font-bold shadow">
                        👤
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-800">
                          {vol.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {vol.category || "General"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-gray-700 text-lg">
                      <p className="flex items-center gap-2">
                        📞{" "}
                        <a
                          href={`tel:${vol.phone}`}
                          className="text-green-600 hover:underline"
                        >
                          {vol.phone || "Not Available"}
                        </a>
                      </p>
                      <p className="flex items-center gap-2">
                        📍 {vol.location || "Location not provided"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── Register Tab ─────────────────────────────── */}
        {selectedTab === "register" && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-6">
              Join as Volunteer
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Want to contribute? Register yourself as a volunteer.
            </p>
            <a
              href="/join-volunteer"
              className="px-8 py-4 bg-purple-600 text-white text-lg rounded-xl shadow hover:bg-purple-700 transition"
            >
              ✍️ Register Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
