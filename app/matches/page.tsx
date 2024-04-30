import Matches from "../../components/Matches";

export default async function MatchesPage() {
  // const client = createClient();

  // const matchesQuery = e.select(e.Channel, (_channel) => ({
  //   id: true,
  //   name: true,
  //   created: true,
  //   updated: true,
  //   created_by: {
  //     name: true,
  //     email: true,
  //   },
  // }));

  //   const matches = await matchesQuery.run(client);
  const matches = [{ name: "hello" }, { name: "world" }];

  return (
    <>
      <header className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          My Matches
        </h1>
      </header>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Scan
      </button>
      <Matches matches={matches} />
    </>
  );
}
