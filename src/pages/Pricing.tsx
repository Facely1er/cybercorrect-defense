import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CheckCircle, HelpCircle, ArrowRight, Shield, Users, Building, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const toggleBillingPeriod = () => {
    setBillingPeriod(prev => prev === 'monthly' ? 'annual' : 'monthly');
  };

  const plans = [
    {
      name: "Solo Professional",
      description: "Perfect for individual compliance professionals managing CMMC implementation",
      price: billingPeriod === "monthly" ? "99" : "79",
      billing: "per user/month",
      features: [
        "Complete CMMC Level 1 & 2 assessment",
        "Personal compliance dashboard",
        "Automated SSP and POA&M generation", 
        "Evidence management (up to 5GB)",
        "Basic CMMC documentation templates",
        "Email support (24hr response)",
        "Individual progress tracking",
        "Export capabilities (PDF, Word)"
      ],
      icon: Target,
      suitable: "Individual professionals, consultants, small teams (1-3 people)"
    },
    {
      name: "Team Enterprise", 
      description: "Complete team collaboration with project management for organizations",
      price: billingPeriod === "monthly" ? "199" : "159",
      billing: "per user/month",
      popular: true,
      features: [
        "Everything in Solo Professional",
        "Unlimited team members",
        "Role-based access control (PM, ISSO, Implementers)",
        "Project management (Roadmaps, RACI, WBS)",
        "Team collaboration workflows",
        "Evidence vault (unlimited storage)",
        "Advanced reporting and analytics",
        "Priority support (4hr response)",
        "Custom document templates",
        "API access and integrations",
        "Audit trail and compliance tracking"
      ],
      icon: Users,
      suitable: "Defense contractors, organizations with dedicated CMMC teams"
    },
    {
      name: "Enterprise Plus",
      description: "White-glove CMMC certification support with dedicated expertise",
      price: "Contact us",
      billing: "custom pricing", 
      features: [
        "Everything in Team Enterprise",
        "Dedicated CMMC specialist",
        "White-glove implementation support",
        "Custom workflow development", 
        "On-site training and workshops",
        "Direct assessor coordination",
        "Custom integrations",
        "24/7 dedicated support",
        "Compliance guarantee program",
        "Multi-site deployment support"
      ],
      icon: Building,
      suitable: "Large defense contractors, complex multi-site organizations"
    }
  ];

  return (
    <div className="py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-foreground">CMMC Compliance Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Choose the plan that fits your CMMC implementation approach - solo or team-based
        </p>
        
        {/* Billing toggle */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <span className={`text-sm ${billingPeriod === 'monthly' ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <button 
            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={toggleBillingPeriod}
            style={{ 
              backgroundColor: billingPeriod === 'annual' ? 'var(--primary)' : 'var(--muted)' 
            }}
          >
            <span
              className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              style={{
                transform: billingPeriod === 'annual' ? 'translateX(1.25rem)' : 'translateX(0.25rem)'
              }}
            />
          </button>
          <span className={`text-sm ${billingPeriod === 'annual' ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
            Annual
          </span>
          <span className="ml-2 bg-success/10 text-success text-xs px-2 py-1 rounded-full">
            Save 20%
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          Join 500+ defense contractors achieving CMMC compliance efficiently
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <plan.icon className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="mb-6">
                <div className="flex items-end gap-2">
                  {plan.price === "Contact us" ? (
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  ) : (
                    <>
                      <span className="text-sm mt-2 text-foreground">$</span>
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{plan.billing}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-2">Suitable for:</h4>
                <p className="text-sm text-muted-foreground">{plan.suitable}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full" 
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.price === "Contact us" ? "Contact Sales" : "Get Started"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CMMC Implementation Value */}
      <div className="bg-primary/5 rounded-lg p-8 mt-16 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">CMMC Implementation Value</h2>
          <p className="text-muted-foreground">
            Our platform reduces CMMC implementation time and cost significantly
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">60%</div>
            <div className="text-sm text-muted-foreground">Faster implementation vs traditional consulting</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">$250K</div>
            <div className="text-sm text-muted-foreground">Average cost savings vs external consultants</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Organizations successfully certified</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">97%</div>
            <div className="text-sm text-muted-foreground">First-time certification pass rate</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your CMMC Journey?</h3>
          <p className="text-lg text-white/90 mb-6">
            Begin with a free assessment to understand your current compliance posture
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assessment" className="no-underline">
              <Button className="bg-white text-primary hover:bg-gray-100 border-2 border-white font-semibold shadow-lg">
                Start Free Assessment
                <Shield className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button className="bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-900 font-semibold shadow-lg">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;