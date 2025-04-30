import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { SignInForm } from './components/auth/SignInForm';
import { SignUpForm } from './components/auth/SignUpForm';
import { ProductList } from './components/products/ProductList';
import { CartList } from './components/cart/CartList';
import { Navbar } from './components/layout/Navbar';
import { ChatWidget } from './components/chat/ChatWidget';

function App() {
  return (
    <ThemeProvider attribute="class">
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Toaster position="top-right" />
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<CartList />} />
              <Route
                path="/signin"
                element={
                  <div className="max-w-md mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                      Sign In
                    </h2>
                    <SignInForm />
                  </div>
                }
              />
              <Route
                path="/signup"
                element={
                  <div className="max-w-md mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                      Sign Up
                    </h2>
                    <SignUpForm />
                  </div>
                }
              />
            </Routes>
          </main>
          <ChatWidget />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;