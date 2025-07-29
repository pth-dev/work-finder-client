import React, { useRef, useState } from 'react'
import { cn } from '@/shared/utils'
import { Button } from '@/shared/components/atoms'
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react'
import { formatFileSize } from '@/shared/validations'

interface FileUploadProps {
  value?: File | File[]
  onChange: (files: File | File[] | null) => void
  onBlur?: () => void
  multiple?: boolean
  accept?: string
  maxSize?: number // in bytes
  maxFiles?: number
  disabled?: boolean
  className?: string
  placeholder?: string
  error?: string
}

export function FileUpload({
  value,
  onChange,
  onBlur,
  multiple = false,
  accept,
  maxSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 5,
  disabled = false,
  className,
  placeholder,
  error,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const files = Array.isArray(value) ? value : value ? [value] : []

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return

    const fileArray = Array.from(newFiles)
    
    // Validate file size
    for (const file of fileArray) {
      if (file.size > maxSize) {
        // You could show a toast notification here
        console.error(`File ${file.name} is too large. Maximum size is ${formatFileSize(maxSize)}`)
        return
      }
    }

    if (multiple) {
      const currentFiles = Array.isArray(value) ? value : []
      const totalFiles = currentFiles.length + fileArray.length
      
      if (totalFiles > maxFiles) {
        console.error(`Too many files. Maximum is ${maxFiles}`)
        return
      }
      
      onChange([...currentFiles, ...fileArray])
    } else {
      onChange(fileArray[0])
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (disabled) return
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (index: number) => {
    if (multiple && Array.isArray(value)) {
      const newFiles = value.filter((_, i) => i !== index)
      onChange(newFiles.length > 0 ? newFiles : null)
    } else {
      onChange(null)
    }
  }

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />
    }
    return <FileText className="h-8 w-8 text-gray-500" />
  }

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-6 transition-colors',
          {
            'border-blue-500 bg-blue-50': dragActive,
            'border-gray-300 hover:border-gray-400': !dragActive && !error,
            'border-red-500': error,
            'opacity-50 cursor-not-allowed': disabled,
            'cursor-pointer': !disabled,
          }
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!disabled ? openFileDialog : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
          onBlur={onBlur}
          disabled={disabled}
          className="hidden"
        />

        {files.length === 0 ? (
          <div className="text-center">
            <Upload 
              className={cn(
                'mx-auto h-12 w-12 mb-4',
                dragActive ? 'text-blue-500' : 'text-gray-400'
              )} 
            />
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">
                {placeholder || 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500">
                {accept && `Accepted formats: ${accept}`}
                {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
                {multiple && maxFiles && ` • Max ${maxFiles} files`}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            {multiple && files.length < maxFiles && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={openFileDialog}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Add more files
              </Button>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
              clipRule="evenodd" 
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}