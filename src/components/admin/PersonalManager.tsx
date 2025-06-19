import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { dataService, type PersonalInfo } from '@/services/dataService';
import { User, Mail, Phone, MapPin, FileText, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PersonalManager = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const { register, handleSubmit, reset, setValue, watch } = useForm<PersonalInfo>();
  const profileImage = watch('profileImage');

  useEffect(() => {
    loadPersonalInfo();
  }, []);

  const loadPersonalInfo = async () => {
    try {
      const data = await dataService.getPersonalInfo();
      setPersonalInfo(data);
      reset(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load personal information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await dataService.uploadMedia(file);
      setValue('profileImage', imageUrl);
      toast({
        title: "Success",
        description: "Profile image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: PersonalInfo) => {
    try {
      await dataService.savePersonalInfo(data);
      setPersonalInfo(data);
      toast({
        title: "Success",
        description: "Personal information updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save personal information",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading personal information...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Personal Information</h2>
        <p className="text-gray-400">Manage your personal details and profile</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white/5 border-white/10 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Profile Photo
            </CardTitle>
            <CardDescription className="text-gray-400">
              Upload your professional photo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profileImage} alt="Profile" />
                <AvatarFallback className="bg-[#8A89FF]/20 text-[#8A89FF]">
                  {personalInfo?.name?.split(' ').map(n => n[0]).join('') || 'SA'}
                </AvatarFallback>
              </Avatar>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button disabled={isUploading} className="bg-portfolio-accent1 hover:bg-portfolio-accent1/80">
                  {isUploading ? 'Uploading...' : 'Change Photo'}
                </Button>
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Card className="bg-white/5 border-white/10 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Details
              </CardTitle>
              <CardDescription className="text-gray-400">
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      {...register('name', { required: true })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Professional Title</Label>
                    <Input 
                      id="title" 
                      {...register('title', { required: true })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      {...register('email', { required: true })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      {...register('phone')}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    {...register('location')}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    {...register('bio')}
                    className="bg-white/5 border-white/10 text-white"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="aboutDescription">About Description</Label>
                  <Textarea 
                    id="aboutDescription" 
                    {...register('aboutDescription')}
                    className="bg-white/5 border-white/10 text-white"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="resume">Resume URL</Label>
                  <Input 
                    id="resume" 
                    {...register('resume')}
                    className="bg-white/5 border-white/10 text-white"
                    placeholder="https://..."
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input 
                      id="linkedin" 
                      {...register('social.linkedin')}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input 
                      id="github" 
                      {...register('social.github')}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitter">Twitter URL</Label>
                    <Input 
                      id="twitter" 
                      {...register('social.twitter')}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                </div>

                <Button type="submit" className="bg-portfolio-accent1 hover:bg-portfolio-accent1/80">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PersonalManager;