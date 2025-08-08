import {
  RPProvider,
  RPDefaultLayout,
  RPPages,
  RPConfig,
} from "@pdf-viewer/react";

interface PDFViewerProps {
  fileUrl: string;
  fileName?: string;
  className?: string;
}

export const NewPDFViewer = ({
  fileUrl,
  fileName,
  className,
}: PDFViewerProps) => {
  if (!fileUrl) {
    return (
      <div
        className={`flex items-center justify-center h-96 bg-white rounded-lg border ${className}`}
      >
        <p className="text-gray-500">Không có file CV để hiển thị</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <RPConfig licenseKey="eyJkYXRhIjoiZXlKMElqb2labkpsWlMxMGNtbGhiQ0lzSW1GMmRTSTZNVGMxTlRneU1EYzVPU3dpWkcwaU9pSnNiMk5oYkdodmMzUTZNekF3TUNJc0ltNGlPaUl6WWpsbVltVXpPV1prTTJSa05EZ3lJaXdpWlhod0lqb3hOelUxT0RJd056azVMQ0prYlhRaU9pSnpjR1ZqYVdacFl5SjkiLCJzaWduYXR1cmUiOiJZblJCRFFJVWFqUUIzN1c2aUpIaUFEVjdUcktzb3pUcTNpbHdwZDlDMTdJMThLU2xQVmo3TkZGbGlENWQxSzlrb0drTE9iRm9QK05EQmloZnh1cUE3RWQ0dzduVi84UW9DNWs2aDMvWklVMk56YjZUMG9uaGhuZHNVSUdDY0prYStmSUVOQURCc0JFb0JVRXhGaWZhZzBHRThhWUc3dzJZUFFMZE9uRjlVV0RKcTZvVi9OOXU2ZmtIQzE2ODRENnJESDQ0VFZkOXF3Z1BwQjVSN2dHTWNncis0OElTUERLT1QySkZpQUJvWVJsWTkzeXRqRVI2aU9GTWwyeXpIUkhhSGYyeFZ1N1NGYVVQbFM0TlRuanpaL1dMSTkrdllBT2g0MTVhRVo3UUJTbXJkb1gvM3lvUFFPRmlkbDhuVy94WU82VXNYckttUWxXeklNMklxWE1VeEE9PSJ9">
        <RPProvider src={fileUrl}>
          <RPDefaultLayout style={{ height: "600px" }}>
            <RPPages />
          </RPDefaultLayout>
        </RPProvider>
      </RPConfig>
    </div>
  );
};

export default NewPDFViewer;
