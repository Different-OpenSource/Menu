'use client'
import Image from "next/image";
import { GetStore } from "./actions/get-store";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const store = GetStore();
  const uniqueCategories = store.menu.filter((item, index, self) =>
    index === self.findIndex((t) => (
      t.category === item.category
    ))
  ).map(item => item.category);

  return (
    <main className="flex justify-center">
      <section className="max-w-[500px] pb-8">
        <div>
          <Image src={store.image} alt={store.name} width={500} height={500} />
        </div>
        <section className="px-4">
          <h1 className="text-4xl font-bold pt-2">{store.name}</h1>
          <div className="flex gap-4 py-4">
            {
              uniqueCategories.map((category, index) => (
                <div key={index}>
                  <Link href={`#${category}`} className="text-sm font-semibold cursor-pointer hover:text-gray-600 active:font-bold">{category}</Link>
                </div>
              ))
            }
          </div>
          <div className="flex flex-col gap-4">
            {
              uniqueCategories.map((category, index) => (
                <div key={category} id={category} className="gap-4 flex flex-col">
                  <h2 className="text-xl font-bold">{category}</h2>
                  {
                    store.menu.filter(item => item.category === category).map((item, index) => (
                      <div onClick={() => router.push(`/item/${item.id}`)}  key={index} className="flex gap-4 border-b border-gray-200 py-4 bg-gray-200 p-2 cursor-pointer hover:bg-gray-300 active:bg-slate-200">
                        {
                          <div>
                            <Image src={item.image} alt={item.name} width={80} height={80} className="w-[80px] h-[80px] rounded-md" />
                          </div>
                        }
                        <div>
                          <h2 className="text-xl">{item.name}</h2>
                          <p className="text-sm text-gray-500">{item.shortDescription}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </section>
      </section>
    </main>
  );
}
