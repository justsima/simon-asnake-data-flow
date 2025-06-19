import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { dataService, type Project } from '@/services/dataService';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, watch } = useForm<Project>();
  const watchedCategory = watch('category');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await dataService.getProjects();
      setProjects(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = () => {
    setSelectedProject(null);
    reset({
      title: '',
      description: '',
      challenge: '',
      solution: '',
      impact: '',
      technologies: [],
      image: '/placeholder.svg',
      category: 'Power BI',
      videoUrl: '',
      liveUrl: '',
      githubUrl: '',
    });
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    reset({
      ...project,
      technologies: project.technologies || []
    });
    setIsDialogOpen(true);
  };

  const handleDeleteProject = async (id: number) => {
    if (!id) {
      toast({
        title: "Error",
        description: "Cannot delete project without ID",
        variant: "destructive",
      });
      return;
    }

    try {
      await dataService.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: Project) => {
    setIsSaving(true);
    try {
      // Ensure required fields are present
      const projectData: Project = {
        ...data,
        id: selectedProject?.id,
        image: data.image || '/placeholder.svg',
        technologies: data.technologies || [],
        videoUrl: data.videoUrl || undefined,
        liveUrl: data.liveUrl || undefined,
        githubUrl: data.githubUrl || undefined,
      };

      const savedProject = await dataService.saveProject(projectData);
      
      if (selectedProject?.id) {
        // Update existing project in list
        setProjects(projects.map(p => p.id === selectedProject.id ? savedProject : p));
      } else {
        // Add new project to list
        setProjects([savedProject, ...projects]);
      }
      
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: selectedProject ? "Project updated successfully" : "Project created successfully",
      });
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Project Management</h2>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <Button onClick={handleCreateProject} className="bg-portfolio-accent1 hover:bg-portfolio-accent1/80">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge className="mt-2">{project.category}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEditProject(project)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  {project.id && (
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteProject(project.id!)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-3">{project.description.substring(0, 100)}...</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProject ? 'Edit Project' : 'Create New Project'}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedProject ? 'Update project details' : 'Add a new project to your portfolio'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  {...register('title', { required: true })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={watchedCategory} 
                  onValueChange={(value) => setValue('category', value as Project['category'])}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Power BI">Power BI</SelectItem>
                    <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                    <SelectItem value="Data Engineering">Data Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                {...register('description', { required: true })}
                className="bg-white/5 border-white/10 text-white"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="challenge">Challenge</Label>
              <Textarea 
                id="challenge" 
                {...register('challenge', { required: true })}
                className="bg-white/5 border-white/10 text-white"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="solution">Solution</Label>
              <Textarea 
                id="solution" 
                {...register('solution', { required: true })}
                className="bg-white/5 border-white/10 text-white"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="impact">Impact</Label>
              <Textarea 
                id="impact" 
                {...register('impact', { required: true })}
                className="bg-white/5 border-white/10 text-white"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input 
                id="image" 
                {...register('image')}
                className="bg-white/5 border-white/10 text-white"
                placeholder="/placeholder.svg"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="liveUrl">Live URL (optional)</Label>
                <Input 
                  id="liveUrl" 
                  {...register('liveUrl')}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="videoUrl">Video URL (optional)</Label>
                <Input 
                  id="videoUrl" 
                  {...register('videoUrl')}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="https://..."
                />
              </div>
              <div>
                <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
                <Input 
                  id="githubUrl" 
                  {...register('githubUrl')}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="technologies">Technologies (comma-separated)</Label>
              <Input 
                id="technologies" 
                className="bg-white/5 border-white/10 text-white"
                placeholder="Python, SQL, Power BI"
                onChange={(e) => {
                  const techs = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                  setValue('technologies', techs);
                }}
                defaultValue={selectedProject?.technologies.join(', ') || ''}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                type="submit" 
                disabled={isSaving}
                className="bg-portfolio-accent1 hover:bg-portfolio-accent1/80"
              >
                {isSaving ? 'Saving...' : selectedProject ? 'Update Project' : 'Create Project'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManager;