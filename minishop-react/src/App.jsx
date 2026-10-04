import Header from './components/Header' 
import ProductCard from './components/ProductCard' 

function App() { 
  return ( 
    <div className="min-h-screen bg-gray-100"> 
      <Header /> 
      <main className="max-w-7xl mx-auto p-10"> 
        <h2 className="text-3xl font-bold mb-6"> 
          Products 
        </h2> 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
          <ProductCard name="Laptop" price="12900" icon="💻" /> 
          <ProductCard name="Headphones" price="1290" icon="🎧" /> 
          <ProductCard name="Backpack" price="890" icon="🎒" />
        </div> 
      </main> 
    </div> 
  ) 
} 

export default App