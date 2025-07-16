'use client';
import ButtonTextEffect from "../src/components/Button/ButtonTextEffect";
import AvatarTooltip from "../src/components/Avatar/AvatarTooltip";
import Button from "../src/components/Button/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-12 sm:p-20 font-[family-name:var(--font-inter-sans)]">
      <div className="flex items-center justify-center gap-8">
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

      <div className="flex items-center justify-center gap-8">
        <Button>
          Button
        </Button>     

        <ButtonTextEffect />

        <Button variant="delete" deleteLabel="Delete" deletedLabel="Deleted" />
      </div>
    </div>
  );
}
