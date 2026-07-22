export default function HeroIdentity({ profile }: { profile: any }) {
  return (
    <div className="absolute top-1/4 left-6 md:left-12 z-30 pointer-events-none max-w-xl xl:max-w-3xl mix-blend-difference">
      <h1 className="text-display-xl text-white mb-6 md:mb-12">
        <span className="block drop-shadow-xl">NÉSTOR ELIHU</span>
        <span className="block drop-shadow-xl">ARRIAGA GALLEGOS</span>
      </h1>
      
      <div className="max-w-md pl-1 md:pl-2">
        <p className="text-body-lg text-white/90 mb-2 font-medium tracking-wide">
          {profile.profession}
        </p>
        <p className="text-body text-white/70 leading-relaxed font-light">
          {profile.tagline}
        </p>
      </div>
    </div>
  );
}
