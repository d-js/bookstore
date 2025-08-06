export default function Home() {
  return (
    <div className="relative w-screen overflow-hidden">
      <video
        muted
        playsInline
        preload="metadata"
        controls={false}
        autoPlay={false}
        className="top-0 left-0 w-screen h-[800px] object-cover -z-10"
      >
        <source src="https://files.catbox.moe/akf5s5.webm" type="video/webm" />
      </video>

      <div className="absolute top-16 left-16 text-black">
        <h1 className="text-6xl font-extrabold drop-shadow-md mb-2">
          The Book Nook
        </h1>
        <p className="text-xl ml-2 font-bold text-gray-700 mb-4">
          Find offers between lines
        </p>
        <button className="bg-orange-600  text-white text-base font-semibold hover:cursor-pointer px-5 py-2 rounded-md hover:bg-orange-700 transition">
          Go to the catalog
        </button>
      </div>
    </div>
  );
}
