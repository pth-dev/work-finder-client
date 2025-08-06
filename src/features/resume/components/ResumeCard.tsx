import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Download,
  Eye,
  Star,
  MoreVertical,
  Trash2,
  Calendar,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Resume } from "../types";
import {
  useDeleteResume,
  useDownloadResume,
  useGetResumeFileUrl,
} from "../hooks";

interface ResumeCardProps {
  resume: Resume;
}

// Helper function to format file size
const formatFileSize = (bytes?: number) => {
  if (!bytes) return "Unknown size";

  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
};

// Helper function to format date
const formatUploadDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
};

// Helper function to get file type icon color
const getFileTypeColor = (fileType?: string) => {
  switch (fileType?.toLowerCase()) {
    case "pdf":
      return "text-red-600";
    case "doc":
    case "docx":
      return "text-blue-600";
    default:
      return "text-gray-600";
  }
};

export function ResumeCard({ resume }: ResumeCardProps) {
  const { t } = useTranslation();
  const { mutate: deleteResume, isPending: isDeleting } = useDeleteResume();
  const { mutate: downloadResume, isPending: isDownloading } =
    useDownloadResume();
  const getFileUrl = useGetResumeFileUrl();

  const handleDelete = () => {
    if (
      window.confirm(
        t(
          "resume.confirmDelete",
          "Are you sure you want to delete this resume?"
        )
      )
    ) {
      deleteResume(resume.resume_id);
    }
  };

  const handleDownload = () => {
    downloadResume(resume.resume_id);
  };

  const handlePreview = () => {
    // Open resume file directly using static file URL
    window.open(getFileUrl(resume.file_path), "_blank");
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          {/* Resume Info */}
          <div className="flex items-start space-x-3 flex-1">
            {/* File Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText
                  className={`h-6 w-6 ${getFileTypeColor(resume.file_type)}`}
                />
              </div>
            </div>

            {/* File Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                      {resume.file_name}
                    </h3>

                    {resume.is_default && (
                      <Badge variant="default" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        {t("resume.default", "Default")}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span>{formatFileSize(resume.file_size)}</span>
                    <span className="uppercase">
                      {resume.file_type || "PDF"}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>Uploaded {formatUploadDate(resume.upload_time)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 ml-4">
            {/* Quick Actions */}
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-1" />
              {t("resume.view", "View")}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-1" />
                  {t("resume.download", "Download")}
                </>
              )}
            </Button>

            {/* More Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t("resume.delete", "Delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
