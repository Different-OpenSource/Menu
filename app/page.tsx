import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Store } from '@/app/types/store';
import { getStoreMenusWithCategoriesAndItems } from '@/app/lib/prisma';
import StoreContent from './StoreContent';

export default async function StorePage() {
  const storeData = await getStoreMenusWithCategoriesAndItems("48307c74-9550-47f6-918f-6bc5371e8a6a");

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
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center">
              {store.name}
            </h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 py-4">
          <p className="text-lg text-gray-600">{store.description}</p>
        </div>
      </div>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <StoreContent store={store} />
      </main>
    </div>
  );
}
