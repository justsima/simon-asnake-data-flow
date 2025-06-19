import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dataService } from '@/services/dataService';
import { BarChart3, Users, Award, Target, TrendingUp, FileText } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    experiences: 0,
    certifications: 0,
    skills: 0,
    totalTechnologies: 0,
  });

  const [recentActivity, setRecentActivity] = useState<Array<{
    type: string;
    title: string;
    date: string;
  }>>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [projects, experiences, certifications, skills] = await Promise.all([
        dataService.getProjects(),
        dataService.getExperience(),
        dataService.getCertifications(),
        dataService.getSkills(),
      ]);

      const allTechnologies = new Set([
        ...projects.flatMap(p => p.technologies),
        ...experiences.flatMap(e => e.technologies),
        ...skills.flatMap(s => s.skills.map(skill => skill.name)),
      ]);

      setStats({
        projects: projects.length,
        experiences: experiences.length,
        certifications: certifications.length,
        skills: skills.reduce((acc, cat) => acc + cat.skills.length, 0),
        totalTechnologies: allTechnologies.size,
      });

      // Mock recent activity
      setRecentActivity([
        { type: 'project', title: 'Updated Executive Dashboard project', date: '2 hours ago' },
        { type: 'certification', title: 'Added new Power BI certification', date: '1 day ago' },
        { type: 'experience', title: 'Updated CodePoint Creatives role', date: '3 days ago' },
        { type: 'skills', title: 'Added JavaScript skill', date: '1 week ago' },
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const StatCard = ({ title, value, icon: Icon, description }: {
    title: string;
    value: number;
    icon: any;
    description: string;
  }) => (
    <Card className="bg-white/5 border-white/10 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-portfolio-accent1" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project': return '🚀';
      case 'certification': return '🏆';
      case 'experience': return '💼';
      case 'skills': return '🎯';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Projects"
          value={stats.projects}
          icon={BarChart3}
          description="Portfolio projects"
        />
        <StatCard
          title="Experience"
          value={stats.experiences}
          icon={Users}
          description="Work experiences"
        />
        <StatCard
          title="Certifications"
          value={stats.certifications}
          icon={Award}
          description="Professional credentials"
        />
        <StatCard
          title="Skills"
          value={stats.skills}
          icon={Target}
          description="Technical skills"
        />
        <StatCard
          title="Technologies"
          value={stats.totalTechnologies}
          icon={TrendingUp}
          description="Unique technologies"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-400">
              Latest changes to your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                  <span className="text-lg">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.title}</p>
                    <p className="text-xs text-gray-400">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription className="text-gray-400">
              Portfolio overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Portfolio completion</span>
                <Badge className="bg-green-500/20 text-green-400">95%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SEO optimization</span>
                <Badge className="bg-blue-500/20 text-blue-400">Good</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Content freshness</span>
                <Badge className="bg-yellow-500/20 text-yellow-400">Recent</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total views</span>
                <span className="text-sm font-medium">1,234</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;