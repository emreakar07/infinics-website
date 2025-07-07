import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Wrench, 
  Users, 
  FileText, 
  Sparkles, 
  ArrowRight,
  UserCheck,
  Briefcase,
  Heart,
  MessageSquare,
  ScrollText,
  Search,
  BarChart3,
  Zap,
  Building2,
  Bot
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AgentDetailModal from "./AgentDetailModal";

interface Agent {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  demoAvailable?: boolean;
  demoLink?: string;
  detailedInfo?: {
    overview: string;
    keyFeatures: {
      title: string;
      description: string;
    }[];
    useCases: string[];
    benefits: {
      metric: string;
      description: string;
    }[];
    implementation: {
      timeframe: string;
      integration: string;
      support: string;
    };
  };
}

interface AgentCategory {
  title: string;
  subtitle: string;
  color: string;
  bgGradient: string;
  agents: Agent[];
}

const agentCategories: AgentCategory[] = [
  {
    title: "Operations & Support",
    subtitle: "Streamline your business operations with intelligent automation",
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    agents: [
      {
        name: "Pricing Agent",
        description: "Dynamic pricing recommendations based on market data, competitor analysis, and customer segments",
        icon: DollarSign,
        features: [
          "Real-time price optimization",
          "Competitor monitoring",
          "Seasonal adjustments",
          "Customer segment analysis"
        ],
        demoAvailable: true,
        demoLink: "/demo/pricing-agent"
      },
      {
        name: "Maintenance Support Agent",
        description: "Automated support for maintenance requests, troubleshooting, and preventive care recommendations",
        icon: Wrench,
        features: [
          "24/7 troubleshooting guidance",
          "Predictive maintenance alerts",
          "Step-by-step repair instructions",
          "Safety protocol enforcement"
        ],
        demoAvailable: true,
        demoLink: "/demo/maintenance-agent"
      }
    ]
  },
  {
    title: "HR & People Management",
    subtitle: "Transform your HR processes with AI-powered people solutions",
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
    agents: [
      {
        name: "Interview with AI",
        description: "Conduct initial candidate screenings with intelligent conversational AI that evaluates skills and cultural fit",
        icon: UserCheck,
        features: [
          "Automated candidate screening",
          "Skill assessment questions",
          "Cultural fit evaluation",
          "Interview transcript analysis"
        ],
        detailedInfo: {
          overview: "Our Interview with AI agent revolutionizes the recruitment process by conducting intelligent, unbiased initial screenings. Using advanced natural language processing and behavioral analysis, it evaluates candidates on both technical skills and cultural alignment, providing detailed insights to help you make better hiring decisions faster.",
          keyFeatures: [
            {
              title: "Dynamic Question Generation",
              description: "Generates role-specific questions based on job requirements and adapts follow-ups based on candidate responses"
            },
            {
              title: "Multi-Language Support",
              description: "Conducts interviews in over 50 languages with cultural context awareness"
            },
            {
              title: "Bias-Free Evaluation",
              description: "Uses objective criteria to evaluate candidates, reducing unconscious bias in the screening process"
            },
            {
              title: "Skill Verification",
              description: "Includes technical assessments and problem-solving scenarios tailored to the role"
            }
          ],
          useCases: [
            "High-volume recruitment campaigns",
            "Technical role screening",
            "Graduate program applications",
            "Remote position interviews",
            "24/7 candidate availability",
            "Preliminary culture fit assessment"
          ],
          benefits: [
            {
              metric: "75%",
              description: "Reduction in time-to-hire"
            },
            {
              metric: "90%",
              description: "Candidate satisfaction rate"
            },
            {
              metric: "60%",
              description: "Cost savings on recruitment"
            }
          ],
          implementation: {
            timeframe: "Setup in 48 hours",
            integration: "Integrates with major ATS systems",
            support: "Full onboarding and customization support"
          }
        }
      },
      {
        name: "Smart Onboarding",
        description: "Guide new employees through personalized onboarding journeys with interactive AI assistance",
        icon: Briefcase,
        features: [
          "Personalized onboarding paths",
          "Document automation",
          "FAQ and policy guidance",
          "Progress tracking"
        ],
        detailedInfo: {
          overview: "Smart Onboarding transforms the new employee experience with an AI-powered guide that personalizes the onboarding journey for each hire. From paperwork to training schedules, policy understanding to team introductions, our agent ensures new employees feel welcomed, informed, and productive from day one.",
          keyFeatures: [
            {
              title: "Adaptive Learning Paths",
              description: "Creates custom onboarding journeys based on role, department, and individual learning pace"
            },
            {
              title: "Interactive Document Processing",
              description: "Guides employees through forms with real-time help and automatic validation"
            },
            {
              title: "Smart Scheduling",
              description: "Automatically coordinates meetings, training sessions, and check-ins with relevant stakeholders"
            },
            {
              title: "Progress Analytics",
              description: "Provides managers with real-time insights into onboarding completion and engagement"
            }
          ],
          useCases: [
            "Remote employee onboarding",
            "Multi-location organizations",
            "High-growth companies",
            "Compliance-heavy industries",
            "Seasonal workforce management",
            "Executive onboarding programs"
          ],
          benefits: [
            {
              metric: "85%",
              description: "Faster time to productivity"
            },
            {
              metric: "95%",
              description: "Onboarding completion rate"
            },
            {
              metric: "70%",
              description: "Reduction in HR workload"
            }
          ],
          implementation: {
            timeframe: "Live in 5-7 days",
            integration: "Works with HRIS and document systems",
            support: "Dedicated success manager included"
          }
        }
      },
      {
        name: "AI Buddy",
        description: "Provide employees with an intelligent companion for daily questions, IT support, and company information",
        icon: MessageSquare,
        features: [
          "Instant policy answers",
          "IT troubleshooting",
          "Benefits guidance",
          "Company directory access"
        ],
        detailedInfo: {
          overview: "AI Buddy serves as your employees' go-to resource for instant answers to workplace questions. Available 24/7 through multiple channels, it understands company policies, IT systems, benefits, and procedures, providing accurate, personalized responses that reduce support tickets and improve employee satisfaction.",
          keyFeatures: [
            {
              title: "Contextual Understanding",
              description: "Learns from your company's documents, policies, and FAQs to provide accurate, relevant answers"
            },
            {
              title: "Multi-Channel Access",
              description: "Available via Slack, Teams, web portal, mobile app, and email"
            },
            {
              title: "Smart Escalation",
              description: "Knows when to escalate complex issues to human experts with full context"
            },
            {
              title: "Continuous Learning",
              description: "Improves responses based on feedback and successful resolutions"
            }
          ],
          useCases: [
            "IT password resets and troubleshooting",
            "Benefits enrollment questions",
            "Policy clarifications",
            "Leave balance inquiries",
            "Office location and facility info",
            "Training resource recommendations"
          ],
          benefits: [
            {
              metric: "80%",
              description: "Reduction in HR tickets"
            },
            {
              metric: "< 30 sec",
              description: "Average response time"
            },
            {
              metric: "92%",
              description: "First-contact resolution"
            }
          ],
          implementation: {
            timeframe: "Deployment in 3-5 days",
            integration: "Connects to existing knowledge bases",
            support: "24/7 technical support included"
          }
        }
      },
      {
        name: "Motivation Buddy",
        description: "Boost employee engagement with an AI coach that provides personalized motivation and wellness tips",
        icon: Heart,
        features: [
          "Personalized wellness tips",
          "Goal tracking support",
          "Recognition reminders",
          "Team building suggestions"
        ],
        detailedInfo: {
          overview: "Motivation Buddy is your organization's wellness and engagement champion, providing personalized coaching to help employees stay motivated, balanced, and connected. Using behavioral insights and positive psychology, it delivers timely encouragement, wellness tips, and team-building ideas that foster a positive workplace culture.",
          keyFeatures: [
            {
              title: "Personalized Coaching",
              description: "Adapts motivational strategies based on individual personality types and preferences"
            },
            {
              title: "Wellness Integration",
              description: "Tracks and encourages healthy habits with gentle reminders and progress celebrations"
            },
            {
              title: "Peer Recognition",
              description: "Facilitates and reminds employees to recognize colleagues' achievements"
            },
            {
              title: "Mood Analytics",
              description: "Provides managers with anonymous team sentiment insights and recommendations"
            }
          ],
          useCases: [
            "Remote team engagement",
            "Burnout prevention",
            "Performance improvement",
            "Team morale boosting",
            "Wellness program support",
            "Cultural transformation initiatives"
          ],
          benefits: [
            {
              metric: "45%",
              description: "Increase in engagement scores"
            },
            {
              metric: "30%",
              description: "Reduction in turnover"
            },
            {
              metric: "65%",
              description: "Improvement in wellness participation"
            }
          ],
          implementation: {
            timeframe: "Launch in 1 week",
            integration: "Works alongside existing HR tools",
            support: "Wellness expert consultation included"
          }
        }
      }
    ]
  },
  {
    title: "Procurement & Supply Chain",
    subtitle: "Optimize procurement processes with intelligent automation",
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
    agents: [
      {
        name: "Contracts AI",
        description: "Analyze, draft, and manage contracts with AI that understands legal terms and business requirements",
        icon: ScrollText,
        features: [
          "Contract analysis & review",
          "Risk identification",
          "Clause recommendations",
          "Compliance checking"
        ],
        detailedInfo: {
          overview: "Contracts AI revolutionizes contract management by combining legal expertise with AI efficiency. It reads, understands, and analyzes contracts in minutes, identifying risks, suggesting improvements, and ensuring compliance with your organization's standards and legal requirements.",
          keyFeatures: [
            {
              title: "Intelligent Risk Assessment",
              description: "Identifies potential risks, unfavorable terms, and missing clauses with detailed explanations"
            },
            {
              title: "Smart Clause Library",
              description: "Maintains and suggests pre-approved clauses based on contract type and negotiation history"
            },
            {
              title: "Multi-Language Contract Support",
              description: "Analyzes contracts in 30+ languages with legal terminology accuracy"
            },
            {
              title: "Version Control & Comparison",
              description: "Tracks changes across versions and highlights modifications with impact analysis"
            }
          ],
          useCases: [
            "Vendor agreement reviews",
            "NDA processing",
            "Service level agreements",
            "Partnership contracts",
            "Compliance audits",
            "Contract renewal management"
          ],
          benefits: [
            {
              metric: "90%",
              description: "Faster contract review"
            },
            {
              metric: "75%",
              description: "Risk reduction"
            },
            {
              metric: "50%",
              description: "Legal cost savings"
            }
          ],
          implementation: {
            timeframe: "Operational in 5-7 days",
            integration: "Integrates with CLM systems",
            support: "Legal team training included"
          }
        }
      },
      {
        name: "Tender Builder",
        description: "Create winning tender proposals with AI that understands requirements and crafts compelling responses",
        icon: FileText,
        features: [
          "RFP requirement analysis",
          "Response generation",
          "Compliance verification",
          "Win rate optimization"
        ],
        detailedInfo: {
          overview: "Tender Builder transforms your proposal process with AI that understands RFP requirements and your company's capabilities. It automatically generates compelling, compliant responses that highlight your strengths while ensuring all requirements are addressed, significantly improving your win rates.",
          keyFeatures: [
            {
              title: "Requirement Extraction",
              description: "Automatically identifies and categorizes all RFP requirements, mandatory criteria, and evaluation factors"
            },
            {
              title: "Knowledge Repository",
              description: "Maintains a searchable database of past responses, case studies, and proof points"
            },
            {
              title: "Compliance Matrix",
              description: "Generates detailed compliance matrices showing how each requirement is addressed"
            },
            {
              title: "Win Strategy Optimization",
              description: "Analyzes winning proposals to recommend strategies and differentiators"
            }
          ],
          useCases: [
            "Government contract bids",
            "Large enterprise RFPs",
            "Multi-stakeholder proposals",
            "Technical tender responses",
            "Framework agreement applications",
            "Quick turnaround bids"
          ],
          benefits: [
            {
              metric: "40%",
              description: "Higher win rate"
            },
            {
              metric: "70%",
              description: "Time savings"
            },
            {
              metric: "100%",
              description: "Compliance accuracy"
            }
          ],
          implementation: {
            timeframe: "Ready in 1 week",
            integration: "Works with existing CRM/proposal tools",
            support: "Proposal expert consultation"
          }
        }
      },
      {
        name: "Market Price Checker",
        description: "Monitor market prices in real-time and get intelligent insights for procurement decisions",
        icon: BarChart3,
        features: [
          "Real-time price monitoring",
          "Supplier comparison",
          "Price trend analysis",
          "Budget optimization"
        ],
        detailedInfo: {
          overview: "Market Price Checker gives procurement teams real-time visibility into market pricing across suppliers and categories. Using advanced data analytics and market intelligence, it helps you make informed purchasing decisions, negotiate better deals, and optimize your procurement spend.",
          keyFeatures: [
            {
              title: "Live Market Intelligence",
              description: "Tracks prices across multiple suppliers and marketplaces with real-time updates"
            },
            {
              title: "Predictive Analytics",
              description: "Forecasts price trends based on market conditions, seasonality, and historical data"
            },
            {
              title: "Automated Alerts",
              description: "Notifies you of significant price changes, new suppliers, or buying opportunities"
            },
            {
              title: "Spend Analysis",
              description: "Provides detailed insights into procurement spend patterns and savings opportunities"
            }
          ],
          useCases: [
            "Commodity purchasing",
            "Supplier negotiations",
            "Budget planning",
            "Cost reduction initiatives",
            "Market timing decisions",
            "Supplier performance tracking"
          ],
          benefits: [
            {
              metric: "15-20%",
              description: "Average cost savings"
            },
            {
              metric: "Real-time",
              description: "Market visibility"
            },
            {
              metric: "85%",
              description: "Negotiation success rate"
            }
          ],
          implementation: {
            timeframe: "Live in 3-5 days",
            integration: "Connects to procurement systems",
            support: "Market analyst support included"
          }
        }
      }
    ]
  },
  {
    title: "Sales & Marketing",
    subtitle: "Accelerate growth with AI-powered sales and marketing agents",
    color: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    agents: [
      {
        name: "Lead Qualifier",
        description: "Automatically qualify and score leads based on behavior, demographics, and engagement patterns",
        icon: Search,
        features: [
          "Lead scoring automation",
          "Behavioral analysis",
          "Priority ranking",
          "CRM integration"
        ],
        detailedInfo: {
          overview: "Lead Qualifier uses advanced AI to analyze and score leads in real-time, ensuring your sales team focuses on the most promising opportunities. By examining behavioral patterns, engagement history, and demographic data, it predicts conversion likelihood and recommends the best approach for each lead.",
          keyFeatures: [
            {
              title: "Predictive Lead Scoring",
              description: "Uses machine learning to continuously improve scoring accuracy based on conversion outcomes"
            },
            {
              title: "Behavioral Tracking",
              description: "Monitors website visits, content engagement, and email interactions to gauge interest"
            },
            {
              title: "Intent Detection",
              description: "Identifies buying signals and urgent needs through conversation and behavior analysis"
            },
            {
              title: "Automated Routing",
              description: "Assigns leads to the right sales rep based on territory, expertise, and availability"
            }
          ],
          useCases: [
            "B2B lead management",
            "High-volume lead processing",
            "Multi-channel lead capture",
            "Account-based marketing",
            "Lead nurturing programs",
            "Sales pipeline optimization"
          ],
          benefits: [
            {
              metric: "3x",
              description: "Conversion rate improvement"
            },
            {
              metric: "50%",
              description: "Sales productivity boost"
            },
            {
              metric: "25%",
              description: "Shorter sales cycles"
            }
          ],
          implementation: {
            timeframe: "Setup in 3-5 days",
            integration: "Works with all major CRMs",
            support: "Sales optimization consulting"
          }
        }
      },
      {
        name: "Content Creator",
        description: "Generate personalized marketing content tailored to your brand voice and audience segments",
        icon: Zap,
        features: [
          "Brand voice matching",
          "Multi-channel content",
          "SEO optimization",
          "A/B testing suggestions"
        ],
        detailedInfo: {
          overview: "Content Creator empowers your marketing team with AI that understands your brand voice, audience preferences, and content goals. From blog posts to social media, email campaigns to ad copy, it generates engaging, on-brand content that resonates with your target segments and drives results.",
          keyFeatures: [
            {
              title: "Brand Voice Learning",
              description: "Analyzes your existing content to maintain consistent tone, style, and messaging"
            },
            {
              title: "Audience Personalization",
              description: "Creates variations optimized for different segments, channels, and buyer stages"
            },
            {
              title: "SEO Intelligence",
              description: "Incorporates keyword research and SEO best practices into every piece of content"
            },
            {
              title: "Performance Optimization",
              description: "Suggests improvements based on content performance data and A/B test results"
            }
          ],
          useCases: [
            "Blog and article writing",
            "Social media campaigns",
            "Email marketing sequences",
            "Landing page copy",
            "Ad creative generation",
            "Product descriptions"
          ],
          benefits: [
            {
              metric: "10x",
              description: "Content production speed"
            },
            {
              metric: "65%",
              description: "Higher engagement rates"
            },
            {
              metric: "80%",
              description: "Cost reduction"
            }
          ],
          implementation: {
            timeframe: "Start creating in 24 hours",
            integration: "Connects to marketing platforms",
            support: "Content strategy consultation"
          }
        }
      },
      {
        name: "Customer Success Bot",
        description: "Proactively engage customers with personalized success plans and usage recommendations",
        icon: Users,
        features: [
          "Usage analytics",
          "Churn prediction",
          "Success plan automation",
          "Upsell opportunities"
        ],
        detailedInfo: {
          overview: "Customer Success Bot acts as a virtual CSM, monitoring customer health, predicting churn risks, and proactively engaging users with personalized guidance. It ensures every customer receives timely support and recommendations to maximize value from your product, improving retention and growth.",
          keyFeatures: [
            {
              title: "Health Score Monitoring",
              description: "Tracks usage patterns, feature adoption, and engagement to calculate real-time health scores"
            },
            {
              title: "Churn Risk Detection",
              description: "Identifies at-risk customers early with AI-powered predictive analytics"
            },
            {
              title: "Automated Playbooks",
              description: "Executes personalized success plans based on customer segment and lifecycle stage"
            },
            {
              title: "Growth Opportunity Alerts",
              description: "Identifies upsell and cross-sell opportunities based on usage patterns and needs"
            }
          ],
          useCases: [
            "SaaS customer retention",
            "Onboarding acceleration",
            "Feature adoption campaigns",
            "Renewal management",
            "Customer health monitoring",
            "Expansion revenue growth"
          ],
          benefits: [
            {
              metric: "40%",
              description: "Churn reduction"
            },
            {
              metric: "60%",
              description: "CSM efficiency gain"
            },
            {
              metric: "25%",
              description: "Revenue expansion"
            }
          ],
          implementation: {
            timeframe: "Live in 5-7 days",
            integration: "Integrates with your product and CRM",
            support: "Success strategy included"
          }
        }
      }
    ]
  }
];

interface AgentDetail {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  color: string;
  overview: string;
  keyFeatures: {
    title: string;
    description: string;
  }[];
  useCases: string[];
  benefits: {
    metric: string;
    description: string;
  }[];
  implementation: {
    timeframe: string;
    integration: string;
    support: string;
  };
}

const AgentProducts = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = (agent: Agent, category: AgentCategory) => {
    // Create the full agent detail object
    const agentDetail: AgentDetail = {
      name: agent.name,
      description: agent.description,
      icon: agent.icon,
      category: category.title,
      color: category.color,
      overview: agent.detailedInfo?.overview || "",
      keyFeatures: agent.detailedInfo?.keyFeatures || [],
      useCases: agent.detailedInfo?.useCases || [],
      benefits: agent.detailedInfo?.benefits || [],
      implementation: agent.detailedInfo?.implementation || {
        timeframe: "",
        integration: "",
        support: ""
      }
    };
    
    setSelectedAgent(agentDetail);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-cyan-100/30 to-green-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-100 to-green-100 rounded-full text-sm font-semibold text-gray-700 mb-4">
            <Bot className="h-4 w-4" />
            Our AI Agents
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Complete AI Agent Suite
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From operations to HR, procurement to sales - we have AI agents ready to transform every aspect of your business
          </p>
        </div>

        {/* Agent Categories */}
        <div className="space-y-16">
          {agentCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="animate-fade-in" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
              {/* Category Header */}
              <div className="mb-8">
                <h3 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-2`}>
                  {category.title}
                </h3>
                <p className="text-gray-600">{category.subtitle}</p>
              </div>

              {/* Agents Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.agents.map((agent, agentIndex) => (
                  <Card 
                    key={agentIndex}
                    className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-50`}></div>
                    <div className="relative p-6">
                      {/* Icon and Title */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`inline-flex p-3 bg-gradient-to-br ${category.color} rounded-2xl shadow-lg`}>
                          <agent.icon className="h-6 w-6 text-white" />
                        </div>
                        {agent.demoAvailable && (
                          <Badge className="bg-green-100 text-green-700">
                            Live Demo
                          </Badge>
                        )}
                      </div>

                      {/* Content */}
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{agent.name}</h4>
                      <p className="text-gray-600 text-sm mb-4">{agent.description}</p>

                      {/* Features */}
                      <ul className="space-y-2 mb-4">
                        {agent.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color} mt-1.5 flex-shrink-0`}></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      {agent.demoAvailable ? (
                        <Link to={agent.demoLink!}>
                          <Button 
                            size="sm"
                            className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 group`}
                          >
                            Try Demo
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      ) : (
                        <Button 
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => handleLearnMore(agent, category)}
                        >
                          Learn More
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <AgentDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          agent={selectedAgent}
        />
      )}
    </section>
  );
};

export default AgentProducts;