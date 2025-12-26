import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Shield, Clock, Award, Headphones, CreditCard, MapPin } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-primary-500" />,
      title: 'Fully Insured',
      description: 'All vehicles come with comprehensive insurance coverage for your peace of mind.',
    },
    {
      icon: <Clock className="w-12 h-12 text-primary-500" />,
      title: '24/7 Availability',
      description: 'Pick up and return your car at any time that suits your schedule.',
    },
    {
      icon: <Award className="w-12 h-12 text-primary-500" />,
      title: 'Premium Fleet',
      description: 'Choose from our wide selection of luxury and economy vehicles.',
    },
    {
      icon: <Headphones className="w-12 h-12 text-primary-500" />,
      title: 'Customer Support',
      description: 'Our dedicated team is always here to assist you with any queries.',
    },
    {
      icon: <CreditCard className="w-12 h-12 text-primary-500" />,
      title: 'Flexible Payment',
      description: 'Multiple payment options including credit cards, debit cards, and digital wallets.',
    },
    {
      icon: <MapPin className="w-12 h-12 text-primary-500" />,
      title: 'Multiple Locations',
      description: 'Conveniently located pickup points in major cities and airports.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-primary-900">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-fluid-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Why Choose <span className="gradient-text">DriveAway</span>?
          </h2>
          <p className="text-fluid-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the best car rental service with premium features designed for your convenience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="mb-4 p-3 bg-primary-50 dark:bg-primary-800 rounded-xl w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
