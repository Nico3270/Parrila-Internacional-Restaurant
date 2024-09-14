"use client";

import React, { useState } from "react";

interface Props {}

export const RecommendationBox: React.FC<Props> = () => {
  const [recommendation, setRecommendation] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRecommendation(e.target.value);
  };

  return (
    <div className="mt-4">
      <h4 className="text-md font-bold">Deja una recomendación para tu plato</h4>
      <textarea
        value={recommendation}
        onChange={handleChange}
        placeholder="Ejemplo: Sin cebolla, bebida sin azúcar..."
        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
        rows={3}
      />
    </div>
  );
};
