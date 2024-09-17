import React, { useState } from 'react';
import './App.css'; // Assuming you will add some styles later

// Example product data with images
const products = [
  { id: 1, name: 'Product 1', description: 'Description of Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', description: 'Description of Product 2', price: 19.99, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', description: 'Description of Product 3', price: 39.99, image: 'https://via.placeholder.com/150' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: ''
  });

  // Function to handle adding products to the cart
  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  // Function to handle removing products from the cart
  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  // Function to handle changing the quantity of items in the cart
  const updateQuantity = (product, quantity) => {
    setCart(cart.map((item) =>
      item.id === product.id ? { ...item, quantity: quantity } : item
    ));
  };

  // Calculate total price of items in the cart
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  // Handle checkout submission
  const handleCheckout = () => {
    if (customerDetails.name && customerDetails.email && customerDetails.address) {
      alert(`Thank you for your purchase, ${customerDetails.name}!`);
      setCart([]);
      setCheckout(false);
      setCustomerDetails({ name: '', email: '', address: '' });
    } else {
      alert('Please fill out all customer details.');
    }
  };

  return (
    <div className="app">
      <header>
        <h1>E-Marketing Shop</h1>
        <p>Welcome to our online store. Check out our awesome products below!</p>
      </header>

      {!checkout ? (
        <>
          <section>
            <h2>Products</h2>
            <div className="product-list">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                <ul>
                  {cart.map((item, index) => (
                    <li key={index}>
                      <div className="cart-item">
                        {item.name} - ${item.price.toFixed(2)} x{' '}
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) => updateQuantity(item, parseInt(e.target.value))}
                        />
                        <button onClick={() => removeFromCart(item)}>Remove</button>
                      </div>
                    </li>
                  ))}
                </ul>
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
                <button onClick={() => setCheckout(true)}>Proceed to Checkout</button>
              </div>
            )}
          </section>
        </>
      ) : (
        <section>
          <h2>Checkout</h2>
          <div className="checkout-form">
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={customerDetails.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={customerDetails.email}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Address:
              <textarea
                name="address"
                value={customerDetails.address}
                onChange={handleInputChange}
                required
              />
            </label>
            <button onClick={handleCheckout}>Complete Purchase</button>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
