'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Item, Store } from '@/src/app/types/store';
import { CurrencyFormat } from '../helpers/currencyFormat';

export default function StoreContent({ store }: { store: Store }) {
  const [selectedCategory, setSelectedCategory] = useState<string>(store.activeMenu?.categories[0]?.name || '');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [cart, setCart] = useState<Array<{ id: string; item: Item; quantity: number; options: string[] }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: Item, quantity: number, options: string[]) => {
    const cartItemId = `${item.id}-${options.sort().join('-')}`;
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === cartItemId);
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        const currentQuantity = updatedCart[existingItemIndex].quantity;
        updatedCart[existingItemIndex].quantity = currentQuantity + quantity;
        console.log(currentQuantity, quantity, updatedCart[existingItemIndex].quantity);
        return updatedCart;
      } else {
        return [...prevCart, { id: cartItemId, item, quantity, options }];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== cartItemId));
  };

  useEffect(() => {
    if (selectedItem || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem, isCartOpen]);

  if (!store.activeMenu) {
    return <div>No active menu available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-8">
        <nav className="flex justify-between items-center mb-6">
          <div className="flex space-x-4 overflow-x-auto px-4 sm:px-6 lg:px-8 scroll-carousel py-[2px]">
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
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View cart</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </nav>

        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-8">
          {store.activeMenu.categories
            .find((cat) => cat.name === selectedCategory)
            ?.items.map((item) => (
              <ItemCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
            ))}
        </div>

        {selectedItem && (
          <ItemDrawer item={selectedItem} onClose={() => setSelectedItem(null)} addToCart={addToCart} />
        )}
        {isCartOpen && (
          <CartDrawer cart={cart} onClose={() => setIsCartOpen(false)} removeFromCart={removeFromCart} />
        )}
      </div>
    </div>
  );
}

function ItemCard({ item, onClick }: { item: Item; onClick: () => void }) {
  return (
    <div
      tabIndex={0}
      className="bg-white overflow-hidden shadow-sm rounded-lg transition-all duration-300 focus:duration-0 hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 sm:h-36 md:h-48">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
          style={{ objectFit: 'cover' }}
          className="transition-all duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{item.shortDescription}</p>
        <p className="mt-2 text-lg font-bold text-indigo-600">{CurrencyFormat(item.price)}</p>
      </div>
    </div>
  );
}

function ItemDrawer({ item, onClose, addToCart }: { item: Item; onClose: () => void; addToCart: (item: Item, quantity: number, options: string[]) => void }) {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [quantity, setQuantity] = useState(1);
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

  useEffect(() => {
    const optionsPrice = Array.from(selectedOptions).reduce((total, optionId) => {
      const option = item.itemOptions.find(opt => opt.id === optionId);
      return total + (option?.price || 0);
    }, 0);
    setTotalPrice((item.price + optionsPrice) * quantity);
  }, [selectedOptions, quantity, item.price, item.itemOptions]);

  const handleOptionToggle = (optionId: string) => {
    const newSelectedOptions = new Set(selectedOptions);
    if (newSelectedOptions.has(optionId)) {
      newSelectedOptions.delete(optionId);
    } else {
      newSelectedOptions.add(optionId);
    }
    setSelectedOptions(newSelectedOptions);
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleAddToCart = () => {
    addToCart(item, quantity, Array.from(selectedOptions));
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="fixed inset-0 overflow-hidden z-50" aria-modal="true" role="dialog" onClick={onClose}>
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
                      sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
                      style={{ objectFit: 'cover' }}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-500">{item.description}</p>
                    <div className="flex gap-2 items-center mt-2">
                      <p className="text-2xl font-bold text-gray-900">{CurrencyFormat(totalPrice)}</p>
                      {quantity > 1 && (<p className="text-sm font-bold text-gray-500">{CurrencyFormat(item.price)}</p>)}
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900">Quantity</h3>
                    <div className="mt-2 flex items-center">
                      <button
                        onClick={decrementQuantity}
                        className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="mx-4 text-lg font-medium">{quantity}</span>
                      <button
                        onClick={incrementQuantity}
                        className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {item.itemOptions.length > 0 && (
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
                                onChange={() => handleOptionToggle(option.id)}
                              />
                              <label htmlFor={option.id} className="ml-3 block text-sm font-medium text-gray-700">
                                {option.name}
                                <p className="text-sm text-gray-500">{option.description}</p>
                              </label>
                            </div>
                            <p className="text-sm font-medium text-gray-900 text-nowrap">+ {CurrencyFormat(option.price)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add to order - {CurrencyFormat(totalPrice)}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function CartDrawer({
  cart,
  onClose,
  removeFromCart
}: {
  cart: Array<{ id: string; item: Item; quantity: number; options: string[] }>;
  onClose: () => void;
  removeFromCart: (cartItemId: string) => void;
}) {

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

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const totalPrice = cart.reduce((total, cartItem) => {
    const itemTotal = cartItem.item.price * cartItem.quantity;
    const optionsTotal = cartItem.options.reduce((optTotal, optionId) => {
      const option = cartItem.item.itemOptions.find(opt => opt.id === optionId);
      return optTotal + (option?.price || 0) * cartItem.quantity;
    }, 0);
    return total + itemTotal + optionsTotal;
  }, 0);

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
                  <h2 className="text-lg font-medium text-gray-900">Your Cart</h2>
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
                  {cart.map((cartItem) => (
                    <div key={cartItem.id} className="mb-4 pb-4 border-b border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{cartItem.item.name}</h3>
                          <p className="text-gray-500">Quantity: {cartItem.quantity}</p>
                          {cartItem.options.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-700">Options:</p>
                              <ul className="list-disc pl-5">
                                {cartItem.options.map(optionId => {
                                  const option = cartItem.item.itemOptions.find(opt => opt.id === optionId);
                                  return option && (
                                    <li key={optionId} className="text-sm text-gray-500">
                                      {option.name} (+ {CurrencyFormat(option.price)})
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(cartItem.id)}
                          className="text-red-600 hover:text-red-800 focus:outline-none"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>{CurrencyFormat(totalPrice)}</p>
                </div>
                <button
                  type="button"
                  className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
