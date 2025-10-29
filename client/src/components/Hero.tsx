"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Star,
  Code,
  Shield,
  Bot } from "lucide-react";
import profileImage from "@/assets/image.png";
import { useState, useEffect } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(true), []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const floatingVariants = {
    animate: {
      y: [0, -25, 0],
      opacity: [0.3, 0.9, 0.3],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  const stats = [
    { number: "1.5+", label: "Years Experience", icon: Code },
    { number: "10+", label: "Projects Built", icon: Star },
    { number: "100%", label: "Client Satisfaction", icon: Shield },
  ];

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/10 pt-16 md:pt-24"
    >
      {/* 🌌 Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
          className="absolute top-1/3 right-1/3 w-28 h-28 bg-muted-foreground/10 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          {/* 🧑‍💻 Profile */}
          <motion.div variants={itemVariants} className="mb-10 relative">
            <div className="relative inline-block">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 1.1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="w-52 h-52 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/10 to-accent/10 relative"
              >
                <img
                  src={profileImage}
                  alt="Habtamu Amare"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary/40 border-r-primary/20"
                />
              </motion.div>

              {/* Floating Tech Labels */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute -top-3 -right-3"
              >
                <span className="bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-primary border border-primary/20 shadow">
                  React
                </span>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -bottom-3 -left-3"
              >
                <span className="bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-accent border border-accent/20 shadow">
                  Node.js
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* 🏷️ Name & Title */}
          <motion.div variants={itemVariants} className="space-y-5 mb-8">
            <h1 id="home-heading" className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Habtamu Amare
              </span>
            </h1>
            <p className="inline-block text-xl md:text-2xl font-semibold text-accent bg-background/80 backdrop-blur-sm rounded-full px-6 py-3 border border-primary/20 shadow-md relative">
              Full-Stack Developer & Cybersecurity Enthusiast
              <motion.span
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              />
            </p>
          </motion.div>

          {/* 📝 Short Bio */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12 bg-background/70 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow"
          >
            I design and build{" "}
            <span className="text-primary font-semibold">
              secure, high-performance
            </span>{" "}
            web applications using modern tools like{" "}
            <span className="text-accent font-semibold">React</span>,{" "}
            <span className="text-accent font-semibold">Node.js</span>, and{" "}
            <span className="text-accent font-semibold">MongoDB</span>. My work
            blends clean design, strong security, and reliable performance —
            inspired by companies like{" "}
            <span className="font-semibold text-primary">Amazon</span> and{" "}
            <span className="font-semibold text-primary">Apple</span>.
          </motion.p>

          {/* 📊 Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-14"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="p-5 bg-background/60 backdrop-blur-md rounded-xl border border-primary/10 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* 🚀 CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-14"
          >
            <Button
              onClick={() => scrollToSection("#portfolio")}
              size="lg"
              aria-label="View my portfolio"
              className="px-10 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md hover:shadow-xl group"
            >
              <span className="flex items-center gap-2">
                View My Work
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("#contact")}
              size="lg"
              aria-label="Open contact form"
              className="px-10 py-6 text-lg font-semibold border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Get In Touch
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </span>
            </Button>
          </motion.div>

          {/* 🌐 Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-8 mb-12"
          >
            {[
              {
                icon: <Github size={26} />,
                link: "https://github.com/habtedev",
                label: "GitHub",
                color: "hover:text-foreground",
              },
              {
                icon: <Linkedin size={26} />,
                link: "https://linkedin.com/in/habtamudev",
                label: "LinkedIn",
                color: "hover:text-blue-400",
              },
              {
                icon: <Mail size={26} />,
                link: "mailto:habtadev@gmail.com",
                label: "Email",
                color: "hover:text-red-400",
              },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + i * 0.1 }}
                whileHover={{
                  scale: 1.25,
                  y: -5,
                  transition: { type: "spring", stiffness: 300 },
                }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full bg-background/60 backdrop-blur-sm border border-primary/10 shadow-md hover:shadow-xl transition-all duration-300 ${social.color}`}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}

            {/* AI Assistant quick-open button */}
            <motion.button
              onClick={() => window.dispatchEvent(new CustomEvent('open-ai-assistant'))}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 }}
              whileHover={{ scale: 1.15, y: -4 }}
              className="p-3 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-xl transition-all duration-300"
              aria-label="Open AI Assistant"
              title="Open AI Assistant"
            >
              <Bot size={20} />
            </motion.button>
          </motion.div>

          {/* ⬇️ Scroll Down Indicator */}
          <motion.button
            onClick={() => scrollToSection("#about")}
            whileHover={{ scale: 1.2, y: 5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors duration-300 bg-background/50 backdrop-blur-sm p-3 rounded-full border border-primary/10 shadow-md"
            aria-label="Scroll to About Section"
            title="Scroll to About"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown size={26} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
