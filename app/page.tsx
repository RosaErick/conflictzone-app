export default function Home() {
  return (
    <section className="flex min-h-screen flex-col max-w-4xl self-center items-center justify-start gap-20 p-5 mt-20">
      <div className="items-center">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Patrol Analytics é uma iniciativa aberta e colaborativa dedicada a
          fornecer visualizações e análises avançadas das ocorrências de
          violência armada no Rio de Janeiro. Criado para propiciar um
          entendimento mais aprofundado e objetivo sobre os incidentes de
          segurança pública, este projeto se fundamenta na mais extensa base de
          dados sobre violência armada da América Latina, disponibilizada pela
          API do{" "}
          <a
            className="text-blue-500 hover:text-blue-600 hover:underline"
            href="https://fogocruzado.org.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fogo Cruzado
          </a>
          .
        </p>
      </div>

      <div className="mb-32 grid text-center lg:max-w-6xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <a
          href="https://github.com/RosaErick/patrolAnalytics-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Encontre informações detalhadas sobre o projeto e o processo de
            desenvolvimento.
          </p>
        </a>

        <a
          href="/map"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Pesquisar Dados{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Visualize os dados disponíveis em mapas e gráficos interativos.
          </p>
        </a>

        <a
          href="https://fogocruzado.org.br/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Fogo Cruzado{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Conheça o projeto Fogo Cruzado, que disponibiliza os dados
            utilizados neste projeto.
          </p>
        </a>
      </div>
    </section>
  );
}
