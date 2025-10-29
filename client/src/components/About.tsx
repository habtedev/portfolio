"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Briefcase,
  Code,
  Shield,
  Database,
  GitBranch,
  Brain,
  Users,
} from "lucide-react";

const About = () => {
  const skillGroups = [
    {
      title: "Frontend",
      icon: Code,
      items: ["HTML5", "CSS3", "SCSS", "Tailwind CSS", "React", "Next.js"],
    },
    {
      title: "Backend",
      icon: Database,
      items: ["Node.js", "Express", "REST APIs", "GraphQL", "MongoDB"],
    },
    {
      title: "Security & Best Practices",
      icon: Shield,
      items: ["CORS", "Helmet", "JWT", "Rate Limiting", "CSRF Mitigation"],
    },
    {
      title: "Validation & Tooling",
      icon: Brain,
      items: ["TypeScript", "Joi", "Zod", "ESLint", "Prettier"],
    },
  ];

  const expertise = [
    {
      icon: Code,
      title: "Frontend Development",
      description:
        "Building responsive, accessible, and visually engaging interfaces with React, JavaScript, and Tailwind CSS.",
    },
    {
      icon: Shield,
      title: "Backend & Security",
      description:
        "Designing secure APIs, authentication flows, and implementing modern app security best practices.",
    },
    {
      icon: Database,
      title: "Database Management",
      description:
        "Crafting efficient MongoDB schemas and scalable queries for fast, reliable data management.",
    },
    {
      icon: GitBranch,
      title: "Version Control",
      description:
        "Proficient with Git and GitHub workflows, maintaining clean commits and collaborating effectively.",
    },
    {
      icon: Brain,
      title: "Problem Solving",
      description:
        "Analytical and adaptive in tackling complex problems with elegant, maintainable solutions.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Thrives in team environments with clear communication and mutual learning for project success.",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-28 bg-gradient-to-br from-background via-muted/20 to-accent/5 overflow-hidden"
    >
      {/* Subtle floating backgrounds */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-muted-foreground bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a Computer Science student and full-stack developer passionate about
            crafting secure, scalable web applications that inspire and empower users.
          </p>
        </motion.div>

        {/* Education & Skills */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {/* Education & Experience */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="bg-background/60 backdrop-blur-md border border-border/30 shadow-md hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <GraduationCap className="text-primary mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Education</h3>
                </div>
                <h4 className="font-medium">B.Sc. in Computer Science</h4>
                <p className="text-muted-foreground">University of Gondar</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Focused on software engineering, algorithms, data structures, and
                  full-stack web technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/60 backdrop-blur-md border border-border/30 shadow-md hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Briefcase className="text-primary mr-3" size={24} />
                  <h3 className="text-xl font-semibold">Experience</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <h4 className="font-medium">Software Development Intern</h4>
                    <p className="text-muted-foreground">Prodigy InfoTech</p>
                    <p className="text-sm text-muted-foreground">
                      Worked on real-world projects involving full-stack architecture,
                      secure APIs, and modern workflows.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Freelance Developer</h4>
                    <p className="text-muted-foreground">Independent Projects</p>
                    <p className="text-sm text-muted-foreground">
                      Delivered scalable, custom-built web apps emphasizing security,
                      performance, and user experience.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              {skillGroups.map((group) => (
                <motion.div
                  key={group.title}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="bg-background/60 backdrop-blur-md border border-border/30 shadow-md hover:shadow-lg transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-center mb-3">
                        <group.icon className="text-primary mr-3" size={20} />
                        <h4 className="font-semibold">{group.title}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <Badge
                            key={item}
                            variant="secondary"
                            className="px-3 py-1 cursor-default shadow-sm"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <h4 className="text-lg font-semibold mb-4">Other Tools & Practices</h4>
            <div className="flex flex-wrap gap-2">
              {["Docker", "OAuth", "JWT", "Git", "ESLint", "Prettier"].map(
                (tool) => (
                  <motion.div
                    key={tool}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Badge variant="secondary" className="px-3 py-1">
                      {tool}
                    </Badge>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Expertise Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center mb-10">
            Areas of Expertise
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <Card className="bg-background/60 backdrop-blur-md border border-border/30 shadow-md hover:shadow-xl transition-all duration-300 text-center p-6">
                  <item.icon className="text-primary mx-auto mb-4" size={40} />
                  <h4 className="font-semibold mb-3">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
