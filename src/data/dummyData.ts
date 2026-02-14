export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isPromo: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  review: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Sayap Ayam 500gr",
    category: "Ayam",
    price: 45000,
    image: "https://media.istockphoto.com/id/2156713928/photo/chicken-wings.webp?a=1&b=1&s=612x612&w=0&k=20&c=dBPV2dxa_E7TUJ10mXl4zns02XFg-EeitPsOW5p_odo=",
    isPromo: true,
  },
  {
    id: 2,
    name: "Fillet Dada Ayam 500gr",
    category: "Ayam",
    price: 55000,
    image: "https://media.istockphoto.com/id/1497779513/photo/daging-dada-ayam-mentah-or-raw-chicken-breasts-with-spices-and-herb.webp?a=1&b=1&s=612x612&w=0&k=20&c=bMZQoKm48KwC2wJRRYfH5x8LiFILHdDSYIdYwvzmJpQ=",
    isPromo: true,
  },
  {
    id: 3,
    name: "Udang Kupas Frozen 250gr",
    category: "Seafood",
    price: 65000,
    image: "https://media.istockphoto.com/id/2232119233/id/foto/udang-mentah-segar-yang-dikupas-diisolasi-dengan-latar-belakang-studio-putih.jpg?s=612x612&w=0&k=20&c=VqA6Z3BeZvN30kaUI41-wibaBpsKa9Rq563JfF1clVo=",
    isPromo: true,
  },
  {
    id: 4,
    name: "Nugget Ayam 500gr",
    category: "Nugget",
    price: 40000,
    image: "https://media.istockphoto.com/id/464544207/id/foto/nugget-goreng.jpg?s=612x612&w=0&k=20&c=c8IXuy6X0Uwo5IdVnlEUDmSiG3R6WCaJGRsqaGGJPT0=",
    isPromo: true,
  },

  {
    id: 5,
    name: "Paha Ayam 500gr",
    category: "Ayam",
    price: 40000,
    image: "https://media.istockphoto.com/id/93456466/id/foto/kulit-mentah-pada-kaki-ayam-saling-menyilang.jpg?s=612x612&w=0&k=20&c=54VjrWF8fgsZMNgILIkRtA44kBtmqkaW3Q_rz7NYVuw=",
    isPromo: false,
  },

  {
    id: 6,
    name: "Kepiting Biru 500gr",
    category: "Seafood",
    price: 40000,
    image: "https://media.istockphoto.com/id/162160500/id/foto/kepiting-biru-di-latar-belakang-putih-yang-telah-dimasak.jpg?s=612x612&w=0&k=20&c=cuZTZSEyjHsXL1T7d7n24NBDajjeOHE0H3JxzyMdQ7s=",
    isPromo: false,
  },

  {
    id: 7,
    name: "Salmon Fillet 500gr",
    category: "Seafood",
    price: 40000,
    image: "https://media.istockphoto.com/id/1156856227/id/foto/ikan-beku-dalam-kotak-di-supermarket-atau-toko.jpg?s=612x612&w=0&k=20&c=rKoDBa7_D1nhq-rtTFQB2p0Iyo2A64HkT1QCa5EZjYo=",
    isPromo: false,
  },

  {
    id: 8,
    name: "Nugget Sapi 500gr",
    category: "Nugget",
    price: 40000,
    image: "https://media.istockphoto.com/id/2216380057/id/foto/nugget-ayam-buatan-sendiri.jpg?s=612x612&w=0&k=20&c=4_a2DjTpV-Hzex5JL-Z3Vo8402U9mQtuNBlmEnZy-Tg=",
    isPromo: false,
  },

  
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Pemilik UMKM",
    review: "Pengiriman cepat banget, spesifikasi pesanan selalu sesuai. Harga sangat bersaing untuk dijual lagi.",
    rating: 5
  },
  {
    id: 2,
    name: "Siti Aminah",
    role: "Ibu Rumah Tangga",
    review: "Jaminan fresh! Nuggetnya enak dan higienis. Anak-anak di rumah sangat suka.",
    rating: 5
  },
  {
    id: 3,
    name: "Andi Wijaya",
    role: "Pemilik Cafe",
    review: "Sangat membantu operasional cafe saya. Stok selalu aman dan pemesanan via WA sangat mudah.",
    rating: 5
  }
];