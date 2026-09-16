import Message from "../Components/Message";
import PageBackdrop from "../Components/three/PageBackdrop";

export const metadata = { title: "Contact" };

export default function ContactsPage() {
  return (
    <div className="pt-20">
      <PageBackdrop />
      <Message />
    </div>
  );
}
