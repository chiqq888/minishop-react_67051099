function ProductCard({ name, price, icon }) { 
    return ( 
        <div className="bg-white p-6 rounded-xl shadow"> 
            <div className="text-5xl text-center"> 
                {icon} 
            </div> 
            <h3 className="mt-4 text-xl font-bold"> 
                {name} 
            </h3> 
            <p className="mt-4 text-xl font-bold text-blue-600"> 
                ฿{price} 
            </p> 
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"> 
                Add to Cart 
            </button> 
        </div> 
    ) 
} 
export default ProductCard