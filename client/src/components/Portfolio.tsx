import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Play, Star, Calendar } from "lucide-react";
import amazonCloneImage from "@/assets/amazon-clone-project.jpg";
import netfliximage from "@/assets/netflix.png";
import habnetImage from "@/assets/habnet-project.jpg";
import { useState } from "react";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      title: "Netflix Clone - Habte",
      description: "A lightweight Netflix-like streaming platform with a React frontend (Vite) and Express backend. Features responsive UI, movie trailers, user authentication, personalized lists, and integrated payment options via PayPal and Stripe.",
      image: netfliximage,
      technologies: ["React", "Vite", "Express", "MongoDB", "Node.js", "PayPal SDK", "Stripe API", "i18next"],
      features: [
        "Responsive React UI with dynamic movie banners",
        "User authentication and protected routes",
        "Personalized 'My List' feature",
        "Movie trailer playback via react-youtube",
        "PayPal & Stripe payment integration",
        "Multi-language support with i18n",
        "Axios wrapper for API calls and TMDB integration"
      ],
      liveLink: "https://netflix-amber-eight-17.vercel.app/",
      githubLink: "https://github.com/habtedev/Netflix",
      status: "In Progress",
      category: "Full Stack",
      stars: 12,
      lastUpdated: "2024-01"
    },
    {
      title: "Amazon Clone",
      description: "Full-stack e-commerce application inspired by Amazon with secure authentication, payment integration using Chapa AI, role-based access control, and modern UI/UX design.",
      image: amazonCloneImage,
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Chapa AI", "Tailwind CSS"],
      features: [
        "Secure user authentication & authorization",
        "Chapa payment gateway integration",
        "Role-based access control (Admin/User)",
        "Real-time order tracking",
        "Responsive design with modern UI",
        "Product search and filtering"
      ],
      liveLink: "#",
      githubLink: "https://github.com/habtedev/Amazone",
      status: "Completed",
      category: "In progress",
      stars: 24,
      lastUpdated: "2024-01"
    },
  ];

  const categories = ["All", "Full Stack", "Frontend", "Backend", "In Progress", "Completed"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => 
        project.category === activeFilter || 
        project.status === activeFilter
      );

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1 text-sm font-semibold">
            <Star className="w-3 h-3 mr-1" />
            Featured Work
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Showcasing projects that demonstrate my expertise in full-stack development, 
            security implementation, and modern web technologies.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              onClick={() => setActiveFilter(category)}
              className={`rounded-full px-4 transition-all duration-300 ${
                activeFilter === category 
                  ? "shadow-md" 
                  : "hover:border-primary/50"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="space-y-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={index} 
              className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm"
            >
              <div className={`grid lg:grid-cols-2 gap-0 ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Project Image */}
                <div className={`relative group ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-video lg:aspect-square overflow-hidden bg-muted/20">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/10 backdrop-blur-sm">
                      <Button variant="secondary" size="lg" className="rounded-full">
                        <Play className="w-4 h-4 mr-2" />
                        View Demo
                      </Button>
                    </div>
                  </div>
                  
                  {/* Status & Info Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Badge 
                      variant={project.status === "Completed" ? "default" : "secondary"}
                      className="bg-background/90 backdrop-blur-sm shadow-sm border-0"
                    >
                      {project.status}
                    </Badge>
                    <Badge variant="outline" className="bg-background/90 backdrop-blur-sm border-primary/20">
                      {project.category}
                    </Badge>
                  </div>

                  {/* GitHub Stars */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {project.stars}
                    </Badge>
                  </div>
                </div>

                {/* Project Details */}
                <CardContent className={`p-8 lg:p-12 flex flex-col justify-center ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>Last updated: {project.lastUpdated}</span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="outline" 
                            className="border-primary/30 bg-primary/5 text-foreground/80 hover:bg-primary/10 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Key Features</h4>
                      <ul className="space-y-3">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="text-muted-foreground flex items-start group/feature">
                            <span className="text-primary mr-3 mt-1.5 flex-shrink-0 group-hover/feature:scale-110 transition-transform">•</span>
                            <span className="group-hover/feature:text-foreground/80 transition-colors">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6">
                      <Button 
                        variant="default" 
                        size="lg"
                        className="flex-1 gap-2 shadow-md hover:shadow-lg transition-shadow"
                        asChild
                      >
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={18} />
                          Live Demo
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="flex-1 gap-2 border-2 hover:border-primary/50 transition-colors"
                        asChild
                      >
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github size={18} />
                          Source Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <Star className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                No projects match the selected filter. Try selecting a different category.
              </p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-20">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10 border-primary/20 shadow-strong max-w-2xl mx-auto backdrop-blur-sm">
            <CardContent className="p-12">
              <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Build Something Amazing?</h3>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                I'm passionate about creating innovative solutions and would love to collaborate on your next project. 
                Let's discuss how we can bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="default" 
                  size="lg"
                  className="px-8 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    const element = document.querySelector("#contact");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Start a Conversation
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 border-2"
                  asChild
                >
                  <a href="#github" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;