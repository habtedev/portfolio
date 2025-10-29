"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Github, Linkedin, MapPin, Send, CheckCircle } from "lucide-react";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
  viewport: { once: true },
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const form = e.target as HTMLFormElement;
      const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

      // Prefer explicit VITE_API_BASE if provided. Otherwise use localhost in dev
      // and the Render URL in production. Strip any trailing slash before joining.
      const API_BASE = (import.meta.env as any).VITE_API_BASE
        ?? (import.meta.env.DEV ? "http://localhost:8500" : "https://portfolio-9xse.onrender.com");

      const base = String(API_BASE).replace(/\/$/, "");
      const url = `${base}/api/contact`;

      const res = await axios.post(url, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status >= 200 && res.status < 300) {
        setIsSuccess(true);
        form.reset();
        toast({
          title: "✅ Message Sent Successfully!",
          description: "Thanks for reaching out! I’ll respond within 24 hours.",
        });
      } else throw new Error("Failed to send message");
    } catch (err: any) {
      console.error("Contact form error:", err);
      toast({
        title: "❌ Something went wrong",
        description: err?.response?.data?.error || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Mail, title: "Email", value: "habtadev@gmail.com", link: "mailto:habtadev@gmail.com" },
    { icon: Phone, title: "Phone", value: "+251 945 870 700", link: "tel:+251945870700" },
    { icon: Github, title: "GitHub", value: "github.com/habtedev", link: "https://github.com/habtedev" },
    { icon: Linkedin, title: "LinkedIn", value: "linkedin.com/in/habtamudev", link: "https://linkedin.com/in/habtamudev" },
    { icon: MapPin, title: "Location", value: "Gondar, Ethiopia", link: "#" },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-b from-muted/20 to-background overflow-hidden"
    >
      {/* Subtle radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_70%)] pointer-events-none" />

      <div className="container relative mx-auto px-6">
        {/* Header */}
        <motion.div {...fadeIn(0)} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let’s{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have a project idea or collaboration in mind? Feel free to reach out
            and let’s create something impactful together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div {...fadeIn(0.1)}>
            <Card className="shadow-medium hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold mb-6"
                >
                  Send Me a Message
                </motion.h3>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                    <h4 className="text-xl font-semibold">Message Sent!</h4>
                    <p className="text-muted-foreground mt-2">
                      I’ll get back to you shortly. Thanks for reaching out!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { id: "firstName", label: "First Name", placeholder: "John" },
                        { id: "lastName", label: "Last Name", placeholder: "Doe" },
                      ].map((field) => (
                        <div key={field.id} className="space-y-2">
                          <Label htmlFor={field.id}>{field.label} *</Label>
                          <Input
                            id={field.id}
                            name={field.id}
                            required
                            placeholder={field.placeholder}
                            className="focus:ring-2 focus:ring-primary/30 transition-all"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        className="focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        defaultValue=""
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-primary/30 transition-all"
                      >
                        <option value="" disabled hidden>
                          Select a subject
                        </option>
                        <option value="general">General Inquiry</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="hiring">Hiring / Opportunity</option>
                        <option value="bug">Bug Report / Issue</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder="Tell me about your project or idea..."
                        className="resize-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.03 }}>
                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-b-2 border-white mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} className="mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div {...fadeIn(0.2)} className="space-y-10">
            <Card className="shadow-medium bg-gradient-card hover:shadow-xl transition-all duration-500">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  You can also reach me via any of the platforms below — let’s
                  chat about web development, tech, or collaboration!
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 8 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-white shadow-md">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        {item.link === "#" ? (
                          <p className="text-muted-foreground">{item.value}</p>
                        ) : (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {item.value}
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <motion.div {...fadeIn(0.3)}>
              <Card className="shadow-medium">
                <CardContent className="p-8">
                  <h4 className="text-xl font-bold mb-4">Availability</h4>
                  <div className="space-y-4 text-sm">
                    {[
                      ["Response Time", "Within 24 hours"],
                      ["Project Timeline", "2–8 weeks"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Current Status</span>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        <span className="font-medium text-green-600">
                          Available for Projects
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
