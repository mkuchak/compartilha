/* This example requires Tailwind CSS v2.0+ */
import { Fragment }            from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon }     from '@heroicons/react/outline'
import Image from 'next/image'

import logo     from '@/assets/icons/logo.svg'
import menuLogo from '@/assets/icons/menu.svg'

const navigation = [
  { name: 'Instituições', href: '#' },
  { name: 'Causas', href: '#' },
  { name: 'Saiba mais', href: '#' },
  { name: '|', href: '#' },
]

export default function HomePage() {


  return (
    <>
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <Popover>
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                     aria-label="Global">
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <a href="#">
                        <span className="sr-only">Workflow</span>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                             width="100pt" height="100pt" viewBox="0 0 1812.000000 1099.000000"
                             preserveAspectRatio="xMidYMid meet">

                          <g transform="translate(0.000000,1099.000000) scale(0.100000,-0.100000)"
                             fill="#000000" stroke="none">
                            <path d="M3610 8721 c-299 -65 -521 -267 -590 -537 -25 -97 -27 -274 -4 -377
46 -208 193 -388 399 -488 140 -67 214 -82 415 -83 205 -1 254 9 399 80 70 35
110 62 160 112 64 63 131 163 131 193 0 12 -388 216 -394 207 -2 -2 -12 -19
-24 -38 -57 -96 -155 -153 -262 -154 -168 -1 -290 104 -320 277 -22 127 6 239
81 321 144 158 387 131 506 -56 l24 -39 187 96 c103 53 191 101 197 106 18 18
-46 121 -124 199 -82 82 -189 143 -306 175 -94 27 -366 30 -475 6z" />
                            <path d="M5205 8729 c-248 -49 -452 -191 -555 -390 -58 -111 -80 -207 -80
-346 0 -141 19 -232 71 -338 76 -156 185 -261 354 -340 143 -68 203 -80 400
-80 197 0 257 12 400 80 201 94 322 228 391 430 39 115 45 301 15 429 -62 260
-249 448 -528 532 -77 23 -109 27 -253 30 -91 2 -187 -2 -215 -7z m319 -420
c95 -44 157 -133 176 -252 36 -226 -99 -418 -295 -421 -100 -2 -151 19 -222
89 -76 76 -98 136 -97 265 0 137 43 232 133 294 85 59 211 69 305 25z" />
                            <path d="M7168 8724 c-71 -17 -147 -54 -214 -105 -28 -22 -54 -39 -57 -39 -4
0 -7 32 -7 70 l0 70 -240 0 -240 0 0 -735 0 -735 255 0 255 0 0 403 c0 415 4
457 43 533 67 130 266 166 369 67 16 -15 38 -52 50 -82 22 -54 23 -68 26 -488
l3 -433 254 0 254 0 3 428 c3 426 3 427 27 480 43 95 132 153 232 151 88 -1
155 -45 193 -129 20 -43 21 -63 24 -487 l3 -443 254 0 255 0 0 493 c0 555 -3
577 -70 713 -50 102 -133 183 -235 230 -93 42 -154 54 -284 54 -189 0 -327
-50 -449 -164 l-63 -59 -16 24 c-54 80 -169 154 -288 184 -74 19 -258 19 -337
-1z" />
                            <path d="M14465 8354 c-182 -44 -360 -188 -444 -359 -54 -110 -74 -211 -68
-345 8 -193 63 -316 202 -455 134 -134 288 -198 480 -197 122 0 210 19 307 68
185 93 311 246 364 444 23 88 23 262 0 350 -65 239 -256 430 -492 490 -93 24
-258 26 -349 4z" />
                            <path d="M10109 8185 c-307 -77 -520 -349 -521 -665 -1 -127 16 -203 74 -320
33 -68 58 -102 127 -170 140 -139 288 -201 479 -202 303 0 546 169 655 456 29
77 31 89 31 226 1 132 -2 152 -26 221 -74 208 -216 355 -420 431 -74 28 -96
32 -213 34 -88 2 -148 -1 -186 -11z" />
                            <path d="M11811 7249 c-431 -41 -857 -261 -1132 -584 -197 -231 -323 -487
-386 -784 -24 -113 -27 -147 -27 -336 0 -159 4 -233 17 -302 148 -782 766
-1344 1554 -1415 194 -17 424 10 670 79 l61 17 104 -32 c193 -58 260 -67 513
-67 201 1 243 4 335 23 493 107 905 404 1148 829 285 498 303 1113 47 1623
-240 478 -666 805 -1194 917 -112 24 -148 27 -326 27 -215 1 -316 -13 -521
-70 l-90 -26 -100 31 c-228 70 -444 92 -673 70z m354 -844 c96 -27 233 -97
324 -166 89 -66 756 -721 1127 -1105 l217 -225 -29 -30 c-39 -42 -137 -110
-204 -144 -304 -153 -644 -117 -932 97 -52 39 -318 296 -718 696 l-635 634 58
54 c101 94 257 172 408 204 68 14 314 5 384 -15z" />
                            <path d="M5326 6554 c-73 -18 -163 -65 -207 -109 -19 -19 -37 -35 -41 -35 -5
0 -8 32 -8 70 l0 70 -240 0 -240 0 0 -995 0 -995 255 0 255 0 0 320 c0 176 3
320 6 320 3 0 22 -13 42 -29 54 -43 130 -78 208 -97 96 -22 282 -15 379 16
232 72 404 255 471 500 26 92 26 358 1 450 -26 94 -88 216 -147 287 -88 108
-238 199 -376 228 -87 18 -280 18 -358 -1z m167 -401 c75 -21 154 -90 188
-165 21 -46 24 -68 24 -173 0 -102 -3 -127 -22 -167 -64 -140 -208 -211 -352
-174 -156 40 -233 151 -235 336 -2 185 77 307 222 346 65 17 106 17 175 -3z" />
                            <path d="M6785 6554 c-148 -27 -326 -88 -385 -133 l-24 -19 84 -171 c46 -94
85 -171 87 -171 1 0 24 13 50 29 27 16 84 42 128 57 72 26 93 28 216 29 131 0
137 -1 194 -30 65 -33 108 -90 120 -156 l7 -36 -239 -6 c-275 -7 -377 -24
-489 -80 -165 -83 -244 -243 -214 -431 37 -232 242 -376 534 -376 114 0 214
18 276 50 50 26 137 104 145 131 14 44 25 13 25 -71 l0 -90 235 0 235 0 0 463
c0 486 -3 534 -46 652 -68 192 -235 317 -479 360 -110 19 -351 18 -460 -1z
m475 -939 c0 -46 -6 -78 -20 -104 -68 -133 -281 -175 -388 -76 -35 31 -37 37
-37 94 0 54 3 64 31 91 49 50 91 59 262 60 l152 0 0 -65z" />
                            <path d="M8840 6554 c-87 -18 -196 -73 -255 -129 -27 -25 -50 -45 -52 -45 -2
0 -3 38 -3 85 l0 85 -240 0 -240 0 0 -735 0 -735 254 0 255 0 3 398 c4 459 4
460 93 549 70 70 152 96 284 91 l91 -3 0 228 0 227 -62 -1 c-35 0 -92 -7 -128
-15z" />
                            <path d="M4275 4331 c-78 -20 -151 -77 -188 -146 -29 -54 -30 -173 -2 -230 28
-58 89 -111 153 -136 48 -17 73 -20 152 -17 110 5 174 31 230 94 47 54 63 99
63 179 1 110 -43 179 -148 233 -40 20 -67 26 -140 28 -49 2 -103 0 -120 -5z" />
                            <path d="M4910 3165 l0 -1005 255 0 255 0 0 1005 0 1005 -255 0 -255 0 0
-1005z" />
                            <path d="M5710 3165 l0 -1005 255 0 255 0 0 393 c0 423 3 455 54 541 29 49 99
101 160 117 112 30 239 -15 283 -101 38 -75 43 -135 43 -551 l0 -399 256 0
255 0 -3 508 -4 507 -25 82 c-62 200 -201 331 -400 378 -82 19 -265 19 -345 0
-81 -19 -164 -56 -225 -101 l-49 -36 0 336 0 336 -255 0 -255 0 0 -1005z" />
                            <path d="M3018 3768 l-3 -193 -107 -3 -108 -3 0 -189 0 -190 110 0 110 0 0
-297 c0 -332 7 -389 60 -493 57 -112 157 -191 300 -235 33 -10 106 -19 185
-22 149 -6 261 10 351 51 l54 25 -60 172 c-34 95 -63 175 -65 177 -2 2 -25 -4
-52 -14 -101 -39 -184 -21 -237 50 -20 26 -21 43 -24 307 l-3 279 171 0 170 0
0 190 0 190 -167 2 -168 3 -3 193 -2 192 -255 0 -255 0 -2 -192z" />
                            <path d="M7925 3634 c-148 -27 -326 -88 -385 -133 l-24 -19 84 -171 c46 -94
85 -171 87 -171 1 0 24 13 50 29 27 16 84 42 128 57 72 26 93 28 216 29 131 0
137 -1 194 -30 65 -33 108 -90 120 -156 l7 -36 -239 -6 c-275 -7 -377 -24
-489 -80 -165 -83 -244 -243 -214 -431 37 -232 242 -376 534 -376 114 0 214
18 276 50 50 26 137 104 145 131 14 44 25 13 25 -71 l0 -90 235 0 235 0 0 463
c0 486 -3 534 -46 652 -68 192 -235 317 -479 360 -110 19 -351 18 -460 -1z
m475 -939 c0 -46 -6 -78 -20 -104 -68 -133 -281 -175 -388 -76 -35 31 -37 37
-37 94 0 54 3 64 31 91 49 50 91 59 262 60 l152 0 0 -65z" />
                            <path d="M4120 2895 l0 -735 255 0 255 0 0 735 0 735 -255 0 -255 0 0 -735z" />
                            <path d="M10520 3030 c-197 -35 -331 -165 -361 -351 -21 -129 22 -261 113
-352 184 -184 524 -178 701 13 148 159 141 419 -16 572 -99 96 -281 145 -437
118z m199 -249 c95 -68 94 -264 -1 -333 -32 -22 -109 -35 -152 -24 -66 16
-125 104 -126 187 0 83 29 139 95 181 43 27 138 21 184 -11z" />
                            <path d="M11670 3033 c-62 -10 -126 -38 -161 -70 l-39 -35 0 51 0 51 -135 0
-135 0 0 -415 0 -415 140 0 140 0 0 214 c0 228 5 262 49 310 36 40 80 56 151
56 l60 0 0 130 c0 144 5 136 -70 123z" />
                            <path d="M12122 3030 c-214 -45 -350 -244 -312 -457 31 -180 157 -299 345
-326 90 -13 183 7 250 53 l45 31 0 -41 c0 -77 -48 -145 -119 -169 -81 -27
-240 -5 -330 45 -24 13 -45 24 -46 24 -2 0 -27 -43 -55 -96 -49 -91 -51 -96
-33 -110 25 -19 114 -52 192 -71 94 -23 297 -23 376 1 175 52 265 155 295 338
5 35 10 224 10 421 l0 357 -135 0 -135 0 0 -51 0 -51 -41 36 c-23 19 -62 42
-88 51 -57 20 -162 27 -219 15z m231 -234 c107 -46 135 -180 56 -271 -37 -42
-85 -59 -154 -53 -67 6 -118 39 -145 94 -57 117 27 244 162 244 27 0 63 -6 81
-14z" />
                            <path d="M9546 2520 c-42 -13 -95 -68 -107 -113 -40 -149 125 -269 258 -187
89 54 104 181 30 258 -45 47 -112 62 -181 42z" />
                          </g>
                        </svg>

                        {/*<img*/ }
                        {/*  src={ logo }*/ }
                        {/* alt={'Logo'}/>*/ }
                      </a>
                      <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button
                          className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Open main menu</span>
                          <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                    { navigation.map( ( item ) => (
                      <a key={ item.name } href={ item.href } className="font-medium text-gray-500 hover:text-gray-900">
                        { item.name }
                      </a>
                    ) ) }
                    <a href="login" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Log in
                    </a>
                  </div>
                </nav>
              </div>

              <Transition
                as={ Fragment }
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                  <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <Image
                          src={ menuLogo }
                          alt="Menu"
                          width={ 50 }
                          height={ 50 }

                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button
                          className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close main menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                      { navigation.map( ( item ) => (
                        <a
                          key={ item.name }
                          href={ item.href }
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                          { item.name }
                        </a>
                      ) ) }
                    </div>
                    <a
                      href="#"
                      className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                    >
                      Log in
                    </a>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Uma plataforma  para</span>{ ' ' }
                  <span className="block text-indigo-600 xl:inline">AJUDAR PESSOAS</span>
                </h1>
                <p
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                  amet
                  fugiat veniam occaecat fugiat aliqua.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Quero ajudar
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Outro botão
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://a.imagem.app/AJ1Gb2.jpg"
            alt="https://institutopensi.org.br/wp-content/uploads/2020/06/shutterstock_1487364161-890x420.jpg"
          />
        </div>
      </div>
    </>


  )
}
