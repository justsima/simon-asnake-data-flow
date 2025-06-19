import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { dataService, type SkillCategory, type Skill } from '@/services/dataService';
import { Plus, Edit, Trash2, Target, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SkillsManager = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tempSkills, setTempSkills] = useState<Skill[]>([]);
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, watch } = useForm<SkillCategory>();

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await dataService.getSkills();
      setSkillCategories(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load skills",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCategory = () => {
    setSelectedCategory(null);
    setTempSkills([]);
    reset();
    setIsDialogOpen(true);
  };

  const handleEditCategory = (category: SkillCategory) => {
    setSelectedCategory(category);
    setTempSkills([...category.skills]);
    reset(category);
    setIsDialogOpen(true);
  };

  const handleDeleteCategory = async (index: number) => {
    const updatedCategories = skillCategories.filter((_, i) => i !== index);
    setSkillCategories(updatedCategories);
    await dataService.saveSkills(updatedCategories);
    toast({
      title: "Success",
      description: "Skill category deleted successfully",
    });
  };

  const addSkill = () => {
    setTempSkills([...tempSkills, { name: '', percentage: 0 }]);
  };

  const removeSkill = (index: number) => {
    setTempSkills(tempSkills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, field: keyof Skill, value: string | number) => {
    const updated = [...tempSkills];
    updated[index] = { ...updated[index], [field]: value };
    setTempSkills(updated);
  };

  const onSubmit = async (data: SkillCategory) => {
    try {
      const categoryData = { ...data, skills: tempSkills.filter(s => s.name.trim()) };
      
      let updatedCategories;
      if (selectedCategory) {
        const index = skillCategories.findIndex(c => c.title === selectedCategory.title);
        updatedCategories = [...skillCategories];
        updatedCategories[index] = categoryData;
      } else {
        updatedCategories = [...skillCategories, categoryData];
      }
      
      setSkillCategories(updatedCategories);
      await dataService.saveSkills(updatedCategories);
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: selectedCategory ? "Skill category updated successfully" : "Skill category created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save skill category",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading skills...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Skills Management</h2>
          <p className="text-gray-400">Manage your technical skills and expertise</p>
        </div>
        <Button onClick={handleCreateCategory} className="bg-portfolio-accent1 hover:bg-portfolio-accent1/80">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {skillCategories.map((category, index) => (
          <Card key={index} className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#8A89FF]/15 rounded-full flex items-center justify-center">
                    <span className="text-lg">{category.icon}</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <p className="text-gray-400 text-sm">{category.skills.length} skills</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEditCategory(category)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteCategory(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">{skill.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {skill.percentage}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedCategory ? 'Edit Skill Category' : 'Add New Skill Category'}</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedCategory ? 'Update skill category details' : 'Add a new skill category with individual skills'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Category Title</Label>
                <Input 
                  id="title" 
                  {...register('title', { required: true })}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="Data Analysis"
                />
              </div>
              <div>
                <Label htmlFor="icon">Icon (emoji)</Label>
                <Input 
                  id="icon" 
                  {...register('icon', { required: true })}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="📊"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Skills</Label>
                <Button type="button" size="sm" onClick={addSkill} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Skill
                </Button>
              </div>
              
              {tempSkills.map((skill, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-7">
                    <Input 
                      placeholder="Skill name"
                      value={skill.name}
                      onChange={(e) => updateSkill(index, 'name', e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <Input 
                        type="number"
                        min="0"
                        max="100"
                        placeholder="%"
                        value={skill.percentage}
                        onChange={(e) => updateSkill(index, 'percentage', parseInt(e.target.value) || 0)}
                        className="bg-white/5 border-white/10 text-white"
                      />
                      <span className="text-sm text-gray-400">%</span>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => removeSkill(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {tempSkills.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">No skills added yet. Click "Add Skill" to get started.</p>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="bg-portfolio-accent1 hover:bg-portfolio-accent1/80">
                {selectedCategory ? 'Update Category' : 'Create Category'}
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

export default SkillsManager;