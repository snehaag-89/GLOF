import { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

const CreateRequestPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p className="text-center text-red-500">Browser does not support Speech Recognition</p>;
  }

  const handleMicStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const handleMicStop = () => {
    SpeechRecognition.stopListening();
    setDetails((prev) => prev + " " + transcript);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-6 space-y-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-indigo-700">
          Create Assistance Request
        </h2>
        <p className="text-center text-gray-500">Choose a category and describe your needs</p>

        {/* Category Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["Medical", "Food", "Shelter"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`p-4 rounded-xl border-2 transition-all font-medium ${
                selectedCategory === cat
                  ? "bg-indigo-50 border-indigo-600 text-indigo-700 shadow-md"
                  : "bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Input Section */}
        {selectedCategory && (
          <div>
            <textarea
              rows={4}
              value={details || transcript}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={`Describe your ${selectedCategory.toLowerCase()} needs...`}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            <div className="flex gap-3 mt-3">
              {!listening ? (
                <button
                  onClick={handleMicStart}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-xl shadow hover:bg-indigo-700 transition"
                >
                  🎤 Start Speaking
                </button>
              ) : (
                <button
                  onClick={handleMicStop}
                  className="flex-1 bg-red-500 text-white py-2 rounded-xl shadow hover:bg-red-600 transition"
                >
                  🛑 Stop & Save
                </button>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-green-600 text-white py-2 rounded-xl shadow hover:bg-green-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "✅ Submit"}
              </button>
            </div>
          </div>
        )}

        {/* Message */}
        {message && (
          <div
            className={`p-3 rounded-lg text-center font-medium ${
              message.includes("✅")
                ? "bg-green-50 text-green-700 border border-green-300"
                : "bg-red-50 text-red-700 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRequestPanel;