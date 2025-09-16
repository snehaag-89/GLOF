import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

const FloodNews = ({ stateName = "punjab" }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  
  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/flood-news");
      setArticles(res.data.articles || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching news:", err);
      setArticles([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();

    const handleNewNews = (data) => {
      if (data.state === stateName && Array.isArray(data.articles)) {
        // prepend new articles
        setArticles((prev) => [...data.articles, ...prev]);
      }
    };

    socket.on("floodNews", handleNewNews);

    return () => socket.off("floodNews", handleNewNews);
  }, [stateName]);

  // Filter articles by source
  const filteredArticles =
    activeFilter === "all"
      ? articles
      : articles.filter((a) =>
          a.source.toLowerCase().includes(activeFilter)
        );

  const formatSourceName = (url) => {
    if (url.includes("timesofindia")) return "Times of India";
    if (url.includes("ndtv") || url.includes("feedburner")) return "NDTV";
    if (url.includes("hindustantimes")) return "Hindustan Times";
    if (url.includes("bbci")) return "BBC India";
    return "Unknown Source";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-200 mb-2">
             Latest News
          </h1>
         
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {["all", "timesofindia", "ndtv", "hindustantimes", "bbci"].map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                activeFilter === filter
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "all"
                ? "All Sources"
                : filter === "timesofindia"
                ? "TOI"
                : filter === "hindustantimes"
                ? "HT"
                : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center py-8">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Fetching latest flood news...</p>
          </div>
        )}

        {/* News List */}
        {!loading && filteredArticles.length > 0 && (
          <ul className="space-y-4">
            {filteredArticles.map((article, idx) => (
              <li
                key={idx}
                className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-all border-l-4 border-red-500"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-200 text-black-800">
                    {formatSourceName(article.source)}
                  </span>
                  <span className="text-xs text-gray-500">{article.pubdate}</span>
                </div>

                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-2 block"
                >
                  {article.title}
                </a>
                <p className="text-gray-700 mb-3">{article.summary}</p>

                <div className="flex justify-between items-center text-sm">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    Read full story
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* No Results */}
        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-8 text-gray-500 bg-white rounded-xl shadow-sm">
            No news found for the selected source.
          </div>
        )}
      </div>
    </div>
  );
};

export default FloodNews;
