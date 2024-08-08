interface MenuItem {
  name: string;
  image: string;
  shortDescription: string;
  description: string;
  category: string;
  price: number;
}

interface Store {
  id: number;
  name: string;
  image: string;
  menu: MenuItem[];
}

export function GetStore() {
  return {
    id: 1,
    name: 'Mundi Coffee',
    image: '/images/store-image.jpg',
    menu: [
      {
        name: "Bruschetta",
        image: "/images/bruschetta.jpg",
        shortDescription: "Pão italiano tostado com tomate e manjericão",
        description: "Fatias de pão italiano tostado coberto com tomates frescos, alho, manjericão e azeite extra virgem.",
        category: "Entradas",
        price: 12.00
      },
      {
        name: "Carpaccio",
        image: "/images/carpaccio.jpg",
        shortDescription: "Fino corte de carne crua",
        description: "Finas fatias de carne bovina crua, marinadas em molho de limão e alcaparras, servidas com rúcula e queijo parmesão.",
        category: "Entradas",
        price: 15.00
      },
      {
        name: "Salada Caprese",
        image: "/images/salada-caprese.jpeg",
        shortDescription: "Salada italiana fresca",
        description: "Tomates frescos, mozzarella de búfala, manjericão e azeite extra virgem.",
        category: "Entradas",
        price: 14.00
      },
      {
        name: "Tábua de Queijos",
        image: "/images/tabua-queijos.jpg",
        shortDescription: "Seleção de queijos finos",
        description: "Uma seleção de queijos finos acompanhados de geleias e pães artesanais.",
        category: "Entradas",
        price: 18.00
      },
      {
        name: "Lasanha à bolonhesa",
        image: "/images/lasanha-bolonhesa.jpg",
        shortDescription: "Clássica lasanha italiana",
        description: "Camadas de massa fresca intercaladas com molho bolonhesa, bechamel e queijo parmesão, gratinadas no forno.",
        category: "Pratos do dia",
        price: 25.00
      },
      {
        name: "Risoto de camarão",
        image: "/images/risoto-camarao.jpg",
        shortDescription: "Risoto cremoso de camarão",
        description: "Arroz arbóreo cozido lentamente com caldo de peixe, camarões salteados, manteiga e queijo parmesão.",
        category: "Pratos do dia",
        price: 30.00
      },
      {
        name: "Frango à Parmegiana",
        image: "/images/frango-parmegiana.webp",
        shortDescription: "Frango empanado com queijo e molho de tomate",
        description: "Peito de frango empanado, coberto com queijo derretido e molho de tomate caseiro, servido com espaguete.",
        category: "Pratos do dia",
        price: 22.00
      },
      {
        name: "Pizza Margherita",
        image: "/images/pizza.webp",
        shortDescription: "Pizza clássica italiana",
        description: "Pizza com molho de tomate caseiro, mozzarella fresca e manjericão. Assada em forno a lenha.",
        category: "Pratos do dia",
        price: 28.00
      },
      {
        name: "Vinho Tinto",
        image: "/images/vinho.webp",
        shortDescription: "Vinho tinto seco",
        description: "Vinho tinto seco, encorpado e com notas de frutas vermelhas. Ideal para acompanhar carnes vermelhas.",
        category: "Bebidas",
        price: 40.00
      },
      {
        name: "Suco de Laranja",
        image: "/images/suco-laranja.jpeg",
        shortDescription: "Suco de laranja natural",
        description: "Suco de laranja feito na hora, sem adição de açúcar ou conservantes.",
        category: "Bebidas",
        price: 8.00
      },
      {
        name: "Água Mineral",
        image: "/images/agua.webp",
        shortDescription: "Água mineral natural",
        description: "Água mineral natural, sem gás. Garrafa de 500ml.",
        category: "Bebidas",
        price: 3.00
      },
      {
        name: "Café Expresso",
        image: "/images/cafe.png",
        shortDescription: "Café expresso forte",
        description: "Café expresso forte e encorpado. Servido em uma pequena xícara de cerâmica.",
        category: "Bebidas",
        price: 4.00
      },
      {
        name: "Tiramisu",
        image: "/images/tiramisu.jpg",
        shortDescription: "Clássica sobremesa italiana",
        description: "Camadas de biscoitos champagne embebidos em café, intercaladas com um creme leve de queijo mascarpone e cacau em pó.",
        category: "Sobremesa",
        price: 15.00
      },
      {
        name: "Pudim de Leite",
        image: "/images/pudim.webp",
        shortDescription: "Pudim de leite condensado",
        description: "Pudim de leite condensado com uma calda de caramelo suave, cozido lentamente em banho-maria.",
        category: "Sobremesa",
        price: 12.00
      },
      {
        name: "Gelato de Baunilha",
        image: "/images/gelato.jpg",
        shortDescription: "Sorvete italiano de baunilha",
        description: "Gelato italiano cremoso sabor baunilha. Servido com calda de chocolate.",
        category: "Sobremesa",
        price: 10.00
      },
      {
        name: "Cannoli",
        image: "/images/cannoli.jpg",
        shortDescription: "Doce italiano recheado",
        description: "Cannoli recheado com creme de ricota e gotas de chocolate, polvilhado com açúcar de confeiteiro.",
        category: "Sobremesa",
        price: 14.00
      }
    ]
  } as Store;
}