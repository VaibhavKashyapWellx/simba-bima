import { redirect } from "next/navigation";

export default function PurchaseStepRedirect() {
  redirect("/onboarding/pay");
}
