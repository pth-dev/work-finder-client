export default function RecruiterDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your recruiter dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Active Jobs</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Applications</h3>
          <p className="text-2xl font-bold">45</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Interviews</h3>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Hired</h3>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>
    </div>
  );
}
