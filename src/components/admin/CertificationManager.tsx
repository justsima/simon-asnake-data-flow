import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { dataService, type Certification } from '@/services/dataService';
import { Plus, Edit, Trash2, Award, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CertificationManager = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, watch } = useForm<Certification>();
  const isEducation = watch('isEducation');

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      const data = await dataService.getCertifications();
      setCertifications(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load certifications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCertification = () => {
    setSelectedCertification(null);
    reset({ isEducation: false });
    setIsDialogOpen(true);
  };

  const handleEditCertification = (certification: Certification) => {
    setSelectedCertification(certification);
    reset({
      ...certification,
      skills: certification.skills || []
    });
    setIsDialogOpen(true);
  };

  const handleDeleteCertification = async (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
    await dataService.saveCertifications(updatedCertifications);
    toast({
      title: "Success",
      description: "Certification deleted successfully",
    });
  };

  const onSubmit = async (data: Certification) => {
    try {
      let updatedCertifications;
      if (selectedCertification) {
        const index = certifications.findIndex(c => 
          c.title === selectedCertification.title && c.organization === selectedCertification.organization
        );
        updatedCertifications = [...certifications];
        updatedCertifications[index] = data;
      } else {
        updatedCertifications = [...certifications, data];
      }
      
      setCertifications(updatedCertifications);
      await dataService.saveCertifications(updatedCertifications);
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: selectedCertification ? "Certification updated successfully" : "Certification created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save certification",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading certifications...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Certification Management</h2>
          <p className="text-gray-400">Manage your certifications and education</p>
        </div>
        <Button onClick={handleCreateCertification} className="bg-portfolio-accent1 hover:bg-portfolio-accent1/80">
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((certification, index) => (
          <Card key={index} className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 ${certification.isEducation ? 'bg-[#8A89FF]/30' : 'bg-[#8A89FF]/15'} rounded-full flex items-center justify-center`}>
                    {certification.isEducation ? (
                      <GraduationCap className="w-5 h-5 text-[#8A89FF]" />
                    ) : (
                      <Award className="w-5 h-5 text-[#8A89FF]" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{certification.title}</CardTitle>
                    <p className="text-[#8A89FF] text-sm">{certification.organization}</p>
                    <p className="text-gray-400 text-xs">{certification.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEditCertification(certification)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteCertification(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {certification.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-white/10 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCertification ? 'Edit Certification' : 'Add New Certification'}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedCertification ? 'Update certification details' : 'Add a new certification or education'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="isEducation" 
                checked={isEducation || false}
                onCheckedChange={(checked) => setValue('isEducation', checked)}
              />
              <Label htmlFor="isEducation">This is an education degree</Label>
            </div>

            <div>
              <Label htmlFor="title">{isEducation ? 'Degree/Program' : 'Certification Name'}</Label>
              <Input 
                id="title" 
                {...register('title', { required: true })}
                className="bg-white/5 border-white/10 text-white"
                placeholder={isEducation ? "Bachelor's in Computer Science" : "AWS Certified Solutions Architect"}
              />
            </div>

            <div>
              <Label htmlFor="organization">{isEducation ? 'Institution' : 'Issuing Organization'}</Label>
              <Input 
                id="organization" 
                {...register('organization', { required: true })}
                className="bg-white/5 border-white/10 text-white"
                placeholder={isEducation ? "University Name" : "Amazon Web Services"}
              />
            </div>

            <div>
              <Label htmlFor="date">{isEducation ? 'Graduation Year' : 'Issue Date'}</Label>
              <Input 
                id="date" 
                {...register('date', { required: true })}
                className="bg-white/5 border-white/10 text-white"
                placeholder="2023"
              />
            </div>

            <div>
              <Label htmlFor="skills">{isEducation ? 'Focus Areas' : 'Skills Verified'} (comma-separated)</Label>
              <Input 
                id="skills" 
                className="bg-white/5 border-white/10 text-white"
                placeholder="Machine Learning, Python, Statistical Analysis"
                onChange={(e) => {
                  const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                  setValue('skills', skills);
                }}
                defaultValue={selectedCertification?.skills.join(', ') || ''}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="bg-portfolio-accent1 hover:bg-portfolio-accent1/80">
                {selectedCertification ? 'Update Certification' : 'Add Certification'}
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

export default CertificationManager;