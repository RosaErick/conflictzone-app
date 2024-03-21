export default async function About() {
  return (
    <div className="flex  flex-col items-center justify-between p-5 mt-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Sobre
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Patrol Analytics é uma iniciativa aberta e colaborativa que oferece
          visualizações e análises avançadas sobre ocorrências de violência
          armada no Rio de Janeiro. Este projeto foi criado para fornecer um
          entendimento mais aprofundado e objetivo dos incidentes de segurança
          pública, utilizando como base a maior base de dados sobre violência
          armada da América Latina, fornecida pela API do Fogo Cruzado.
        </p>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          A ideia base do projeto é servir como uma ferramenta para cidadãos,
          acadêmicos e instituições que buscam compreender e atuar na realidade
          da violência urbana. As funcionalidades incluem a capacidade de
          filtrar dados por data, localidade e tipo de incidente, além de exibir
          estatísticas resumidas, detalhes sobre os incidentes mais recentes,
          mapas interativos e a possibilidade de exportar dados para análise
          mais aprofundada. O projeto também está em constante evolução, com
          novas funcionalidades e melhorias sendo adicionadas regularmente.
        </p>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Este é um projeto vivo, construído em público e para o público.
          Convidamos a comunidade a contribuir e apoiar de
          diversas formas: através de desenvolvimento de código, feedbacks
          construtivos e etc. Para fazer parte dessa iniciativa, visite
          nosso repositório no GitHub, contribua com o projeto ou entre em
          contato para discutir outras maneiras de apoiar o projeto.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-5 mt-10 gap-5">
        <p>Obrigado pela visita!</p>
        <span>👷‍♂️</span>
        <div className="animate-spin h-6 w-6 rounded-full border-t-2 border-gray-900" />
      </div>
    </div>
  );
}
