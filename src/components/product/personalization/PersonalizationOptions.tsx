"use client";
import React, { useState } from "react";

interface CustomizationOptionsProps {
  customizationOptions: {
    extras: { name: string; price: number }[];  
  } | undefined;
  selectedOptions?: { name: string; price: number }[];  
  comment?: string; 
  onUpdateOptions: (newOptions: { name: string; price: number }[]) => void;
  onUpdateComment: (newComment: string) => void;
}

export const PersonalizationOptions: React.FC<CustomizationOptionsProps> = ({
  customizationOptions,
  selectedOptions = [],
  comment = "",
  onUpdateOptions,
  onUpdateComment,
}) => {
  const [newComment, setNewComment] = useState(comment);
  const [selectedExtras, setSelectedExtras] = useState<string[]>(
    selectedOptions.map((option) => option.name)
  );

  const handleExtraChange = (extra: { name: string; price: number }) => {
    const isSelected = selectedExtras.includes(extra.name);
    const newExtras = isSelected
      ? selectedExtras.filter((name) => name !== extra.name)
      : [...selectedExtras, extra.name];

    setSelectedExtras(newExtras);

    // Actualizamos las opciones seleccionadas
    const updatedOptions = customizationOptions?.extras.filter((option) =>
      newExtras.includes(option.name)
    ) || [];
    onUpdateOptions(updatedOptions);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
    onUpdateComment(e.target.value);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">Personaliza tu producto</h3>
      <div className="flex flex-col gap-2 mt-2">
        {customizationOptions?.extras.map((extra, index) => (
          <label key={index} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              value={extra.name}
              checked={selectedExtras.includes(extra.name)}
              onChange={() => handleExtraChange(extra)}
            />
            {extra.name} (+${extra.price.toFixed(2)})
          </label>
        ))}
      </div>

      {/* Campo para recomendaciones */}
      <div className="mt-4">
        <h4 className="text-md font-bold">Deja una recomendación</h4>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Ejemplo: Sin cebolla, bebida sin azúcar..."
          className="w-full border border-gray-300 rounded-lg p-2 mt-2"
          rows={3}
        />
      </div>
    </div>
  );
};
