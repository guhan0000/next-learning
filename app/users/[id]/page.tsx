type UserPageProp = { params: Promise<{ id: string }> };
export default async function UserPage({ params }: UserPageProp) {
  const { id } = await params;
  return (
    <main>
      <h2>User Details {id}</h2>
    </main>
  );
}
