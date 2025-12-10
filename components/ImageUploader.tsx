import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { UploadedImage } from '../types';

interface ImageUploaderProps {
  image: UploadedImage | null;
  onImageUpload: (image: UploadedImage | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ image, onImageUpload }) => {
  
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        // Split data URL to get raw base64
        const base64 = result.split(',')[1];
        
        onImageUpload({
          file,
          previewUrl: result,
          base64,
          mimeType: file.type
        });
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Error reading file", err);
    }
  }, [onImageUpload]);

  const clearImage = () => {
    onImageUpload(null);
  };

  if (image) {
    return (
      <div className="relative w-full h-96 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-700 shadow-xl group">
        <img 
          src={image.previewUrl} 
          alt="Uploaded preview" 
          className="w-full h-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
        />
        <div className="absolute top-0 right-0 p-2">
            <button 
                onClick={clearImage}
                className="bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
                title="Remove image"
            >
                <X size={20} />
            </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-zinc-300 text-sm font-medium truncate">{image.file.name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 relative border-2 border-dashed border-zinc-700 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors flex flex-col items-center justify-center group cursor-pointer">
       <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="flex flex-col items-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-zinc-700">
           <Upload className="w-8 h-8 text-amber-500" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-white mb-1">Upload Source Portrait</h3>
          <p className="text-zinc-400 text-sm">Click or drag and drop your photo here</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-widest mt-4">
            <ImageIcon size={14} />
            <span>High Res Supported</span>
        </div>
      </div>
    </div>
  );
};
