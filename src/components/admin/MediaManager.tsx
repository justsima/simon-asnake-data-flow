import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { dataService, type MediaFile } from '@/services/dataService';
import { Upload, Image, FileText, Trash2, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MediaManager = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const data = await dataService.getMedia();
      setMediaFiles(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load media files",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    try {
      for (const file of Array.from(files)) {
        const url = await dataService.uploadMedia(file);
        // Reload media list to get the new file with its database ID
        await loadMedia();
      }
      toast({
        title: "Success",
        description: "Files uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload files",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteFile = async (id: string) => {
    try {
      await dataService.deleteMedia(id);
      setMediaFiles(prev => prev.filter(file => file.id !== id));
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      toast({
        title: "Copied",
        description: "URL copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      });
    }
  };

  const getFileIcon = (type: string) => {
    return type === 'image' ? Image : FileText;
  };

  if (isLoading) {
    return <div className="text-white">Loading media files...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Media Manager</h2>
          <p className="text-gray-400">Upload and manage your portfolio media files</p>
        </div>
        
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button disabled={isUploading} className="bg-portfolio-accent1 hover:bg-portfolio-accent1/80">
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Files'}
          </Button>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mediaFiles.map((file) => {
          const FileIcon = getFileIcon(file.type);
          return (
            <Card key={file.id} className="bg-white/5 border-white/10 text-white">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#8A89FF]/15 rounded-full flex items-center justify-center">
                      <FileIcon className="w-5 h-5 text-[#8A89FF]" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">{file.name}</CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {file.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {file.size}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleDeleteFile(file.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {file.type === 'image' && (
                  <div className="mb-3">
                    <img 
                      src={file.url} 
                      alt={file.name}
                      className="w-full h-24 object-cover rounded-lg bg-white/5"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input 
                      value={file.url}
                      readOnly
                      className="bg-white/5 border-white/10 text-white text-xs flex-1"
                    />
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => copyToClipboard(file.url, file.id)}
                      className="flex-shrink-0"
                    >
                      {copiedId === file.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">Uploaded: {file.uploadDate}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {mediaFiles.length === 0 && (
        <Card className="bg-white/5 border-white/10 text-white">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No media files yet</h3>
            <p className="text-gray-400 text-center mb-4">
              Upload images for your projects, profile photos, or documents like your resume
            </p>
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button className="bg-portfolio-accent1 hover:bg-portfolio-accent1/80">
                <Upload className="w-4 h-4 mr-2" />
                Upload Your First File
              </Button>
            </label>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MediaManager;