export default async function About() {
  return (
    <div className="flex  flex-col items-center justify-between p-5 mt-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Sobre
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Patrol Analytics é uma iniciativa aberta e colaborativa dedicada a
          fornecer visualizações e análises avançadas das ocorrências de
          violência armada no Rio de Janeiro. Criado para propiciar um
          entendimento mais aprofundado e objetivo sobre os incidentes de
          segurança pública, este projeto se fundamenta na mais extensa base de
          dados sobre violência armada da América Latina, disponibilizada pela
          API do Fogo Cruzado.
        </p>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Com o propósito de servir como uma ferramenta para cidadãos,
          acadêmicos e instituições interessadas em compreender e atuar na
          realidade da violência urbana, o projeto oferece recursos como
          filtragem de dados por data, localidade e tipo de incidente. Além
          disso, apresenta estatísticas condensadas, informações detalhadas
          sobre os incidentes mais recentes, mapas interativos e a opção de
          exportar dados para análises mais detalhadas. O projeto também está em
          constante evolução, com novas funcionalidades e melhorias sendo
          adicionadas regularmente.
        </p>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Este é um projeto vivo, construído em público e para o público.
          Convidamos a comunidade a contribuir e apoiar de diversas formas:
          através de desenvolvimento de código, feedbacks construtivos e etc.
          Para fazer parte dessa iniciativa, visite nosso repositório no GitHub,
          contribua com o projeto ou entre em contato para discutir outras
          maneiras de apoiar o projeto.
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
