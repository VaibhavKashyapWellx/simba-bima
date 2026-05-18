import { redirect } from "next/navigation";

export default function PhoneRedirect() {
  redirect("/onboarding/about");
}
