import { titleFont } from "@/config/fonts";


export default function EmptyPage() {
  return (
    <div>
      <h1>Hola mundo</h1>
      <h1 className={titleFont.className}>Hola mundo desde Empty Page</h1>

    </div>
  );
}
