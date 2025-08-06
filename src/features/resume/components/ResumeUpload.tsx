import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUploadResume } from "../hooks";

interface ResumeUploadProps {
  onUploadSuccess?: () => void;
}

interface UploadFile {
  file: File;
  id: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

// Helper function to validate file
const validateFile = (file: File) => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
  if (file.size > maxSize) {
    return 'File size must be less than 5MB';
  }
  
  if (!allowedTypes.includes(file.type)) {
    return 'Only PDF, DOC, and DOCX files are allowed';
  }
  
  return null;
};

// Helper function to format file size
const formatFileSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

export function ResumeUpload({ onUploadSuccess }: ResumeUploadProps) {
  const { t } = useTranslation();
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const { mutate: uploadResume } = useUploadResume();

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadFile[] = [];
    
    Array.from(files).forEach((file) => {
      const error = validateFile(file);
      newFiles.push({
        file,
        id: Math.random().toString(36).substr(2, 9),
        progress: 0,
        status: error ? 'error' : 'pending',
        error,
      });
    });

    setUploadFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    e.target.value = ''; // Reset input
  }, [handleFileSelect]);

  const removeFile = useCallback((id: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const uploadFile = useCallback((uploadFile: UploadFile) => {
    if (uploadFile.status !== 'pending') return;

    setUploadFiles((prev) =>
      prev.map((f) =>
        f.id === uploadFile.id ? { ...f, status: 'uploading', progress: 0 } : f
      )
    );

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadFiles((prev) =>
        prev.map((f) => {
          if (f.id === uploadFile.id && f.status === 'uploading') {
            const newProgress = Math.min(f.progress + 10, 90);
            return { ...f, progress: newProgress };
          }
          return f;
        })
      );
    }, 200);

    uploadResume(uploadFile.file, {
      onSuccess: () => {
        clearInterval(progressInterval);
        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id ? { ...f, status: 'success', progress: 100 } : f
          )
        );
        onUploadSuccess?.();
      },
      onError: () => {
        clearInterval(progressInterval);
        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id 
              ? { ...f, status: 'error', error: 'Upload failed. Please try again.' } 
              : f
          )
        );
      },
    });
  }, [uploadResume, onUploadSuccess]);

  const uploadAllFiles = useCallback(() => {
    uploadFiles
      .filter((f) => f.status === 'pending')
      .forEach(uploadFile);
  }, [uploadFiles, uploadFile]);

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t("resume.upload.title", "Upload Your Resume")}
            </h3>
            
            <p className="text-gray-600 mb-4">
              {t("resume.upload.subtitle", "Drag and drop your resume here, or click to browse")}
            </p>
            
            <div className="space-y-2">
              <Button asChild>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={handleFileInputChange}
                  />
                  {t("resume.upload.browse", "Browse Files")}
                </label>
              </Button>
              
              <p className="text-xs text-gray-500">
                {t("resume.upload.fileTypes", "Supported formats: PDF, DOC, DOCX (Max 5MB)")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Queue */}
      {uploadFiles.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">
                {t("resume.upload.queue", "Upload Queue")} ({uploadFiles.length})
              </h4>
              
              <div className="space-x-2">
                <Button
                  size="sm"
                  onClick={uploadAllFiles}
                  disabled={!uploadFiles.some((f) => f.status === 'pending')}
                >
                  {t("resume.upload.uploadAll", "Upload All")}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUploadFiles([])}
                >
                  {t("common.clear", "Clear")}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {uploadFiles.map((uploadFile) => (
                <div key={uploadFile.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {uploadFile.file.name}
                      </p>
                      
                      <div className="flex items-center space-x-2">
                        {uploadFile.status === 'success' && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        {uploadFile.status === 'error' && (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(uploadFile.id)}
                          className="p-1 h-auto"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatFileSize(uploadFile.file.size)}</span>
                      <span className="capitalize">{uploadFile.status}</span>
                    </div>
                    
                    {uploadFile.status === 'uploading' && (
                      <Progress value={uploadFile.progress} className="mt-2" />
                    )}
                    
                    {uploadFile.error && (
                      <p className="text-xs text-red-600 mt-1">{uploadFile.error}</p>
                    )}
                  </div>
                  
                  {uploadFile.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => uploadFile(uploadFile)}
                    >
                      {t("resume.upload.upload", "Upload")}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
