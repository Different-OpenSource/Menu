interface MenuItem {
  id: string;
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
        id: "da2882d1-c39a-4c57-8e9f-7ada7d41e77d",
        name: "Bruschetta",
        image: "/images/bruschetta.jpg",
        shortDescription: "Pão italiano tostado com tomate e manjericão",
        description: "Fatias de pão italiano tostado coberto com tomates frescos, alho, manjericão e azeite extra virgem.",
        category: "Entradas",
        price: 12.00
      },
      {
        id: "753f84cc-9f67-4d32-8175-81c77de1d744",
        name: "Carpaccio",
        image: "/images/carpaccio.jpg",
        shortDescription: "Fino corte de carne crua",
        description: "Finas fatias de carne bovina crua, marinadas em molho de limão e alcaparras, servidas com rúcula e queijo parmesão.",
        category: "Entradas",
        price: 15.00
      },
      {
        id: "3032aeb5-59f1-41a2-9179-89f42595936a",
        name: "Salada Caprese",
        image: "/images/salada-caprese.jpeg",
        shortDescription: "Salada italiana fresca",
        description: "Tomates frescos, mozzarella de búfala, manjericão e azeite extra virgem.",
        category: "Entradas",
        price: 14.00
      },
      {
        id: "3aedfedc-899c-42f8-af6d-4e0bb7053703",
        name: "Tábua de Queijos",
        image: "/images/tabua-queijos.jpg",
        shortDescription: "Seleção de queijos finos",
        description: "Uma seleção de queijos finos acompanhados de geleias e pães artesanais.",
        category: "Entradas",
        price: 18.00
      },
      {
        id: "439cce78-2b93-4ef4-8d5f-bc8e3d81f132",
        name: "Lasanha à bolonhesa",
        image: "/images/lasanha-bolonhesa.jpg",
        shortDescription: "Clássica lasanha italiana",
        description: "Camadas de massa fresca intercaladas com molho bolonhesa, bechamel e queijo parmesão, gratinadas no forno.",
        category: "Pratos do dia",
        price: 25.00
      },
      {
        id: "afb0a92f-51eb-4889-a238-822205c5ae22",
        name: "Risoto de camarão",
        image: "/images/risoto-camarao.jpg",
        shortDescription: "Risoto cremoso de camarão",
        description: "Arroz arbóreo cozido lentamente com caldo de peixe, camarões salteados, manteiga e queijo parmesão.",
        category: "Pratos do dia",
        price: 30.00
      },
      {
        id: "f68da3e8-ec39-4fde-99b7-c834b279a998",
        name: "Frango à Parmegiana",
        image: "/images/frango-parmegiana.webp",
        shortDescription: "Frango empanado com queijo e molho de tomate",
        description: "Peito de frango empanado, coberto com queijo derretido e molho de tomate caseiro, servido com espaguete.",
        category: "Pratos do dia",
        price: 22.00
      },
      {
        id: "e1d4179e-bf3c-4898-beb9-f4bc32da30c2",
        name: "Pizza Margherita",
        image: "/images/pizza.webp",
        shortDescription: "Pizza clássica italiana",
        description: "Pizza com molho de tomate caseiro, mozzarella fresca e manjericão. Assada em forno a lenha.",
        category: "Pratos do dia",
        price: 28.00
      },
      {
        id: "ed25d7f2-f413-46be-bcbb-102d94b2aa27",
        name: "Vinho Tinto",
        image: "/images/vinho.webp",
        shortDescription: "Vinho tinto seco",
        description: "Vinho tinto seco, encorpado e com notas de frutas vermelhas. Ideal para acompanhar carnes vermelhas.",
        category: "Bebidas",
        price: 40.00
      },
      {
        id: "16da6943-9516-4834-98c3-0250b57e5403",
        name: "Suco de Laranja",
        image: "/images/suco-laranja.jpeg",
        shortDescription: "Suco de laranja natural",
        description: "Suco de laranja feito na hora, sem adição de açúcar ou conservantes.",
        category: "Bebidas",
        price: 8.00
      },
      {
        id: "35fff4a9-535f-429c-a1da-7cfa7cd8d728",
        name: "Água Mineral",
        image: "/images/agua.webp",
        shortDescription: "Água mineral natural",
        description: "Água mineral natural, sem gás. Garrafa de 500ml.",
        category: "Bebidas",
        price: 3.00
      },
      {
        id: "fa7a1613-ec50-4b63-933d-8e10534e335f",
        name: "Café Expresso",
        image: "/images/cafe.png",
        shortDescription: "Café expresso forte",
        description: "Café expresso forte e encorpado. Servido em uma pequena xícara de cerâmica.",
        category: "Bebidas",
        price: 4.00
      },
      {
        id: "62bdd6f2-2ca0-4594-9094-a2d24af37461",
        name: "Tiramisu",
        image: "/images/tiramisu.jpg",
        shortDescription: "Clássica sobremesa italiana",
        description: "Camadas de biscoitos champagne embebidos em café, intercaladas com um creme leve de queijo mascarpone e cacau em pó.",
        category: "Sobremesa",
        price: 15.00
      },
      {
        id: "1dd643fb-a2a6-4c39-9a72-07296834f625",
        name: "Pudim de Leite",
        image: "/images/pudim.webp",
        shortDescription: "Pudim de leite condensado",
        description: "Pudim de leite condensado com uma calda de caramelo suave, cozido lentamente em banho-maria.",
        category: "Sobremesa",
        price: 12.00
      },
      {
        id: "77c7fee1-3fa9-458e-a6e7-bf96b8a7b09f",
        name: "Gelato de Baunilha",
        image: "/images/gelato.jpg",
        shortDescription: "Sorvete italiano de baunilha",
        description: "Gelato italiano cremoso sabor baunilha. Servido com calda de chocolate.",
        category: "Sobremesa",
        price: 10.00
      },
      {
        id: "72c094aa-012f-4d18-b45e-5a0c1f7e8207",
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