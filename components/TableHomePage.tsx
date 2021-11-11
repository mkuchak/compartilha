import Search from '../components/Search'


const Data = [
  {
    company_name: 'John Doe',
    city        : 'Ijuí - RS',
    department  : 'Optimization',
    role        : 'Admin',
    email       : 'John.Doe@example.com',
    picture     :
      'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg',
  },
  {
    company_name: 'John Doe',
    city        : 'Ijuí - RS',
    department  : 'Optimization',
    role        : 'Admin',
    email       : 'John.Doe@example.com',
    picture     :
      'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg',
  },
  {
    company_name: 'John Doe',
    city        : 'Ijuí - RS',
    department  : 'Optimization',
    role        : 'Admin',
    email       : 'John.Doe@example.com',
    picture     :
      'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg',
  }


]

export default function TableHome() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        <div className="lg:text-center">
          {/*<h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Ajude</h2>*/ }
          <p className="mt-2  text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Escolha uma instituição
          </p>
          <p className="mt-4 h-32 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at diam dapibus, iaculis dolor non,
            iaculis velit.
          </p>
        </div>

        {/* Search */}
        <div className="box-border h-20 md:box-content">
          <div className="md:float-right">
            <Search />
          </div>
        </div>

        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Instituição
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cidade
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    {/*<span className="sr-only">Edit</span>*/ }
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                { Data.map( ( person ) => (
                  <tr key={ person.email }>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={ person.picture } alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{ person.company_name }</div>
                          <div className="text-sm text-gray-500">{ person.email }</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ person.city }</div>
                      <div className="text-sm text-gray-500">{ person.department }</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ person.role }</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#"
                         className="bg-indigo-500 hover:bg-indigo-700 text-white text-center py-2 px-4 rounded">
                        Acessar
                      </a>

                    </td>
                  </tr>
                ) ) }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
