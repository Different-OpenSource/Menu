import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Store } from '@/src/app/types/store';
import { getStoreMenusWithCategoriesAndItems } from '@/src/app/lib/prisma';
import StoreContent from './store/StoreContent';

export default async function StorePage() {
  const storeData = await getStoreMenusWithCategoriesAndItems("");

  if (!storeData || !storeData.activeMenu) {
    notFound()
  }

  const store: Store = {
    ...storeData,
    activeMenu: {
      ...storeData.activeMenu,
      categories: storeData.activeMenu.categories.map(category => ({
        ...category,
        items: category.items.map(item => ({
          ...item,
          itemOptions: item.itemOptions.map(itemOption => ({
            id: itemOption.itemOption.id,
            name: itemOption.itemOption.name,
            description: itemOption.itemOption.description,
            price: itemOption.itemOption.price.toNumber()
          })),
          price: item.price.toNumber()
        }))
      }))
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="relative h-48 sm:h-64 md:h-80">
          <Image
            src={store.image}
            alt={store.name}
            sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
            fill
            style={{ objectFit: "cover" }}
            className="w-full h-full object-center"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center">
              {store.name}
            </h1>
          </div>
        </div>
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 py-4">
          <p className="text-lg text-gray-600">{store.description}</p>
          <div>
            <button
              className="relative p-2 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View cart</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                10
              </span>
            </button>
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <StoreContent store={store} />
      </main>
    </div>
  );
}
