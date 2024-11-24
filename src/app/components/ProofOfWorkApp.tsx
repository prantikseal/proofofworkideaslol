"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import SearchBar from "./SearchBar";
import WorkCard from "./WorkCard";

// Skeleton loader component remains the same
const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="animate-pulse">
        <div className="h-8 w-8 bg-gray-200 rounded-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
};

const ProofOfWorkApp = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGoogleSheetsData();
  }, []);

  // Add new useEffect for search filtering
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCards(cards);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = cards.filter(
      (card) =>
        card.title.toLowerCase().includes(query) ||
        card.description.toLowerCase().includes(query)
    );
    setFilteredCards(filtered);
  }, [searchQuery, cards]);

  const fetchGoogleSheetsData = async () => {
    try {
      setLoading(true);
      // wait for 10sec to simulate loading
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const SHEET_ID = "1WzNRZ_YuFz2O7lpLxe3qng4YfFbwZU6cmzOjgBd5Yzg";
      const SHEET_NAME = "Sheet1";
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

      const response = await fetch(url);
      const text = await response.text();
      const json = JSON.parse(text.slice(47).slice(0, -2));

      const transformedData = json.table.rows.map((row: any) => ({
        color: row.c[0]?.v || "#FFB347",
        title: row.c[1]?.v || "",
        description: row.c[2]?.v || "",
        emoji: row.c[3]?.v || "🚀",
      }));

      setCards(transformedData);
      setFilteredCards(transformedData); // Initialize filtered cards with all cards
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const searchBarVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50"
    >
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div variants={headerVariants}>
          <Header />
        </motion.div>

        <motion.div variants={searchBarVariants}>
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                variants={cardVariants}
                className="transform-gpu"
              >
                <SkeletonCard />
              </motion.div>
            ))
          ) : (
            <AnimatePresence mode="wait">
              {filteredCards.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full text-center py-8 text-gray-500"
                >
                  No results found for "{searchQuery}"
                </motion.div>
              ) : (
                filteredCards.map(
                  (
                    card: {
                      color: string;
                      title: string;
                      description: string;
                      emoji: string;
                    },
                    index: number
                  ) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover="hover"
                      whileTap={{ scale: 0.95 }}
                      exit="exit"
                      className="transform-gpu"
                    >
                      <WorkCard
                        color={card.color}
                        title={card.title}
                        description={card.description}
                        icon={card.emoji}
                      />
                    </motion.div>
                  )
                )
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProofOfWorkApp;
