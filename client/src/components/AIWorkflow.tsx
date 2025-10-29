import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  MessageSquare,
  Bug,
  FileText,
  Rocket,
  Zap,
  Clock,
  Users,
} from "lucide-react";

const AIWorkflow = () => {
  const aiTools = [
    {
      icon: Brain,
      title: "Brainstorming UI/UX Concepts",
      description:
        "Generate unique design structures and layout inspirations faster and smarter.",
    },
    {
      icon: MessageSquare,
      title: "Writing Client Proposals",
      description:
        "Craft clear, professional, and persuasive proposals with AI assistance.",
    },
    {
      icon: Bug,
      title: "Debugging & Problem Solving",
      description:
        "Quickly identify code logic issues and generate optimized solutions using AI tools.",
    },
    {
      icon: FileText,
      title: "Enhancing Content & Documentation",
      description:
        "Refine technical content and project documentation for clarity and impact.",
    },
    {
      icon: Rocket,
      title: "Accelerated Learning",
      description:
        "Master React, APIs, and database integration 3x faster with intelligent AI learning prompts.",
    },
  ];

  const impacts = [
    {
      icon: Clock,
      metric: "30%",
      description: "Faster development speed",
    },
    {
      icon: Users,
      metric: "100%",
      description: "More confident client presentations",
    },
    {
      icon: MessageSquare,
      metric: "Improved",
      description: "Client communication & project delivery",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* subtle background blur gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.08),transparent_60%)]" />

      <div className="container relative mx-auto px-6">
        <div className="text-center mb-20">
          <Badge
            variant="secondary"
            className="mb-4 text-sm px-4 py-1 border border-primary/20 bg-primary/10"
          >
            <Brain className="w-4 h-4 mr-2 text-primary" />
            AI-Powered Workflow
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Empowering My Work with{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I integrate AI into every stage of my development process — from
            ideation to optimization — making my workflow{" "}
            <span className="font-semibold text-foreground">
              faster, smarter, and more creative.
            </span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: How I use AI */}
          <div>
            <h3 className="text-2xl font-semibold mb-8">
              How I Leverage AI Every Day:
            </h3>
            <div className="space-y-5">
              {aiTools.map((tool, index) => (
                <Card
                  key={index}
                  className="border border-border/40 bg-card/50 hover:shadow-lg hover:border-primary/40 transition-all duration-300"
                >
                  <CardContent className="p-6 flex items-start space-x-5">
                    <div className="p-3 rounded-xl bg-gradient-to-tr from-primary to-accent text-white shadow-md">
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-foreground">
                        {tool.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {tool.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right: Favorite Prompt + Metrics */}
          <div className="space-y-10">
            {/* Favorite Prompt */}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 shadow-lg">
              <CardContent className="p-8 text-center">
                <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  My Go-To AI Prompt
                </h3>
                <blockquote className="italic text-muted-foreground text-base bg-muted/50 p-6 rounded-lg border-l-4 border-primary">
                  “Explain my code in simple terms and suggest improvements for
                  performance and readability.”
                </blockquote>
              </CardContent>
            </Card>

            {/* Impact Metrics */}
            <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-background shadow-md">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 text-center">
                  How AI Transforms My Workflow
                </h3>
                <div className="space-y-5">
                  {impacts.map((impact, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 border-b border-border/20 pb-3 last:border-none"
                    >
                      <div className="p-3 rounded-full bg-accent/10 border border-accent/30">
                        <impact.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-accent">
                          {impact.metric}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {impact.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Closing Statement */}
            <Card className="border-border/50 bg-card/30 shadow-inner">
              <CardContent className="p-8 text-center">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  AI doesn’t replace creativity — it amplifies it. My philosophy:
                  <br />
                  <span className="font-semibold text-primary">
                    Human intuition + AI intelligence = unstoppable innovation.
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIWorkflow;
