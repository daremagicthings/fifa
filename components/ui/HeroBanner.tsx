export default function HeroBanner() {
  return (
    <div className="relative w-64 h-64 mx-auto select-none" aria-hidden>
      <div
        className="absolute inset-0 rounded-full shadow-lg"
        style={{
          background: `conic-gradient(
            #1A5FE8 0deg 90deg,
            #ffffff 90deg 180deg,
            #E82418 180deg 260deg,
            #18A84A 260deg 360deg
          )`,
        }}
      />
      <div className="absolute inset-[6px] rounded-full bg-white shadow-inner flex items-center justify-center">
        <div
          className="w-40 h-40 rounded-full"
          style={{
            background: `conic-gradient(
              #EEF3FE 0deg 90deg,
              #f8f8f8 90deg 180deg,
              #FEF0EF 180deg 260deg,
              #EDFBF2 260deg 360deg
            )`,
          }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-5xl">⚽</span>
      </div>
    </div>
  )
}
