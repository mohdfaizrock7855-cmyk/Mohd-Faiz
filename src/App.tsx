/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ShoppingBag, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  Scissors, 
  PenTool, 
  Package,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";

// --- Types ---

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  tag?: "Best Seller" | "New" | "Special Offer" | "Limited";
}

const COSMETICS: Product[] = [
  { 
    id: 1, 
    name: "Nisha Hair Color - Natural Black", 
    price: "₹45", 
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=400", 
    tag: "Best Seller",
    description: "Premium ammonia-free hair color enriched with the goodness of Henna, Amla, and Shikakai for long-lasting natural shine."
  },
  { 
    id: 2, 
    name: "Pond's Bright Beauty Cream", 
    price: "₹150", 
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400",
    tag: "Special Offer",
    description: "Advanced vitamin B3+ formula that works from within to nourish and lighten skin, reducing dark spots for a radiant glow."
  },
  { 
    id: 3, 
    name: "Herbal Essences Shampoo", 
    price: "₹350", 
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400",
    description: "Made with real botanicals, this shampoo cleanses and protects your hair, leaving it smelling like a fresh tropical garden."
  },
  { 
    id: 4, 
    name: "Lakme Liquid Foundation", 
    price: "₹299", 
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=400",
    tag: "New",
    description: "A lightweight, long-wear liquid foundation that provides medium coverage and a natural-looking matte finish."
  },
  { 
    id: 5, 
    name: "Nivea Soft Moisturizer", 
    price: "₹180", 
    image: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&q=80&w=400",
    description: "Intensive moisturizing cream with Vitamin E and Jojoba Oil. Fast absorbing and non-greasy for soft, supple skin."
  },
];

const FANCY: Product[] = [
  { 
    id: 1, 
    name: "Zari Velvet Ribbon - Gold", 
    price: "₹40/mtr", 
    image: "https://images.unsplash.com/photo-1589133989115-46fcc78b3017?auto=format&fit=crop&q=80&w=400", 
    tag: "New",
    description: "Exquisite 2-inch wide gold zari ribbon on deep velvet base. Perfect for bordering sarees, lehengas, and decorative rolls."
  },
  { 
    id: 2, 
    name: "Embroidered Border Lace", 
    price: "₹120/mtr", 
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=400",
    tag: "Best Seller",
    description: "Highly intricate multi-thread embroidery with pearl accents. A premium choice for boutique tailoring and high-end fashion."
  },
  { 
    id: 3, 
    name: "Stone Worked Patches (Set)", 
    price: "₹85", 
    image: "https://images.unsplash.com/photo-1605900592931-155452d7e59b?auto=format&fit=crop&q=80&w=400",
    description: "Set of 4 kundan-style stone patches for suit necks and sleeves. Adds instant royalty to any simple garment."
  },
  { 
    id: 4, 
    name: "Designer Latkan Pair", 
    price: "₹150", 
    image: "https://images.unsplash.com/photo-1616422285623-13ff0167c95c?auto=format&fit=crop&q=80&w=400",
    tag: "Limited",
    description: "Statement hanging tassels (Latkans) featuring heavy beadwork and vibrant silk threads. Ideal for blouse and lehenga tie-ups."
  },
  { 
    id: 5, 
    name: "Satin Decorative Rolls", 
    price: "₹60", 
    image: "https://images.unsplash.com/photo-1610471549410-09a27fe6a760?auto=format&fit=crop&q=80&w=400",
    description: "High-quality glossy satin rolls in 20+ vibrant colors. Used for gift wrapping, event decor, and children's craft projects."
  },
];

const STATIONERY: Product[] = [
  { 
    id: 1, 
    name: "Premium Fountain Pen Set", 
    price: "₹450", 
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400", 
    tag: "Best Seller",
    description: "Executive fountain pen with a gold-plated iridium nib. Comes in a luxury wooden box with 2 ink cartridges."
  },
  { 
    id: 2, 
    name: "Artline Sketch Pens (24)", 
    price: "₹120", 
    image: "https://images.unsplash.com/photo-1590393910609-b48450f3f225?auto=format&fit=crop&q=80&w=400",
    tag: "Special Offer",
    description: "Standard 24-color felt-tip pen set. Non-toxic, vibrant colors that are perfect for school projects and artistic sketches."
  },
  { 
    id: 3, 
    name: "Classmate Notebooks (Pack)", 
    price: "₹240", 
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400",
    description: "Pack of 6 premium long-sized notebooks. Feature super-smooth chlorine-free paper and fun educational back pages."
  },
  { 
    id: 4, 
    name: "Casio Calculator DX-12B", 
    price: "₹650", 
    image: "https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&q=80&w=400",
    description: "Durable 12-digit commercial calculator with a metal faceplate and large display. Essential for shop owners and accountants."
  },
  { 
    id: 5, 
    name: "Kids Glow Slime Kit", 
    price: "₹199", 
    image: "https://images.unsplash.com/photo-1596468138834-406606059d04?auto=format&fit=crop&q=80&w=400",
    tag: "New",
    description: "DIY glow-in-the-dark slime making kit. Includes non-toxic glue, activator, and glitter. Hours of scientific fun for kids."
  },
];


// --- Components ---

const ProductCarousel = ({ title, products, icon: Icon, onSelect }: { title: string, products: Product[], icon: any, onSelect: (p: Product) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  const getTagStyles = (tag?: string) => {
    switch (tag) {
      case "Best Seller": return "bg-amber-500";
      case "New": return "bg-rose-500";
      case "Special Offer": return "bg-emerald-500";
      case "Limited": return "bg-purple-500";
      default: return "bg-slate-700";
    }
  };

  return (
    <div className="py-12 border-b border-emerald-900/5 last:border-0">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-900 text-white p-3 rounded-2xl">
            <Icon size={24} />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{title}</h3>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={prev}
            className="p-3 rounded-full bg-white border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 transition-all shadow-sm"
          >
            <ChevronRight className="rotate-180" size={20} />
          </button>
          <button 
            onClick={next}
            className="p-3 rounded-full bg-white border border-slate-200 hover:bg-emerald-50 hover:border-emerald-200 transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <motion.div 
          className="flex gap-6"
          animate={{ x: `calc(-${currentIndex * (100 / 1.5)}% - ${currentIndex * 1.5}rem)` }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          style={{ width: "fit-content" }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="w-[280px] sm:w-[320px] flex-shrink-0 bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {product.tag && (
                  <div className={`absolute top-3 left-3 text-white text-[10px] uppercase font-black px-2 py-1 rounded-md shadow-lg ${getTagStyles(product.tag)}`}>
                    {product.tag}
                  </div>
                )}
                
                {/* Overlay Controls */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                   <button 
                    onClick={() => onSelect(product)}
                    className="bg-white text-emerald-950 px-4 py-2 rounded-xl text-xs font-bold shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-emerald-50"
                   >
                     Quick View
                   </button>
                </div>

                <a 
                  href={`https://wa.me/9453157463?text=Hi, I would like to order ${product.name} listed for ${product.price}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 shadow-lg"
                >
                  <MessageCircle size={20} className="text-green-600" />
                </a>
              </div>
              <h4 className="font-bold text-slate-800 mb-1 line-clamp-1">{product.name}</h4>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-emerald-700 font-black text-lg">{product.price}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">In Stock</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const QuickViewModal = ({ product, onClose }: { product: Product | null, onClose: () => void }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 md:p-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-emerald-950/40 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-4xl overflow-hidden rounded-[2.5rem] shadow-2xl overflow-y-auto max-h-[85vh] md:max-h-none"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white/80 p-2 rounded-full hover:bg-white shadow-md"
        >
          <X size={24} className="text-slate-900" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="aspect-square">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="p-8 md:p-12 flex flex-col">
            <div className="mb-4">
              {product.tag && (
                <span className="bg-amber-100 text-amber-700 text-xs font-black uppercase px-3 py-1 rounded-full mb-3 inline-block">
                  {product.tag}
                </span>
              )}
              <h2 className="text-3xl font-bold text-slate-900">{product.name}</h2>
              <p className="text-3xl font-black text-emerald-800 mt-2">{product.price}</p>
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Product Description</h4>
              <p className="text-slate-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="mt-auto space-y-4">
              <a 
                href={`https://wa.me/9453157463?text=Order Request: ${product.name} (${product.price})`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-emerald-800 transition-all"
              >
                <MessageCircle size={24} className="text-green-400" />
                Add to WhatsApp Order
              </a>
              <div className="flex items-center justify-center gap-4 text-slate-400 text-sm font-medium pt-4">
                <div className="flex items-center gap-2">
                  <Package size={16} /> Fast Stock
                </div>
                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                <div className="flex items-center gap-2">
                  <Sparkles size={16} /> Premium Quality
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Categories", href: "#categories" },
    { name: "New Arrivals", href: "#new-arrivals" },
    { name: "Visit Us", href: "#contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-900 text-white p-2 rounded-lg">
            <ShoppingBag size={24} />
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? "text-emerald-900" : "text-white sm:text-emerald-900"}`}>
            NISAR <span className="text-amber-600">General Store</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors hover:text-amber-600 ${isScrolled ? "text-slate-600" : "text-white sm:text-slate-600"}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="tel:9453157463"
            className="flex items-center gap-2 bg-emerald-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-800 transition-all shadow-lg shadow-emerald-900/10"
          >
            <Phone size={16} />
            Call Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-emerald-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl p-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-600 text-lg font-medium py-2 border-b border-slate-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/9453157463"
            className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl font-semibold mt-2"
          >
            <MessageCircle size={20} />
            Order on WhatsApp
          </a>
        </motion.div>
      )}
    </nav>
  );
};

const CategoryCard = ({ icon: Icon, title, description, image, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500"
  >
    <div className="aspect-[4/5] overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
    </div>
    
    <div className="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform duration-500">
      <div className="bg-amber-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-2xl font-bold mb-1">{title}</h3>
      <p className="text-emerald-50/80 text-sm">{description}</p>
      
      <div className="mt-4 flex items-center gap-2 text-amber-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
        Browse Collection <ChevronRight size={16} />
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Close modal on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div id="home" className="min-h-screen bg-[#fdfcf0] font-sans text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 px-6 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-900/5 -skew-x-12 transform translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Sparkles size={16} />
              Serving our community since decades
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-slate-900">
              Your One-Stop Shop for <span className="text-emerald-800 italic">Everything!</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              From premium <span className="font-semibold text-slate-800">Cosmetics</span> and branded <span className="font-semibold text-slate-800">Hair Care</span> to exquisite <span className="font-semibold text-slate-800">Fancy Ribbons</span>, Stationery, and Daily Essentials. quality you trust, variety you love.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-emerald-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-900/20 active:scale-95"
              >
                Browse Products
              </button>
              <a 
                href="https://wa.me/9453157463"
                className="bg-white text-emerald-900 border-2 border-emerald-900/10 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle size={24} className="text-green-600" />
                Order via WhatsApp
              </a>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold text-emerald-950">5000+</div>
                <div className="text-sm text-slate-500 font-medium">Products</div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div>
                <div className="text-3xl font-bold text-emerald-950">10k+</div>
                <div className="text-sm text-slate-500 font-medium">Happy Customers</div>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000" 
                alt="Store Interior"
                className="w-full aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 to-transparent" />
            </div>
            
            {/* Absolute Badges */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-2xl z-20"
            >
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 text-amber-600 p-2 rounded-xl">
                  <Sparkles size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Fancy Items</div>
                  <div className="text-xs text-slate-500">Laces & Borders</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl z-20"
            >
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Cosmetics</div>
                  <div className="text-xs text-slate-500">Premium Brands</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories - Quick Icons */}
      <section id="categories" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Shop by Category</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Browse through our well-stocked aisles and find quality products for every need.
            </p>
          </motion.div>
        </div>

        <div className="space-y-4">
          <ProductCarousel title="Cosmetics & Beauty" products={COSMETICS} icon={Sparkles} onSelect={setSelectedProduct} />
          <ProductCarousel title="Fancy & Tailoring" products={FANCY} icon={Scissors} onSelect={setSelectedProduct} />
          <ProductCarousel title="Stationery & Gifts" products={STATIONERY} icon={PenTool} onSelect={setSelectedProduct} />
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-emerald-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-center"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-emerald-800 rounded-full flex items-center justify-center mb-8 shadow-2xl">
              <MessageCircle size={40} className="text-green-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Order Anything via WhatsApp!</h2>
            <p className="text-emerald-100/80 text-lg mb-10 max-w-2xl">
              Simply send us a message with your requirements, and we'll prepare your order for pickup or quick delivery.
            </p>
            
            <a 
              href="https://wa.me/9453157463"
              className="group bg-green-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-green-400 transition-all shadow-2xl flex items-center gap-3"
            >
              <MessageCircle size={28} />
              WhatsApp Us: +91 94531 57463
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Contact & Visit Us */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-4xl font-bold mb-8">Visit Our Store</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="bg-emerald-100 text-emerald-800 p-4 rounded-2xl h-fit">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2">Our Location</h4>
                <p className="text-slate-600 leading-relaxed">
                  Main Market Road, Near City Center Mosque,<br/>
                  NISAR General Store, Pin: 221001
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="bg-amber-100 text-amber-800 p-4 rounded-2xl h-fit">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2">Shop Timings</h4>
                <div className="grid grid-cols-2 gap-4 text-slate-600">
                  <div>Mon - Sat:</div>
                  <div className="font-medium text-slate-900">09:00 AM - 09:00 PM</div>
                  <div>Sunday:</div>
                  <div className="font-medium text-slate-900">10:00 AM - 02:00 PM</div>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="bg-blue-100 text-blue-800 p-4 rounded-2xl h-fit">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2">Customer Support</h4>
                <p className="text-slate-600 font-medium">9453157463 / 8840213XXX</p>
                <p className="text-sm text-slate-400">Available during shop hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-emerald-900/5 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative h-96 bg-slate-200 rounded-[2rem] overflow-hidden border-2 border-white shadow-xl flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin size={48} className="mx-auto text-emerald-800 mb-4 animate-bounce" />
              <p className="text-slate-500 font-medium">Map View of NISAR General Store</p>
              <button className="mt-4 bg-white px-6 py-2 rounded-full text-sm font-bold shadow-sm border border-slate-100">Open in Google Maps</button>
            </div>
            {/* Minimal Map Overlay Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#064e3b 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-20 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-emerald-600 text-white p-2 rounded-lg">
                  <ShoppingBag size={20} />
                </div>
                <span className="text-xl font-bold">NISAR <span className="text-amber-500">General Store</span></span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Your trusted neighborhood partner for over 25 years. We take pride in offering the finest collection of luxury cosmetics, tailoring needs, and daily essentials.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold text-lg mb-6 text-white">Quick Links</h5>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#home" className="hover:text-amber-500 transition-colors">Home</a></li>
                <li><a href="#categories" className="hover:text-amber-500 transition-colors">Store Categories</a></li>
                <li><a href="#contact" className="hover:text-amber-500 transition-colors">Find Location</a></li>
                <li><a href="https://wa.me/9453157463" className="hover:text-amber-500 transition-colors">WhatsApp Order</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-lg mb-6 text-white">Categories</h5>
              <ul className="space-y-4 text-slate-400">
                <li>Fancy Items & Laces</li>
                <li>Branded Cosmetics</li>
                <li>Health & Beauty</li>
                <li>Kids Toys & Gifts</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-900 flex flex-col md:row-between gap-4 text-sm text-slate-500">
            <p>© 2024 NISAR General Store. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-amber-500">Privacy Policy</a>
              <a href="#" className="hover:text-amber-500">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Floating Action */}
      <motion.a 
        href="https://wa.me/9453157463"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-green-400 transition-all border-4 border-white"
      >
        <MessageCircle size={32} />
      </motion.a>
    </div>
  );
}
