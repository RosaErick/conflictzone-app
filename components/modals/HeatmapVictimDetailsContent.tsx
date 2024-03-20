import React from "react";
import { VictimDetails } from "@/app/map/page";

type TranslationKey = "personType" | "situation" | "type";

const translateValue = (key: TranslationKey, value: string): string => {
  const translations: Record<TranslationKey, Record<string, string>> = {
    personType: {
      Civilian: "Civil",
      Agent: "Agente",
    },
    situation: {
      Wounded: "Ferido",
      Dead: "Morto",
    },
    type: {
      People: "Pessoa",
    },
  };

  return translations[key] && translations[key][value]
    ? translations[key][value]
    : value;
};

interface InfoField {
  label: string;
  value: string | undefined | null;
  isList?: boolean;
}

const HeatmapVictimContent = ({ victims }: { victims: VictimDetails[] }) => {
  const renderInfo = (victim: VictimDetails) => {
    const infoFields: InfoField[] = [
      { label: "Tipo", value: translateValue("type", victim.type) },
      {
        label: "Situação",
        value: translateValue("situation", victim.situation),
      },
      {
        label: "Circunstâncias",
        value: victim.circumstances.map((c) => c.name).join(", "),
        isList: true,
      },
      { label: "Data de Falecimento", value: victim.deathDate },
      {
        label: "Tipo de Pessoa",
        value: translateValue("personType", victim.personType),
      },
      { label: "Idade", value: victim.age ? `${victim.age} anos` : undefined },
      { label: "Grupo de Idade", value: victim.ageGroup?.name },
      { label: "Gênero", value: victim.genre?.name },
      { label: "Raça", value: victim.race },
      { label: "Local", value: victim.place?.name },
      { label: "Status de Serviço", value: victim.serviceStatus?.name },
      {
        label: "Qualificações",
        value: victim.qualifications.map((q) => q.name).join(", "),
        isList: true,
      },
      { label: "Posição Política", value: victim.politicalPosition?.name },
      { label: "Status Político", value: victim.politicalStatus?.name },
      { label: "Partido", value: victim.partie },
      { label: "Corporação", value: victim.coorporation?.name },
      { label: "Posição do Agente", value: victim.agentPosition?.name },
      { label: "Status do Agente", value: victim.agentStatus?.name },
      { label: "Unidade", value: victim.unit },
    ];

    return infoFields
      .filter(
        ({ value, isList }) =>
          value && (!isList || value.length) && value !== "Não se aplica"
      )
      .map(({ label, value }) => (
        <p className="text-sm text-gray-600" key={label}>
          {label}: {value}
        </p>
      ));
  };

  return (
    <div>
      <h3 className="text-md font-semibold text-gray-700">
        Vítimas Detalhadas:
      </h3>
      {victims?.length > 0 ? (
        <div className="space-y-4">
          {victims.map((victim, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow space-y-2"
            >
              <h4 className="text-lg text-gray-800">Vítima #{index + 1}</h4>
              {renderInfo(victim)}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600">Nenhuma vítima registrada.</p>
      )}
    </div>
  );
};

export default HeatmapVictimContent;
