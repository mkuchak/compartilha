/* This example requires Tailwind CSS v2.0+ */
import { AnnotationIcon, CashIcon, ShoppingBagIcon, ScaleIcon, SearchIcon } from '@heroicons/react/outline'

const features = [
  {
    name       : '1- Pesquisar entidades',
    description:
      'Pesquise por entidade em sua cidade ou região.',
    icon       : SearchIcon,
  },
  {
    name       : '2- Selecione os itens',
    description:
      'Escolha entre diversos items os quais voce deseja doar.',
    icon       : ShoppingBagIcon,
  },
  {
    name       : '3- Faça o pagamento',
    description:
      'E por último faça o pagamento com toda a praticidade do pix',
    icon       : CashIcon,
  }
]

export default function HomeDescription() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          {/*<h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Ajude</h2>*/ }
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Doação de alimentos salva vidas: você vai ficar de fora?
          </p>
          <p className="mt-4 h-15 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Em poucos passos consiga ajudar pessoas que necessitam de alimentos entre outras coisas
          </p>
        </div>

        <div className="mt-10 h-32">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            { features.map( ( feature ) => (
              <div key={ feature.name } className="relative">
                <dt>
                  <div
                    className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{ feature.name }</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{ feature.description }</dd>
              </div>
            ) ) }
          </dl>
        </div>
      </div>
    </div>
  )
}
