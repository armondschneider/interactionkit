import AvatarTooltip from "../src/components/Avatar/AvatarTooltip";

export default function Home() {
  return (
    <div className="flex flex-flow justify-center min-h-screen p-8 pb-20 gap-30 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <AvatarTooltip
        variant="image"
        src="https://images.pexels.com/photos/8825559/pexels-photo-8825559.jpeg"
        alt="Profile avatar"
      />
      <AvatarTooltip
        variant="initials"
        initials="AS"
        alt="Profile initials avatar"
      />

      
    </div>
  );
}
