import Heatmap from "../../components/heatmap";

export type OccurrenceData = {
  occurrence_id: string;
  lat: number;
  lng: number;
  weight?: number;
  // ... other fields
};

type HeatmapProps = {
  data: OccurrenceData[]; 
};

async function getData(): Promise<OccurrenceData[]> {
  try {
    const response = await fetch(
      "http://localhost:8001/fogo_cruzado/occurrences/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response", response);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const { occurrences } = await response.json();
    return occurrences || [];
  } catch (error) {
    console.error("Failed to load heatmap data:", error);
    return [];
  }
}

export default async function Page() {
  const occurrences = await getData();

  console.log(occurrences);

  return (
    <main>
      <nav className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8">
        test
        <div className="ml-auto hidden max-w-sm flex-1 sm:block">x</div>
        <div className="flex items-center gap-10"></div>
        <div className="block w-full sm:hidden">{}</div>
      </nav>
      <ul>
        <Heatmap data={occurrences} />
      </ul>
    </main>
  );
}
