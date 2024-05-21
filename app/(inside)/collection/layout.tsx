import { OpenOnboardingButton } from "./OpenOnboardingButton";

export default async function OnboardingLayout({
  children,
  onboarding,
}: {
  children: React.ReactNode;
  onboarding: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      <div>{onboarding}</div>
      <nav>
        <OpenOnboardingButton />
      </nav>
    </div>
  );
}
