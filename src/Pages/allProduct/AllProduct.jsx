import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Star, Menu, X, Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { imageUrl } from "../redux/api/baseApi";
import FiltersSidebar from "./FiltersSidebar";
import { useGetAllBusinesFilterQuery } from "../redux/api/productApi";
import { Pagination } from "antd";

const AllProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Get filter values from URL params
  const getFilterFromParams = () => ({
    category: searchParams.get("category") || null,
    subcategory: searchParams.get("subcategory") || null,
    color: searchParams.get("color") || null,
    size: searchParams.get("size") || null,
    brand: searchParams.get("brand") || null,
    price: searchParams.get("price") || null,
  });

  // State for filters
  const [selectedFilters, setSelectedFilters] = useState(getFilterFromParams());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setSelectedFilters(getFilterFromParams());
  }, [searchParams]);

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    setSearchQuery(urlSearch);
  }, [searchParams]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    setSearchParams(params);
  };

  // API Call with all filters and search
  const {
    data: productsData,
    isLoading,
    error,
  } = useGetAllBusinesFilterQuery({
    category: selectedFilters.category,
    subcategory: selectedFilters.subcategory,
    color: selectedFilters.color,
    size: selectedFilters.size,
    brand: selectedFilters.brand,
    price: selectedFilters.price,
    search: searchQuery,
    page: currentPage,
    limit: pageSize,
  });

  console.log(productsData);

  // Get selected category name for display
  const getCategoryName = () => {
    // You'll need to fetch category data or pass it from FiltersSidebar
    // For now, using a simple mapping or fallback
    const categoryName = searchParams.get("categoryName") || "All Products";
    return categoryName;
  };

  // Handle filter updates from sidebar
  const handleFilterUpdate = (newFilters) => {
    setSelectedFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();

    if (newFilters.category) {
      params.set("category", newFilters.category);
    }
    if (newFilters.subcategory)
      params.set("subcategory", newFilters.subcategory);
    if (newFilters.color) params.set("color", newFilters.color);
    if (newFilters.size) params.set("size", newFilters.size);
    if (newFilters.brand) params.set("brand", newFilters.brand);
    if (newFilters.price) params.set("price", newFilters.price);

    // Preserve search query
    if (searchQuery) {
      params.set("search", searchQuery);
    }

    setSearchParams(params);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setSearchParams({ search: searchQuery }); // Keep search query
    setSelectedFilters({
      category: null,
      subcategory: null,
      color: null,
      size: null,
      brand: null,
      price: null,
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">
            Something went wrong while fetching products.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <h1 className="text-xl font-bold">
          {selectedFilters.category ? getCategoryName() : "All Products"}
        </h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 border rounded-md"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0 border rounded-lg shadow">
          <FiltersSidebar
            selectedFilters={selectedFilters}
            onFilterUpdate={handleFilterUpdate}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </aside>

        {/* Sidebar Drawer for Mobile */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-40"
              onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="relative bg-white w-80 h-full shadow-lg z-50">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-3 right-3 p-1 rounded-full bg-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
              <FiltersSidebar
                selectedFilters={selectedFilters}
                onFilterUpdate={handleFilterUpdate}
                setIsSidebarOpen={setIsSidebarOpen}
                isMobile={true}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span className="text-gray-700 cursor-pointer hover:text-primary">
              All Products
            </span>
            {selectedFilters.category && (
              <>
                <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                <span className="text-primary font-medium">
                  {getCategoryName()}
                </span>
              </>
            )}
          </nav>

          {/* Header with Search */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">
              {selectedFilters.category ? getCategoryName() : "All Products"}
            </h1>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>

            {/* Filter Summary - Simplified */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {productsData?.meta?.total || 0} products found
                {searchQuery && (
                  <span className="ml-2 text-blue-600">• {searchQuery}</span>
                )}
              </p>
            </div>
          </div>

          {/* Product Grid */}
          {productsData?.data?.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productsData.data

                  .filter(
                    (product) => product.variants && product.variants.length > 0
                  )
                  .map((product) => {
                    const visibleVariants = product.variants.filter(
                      (variant) => variant.status === "Visible"
                    );

                    if (visibleVariants.length === 0) return null;

                    // use first visible variant
                    const frontImage =
                      visibleVariants[0]?.frontImage || "/placeholder.png";

                    return (
                      <div
                        key={product._id}
                        className="group overflow-hidden border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="relative bg-gray-50 py-6 flex justify-center">
                          <Link
                            to={`/allProduct/productDetails/${product._id}`}
                          >
                            <img
                              src={`${imageUrl}${frontImage}`}
                              alt={product.productName}
                              className="w-32 h-44 object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          </Link>

                          {/* Discount Badge */}
                          {product.discountPercentage > 0 && (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-br">
                              -{product.discountPercentage}%
                            </span>
                          )}

                          {/* Quick Actions */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex space-x-1 bg-white rounded-full p-1 shadow-lg">
                              <button className="p-1 hover:bg-gray-100 rounded-full">
                                <Star className="h-4 w-4 text-yellow-400" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          <h3 className="font-medium mb-2 line-clamp-2 text-sm leading-tight">
                            {product.productName}
                          </h3>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-primary">
                                $
                                {product.discountedPrice?.toFixed(2) ||
                                  product.price?.toFixed(2)}
                              </span>
                              {product.discountPercentage > 0 && (
                                <span className="text-sm text-gray-500 line-through">
                                  ${product.price?.toFixed(2)}
                                </span>
                              )}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 text-xs text-yellow-500">
                              <Star className="h-3 w-3 fill-current" />
                              <span>{product.rating || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="flex justify-center mt-11 items-center gap-2">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={productsData?.meta?.total || 0}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 mb-4 flex items-center justify-center">
                <div className="text-gray-400 text-4xl">🔍</div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery ? "No products found" : "No products available"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? `No products match "${searchQuery}". Try different keywords.`
                  : "Browse our categories to discover amazing products."}
              </p>
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors mr-3"
                >
                  Clear Search
                </button>
              )}
              <button
                onClick={handleClearAllFilters}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Browse All
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllProduct;
