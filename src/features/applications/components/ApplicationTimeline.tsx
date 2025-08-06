import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle,
  Calendar,
  User,
  MessageSquare
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface TimelineEvent {
  id: number;
  type: 'status_change' | 'interview' | 'note' | 'document';
  status?: string;
  title: string;
  description?: string;
  timestamp: string;
  user?: string;
}

interface ApplicationTimelineProps {
  applicationId: number;
  events?: TimelineEvent[];
}

// Mock timeline events
const mockTimelineEvents: TimelineEvent[] = [
  {
    id: 1,
    type: 'status_change',
    status: 'pending',
    title: 'Application Submitted',
    description: 'Your application has been successfully submitted',
    timestamp: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    type: 'status_change',
    status: 'under_review',
    title: 'Application Under Review',
    description: 'HR team is reviewing your application',
    timestamp: '2024-01-16T14:20:00Z',
    user: 'HR Team',
  },
  {
    id: 3,
    type: 'interview',
    title: 'Interview Scheduled',
    description: 'Technical interview scheduled for January 20th at 2:00 PM',
    timestamp: '2024-01-17T09:15:00Z',
    user: 'John Smith - Technical Lead',
  },
  {
    id: 4,
    type: 'note',
    title: 'Interview Completed',
    description: 'Technical interview completed. Waiting for feedback.',
    timestamp: '2024-01-20T16:30:00Z',
  },
];

// Helper function to get icon for timeline event
const getTimelineIcon = (type: string, status?: string) => {
  switch (type) {
    case 'status_change':
      switch (status) {
        case 'pending':
          return <Clock className="h-4 w-4 text-yellow-600" />;
        case 'under_review':
          return <AlertCircle className="h-4 w-4 text-blue-600" />;
        case 'interview_scheduled':
          return <Calendar className="h-4 w-4 text-green-600" />;
        case 'accepted':
          return <CheckCircle className="h-4 w-4 text-emerald-600" />;
        case 'rejected':
          return <XCircle className="h-4 w-4 text-red-600" />;
        default:
          return <Clock className="h-4 w-4 text-gray-600" />;
      }
    case 'interview':
      return <Calendar className="h-4 w-4 text-green-600" />;
    case 'note':
      return <MessageSquare className="h-4 w-4 text-blue-600" />;
    case 'document':
      return <User className="h-4 w-4 text-purple-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

// Helper function to format timestamp
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return {
    date: date.toLocaleDateString('vi-VN'),
    time: date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
  };
};

export function ApplicationTimeline({ 
  applicationId, 
  events = mockTimelineEvents 
}: ApplicationTimelineProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {t("applications.timeline.title", "Application Timeline")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => {
            const { date, time } = formatTimestamp(event.timestamp);
            const isLast = index === events.length - 1;
            
            return (
              <div key={event.id} className="relative">
                {/* Timeline Line */}
                {!isLast && (
                  <div className="absolute left-4 top-8 w-0.5 h-full bg-gray-200"></div>
                )}
                
                <div className="flex items-start space-x-3">
                  {/* Timeline Icon */}
                  <div className="flex-shrink-0 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                    {getTimelineIcon(event.type, event.status)}
                  </div>
                  
                  {/* Timeline Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {event.title}
                      </h4>
                      
                      {event.status && (
                        <Badge 
                          variant="outline" 
                          className="text-xs"
                        >
                          {t(`applicationStatus.${event.status}`, event.status)}
                        </Badge>
                      )}
                    </div>
                    
                    {event.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {event.description}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{date} at {time}</span>
                      {event.user && (
                        <span className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{event.user}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {t("applications.timeline.empty", "No timeline events yet")}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
