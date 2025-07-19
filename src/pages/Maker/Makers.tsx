import { useEffect, useState } from 'react'
import 'aos/dist/aos.css'
import AOS from 'aos'

const makers = [
  {
    name: '한지웅',
    github: 'https://github.com/scorchedrice',
    avatar: 'https://github.com/scorchedrice.png',
    role: 'BACK',
  },
  {
    name: '김종현',
    github: 'https://github.com/raco1001',
    avatar: 'https://github.com/raco1001.png',
    role: 'BACK',
  },
  {
    name: '김희영',
    github: 'https://github.com/heeyoung123',
    avatar: 'https://github.com/heeyoung123.png',
    role: 'FRONT',
  },
  {
    name: '신혜민',
    github: 'https://github.com/nyem1n',
    avatar: 'https://github.com/nyem1n.png',
    role: 'FRONT',
  },
  {
    name: '조민우',
    github: 'https://github.com/mauercho',
    avatar: 'https://github.com/mauercho.png',
    role: 'FRONT',
  },
]

const roleIcon = {
  FRONT: (
    <svg
      className="inline w-4 h-4 mr-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="4" width="18" height="14" rx="2" strokeWidth="2" />
      <path d="M8 20h8" strokeWidth="2" />
    </svg>
  ),
  BACK: (
    <svg
      className="inline w-4 h-4 mr-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <rect x="2" y="7" width="20" height="10" rx="2" strokeWidth="2" />
      <path d="M6 17v2m12-2v2" strokeWidth="2" />
    </svg>
  ),
}

const AnimatedText = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(true)
    const interval = setInterval(() => {
      setShow(false)
      setTimeout(() => setShow(true), 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="flex justify-center mb-12">
      <span
        className={`text-5xl font-extrabold tracking-widest
          bg-gradient-to-r from-main via-blue-400 to-main text-transparent bg-clip-text
          drop-shadow-lg
          transition-all duration-700
          ${show ? 'animate-slide-in' : 'opacity-0 translate-y-8'}
        `}
        style={{
          WebkitTextStroke: '2px #fff',
          textShadow: `
            0 0 16px #7B5CFA,
            0 0 32px #5932EA,
            2px 2px 0 #fff
          `,
          letterSpacing: '0.2em',
        }}
      >
        만든 사람들
      </span>
      <style>
        {`
          @keyframes slide-in {
            0% {
              opacity: 0;
              transform: translateY(40px) scale(0.95);
            }
            60% {
              opacity: 1;
              transform: translateY(-8px) scale(1.03);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-slide-in {
            animation: slide-in 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          }
        `}
      </style>
    </div>
  )
}

const Makers = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  return (
    <div
      className="h-full w-full flex flex-col justify-center items-center overflow-hidden"
      style={{
        background: 'linear-gradient(120deg, #fff 0%, #fff 65%, #f3f0fd 100%)',
      }}
    >
      {/* 그라데이션 애니메이션 keyframes */}
      <style>
        {`
          @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}
      </style>

      <AnimatedText />
      <div className="grid grid-cols-3 grid-rows-2 gap-8 max-w-5xl w-full">
        {makers.map((maker, i) => (
          <div
            key={maker.github}
            data-aos="fade-up"
            data-aos-delay={i * 100}
            className="backdrop-blur-lg bg-white/80 border border-white/40 shadow-xl rounded-3xl flex flex-col items-center p-8 transition-transform hover:scale-105 hover:shadow-2xl"
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}
          >
            <img
              src={maker.avatar}
              alt={maker.name}
              className="w-32 h-32 rounded-full mb-4 border-4 border-white shadow-lg object-cover"
            />
            <div className="mb-2">
              <span
                className={`px-4 py-1 rounded-full font-bold shadow-sm text-sm flex items-center ${
                  maker.role === 'FRONT'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                    : 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                }`}
              >
                {roleIcon[maker.role as 'FRONT' | 'BACK']} {maker.role}
              </span>
            </div>
            <div className="text-2xl font-extrabold mb-1 bg-gradient-to-r from-main to-blue-400 text-transparent bg-clip-text drop-shadow">
              {maker.name}
            </div>
            <a
              href={maker.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 transition group"
            >
              <svg
                className="w-6 h-6 text-main group-hover:text-blue-400 transition"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.582 0-.288-.012-1.243-.017-2.25-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.625-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.699.825.58C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="font-medium text-main group-hover:text-blue-400 transition">
                GitHub
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Makers
