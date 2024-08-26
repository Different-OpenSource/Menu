'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Item, Store } from '@/app/types/store';

export default function StoreContent({ store }: { store: Store }) {
  const [selectedCategory, setSelectedCategory] = useState<string>(store.activeMenu?.categories[0]?.name || '');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem]);

  if (!store.activeMenu) {
    return <div>No active menu available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex space-x-4 overflow-x-auto pb-4">
          {store.activeMenu.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${selectedCategory === category.name
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category.name}
            </button>
          ))}
        </nav>

        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {store.activeMenu.categories
            .find((cat) => cat.name === selectedCategory)
            ?.items.map((item) => (
              <ItemCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
            ))}
        </div>

        {selectedItem && (
          <ItemDrawer item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </div>
    </div>
  );
}

function ItemCard({ item, onClick }: { item: Item; onClick: () => void }) {
  return (
    <div
      className="bg-white overflow-hidden shadow-sm rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 sm:h-36 md:h-48">
        <Image
          src={item.image}
          alt={item.name}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-all duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{item.shortDescription}</p>
        <p className="mt-2 text-lg font-bold text-indigo-600">${item.price}</p>
      </div>
    </div>
  );
}

function ItemDrawer({ item, onClose }: { item: Item; onClose: () => void }) {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [totalPrice, setTotalPrice] = useState(item.price);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const handleOptionToggle = (optionId: string, optionPrice: number) => {
    const newSelectedOptions = new Set(selectedOptions);
    if (newSelectedOptions.has(optionId)) {
      newSelectedOptions.delete(optionId);
      setTotalPrice(prev => prev - optionPrice);
    } else {
      newSelectedOptions.add(optionId);
      setTotalPrice(prev => prev + optionPrice);
    }
    setSelectedOptions(newSelectedOptions);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-50" onClick={onClose}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <section
          className="absolute inset-y-0 right-0 max-w-full flex sm:pl-16"
          onClick={handleContentClick}
        >
          <div className="w-screen h-full sm:max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl">
              <div className="sticky top-0 z-10 bg-white px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">{item.name}</h2>
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close panel</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6">
                  <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-500">{item.description}</p>
                    <p className="mt-2 text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</p>
                  </div>
                  {
                    item.itemOptions.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-900">Additional Options</h3>
                        <div className="mt-2 space-y-4">
                          {item.itemOptions.map((option) => (
                            <div key={option.id} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <input
                                  id={option.id}
                                  name={option.id}
                                  type="checkbox"
                                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                  checked={selectedOptions.has(option.id)}
                                  onChange={() => handleOptionToggle(option.id, option.price || 0)}
                                />
                                <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                                  {option.name}
                                  <p className="text-sm text-gray-500">{option.description}</p>
                                </label>
                              </div>
                              <p className="text-sm font-medium text-gray-900">+${option.price?.toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="flex-shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add to order - ${totalPrice.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
