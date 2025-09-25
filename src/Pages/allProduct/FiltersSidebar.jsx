import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useGetBrandsQuery, useGetCategoryQuery, useGetColorQuery, useGetSizeQuery } from "../redux/api/categoryApi";
import { useSearchParams } from "react-router-dom";

const FiltersSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // API Data
  const { data: categoryData, isLoading: categoryLoading } = useGetCategoryQuery();
  const { data: sizeData, isLoading: sizeLoading } = useGetSizeQuery();
  const { data: brandData, isLoading: brandLoading } = useGetBrandsQuery();
  const { data: colorData, isLoading: colorLoading } = useGetColorQuery();

  // State Management
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    category: searchParams.get('category') || null,
    subcategory: searchParams.get('subcategory') || null,
    color: searchParams.get('color') || null,
    size: searchParams.get('size') || null,
    brand: searchParams.get('brand') || null,
    price: searchParams.get('price') || null,
  });

  // Price ranges (static for now)
  const priceRanges = [
    { id: "50-100", label: "$50-$100" },
    { id: "70-150", label: "$70-$150" },
    { id: "100-120", label: "$100-$120" },
    { id: "120-200", label: "$120-$200" },
    { id: "90-100", label: "$90-$100" },
  ];

  // Handle Category Selection
  const handleCategorySelect = (categoryId, categoryName) => {
    const newFilters = { ...selectedFilters, category: categoryId };
    
    // Reset subcategory when main category changes
    if (selectedFilters.category !== categoryId) {
      newFilters.subcategory = null;
    }
    
    setSelectedFilters(newFilters);
    updateURL(newFilters);
  };

  // Handle Subcategory Selection
  const handleSubcategorySelect = (subcategoryId, subcategoryName) => {
    const newFilters = { ...selectedFilters, subcategory: subcategoryId };
    setSelectedFilters(newFilters);
    updateURL(newFilters);
  };

  // Handle Color Selection
  const handleColorSelect = (colorId) => {
    const newFilters = {
      ...selectedFilters,
      color: selectedFilters.color === colorId ? null : colorId
    };
    setSelectedFilters(newFilters);
    updateURL(newFilters);
  };

  // Handle Size Selection
  const handleSizeSelect = (sizeId) => {
    const newFilters = {
      ...selectedFilters,
      size: selectedFilters.size === sizeId ? null : sizeId
    };
    setSelectedFilters(newFilters);
    updateURL(newFilters);
  };

  // Handle Brand Selection
  const handleBrandSelect = (brandId) => {
    const newFilters = {
      ...selectedFilters,
      brand: selectedFilters.brand === brandId ? null : brandId
    };
    setSelectedFilters(newFilters);
    updateURL(newFilters);
  };

  // Handle Price Selection
  const handlePriceSelect = (priceId) => {
    const newFilters = {
      ...selectedFilters,
      price: selectedFilters.price === priceId ? null : priceId
    };
    setSelectedFilters(newFilters);
    updateURL(newFilters);
  };

  // Update URL Parameters
  const updateURL = (filters) => {
    const params = new URLSearchParams();
    
    if (filters.category) params.set('category', filters.category);
    if (filters.subcategory) params.set('subcategory', filters.subcategory);
    if (filters.color) params.set('color', filters.color);
    if (filters.size) params.set('size', filters.size);
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.price) params.set('price', filters.price);

    setSearchParams(params);
  };

  // Toggle Category Expansion
  const toggleCategoryExpansion = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Get selected category object
  const getSelectedCategory = () => {
    if (!selectedFilters.category || !categoryData?.data) return null;
    return categoryData.data.find(cat => cat._id === selectedFilters.category);
  };

  // Get selected subcategory object
  const getSelectedSubcategory = () => {
    if (!selectedFilters.subcategory || !getSelectedCategory()) return null;
    return getSelectedCategory().subcategories.find(sub => sub._id === selectedFilters.subcategory);
  };

  if (categoryLoading || sizeLoading || brandLoading || colorLoading) {
    return (
      <div className="p-6 bg-white w-64 h-full overflow-y-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white w-64 h-full overflow-y-auto">
      <h2 className="text-lg font-bold mb-6">Filters</h2>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-medium mb-4">Categories</h3>
        <ul className="space-y-3">
          {categoryData?.data?.map((category) => (
            <li key={category._id}>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleCategorySelect(category._id, category.name)}
                  className={`text-left w-full text-sm hover:text-pink-500 transition-colors ${
                    selectedFilters.category === category._id
                      ? "text-pink-500 font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {category.name}
                  {category.subcategories.length > 0 && (
                    <span className="ml-2 text-gray-400">
                      ({category.subcategories.length})
                    </span>
                  )}
                </button>
                
                {/* Expand/Collapse Subcategories */}
                {category.subcategories.length > 0 && (
                  <button
                    onClick={() => toggleCategoryExpansion(category._id)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    {expandedCategories[category._id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Subcategories Dropdown */}
              {expandedCategories[category._id] && category.subcategories.length > 0 && (
                <ul className="ml-4 mt-2 space-y-2 border-l-2 border-gray-200 pl-3">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory._id}>
                      <button
                        onClick={() => handleSubcategorySelect(subcategory._id, subcategory.name)}
                        className={`text-left w-full text-xs hover:text-pink-500 transition-colors block py-1 ${
                          selectedFilters.subcategory === subcategory._id
                            ? "text-pink-500 font-medium"
                            : "text-gray-600"
                        }`}
                      >
                        {subcategory.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>


      {/* Colors */}
      <div className="mb-8">
        <h3 className="font-medium mb-4">Color Family</h3>
        <div className="grid grid-cols-4 gap-2">
          {colorData?.data?.map((color) => (
            <button
              key={color._id}
              onClick={() => handleColorSelect(color._id)}
              className={`w-8 h-8 rounded border ${
                selectedFilters.color === color._id ? "border-pink-500 ring-2 ring-pink-200" : "border-gray-300 hover:border-pink-500"
              }`}
              style={{ backgroundColor: color.hexValue }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-8">
        <h3 className="font-medium mb-4">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizeData?.data?.map((size) => (
            <button
              key={size._id}
              onClick={() => handleSizeSelect(size._id)}
              className={`px-3 py-1 text-sm border rounded transition ${
                selectedFilters.size === size._id
                  ? "border-pink-500 bg-pink-500 text-white"
                  : "border-gray-300 hover:border-pink-500"
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-8">
        <h3 className="font-medium mb-4">Brands</h3>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {brandData?.data?.map((brand) => (
            <label key={brand._id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.brand === brand._id}
                onChange={() => handleBrandSelect(brand._id)}
                className="w-4 h-4 accent-pink-500"
              />
              <span className="text-sm text-gray-700">{brand.brandName}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-medium mb-4">Price</h3>
        <div className="space-y-3">
          {priceRanges.map((range) => (
            <label key={range.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.price === range.id}
                onChange={() => handlePriceSelect(range.id)}
                className="w-4 h-4 accent-pink-500"
              />
              <span className="text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      {Object.values(selectedFilters).some(value => value) && (
        <div className="mt-6">
          <button
            onClick={() => {
              setSelectedFilters({
                category: null,
                subcategory: null,
                color: null,
                size: null,
                brand: null,
                price: null,
              });
              setSearchParams({});
              setExpandedCategories({});
            }}
            className="text-pink-500 hover:text-pink-600 text-sm underline"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FiltersSidebar;