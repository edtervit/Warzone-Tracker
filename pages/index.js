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
  const ed = await res.json();

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
  const az = await resAz.json();

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
  const shaun = await resshaun.json();
  shaun.name = "Shaun";
  ed.name = "Ed";
  az.name = "Az";

  const twenty = [az, ed, shaun];

  return { props: { twenty }, revalidate: 60 };
}
