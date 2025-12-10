import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { Button } from './components/Button';
import { UploadedImage, DEFAULT_PROMPT } from './types';
import { generatePortrait } from './services/geminiService';
import { Wand2, Download, RefreshCw, AlertCircle, Camera } from 'lucide-react';

const App: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<UploadedImage | null>(null);
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!sourceImage) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generatePortrait(sourceImage.base64, sourceImage.mimeType, prompt);
      setGeneratedImage(result);
    } catch (err: any) {
      setError(err.message || "Failed to process image.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'retro-bollywood-portrait.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 selection:bg-amber-500/30">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-900/20">
                <Camera className="text-white w-6 h-6" />
             </div>
             <div>
               <h1 className="text-2xl font-bold font-serif tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
                Retro Bollywood Studio
               </h1>
               <p className="text-xs text-neutral-400 font-medium tracking-widest uppercase">AI-Powered Vintage Portraits</p>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          
          {/* Left Column: Input & Controls */}
          <div className="space-y-8">
            <div className="bg-neutral-800/30 p-1 rounded-xl border border-white/5">
                <div className="bg-neutral-900/80 p-6 rounded-lg backdrop-blur-sm">
                    <h2 className="text-xl font-serif text-amber-100 mb-6 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-amber-500 inline-block"></span>
                        1. Upload Portrait
                    </h2>
                    <ImageUploader 
                        image={sourceImage} 
                        onImageUpload={setSourceImage} 
                    />
                </div>
            </div>

            <div className="bg-neutral-800/30 p-1 rounded-xl border border-white/5">
                <div className="bg-neutral-900/80 p-6 rounded-lg backdrop-blur-sm">
                    <h2 className="text-xl font-serif text-amber-100 mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-amber-500 inline-block"></span>
                        2. Customize Style
                    </h2>
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-neutral-400">
                            Transformation Prompt
                        </label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="w-full h-32 bg-black/50 border border-neutral-700 rounded-lg p-4 text-sm text-neutral-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none leading-relaxed"
                            placeholder="Describe the desired transformation..."
                        />
                        <p className="text-xs text-neutral-500">
                            Tip: Be specific about clothing, lighting, and mood for the best vintage results.
                        </p>
                    </div>

                    <div className="mt-8">
                        <Button 
                            onClick={handleGenerate}
                            disabled={!sourceImage || isGenerating}
                            isLoading={isGenerating}
                            className="w-full h-14 text-lg"
                        >
                            {isGenerating ? 'Transforming...' : 'Generate Portrait'}
                            {!isGenerating && <Wand2 className="ml-2 w-5 h-5" />}
                        </Button>
                        {error && (
                            <div className="mt-4 p-4 bg-red-900/20 border border-red-800/50 rounded-lg flex items-start gap-3 text-red-200 text-sm">
                                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                <p>{error}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column: Result */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-neutral-800/30 p-1 rounded-xl border border-white/5 h-full min-h-[600px]">
                <div className="bg-neutral-900/80 p-6 rounded-lg backdrop-blur-sm h-full flex flex-col">
                    <h2 className="text-xl font-serif text-amber-100 mb-6 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-amber-500 inline-block"></span>
                        3. Vintage Result
                    </h2>
                    
                    <div className="flex-1 flex items-center justify-center bg-black/40 rounded-lg border-2 border-dashed border-neutral-800 overflow-hidden relative min-h-[400px]">
                        {isGenerating && (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Wand2 className="w-6 h-6 text-amber-500 animate-pulse" />
                                    </div>
                                </div>
                                <p className="mt-4 text-amber-200 font-serif text-lg animate-pulse">Creating masterpiece...</p>
                            </div>
                        )}
                        
                        {generatedImage ? (
                            <img 
                                src={generatedImage} 
                                alt="Generated Retro Portrait" 
                                className="w-full h-auto max-h-[700px] object-contain shadow-2xl"
                            />
                        ) : (
                            <div className="text-center p-8 opacity-40">
                                <div className="w-20 h-20 mx-auto bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                                    <Camera className="w-10 h-10 text-neutral-500" />
                                </div>
                                <h3 className="text-lg font-medium text-neutral-300">No Result Yet</h3>
                                <p className="text-neutral-500 mt-2 max-w-xs mx-auto">Upload an image and hit generate to see the retro magic happen.</p>
                            </div>
                        )}
                    </div>

                    {generatedImage && (
                        <div className="mt-6 flex gap-4">
                            <Button 
                                variant="secondary" 
                                onClick={handleDownload}
                                className="flex-1"
                            >
                                <Download className="mr-2 w-4 h-4" />
                                Download Portrait
                            </Button>
                            <Button 
                                variant="outline"
                                onClick={() => setGeneratedImage(null)}
                            >
                                <RefreshCw className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
          </div>

        </div>
      </main>
      
      <footer className="border-t border-white/5 py-8 mt-12 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 text-center text-neutral-500 text-sm">
              <p>Powered by Google Gemini 2.5 Flash Image • Retro Bollywood Studio © 2025</p>
          </div>
      </footer>
    </div>
  );
};

export default App;
