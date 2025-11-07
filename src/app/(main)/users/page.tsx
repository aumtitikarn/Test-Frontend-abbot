type UserRow = { id: number; name: string; email: string }

export default function UsersPage() {
  const rows: UserRow[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
  ]

  return (
    <div className="rounded-xl border bg-white">
      <div className="border-b p-4 font-medium">Users</div>
      <div className="p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2 pr-4">ID</th>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="py-2 pr-4">{r.id}</td>
                <td className="pr-4">{r.name}</td>
                <td>{r.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
