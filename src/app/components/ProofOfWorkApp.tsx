"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import SearchBar from "./SearchBar";
import WorkCard from "./WorkCard";

// Skeleton loader component
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGoogleSheetsData();
  }, []);

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
      // Remove extra text to get only JSON
      const json = JSON.parse(text.slice(47).slice(0, -2));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transformedData = json.table.rows.map((row: any) => ({
        color: row.c[0]?.v || "#FFB347",
        title: row.c[1]?.v || "",
        description: row.c[2]?.v || "",
        emoji: row.c[3]?.v || "🚀",
      }));

      setCards(transformedData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
          <SearchBar />
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading
            ? // Show skeleton loaders while loading
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  variants={cardVariants}
                  className="transform-gpu"
                >
                  <SkeletonCard />
                </motion.div>
              ))
            : // Show actual cards when data is loaded
              cards.map(
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
              )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProofOfWorkApp;
