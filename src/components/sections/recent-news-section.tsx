import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";

const newsArticles = [
  {
    id: "1",
    title: "The Best Cities for Remote Work Around the World",
    excerpt:
      "Discover the top destinations for remote workers in 2024, featuring affordable living costs and excellent infrastructure.",
    author: "Sarah Johnson",
    publishedAt: "2024-07-15",
    category: "Remote Work",
    readTime: "5 min read",
    image: "/blog/remote-work-cities.jpg",
  },
  {
    id: "2",
    title: "How to Negotiate Your Salary: A Complete Guide",
    excerpt:
      "Learn proven strategies to negotiate a better salary package and advance your career effectively.",
    author: "Michael Chen",
    publishedAt: "2024-07-12",
    category: "Career Advice",
    readTime: "8 min read",
    image: "/blog/salary-negotiation.jpg",
  },
  {
    id: "3",
    title: "Tech Industry Trends: What's Hot in 2024",
    excerpt:
      "Stay ahead of the curve with the latest technology trends and in-demand skills for the current job market.",
    author: "Emma Davis",
    publishedAt: "2024-07-10",
    category: "Industry Trends",
    readTime: "6 min read",
    image: "/blog/tech-trends.jpg",
  },
];

export function RecentNewsSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#f0f5f7]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#202124] mb-4">
            Recent News Articles
          </h2>
          <p className="text-lg text-[#696969] max-w-2xl mx-auto">
            Fresh job related news content posted each day.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <Card
              key={article.id}
              className="group cursor-pointer border-[#e0e6ed] hover:shadow-lg transition-all duration-300 bg-white overflow-hidden"
            >
              {/* Article Image */}
              <div className="aspect-video bg-gradient-to-br from-[#1967d2]/10 to-[#f9ab00]/10 flex items-center justify-center">
                <div className="text-[#696969] text-center">
                  <div className="w-16 h-16 bg-[#1967d2]/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-[#1967d2]" />
                  </div>
                  <p className="text-sm">Article Image</p>
                </div>
              </div>

              <CardHeader className="pb-3">
                {/* Category & Read Time */}
                <div className="flex items-center justify-between text-sm text-[#696969] mb-2">
                  <span className="bg-[#1967d2]/10 text-[#1967d2] px-2 py-1 rounded-md font-medium">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>

                <CardTitle className="text-lg font-semibold text-[#202124] group-hover:text-[#1967d2] transition-colors line-clamp-2">
                  {article.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Excerpt */}
                <p className="text-[#696969] text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Author & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-[#1967d2]/20 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-[#1967d2]" />
                    </div>
                    <span className="text-sm text-[#696969]">
                      {article.author}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-[#696969]">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Read More Button */}
                <div className="mt-4 pt-4 border-t border-[#e0e6ed]">
                  <button className="flex items-center space-x-2 text-[#1967d2] hover:text-[#1557b0] font-medium text-sm group-hover:translate-x-1 transition-transform">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-[#1967d2] hover:bg-[#1557b0] text-white font-medium px-8 py-3 rounded-lg transition-colors">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
}
