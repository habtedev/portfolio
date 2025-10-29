"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  CreditCard,
  Layout,
  Users,
  Database,
  Zap,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  Rocket,
  Sparkles,
  Star,
  Award,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      icon: Shield,
      title: "Secure Authentication Systems",
      description: "Enterprise-grade authentication with advanced security protocols including JWT, OAuth 2.0, and multi-factor authentication to protect user data and build trust.",
      features: [
        "JWT & OAuth 2.0 Authentication",
        "Role-based Access Control (RBAC)",
        "Multi-factor Authentication (MFA)",
        "Password Encryption & Recovery",
        "Session Security & Management",
        "Social Identity Integration",
      ],
      // price: "$500+",
      delivery: "2-3 weeks",
      popular: true,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: CreditCard,
      title: "Payment Gateway Integration",
      description: "Seamless integration of payment processors like Chapa, Stripe, and PayPal with robust security and smooth user experience for scalable businesses.",
      features: [
        "Chapa, PayPal & Stripe Integration",
        "Secure Transaction Workflow",
        "Webhook & Server Validation",
        "Multi-Currency Support",
        "Error Handling & Recovery",
        "Transaction Analytics",
      ],
      // price: "$400+",
      delivery: "1-2 weeks",
      popular: false,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Layout,
      title: "Full-Stack Web Development",
      description: "High-performance web applications built with React, Node.js, and MongoDB - scalable, responsive, and production-ready with modern best practices.",
      features: [
        "Responsive React Frontend",
        "RESTful API Development",
        "MongoDB Database Design",
        "Admin Dashboard & CMS",
        "Performance Optimization",
        "CI/CD Deployment",
      ],
      // price: "$800+",
      delivery: "4-6 weeks",
      popular: true,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Database,
      title: "Database Architecture & Management",
      description: "Robust database design and optimization strategies ensuring data integrity, fast queries, and scalability for startups to enterprise solutions.",
      features: [
        "Schema Design & Optimization",
        "Data Migration & Backup",
        "High-Performance Queries",
        "Monitoring & Analytics",
        "Data Encryption & Security",
        "Cloud DB Integration",
      ],
      // price: "$300+",
      delivery: "1-2 weeks",
      popular: false,
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Users,
      title: "Custom Admin Dashboards",
      description: "Data-driven dashboards that empower teams with control, analytics, and automation - built for performance, usability, and scalability.",
      features: [
        "Dynamic Role Management",
        "Analytics Visualization",
        "Real-time Monitoring",
        "User & Content Management",
        "Custom Reports & Filters",
        "Scalable Architecture",
      ],
      // price: "$600+",
      delivery: "3-4 weeks",
      popular: false,
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Comprehensive optimization services to transform your website into a blazing-fast, SEO-friendly platform that dominates user experience.",
      features: [
        "Core Web Vitals Optimization",
        "Code Splitting & Lazy Loading",
        "Database Query Tuning",
        "CDN & Caching Strategies",
        "Image & Asset Optimization",
        "SEO & Accessibility Enhancement",
      ],
      // price: "$350+",
      delivery: "1 week",
      popular: true,
      gradient: "from-yellow-500 to-amber-500",
    },
  ];

  const stats = [
    { number: "50+", label: "Projects Completed", icon: Target },
    { number: "100%", label: "Client Satisfaction", icon: Star },
    { number: "2+", label: "Years Experience", icon: Award },
    { number: "24/7", label: "Support Available", icon: Clock },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description: "In-depth analysis of your goals, audience, and technical requirements to create a winning strategy.",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
    },
    {
      step: "02",
      title: "Design & Planning",
      description: "Strategic roadmap creation with detailed timelines, milestones, and technology stack selection.",
      icon: Layout,
      color: "from-purple-500 to-pink-500",
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Agile development with transparent updates, rigorous testing, and continuous integration.",
      icon: Rocket,
      color: "from-green-500 to-emerald-500",
    },
    {
      step: "04",
      title: "Launch & Growth",
      description: "Smooth deployment, performance monitoring, and ongoing support for sustainable growth.",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
    },
  ];

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles size={16} />
            Premium Services
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Crafting Digital{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            End-to-end web solutions engineered for performance, scalability, and real business impact. 
            From startup MVPs to enterprise platforms, I transform visions into exceptional digital experiences.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center p-6 bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group"
            >
              <Card className="relative overflow-hidden bg-background/80 backdrop-blur-sm border border-border/60 shadow-lg hover:shadow-2xl transition-all duration-500 h-full rounded-3xl">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Star size={12} className="fill-current" />
                      Popular
                    </div>
                  </div>
                )}

                <CardContent className="relative p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className="text-center mb-6">
                    <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="text-white" size={32} />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-6">
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          className="text-sm text-muted-foreground flex items-start group/feature"
                        >
                          <CheckCircle size={16} className="text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover/feature:scale-110 transition-transform" />
                          <span className="group-hover/feature:text-foreground/80 transition-colors">
                            {feature}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="border-t border-border/60 pt-6 mt-auto">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          {service.price}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Delivery: {service.delivery}
                        </div>
                      </div>
                    </div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="default"
                        className="w-full font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                        onClick={scrollToContact}
                        size="lg"
                      >
                        <span className="flex items-center gap-2">
                          Get Started
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Development Process</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured approach that ensures quality, transparency, and successful project delivery every time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Connecting Line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-border to-border/50 group-hover:from-primary/50 group-hover:to-accent/50 transition-colors duration-300 z-0" />
                )}
                
                <div className="relative bg-background/80 backdrop-blur-sm border border-border/60 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group-hover:border-primary/30 z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="text-white" size={28} />
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-sm font-semibold text-primary mb-2">STEP {item.step}</div>
                    <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground shadow-2xl max-w-4xl mx-auto rounded-3xl overflow-hidden border-0">
            <CardContent className="p-12 relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
              
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Rocket className="text-white" size={32} />
                </motion.div>
                
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Build Something Extraordinary?
                </h3>
                
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Let's collaborate on creating a digital experience that not only performs flawlessly 
                  but also drives real business results and leaves a lasting impression.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={scrollToContact}
                      className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl font-semibold"
                    >
                      <Sparkles size={20} className="mr-2" />
                      Start Your Project
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white hover:text-primary font-semibold"
                      asChild
                    >
                      <a href="mailto:habtadev@gmail.com">
                        <ArrowRight size={20} className="mr-2" />
                        Send Email
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;