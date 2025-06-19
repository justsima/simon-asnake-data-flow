import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectManager from '@/components/admin/ProjectManager';
import CertificationManager from '@/components/admin/CertificationManager';
import ExperienceManager from '@/components/admin/ExperienceManager';
import SkillsManager from '@/components/admin/SkillsManager';
import PersonalManager from '@/components/admin/PersonalManager';
import MediaManager from '@/components/admin/MediaManager';
import Dashboard from '@/components/admin/Dashboard';
import { Button } from '@/components/ui/button';
import { Home, Settings, Database, User, Award, Briefcase, Target, FileImage } from 'lucide-react';

const PortfolioManager = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#08080D] text-white">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Portfolio Manager</h1>
            <p className="text-gray-400">Manage your professional portfolio content</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => window.open('/', '_blank')}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Home className="w-4 h-4 mr-2" />
            View Portfolio
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8 bg-white/5 border border-white/10">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Certifications
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <FileImage className="w-4 h-4" />
              Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="personal">
            <PersonalManager />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectManager />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceManager />
          </TabsContent>

          <TabsContent value="certifications">
            <CertificationManager />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsManager />
          </TabsContent>

          <TabsContent value="media">
            <MediaManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PortfolioManager;