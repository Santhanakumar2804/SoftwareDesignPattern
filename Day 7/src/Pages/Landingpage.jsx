import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function LandingPage() {
  const [showDescription, setShowDescription] = useState(false);

  const handleLearnMoreClick = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center text-gray-800 text-center p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-5xl font-extrabold mb-4">Welcome to the Life Insurance Company</h2>
        <p className="text-xl mb-8">Secure your future with our reliable insurance plans.</p>
        
        <Advertisement onLearnMoreClick={handleLearnMoreClick} />

        {showDescription && (
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-3xl font-semibold mb-2">Exclusive Benefits Description</h3>
            <p className="text-lg mb-4">Our tailored insurance plans offer comprehensive coverage with unbeatable rates. As part of our limited time offer, you will receive a free consultation with one of our experts. During the consultation, you will get personalized advice on selecting the best insurance plan that suits your needs. Additionally, you can take advantage of our exclusive benefits that include discounted rates, extended coverage options, and more.</p>
            <button 
              className="bg-yellow-500 text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 text-lg font-semibold"
              onClick={handleLearnMoreClick}
            >
              Show Less
            </button>
          </div>
        )}

        <div className="flex flex-wrap justify-center mb-12">
          <FeatureCard 
            iconClass="fas fa-shield-alt text-indigo-500" 
            title="Comprehensive Coverage" 
            description="Protect your family with our all-inclusive insurance plans." 
          />
          <FeatureCard 
            iconClass="fas fa-dollar-sign text-green-500" 
            title="Affordable Rates" 
            description="Get the best coverage at the most competitive prices." 
          />
          <FeatureCard 
            iconClass="fas fa-user-friends text-blue-500" 
            title="Excellent Support" 
            description="Our customer service team is here to help you 24/7." 
          />
        </div>

        <button className="bg-blue-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition duration-300 text-lg font-semibold">
          Login To Your Account
        </button>
      </div>
    </div>
  );
}

const FeatureCard = ({ iconClass, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-800 m-4 max-w-xs transition transform hover:scale-105 text-gray-800 animated-border">
    <i className={`${iconClass} text-4xl mb-4`}></i>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-base">{description}</p>
  </div>
);

const Advertisement = ({ onLearnMoreClick }) => (
  <div className="bg-yellow-100 p-6 rounded-lg shadow-md mb-8">
    <h3 className="text-3xl font-semibold mb-2">Limited Time Offer!</h3>
    <p className="text-lg mb-4">Sign up today and enjoy exclusive benefits. Our tailored insurance plans offer comprehensive coverage with unbeatable rates, plus receive a free consultation with one of our experts.</p>
    <button 
      className="bg-yellow-500 text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 text-lg font-semibold"
      onClick={onLearnMoreClick}
    >
      Learn More
    </button>
  </div>
);

export default LandingPage;
