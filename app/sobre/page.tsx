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
          entendimento mais aprofundado e objetivo dos incidentes de segurança pública,
          utilizando como base a maior base de dados sobre violência armada da
          América Latina, fornecida pela API do Fogo Cruzado.
        </p>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          O nosso mapa de calor interativo, construído com a API do Google Maps,
          permite aos usuários visualizar a localização e a frequência das
          ocorrências registradas, oferecendo uma ferramenta poderosa para
          cidadãos, acadêmicos e instituições que buscam compreender e atuar na
          realidade da violência urbana. As funcionalidades do aplicativo
          incluem a capacidade de filtrar dados por data, localidade e tipo de
          incidente, além de exibir estatísticas resumidas e detalhes sobre os
          incidentes mais recentes.
        </p>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          O Patrol Analytics é desenvolvido com Next.js no frontend e Django no
          backend, garantindo uma experiência fluida e responsiva para todos os
          usuários. Nosso compromisso com a transparência e o acesso à
          informação é refletido na nossa escolha por manter o projeto
          inteiramente open-source.
        </p>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Como o maior observatório de violência armada da América Latina, o
          Fogo Cruzado tem um papel crucial em alimentar nosso sistema com dados
          precisos e atualizados. Em parceria com essa plataforma, nos dedicamos
          a transformar números em narrativas visuais que possam impactar
          positivamente a sociedade. Este é um projeto vivo, construído em
          público e para o público. Convidamos a comunidade a contribuir e
          apoiar o Patrol Analytics de diversas formas: através de
          desenvolvimento de código, feedbacks construtivos ou patrocínio.
        </p>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Para fazer parte dessa iniciativa, visite nosso repositório no GitHub,
          contribua com o projeto ou entre em contato para discutir apoio e
          patrocínio.
        </p>
      </div>
      
      <div
        className="flex flex-col items-center justify-center p-5 mt-10 gap-5"
      >
      
      <p>Em desenvolvimento... </p>
      <span>👷‍♂️</span>
      <div className="animate-spin h-6 w-6 rounded-full border-t-2 border-gray-900" />
      </div>
    </div>
  );
}
