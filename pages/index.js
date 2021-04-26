import Head from "next/head";

export default function Home(props) {
  console.log(props);

  return (
    <div className="flex text-center flex-wrap">
      <Head>
        <title>Warzone Stat Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="w-full my-4 text-4xl">Past 20 Games</h1>
      {props.twenty.map((player, index) => (
        <div className="w-1/3">
          <h1 className="text-2xl">{player.name}</h1>

          <h2 className="mt-4 font-bold">Gulag</h2>
          <p>
            {player.summary.all.gulagKills} kills /{" "}
            {player.summary.all.gulagDeaths} deaths
          </p>

          <h2 className="mt-4 font-bold">Ingame</h2>
          <p>
            {player.summary.all.kills} kills / {player.summary.all.deaths}{" "}
            deaths
          </p>
          <p>{player.summary.all.kdRatio} ratio</p>
          <p>Damage done: {player.summary.all.damageDone}</p>
          <p></p>
        </div>
      ))}

      <h2 className="w-full my-4 mt-8 text-4xl">All Time</h2>
      {props.all.map((player, index) => (
        <div className="w-1/3">
          <h3 className="text-2xl">{player.name}</h3>

          <h2 className="mt-4 font-bold">Wins</h2>
          <p>
            {player.br.wins} wins / {player.br.gamesPlayed} games
          </p>

          <h2 className="mt-4 font-bold">Ingame</h2>
          <p>
            {player.br.kills} kills / {player.br.deaths} deaths
          </p>
          <p>{player.br.kdRatio} ratio</p>
          <p></p>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone-matches/uMad%20Tervit/xbl",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "30a268d3a6mshee5a67ac97e807cp183134jsn72a3dfdf6e2e",
        "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
      },
    }
  );
  const edTwenty = await res.json();

  await new Promise((r) => setTimeout(r, 1500));

  const resAz = await fetch(
    "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone-matches/rehsto/xbl",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "30a268d3a6mshee5a67ac97e807cp183134jsn72a3dfdf6e2e",
        "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
      },
    }
  );
  const azTwenty = await resAz.json();

  await new Promise((r) => setTimeout(r, 1500));

  const resshaun = await fetch(
    "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone-matches/uMad%20Bean/xbl",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "30a268d3a6mshee5a67ac97e807cp183134jsn72a3dfdf6e2e",
        "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
      },
    }
  );
  const shaunTwenty = await resshaun.json();
  shaunTwenty.name = "Shaun";
  edTwenty.name = "Ed";
  azTwenty.name = "Az";

  const twenty = [azTwenty, edTwenty, shaunTwenty];

  const resEdAll = await fetch(
    "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/uMad%20Tervit/xbl",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "30a268d3a6mshee5a67ac97e807cp183134jsn72a3dfdf6e2e",
        "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
      },
    }
  );
  const edAll = await resEdAll.json();

  await new Promise((r) => setTimeout(r, 1500));

  const resAzAll = await fetch(
    "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/rehsto/xbl",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "30a268d3a6mshee5a67ac97e807cp183134jsn72a3dfdf6e2e",
        "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
      },
    }
  );
  const azAll = await resAzAll.json();

  await new Promise((r) => setTimeout(r, 1500));

  const resshaunAll = await fetch(
    "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/uMad%20Bean/xbl",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "30a268d3a6mshee5a67ac97e807cp183134jsn72a3dfdf6e2e",
        "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com",
      },
    }
  );
  const shaunAll = await resshaunAll.json();
  shaunAll.name = "Shaun";
  edAll.name = "Ed";
  azAll.name = "Az";

  const all = [azAll, edAll, shaunAll];

  return { props: { twenty, all }, revalidate: 60 };
}
