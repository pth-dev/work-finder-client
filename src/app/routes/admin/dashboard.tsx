export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the admin control panel
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Companies</h3>
          <p className="text-2xl font-bold">89</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Job Posts</h3>
          <p className="text-2xl font-bold">456</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Applications</h3>
          <p className="text-2xl font-bold">2,345</p>
        </div>
      </div>
    </div>
  );
}
