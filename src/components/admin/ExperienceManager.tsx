import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { dataService } from '@/services/dataService';
import { Experience } from '@/components/experience/types';
import { Plus, Edit, Trash2, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue } = useForm<Experience>();

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const data = await dataService.getExperience();
      setExperiences(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load experiences",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateExperience = () => {
    setSelectedExperience(null);
    reset();
    setIsDialogOpen(true);
  };

  const handleEditExperience = (experience: Experience) => {
    setSelectedExperience(experience);
    reset(experience);
    setIsDialogOpen(true);
  };

  const handleDeleteExperience = async (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
    await dataService.saveExperience(updatedExperiences);
    toast({
      title: "Success",
      description: "Experience deleted successfully",
    });
  };

  const onSubmit = async (data: Experience) => {
    try {
      let updatedExperiences;
      if (selectedExperience) {
        const index = experiences.findIndex(e => 
          e.title === selectedExperience.title && e.company === selectedExperience.company
        );
        updatedExperiences = [...experiences];
        updatedExperiences[index] = data;
      } else {
        updatedExperiences = [...experiences, data];
      }
      
      setExperiences(updatedExperiences);
      await dataService.saveExperience(updatedExperiences);
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: selectedExperience ? "Experience updated successfully" : "Experience created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save experience",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading experiences...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Experience Management</h2>
          <p className="text-gray-400">Manage your work experience</p>
        </div>
        <Button onClick={handleCreateExperience} className="bg-portfolio-accent1 hover:bg-portfolio-accent1/80">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {experiences.map((experience, index) => (
          <Card key={index} className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#8A89FF]/15 rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-[#8A89FF]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{experience.title}</CardTitle>
                    <p className="text-[#8A89FF] text-sm">{experience.company}</p>
                    <p className="text-gray-400 text-xs">{experience.period}</p>
                    {experience.location && (
                      <p className="text-gray-400 text-xs">{experience.location}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEditExperience(experience)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteExperience(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-sm mb-3">{experience.description}</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-gray-400">Technologies:</p>
                  <div className="flex flex-wrap gap-1">
                    {experience.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {experience.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{experience.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedExperience ? 'Edit Experience' : 'Add New Experience'}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedExperience ? 'Update experience details' : 'Add a new work experience'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input 
                  id="title" 
                  {...register('title', { required: true })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  {...register('company', { required: true })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="period">Period</Label>
                <Input 
                  id="period" 
                  {...register('period', { required: true })}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="June 2023 - Present"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  {...register('location')}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="City, Country"
                />
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
              <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
              <Textarea 
                id="responsibilities" 
                className="bg-white/5 border-white/10 text-white"
                rows={5}
                placeholder="Enter each responsibility on a new line"
                onChange={(e) => {
                  const responsibilities = e.target.value.split('\n').filter(r => r.trim());
                  setValue('responsibilities', responsibilities);
                }}
                defaultValue={selectedExperience?.responsibilities.join('\n') || ''}
              />
            </div>

            <div>
              <Label htmlFor="achievements">Achievements (one per line)</Label>
              <Textarea 
                id="achievements" 
                className="bg-white/5 border-white/10 text-white"
                rows={4}
                placeholder="Enter each achievement on a new line"
                onChange={(e) => {
                  const achievements = e.target.value.split('\n').filter(a => a.trim());
                  setValue('achievements', achievements);
                }}
                defaultValue={selectedExperience?.achievements.join('\n') || ''}
              />
            </div>

            <div>
              <Label htmlFor="technologies">Technologies (comma-separated)</Label>
              <Input 
                id="technologies" 
                className="bg-white/5 border-white/10 text-white"
                placeholder="Python, SQL, Power BI, Azure"
                onChange={(e) => {
                  const techs = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                  setValue('technologies', techs);
                }}
                defaultValue={selectedExperience?.technologies.join(', ') || ''}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="bg-portfolio-accent1 hover:bg-portfolio-accent1/80">
                {selectedExperience ? 'Update Experience' : 'Add Experience'}
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

export default ExperienceManager;