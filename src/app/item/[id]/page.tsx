import { GetStore } from "@/src/app/actions/get-store"
import { CurrencyFormat } from "@/src/app/helpers/currencyFormat"
import Image from "next/image"

export default function Page({ params }: { params: { id: string } }) {

  const store = GetStore()
  const item = store.menu.find(item => item.id === params.id)

  return (
    <main className="flex justify-center ">
      <section className="max-w-[500px] p-4">
        <div>
          <Image src={item?.image || ''} alt={item?.name || ''} width={500} height={500} className="rounded-2xl" />
        </div>
        <section>
          <h1 className="text-4xl font-bold pt-2">{item?.name}</h1>
          <div className="flex gap-4 py-4 text-gray-600"> 
            {item?.description}
          </div>
          <h2 className="text-2xl font-bold pt-2 text-gray-700 underline-offset-2 underline">{CurrencyFormat(item?.price || 0)}</h2>
        </section>
      </section>
    </main>
  )
}